import { Model, DataTypes, Sequelize } from 'sequelize';

export class CMSPage extends Model {
  public id!: string;
  public title!: string;
  public slug!: string;
  public content!: string;
  public metaTitle?: string;
  public metaDescription?: string;
  public isPublished!: boolean;
  public publishedAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initCMSPageModel = (sequelize: Sequelize) => {
  CMSPage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      metaTitle: DataTypes.STRING,
      metaDescription: DataTypes.TEXT,
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      publishedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'cms_pages',
      timestamps: true,
    }
  );
  return CMSPage;
};
