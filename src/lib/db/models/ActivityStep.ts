import { Model, DataTypes, Sequelize } from 'sequelize';

export class ActivityStep extends Model {
  public id!: string;
  public activityId!: string;
  public stepNumber!: number;
  public title!: string;
  public description!: string;
  public imageUrl?: string;
  public readonly createdAt!: Date;
}

export const initActivityStepModel = (sequelize: Sequelize) => {
  ActivityStep.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      activityId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'activities', key: 'id' },
      },
      stepNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'activity_steps',
      timestamps: true,
      updatedAt: false,
      indexes: [
        { fields: ['activityId', 'stepNumber'] },
      ],
    }
  );
  return ActivityStep;
};
