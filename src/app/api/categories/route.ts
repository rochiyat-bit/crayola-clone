import { NextRequest, NextResponse } from 'next/server';
import { Category, Product } from '@/lib/db/models';
import { categorySchema } from '@/lib/validations/category.schema';
import { slugifyText } from '@/lib/utils';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';
    const parentId = searchParams.get('parentId');
    const includeProducts = searchParams.get('includeProducts') === 'true';

    const where: any = {};

    if (!includeInactive) {
      where.isActive = true;
    }

    if (parentId) {
      where.parentId = parentId === 'null' ? null : parentId;
    }

    const include: any[] = [];

    if (includeProducts) {
      include.push({
        model: Product,
        as: 'products',
        where: { isActive: true },
        required: false,
        attributes: ['id', 'name', 'slug', 'price'],
      });
    }

    // Fetch root categories (no parent)
    const categories = await Category.findAll({
      where,
      include,
      order: [['sortOrder', 'ASC'], ['name', 'ASC']],
    });

    // If fetching root categories, also fetch children
    if (!parentId) {
      const categoriesWithChildren = await Promise.all(
        categories.map(async (category) => {
          const children = await Category.findAll({
            where: {
              parentId: category.id,
              ...(includeInactive ? {} : { isActive: true }),
            },
            order: [['sortOrder', 'ASC'], ['name', 'ASC']],
          });

          return {
            ...category.toJSON(),
            children: children.map(c => c.toJSON()),
          };
        })
      );

      return NextResponse.json({
        success: true,
        data: categoriesWithChildren,
      });
    }

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication and role check
    // const session = await getServerSession();
    // if (!session?.user || !['admin', 'super_admin'].includes(session.user.role)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    const validatedData = categorySchema.parse(body);

    // Generate slug from category name if not provided
    const slug = validatedData.slug || slugifyText(validatedData.name);

    // Check if slug already exists
    const existingCategory = await Category.findOne({ where: { slug } });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 409 }
      );
    }

    // Verify parent category exists if provided
    if (validatedData.parentId) {
      const parentCategory = await Category.findByPk(validatedData.parentId);
      if (!parentCategory) {
        return NextResponse.json(
          { error: 'Parent category not found' },
          { status: 404 }
        );
      }
    }

    // Create category
    const category = await Category.create({
      ...validatedData,
      slug,
    });

    return NextResponse.json({
      success: true,
      data: category,
      message: 'Category created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create category error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create category', details: error.message },
      { status: 500 }
    );
  }
}
