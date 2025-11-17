import { NextRequest, NextResponse } from 'next/server';
import { megaService } from '@/lib/services/megaService';
import { MediaFile } from '@/lib/db/models';
import { mediaUploadSchema } from '@/lib/validations/media.schema';
import { z } from 'zod';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // const session = await getServerSession();
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folderId = formData.get('folderId') as string | null;
    const category = formData.get('category') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const validVideoTypes = ['video/mp4', 'video/webm'];
    const validDocTypes = ['application/pdf'];
    const validTypes = [...validImageTypes, ...validVideoTypes, ...validDocTypes];

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Supported: images (jpg, png, gif, webp), videos (mp4, webm), PDF' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${sanitizedName}`;

    console.log(`Uploading file: ${filename} (${file.size} bytes)`);

    // Upload to Mega.io
    const uploadResult = await megaService.uploadFile(buffer, {
      folderId: folderId || undefined,
      filename,
      onProgress: (progress) => {
        console.log(`Upload progress: ${progress}%`);
      },
    });

    console.log(`Upload complete: ${uploadResult.fileId}`);

    // Save metadata to database
    const mediaFile = await MediaFile.create({
      userId: 'system', // TODO: Replace with actual user ID from session
      megaFileId: uploadResult.fileId,
      megaFolderId: folderId || null,
      fileName: filename,
      originalName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      publicUrl: uploadResult.publicUrl,
      metadata: {
        category: category || 'general',
        uploadedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: mediaFile.id,
        url: uploadResult.publicUrl,
        fileId: uploadResult.fileId,
        filename: filename,
        size: file.size,
        mimeType: file.type,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        error: 'Upload failed',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};
    if (category) {
      where['metadata.category'] = category;
    }

    const { rows: mediaFiles, count } = await MediaFile.findAndCountAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json({
      success: true,
      data: mediaFiles,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error: any) {
    console.error('List media error:', error);
    return NextResponse.json(
      { error: 'Failed to list media files', details: error.message },
      { status: 500 }
    );
  }
}
