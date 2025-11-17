import { Model, DataTypes, Sequelize } from 'sequelize';

export class OrderItem extends Model {
  public id!: string;
  public orderId!: string;
  public productId!: string;
  public productName!: string;
  public productSku!: string;
  public quantity!: number;
  public price!: number;
  public subtotal!: number;
  public readonly createdAt!: Date;
}

export const initOrderItemModel = (sequelize: Sequelize) => {
  OrderItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'orders', key: 'id' },
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'products', key: 'id' },
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productSku: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'order_items',
      timestamps: true,
      updatedAt: false,
    }
  );
  return OrderItem;
};
