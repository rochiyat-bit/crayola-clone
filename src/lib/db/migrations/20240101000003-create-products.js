'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        field: 'category_id',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      salePrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        field: 'sale_price',
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      stockQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'stock_quantity',
      },
      specifications: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      ageRange: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'age_range',
      },
      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_featured',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        field: 'is_active',
      },
      viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'view_count',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
      },
    });

    // Add indexes
    await queryInterface.addIndex('products', ['slug']);
    await queryInterface.addIndex('products', ['category_id']);
    await queryInterface.addIndex('products', ['is_featured']);
    await queryInterface.addIndex('products', ['is_active']);
    await queryInterface.addIndex('products', ['sku']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
