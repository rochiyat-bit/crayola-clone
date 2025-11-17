import { Model, DataTypes, Sequelize } from 'sequelize';

export class MediaFile extends Model {
  public id!: string;
  public userId!: string;
  public megaFileId!: string;
  public megaFolderId?: string;
  public fileName!: string;
  public originalName!: string;
  public fileSize!: number;
  public mimeType!: string;
  public publicUrl!: string;
  public metadata?: object;
  public readonly createdAt!: Date;
}

export const initMediaFileModel = (sequelize: Sequelize) => {
  MediaFile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      megaFileId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      megaFolderId: DataTypes.STRING,
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      originalName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileSize: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publicUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metadata: DataTypes.JSONB,
    },
    {
      sequelize,
      tableName: 'media_files',
      timestamps: true,
      updatedAt: false,
    }
  );
  return MediaFile;
};
