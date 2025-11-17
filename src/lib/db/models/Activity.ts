import { Model, DataTypes, Sequelize } from 'sequelize';

export class Activity extends Model {
  public id!: string;
  public categoryId?: string;
  public title!: string;
  public slug!: string;
  public description!: string;
  public difficulty!: 'easy' | 'medium' | 'hard';
  public ageRange!: string;
  public duration!: number;
  public materialsNeeded!: string[];
  public coverImageUrl!: string;
  public videoUrl?: string;
  public isPremium!: boolean;
  public viewCount!: number;
  public likeCount!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initActivityModel = (sequelize: Sequelize) => {
  Activity.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'categories', key: 'id' },
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM('easy', 'medium', 'hard'),
        defaultValue: 'easy',
      },
      ageRange: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      materialsNeeded: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      coverImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      videoUrl: DataTypes.STRING,
      isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      likeCount: {
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
      tableName: 'activities',
      timestamps: true,
      indexes: [
        { fields: ['slug'] },
        { fields: ['categoryId'] },
        { fields: ['difficulty'] },
        { fields: ['isActive'] },
      ],
    }
  );
  return Activity;
};
