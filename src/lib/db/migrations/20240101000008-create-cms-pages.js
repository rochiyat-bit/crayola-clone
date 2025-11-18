'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cms_pages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      metaTitle: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'meta_title',
      },
      metaDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'meta_description',
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_published',
      },
      publishedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'published_at',
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
    await queryInterface.addIndex('cms_pages', ['slug']);
    await queryInterface.addIndex('cms_pages', ['is_published']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cms_pages');
  }
};
