import { Model, DataTypes, Sequelize } from 'sequelize';

export class CMSBlock extends Model {
  public id!: string;
  public identifier!: string;
  public title!: string;
  public content!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initCMSBlockModel = (sequelize: Sequelize) => {
  CMSBlock.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      identifier: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: 'cms_blocks',
      timestamps: true,
    }
  );
  return CMSBlock;
};
