import { Model, DataTypes, Sequelize } from 'sequelize';

export class ProductImage extends Model {
  public id!: string;
  public productId!: string;
  public url!: string;
  public megaFileId!: string;
  public altText?: string;
  public sortOrder!: number;
  public isPrimary!: boolean;
  public readonly createdAt!: Date;
}

export const initProductImageModel = (sequelize: Sequelize) => {
  ProductImage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'products', key: 'id' },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      megaFileId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      altText: DataTypes.STRING,
      sortOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isPrimary: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'product_images',
      timestamps: true,
      updatedAt: false,
    }
  );
  return ProductImage;
};
