'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('media_files', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
      },
      megaFileId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'mega_file_id',
      },
      megaFolderId: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'mega_folder_id',
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'file_name',
      },
      originalName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'original_name',
      },
      fileSize: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: 'file_size',
      },
      mimeType: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'mime_type',
      },
      publicUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'public_url',
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
    });

    // Add indexes
    await queryInterface.addIndex('media_files', ['user_id']);
    await queryInterface.addIndex('media_files', ['mega_file_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('media_files');
  }
};
