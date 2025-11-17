import { NextRequest, NextResponse } from 'next/server';
import { Product, ProductImage, Category } from '@/lib/db/models';
import { productSchema, productQuerySchema } from '@/lib/validations/product.schema';
import { slugifyText } from '@/lib/utils';
import { z } from 'zod';
import { Op } from 'sequelize';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const queryParams = productQuerySchema.parse({
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '12',
      categoryId: searchParams.get('categoryId') || undefined,
      search: searchParams.get('search') || undefined,
      featured: searchParams.get('featured') || undefined,
      minPrice: searchParams.get('minPrice') || undefined,
      maxPrice: searchParams.get('maxPrice') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
    });

    const { page, limit, categoryId, search, featured, minPrice, maxPrice, sortBy } = queryParams;

    // Build where clause
    const where: any = { isActive: true };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { sku: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price[Op.gte] = minPrice;
      if (maxPrice !== undefined) where.price[Op.lte] = maxPrice;
    }

    // Determine sort order
    let order: any = [['createdAt', 'DESC']];
    switch (sortBy) {
      case 'newest':
        order = [['createdAt', 'DESC']];
        break;
      case 'price-asc':
        order = [['price', 'ASC']];
        break;
      case 'price-desc':
        order = [['price', 'DESC']];
        break;
      case 'popular':
        order = [['viewCount', 'DESC']];
        break;
    }

    const { rows: products, count } = await Product.findAndCountAll({
      where,
      include: [
        {
          model: ProductImage,
          as: 'images',
          order: [['sortOrder', 'ASC']],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug'],
        },
      ],
      limit,
      offset: (page - 1) * limit,
      order,
      distinct: true,
    });

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error: any) {
    console.error('Get products error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
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
    const validatedData = productSchema.parse(body);

    // Generate slug from product name
    const slug = validatedData.slug || slugifyText(validatedData.name);

    // Check if slug already exists
    const existingProduct = await Product.findOne({ where: { slug } });
    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this name already exists' },
        { status: 409 }
      );
    }

    // Create product
    const product = await Product.create({
      ...validatedData,
      slug,
      viewCount: 0,
    });

    // Add images if provided
    if (validatedData.images && validatedData.images.length > 0) {
      await ProductImage.bulkCreate(
        validatedData.images.map((img, index) => ({
          productId: product.id,
          url: img.url,
          megaFileId: img.megaFileId,
          altText: img.altText || validatedData.name,
          sortOrder: index,
          isPrimary: index === 0,
        }))
      );
    }

    // Fetch complete product with relations
    const completeProduct = await Product.findByPk(product.id, {
      include: [
        { model: ProductImage, as: 'images' },
        { model: Category, as: 'category' },
      ],
    });

    return NextResponse.json({
      success: true,
      data: completeProduct,
      message: 'Product created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create product error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create product', details: error.message },
      { status: 500 }
    );
  }
}
