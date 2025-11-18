'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activities', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        field: 'category_id',
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
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      difficulty: {
        type: Sequelize.ENUM('easy', 'medium', 'hard'),
        defaultValue: 'easy',
      },
      ageRange: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'age_range',
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      materialsNeeded: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        field: 'materials_needed',
      },
      coverImageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'cover_image_url',
      },
      videoUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'video_url',
      },
      isPremium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_premium',
      },
      viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'view_count',
      },
      likeCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'like_count',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        field: 'is_active',
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
    await queryInterface.addIndex('activities', ['slug']);
    await queryInterface.addIndex('activities', ['category_id']);
    await queryInterface.addIndex('activities', ['difficulty']);
    await queryInterface.addIndex('activities', ['is_active']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('activities');
  }
};
