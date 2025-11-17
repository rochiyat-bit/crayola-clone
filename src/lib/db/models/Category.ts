import { Model, DataTypes, Sequelize } from 'sequelize';

export class Category extends Model {
  public id!: string;
  public name!: string;
  public slug!: string;
  public description?: string;
  public parentId?: string;
  public imageUrl?: string;
  public sortOrder!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initCategoryModel = (sequelize: Sequelize) => {
  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      description: DataTypes.TEXT,
      parentId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'categories', key: 'id' },
      },
      imageUrl: DataTypes.STRING,
      sortOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: 'categories',
      timestamps: true,
    }
  );
  return Category;
};
