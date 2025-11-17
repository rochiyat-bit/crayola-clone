import { File as MegaFile, Storage } from 'megajs';
import { Readable } from 'stream';

interface MegaConfig {
  email: string;
  password: string;
  userAgent?: string;
}

interface UploadOptions {
  folderId?: string;
  filename: string;
  onProgress?: (progress: number) => void;
}

interface UploadResult {
  fileId: string;
  publicUrl: string;
  size: number;
}

interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: 'file' | 'folder';
  modifiedAt: Date;
}

class MegaService {
  private storage: Storage | null = null;
  private config: MegaConfig;
  private isConnecting = false;
  private connectionPromise: Promise<void> | null = null;

  constructor(config: MegaConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    if (this.storage) return;

    // Prevent multiple simultaneous connection attempts
    if (this.isConnecting && this.connectionPromise) {
      return this.connectionPromise;
    }

    this.isConnecting = true;
    this.connectionPromise = (async () => {
      try {
        this.storage = await new Storage({
          email: this.config.email,
          password: this.config.password,
          userAgent: this.config.userAgent || 'CrayolaWebsite/1.0',
        }).ready;
      } finally {
        this.isConnecting = false;
        this.connectionPromise = null;
      }
    })();

    return this.connectionPromise;
  }

  async disconnect(): Promise<void> {
    if (this.storage) {
      await this.storage.close();
      this.storage = null;
    }
  }

  async uploadFile(
    buffer: Buffer,
    options: UploadOptions
  ): Promise<UploadResult> {
    await this.connect();

    if (!this.storage) throw new Error('Mega storage not initialized');

    // Find or create folder
    let targetFolder = this.storage.root;
    if (options.folderId) {
      targetFolder = this.storage.files[options.folderId];
      if (!targetFolder) throw new Error('Folder not found');
    }

    // Upload file
    const uploadStream = targetFolder.upload({
      name: options.filename,
      size: buffer.length,
    }, buffer);

    // Track progress if callback provided
    if (options.onProgress) {
      uploadStream.on('progress', (stats: any) => {
        const progress = Math.round((stats.bytesLoaded / stats.bytesTotal) * 100);
        options.onProgress!(progress);
      });
    }

    const uploadedFile = await uploadStream.complete;

    // Generate public link
    const publicUrl = await uploadedFile.link();

    return {
      fileId: uploadedFile.nodeId || '',
      publicUrl,
      size: uploadedFile.size || 0,
    };
  }

  async uploadStream(
    stream: Readable,
    size: number,
    options: UploadOptions
  ): Promise<{ fileId: string; publicUrl: string }> {
    await this.connect();

    if (!this.storage) throw new Error('Mega storage not initialized');

    let targetFolder = this.storage.root;
    if (options.folderId) {
      targetFolder = this.storage.files[options.folderId];
      if (!targetFolder) throw new Error('Folder not found');
    }

    const uploadStream = targetFolder.upload({
      name: options.filename,
      size,
    }, stream);

    const uploadedFile = await uploadStream.complete;
    const publicUrl = await uploadedFile.link();

    return {
      fileId: uploadedFile.nodeId || '',
      publicUrl,
    };
  }

  async deleteFile(fileId: string): Promise<void> {
    await this.connect();

    if (!this.storage) throw new Error('Mega storage not initialized');

    const file = this.storage.files[fileId];
    if (file) {
      await file.delete(true);
    }
  }

  async createFolder(name: string, parentFolderId?: string): Promise<string> {
    await this.connect();

    if (!this.storage) throw new Error('Mega storage not initialized');

    let parentFolder = this.storage.root;
    if (parentFolderId) {
      parentFolder = this.storage.files[parentFolderId];
      if (!parentFolder) throw new Error('Parent folder not found');
    }

    const newFolder = await parentFolder.mkdir(name);
    return newFolder.nodeId || '';
  }

  async listFiles(folderId?: string): Promise<FileInfo[]> {
    await this.connect();

    if (!this.storage) throw new Error('Mega storage not initialized');

    let folder = this.storage.root;
    if (folderId) {
      folder = this.storage.files[folderId];
      if (!folder) throw new Error('Folder not found');
    }

    const children = folder.children || [];

    return children.map((file: any) => ({
      id: file.nodeId || '',
      name: file.name || '',
      size: file.size || 0,
      type: file.directory ? 'folder' as const : 'file' as const,
      modifiedAt: file.timestamp ? new Date(file.timestamp * 1000) : new Date(),
    }));
  }

  async getFileInfo(fileId: string): Promise<{
    name: string;
    size: number;
    publicUrl: string;
  }> {
    await this.connect();

    if (!this.storage) throw new Error('Mega storage not initialized');

    const file = this.storage.files[fileId];
    if (!file) throw new Error('File not found');

    const publicUrl = await file.link();

    return {
      name: file.name || '',
      size: file.size || 0,
      publicUrl,
    };
  }

  async renameFile(fileId: string, newName: string): Promise<void> {
    await this.connect();

    if (!this.storage) throw new Error('Mega storage not initialized');

    const file = this.storage.files[fileId];
    if (!file) throw new Error('File not found');

    await file.rename(newName);
  }

  async moveFile(fileId: string, targetFolderId: string): Promise<void> {
    await this.connect();

    if (!this.storage) throw new Error('Mega storage not initialized');

    const file = this.storage.files[fileId];
    const targetFolder = this.storage.files[targetFolderId];

    if (!file) throw new Error('File not found');
    if (!targetFolder) throw new Error('Target folder not found');

    await file.moveTo(targetFolder);
  }

  isConnected(): boolean {
    return this.storage !== null;
  }
}

// Create singleton instance
const megaConfig: MegaConfig = {
  email: process.env.MEGA_EMAIL || '',
  password: process.env.MEGA_PASSWORD || '',
  userAgent: 'CrayolaWebsite/1.0',
};

export const megaService = new MegaService(megaConfig);
export { MegaService, MegaConfig, UploadOptions, UploadResult, FileInfo };
