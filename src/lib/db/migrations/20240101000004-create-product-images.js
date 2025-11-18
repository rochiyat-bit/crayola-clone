'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_images', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'product_id',
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      megaFileId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'mega_file_id',
      },
      altText: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'alt_text',
      },
      sortOrder: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'sort_order',
      },
      isPrimary: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_primary',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
    });

    // Add indexes
    await queryInterface.addIndex('product_images', ['product_id']);
    await queryInterface.addIndex('product_images', ['is_primary']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_images');
  }
};
