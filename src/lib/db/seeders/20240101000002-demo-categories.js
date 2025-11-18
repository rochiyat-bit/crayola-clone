'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Root categories
    const crayonsId = uuidv4();
    const markersId = uuidv4();
    const paintsId = uuidv4();
    const coloringBooksId = uuidv4();
    const activitiesId = uuidv4();

    const categories = [
      // Root Categories
      {
        id: crayonsId,
        name: 'Crayons',
        slug: 'crayons',
        description: 'Premium quality crayons in vibrant colors',
        parent_id: null,
        image_url: null,
        sort_order: 1,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: markersId,
        name: 'Markers',
        slug: 'markers',
        description: 'Washable and permanent markers for all your creative needs',
        parent_id: null,
        image_url: null,
        sort_order: 2,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: paintsId,
        name: 'Paints',
        slug: 'paints',
        description: 'Watercolor, acrylic, and tempera paints',
        parent_id: null,
        image_url: null,
        sort_order: 3,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: coloringBooksId,
        name: 'Coloring Books',
        slug: 'coloring-books',
        description: 'Fun coloring books for all ages',
        parent_id: null,
        image_url: null,
        sort_order: 4,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: activitiesId,
        name: 'Activities & Kits',
        slug: 'activities-kits',
        description: 'Creative activity sets and craft kits',
        parent_id: null,
        image_url: null,
        sort_order: 5,
        is_active: true,
        created_at: now,
        updated_at: now,
      },

      // Sub-categories for Crayons
      {
        id: uuidv4(),
        name: 'Classic Crayons',
        slug: 'classic-crayons',
        description: 'Traditional wax crayons',
        parent_id: crayonsId,
        image_url: null,
        sort_order: 1,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: 'Twistable Crayons',
        slug: 'twistable-crayons',
        description: 'No sharpening needed',
        parent_id: crayonsId,
        image_url: null,
        sort_order: 2,
        is_active: true,
        created_at: now,
        updated_at: now,
      },

      // Sub-categories for Markers
      {
        id: uuidv4(),
        name: 'Washable Markers',
        slug: 'washable-markers',
        description: 'Easy to wash from skin and clothes',
        parent_id: markersId,
        image_url: null,
        sort_order: 1,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: 'Permanent Markers',
        slug: 'permanent-markers',
        description: 'Long-lasting permanent markers',
        parent_id: markersId,
        image_url: null,
        sort_order: 2,
        is_active: true,
        created_at: now,
        updated_at: now,
      },

      // Sub-categories for Paints
      {
        id: uuidv4(),
        name: 'Watercolors',
        slug: 'watercolors',
        description: 'Vibrant watercolor paints',
        parent_id: paintsId,
        image_url: null,
        sort_order: 1,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        name: 'Acrylic Paints',
        slug: 'acrylic-paints',
        description: 'Bold acrylic paints',
        parent_id: paintsId,
        image_url: null,
        sort_order: 2,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
    ];

    await queryInterface.bulkInsert('categories', categories, {});
    console.log(`✅ ${categories.length} categories seeded`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
