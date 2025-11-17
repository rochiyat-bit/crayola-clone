import { sequelize } from '../config';

// Import model initializers
import { initUserModel, User } from './User';
import { initCategoryModel, Category } from './Category';
import { initProductModel, Product } from './Product';
import { initProductImageModel, ProductImage } from './ProductImage';
import { initActivityModel, Activity } from './Activity';
import { initActivityStepModel, ActivityStep } from './ActivityStep';
import { initMediaFileModel, MediaFile } from './MediaFile';
import { initCMSPageModel, CMSPage } from './CMSPage';
import { initCMSBlockModel, CMSBlock } from './CMSBlock';
import { initOrderModel, Order } from './Order';
import { initOrderItemModel, OrderItem } from './OrderItem';
import { initReviewModel, Review } from './Review';

// Initialize all models
initUserModel(sequelize);
initCategoryModel(sequelize);
initProductModel(sequelize);
initProductImageModel(sequelize);
initActivityModel(sequelize);
initActivityStepModel(sequelize);
initMediaFileModel(sequelize);
initCMSPageModel(sequelize);
initCMSBlockModel(sequelize);
initOrderModel(sequelize);
initOrderItemModel(sequelize);
initReviewModel(sequelize);

// Define relationships

// Category relationships (self-referencing for hierarchy)
Category.hasMany(Category, { as: 'children', foreignKey: 'parentId' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });

// Product relationships
Product.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });
Category.hasMany(Product, { as: 'products', foreignKey: 'categoryId' });

Product.hasMany(ProductImage, { as: 'images', foreignKey: 'productId', onDelete: 'CASCADE' });
ProductImage.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

Product.hasMany(Review, { as: 'reviews', foreignKey: 'productId', onDelete: 'CASCADE' });
Review.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

// Activity relationships
Activity.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });
Category.hasMany(Activity, { as: 'activities', foreignKey: 'categoryId' });

Activity.hasMany(ActivityStep, { as: 'steps', foreignKey: 'activityId', onDelete: 'CASCADE' });
ActivityStep.belongsTo(Activity, { as: 'activity', foreignKey: 'activityId' });

// User relationships
User.hasMany(MediaFile, { as: 'mediaFiles', foreignKey: 'userId' });
MediaFile.belongsTo(User, { as: 'user', foreignKey: 'userId' });

User.hasMany(Order, { as: 'orders', foreignKey: 'userId' });
Order.belongsTo(User, { as: 'user', foreignKey: 'userId' });

User.hasMany(Review, { as: 'reviews', foreignKey: 'userId' });
Review.belongsTo(User, { as: 'user', foreignKey: 'userId' });

// Order relationships
Order.hasMany(OrderItem, { as: 'items', foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { as: 'order', foreignKey: 'orderId' });

OrderItem.belongsTo(Product, { as: 'product', foreignKey: 'productId' });
Product.hasMany(OrderItem, { as: 'orderItems', foreignKey: 'productId' });

// Export models
export {
  sequelize,
  User,
  Category,
  Product,
  ProductImage,
  Activity,
  ActivityStep,
  MediaFile,
  CMSPage,
  CMSBlock,
  Order,
  OrderItem,
  Review,
};

// Sync database (only in development)
export const syncDatabase = async (force = false) => {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established successfully.');

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ force, alter: !force });
      console.log(`✓ Database synchronized${force ? ' (forced)' : ''}.`);
    }

    return true;
  } catch (error) {
    console.error('✗ Unable to connect to the database:', error);
    return false;
  }
};
