import { Model, DataTypes, Sequelize } from 'sequelize';

export class Review extends Model {
  public id!: string;
  public productId!: string;
  public userId!: string;
  public rating!: number;
  public title?: string;
  public comment!: string;
  public isVerifiedPurchase!: boolean;
  public isApproved!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initReviewModel = (sequelize: Sequelize) => {
  Review.init(
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
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      title: DataTypes.STRING,
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isVerifiedPurchase: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'reviews',
      timestamps: true,
      indexes: [
        { fields: ['productId'] },
        { fields: ['userId'] },
        { fields: ['isApproved'] },
      ],
    }
  );
  return Review;
};
