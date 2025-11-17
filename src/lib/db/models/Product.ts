import { Model, DataTypes, Sequelize } from 'sequelize';

export class Product extends Model {
  public id!: string;
  public categoryId!: string;
  public name!: string;
  public slug!: string;
  public description!: string;
  public price!: number;
  public salePrice?: number;
  public sku!: string;
  public stockQuantity!: number;
  public specifications?: object;
  public ageRange?: string;
  public isFeatured!: boolean;
  public isActive!: boolean;
  public viewCount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initProductModel = (sequelize: Sequelize) => {
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      salePrice: DataTypes.DECIMAL(10, 2),
      sku: {
        type: DataTypes.STRING,
        unique: true,
      },
      stockQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      specifications: DataTypes.JSONB,
      ageRange: DataTypes.STRING,
      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'products',
      timestamps: true,
      indexes: [
        { fields: ['slug'] },
        { fields: ['categoryId'] },
        { fields: ['isFeatured'] },
        { fields: ['isActive'] },
      ],
    }
  );
  return Product;
};
