import { Model, DataTypes, Sequelize } from 'sequelize';

export class Order extends Model {
  public id!: string;
  public userId!: string;
  public orderNumber!: string;
  public status!: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  public subtotal!: number;
  public tax!: number;
  public shipping!: number;
  public total!: number;
  public shippingAddress!: object;
  public billingAddress!: object;
  public paymentMethod!: string;
  public paymentStatus!: string;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initOrderModel = (sequelize: Sequelize) => {
  Order.init(
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
      orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending',
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      tax: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      shipping: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      shippingAddress: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      billingAddress: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      tableName: 'orders',
      timestamps: true,
      indexes: [
        { fields: ['userId'] },
        { fields: ['orderNumber'] },
        { fields: ['status'] },
      ],
    }
  );
  return Order;
};
