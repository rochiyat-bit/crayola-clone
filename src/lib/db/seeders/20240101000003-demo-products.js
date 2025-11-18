'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Get category IDs
    const categories = await queryInterface.sequelize.query(
      `SELECT id, slug FROM categories WHERE parent_id IS NULL;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const crayonsCategory = categories.find(c => c.slug === 'crayons');
    const markersCategory = categories.find(c => c.slug === 'markers');
    const paintsCategory = categories.find(c => c.slug === 'paints');

    if (!crayonsCategory || !markersCategory || !paintsCategory) {
      console.log('⚠️  Categories not found, skipping product seeding');
      return;
    }

    const products = [
      // Crayons
      {
        id: uuidv4(),
        category_id: crayonsCategory.id,
        name: 'Crayola Crayons 24-Pack',
        slug: 'crayola-crayons-24-pack',
        description: 'Classic Crayola crayons in 24 vibrant colors. Perfect for coloring, drawing, and art projects.',
        price: 4.99,
        sale_price: null,
        sku: 'CRAY-24',
        stock_quantity: 150,
        specifications: JSON.stringify({
          colors: 24,
          type: 'Standard',
          size: 'Regular',
          washable: false,
        }),
        age_range: '3+',
        is_featured: true,
        is_active: true,
        view_count: 245,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        category_id: crayonsCategory.id,
        name: 'Crayola Crayons 64-Pack',
        slug: 'crayola-crayons-64-pack',
        description: 'The ultimate crayon collection with 64 brilliant colors including metallics and neons.',
        price: 9.99,
        sale_price: 7.99,
        sku: 'CRAY-64',
        stock_quantity: 85,
        specifications: JSON.stringify({
          colors: 64,
          type: 'Deluxe',
          size: 'Regular',
          washable: false,
        }),
        age_range: '3+',
        is_featured: true,
        is_active: true,
        view_count: 189,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        category_id: crayonsCategory.id,
        name: 'Crayola Twistables 24-Pack',
        slug: 'crayola-twistables-24-pack',
        description: 'Never need sharpening! Twist-up crayons that are always ready to use.',
        price: 6.99,
        sale_price: null,
        sku: 'TWIST-24',
        stock_quantity: 120,
        specifications: JSON.stringify({
          colors: 24,
          type: 'Twistable',
          size: 'Mini',
          washable: false,
        }),
        age_range: '3+',
        is_featured: false,
        is_active: true,
        view_count: 142,
        created_at: now,
        updated_at: now,
      },

      // Markers
      {
        id: uuidv4(),
        category_id: markersCategory.id,
        name: 'Crayola Super Tips Washable Markers 50-Pack',
        slug: 'crayola-super-tips-washable-markers-50-pack',
        description: 'Washable markers with both fine and broad line tips. Washes from skin and most clothing.',
        price: 12.99,
        sale_price: null,
        sku: 'MARK-50',
        stock_quantity: 95,
        specifications: JSON.stringify({
          colors: 50,
          type: 'Super Tips',
          washable: true,
          tip: 'Dual-ended',
        }),
        age_range: '3+',
        is_featured: true,
        is_active: true,
        view_count: 312,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        category_id: markersCategory.id,
        name: 'Crayola Broad Line Markers 10-Pack',
        slug: 'crayola-broad-line-markers-10-pack',
        description: 'Classic broad line markers in 10 bold colors. Perfect for posters and large drawings.',
        price: 3.99,
        sale_price: null,
        sku: 'MARK-10',
        stock_quantity: 200,
        specifications: JSON.stringify({
          colors: 10,
          type: 'Broad Line',
          washable: true,
          tip: 'Broad',
        }),
        age_range: '3+',
        is_featured: false,
        is_active: true,
        view_count: 98,
        created_at: now,
        updated_at: now,
      },

      // Paints
      {
        id: uuidv4(),
        category_id: paintsCategory.id,
        name: 'Crayola Washable Watercolors 16-Pack',
        slug: 'crayola-washable-watercolors-16-pack',
        description: 'Semi-moist watercolor pans in 16 brilliant colors. Includes paintbrush.',
        price: 5.99,
        sale_price: 4.99,
        sku: 'PAINT-16',
        stock_quantity: 110,
        specifications: JSON.stringify({
          colors: 16,
          type: 'Watercolor',
          washable: true,
          includes: 'Brush',
        }),
        age_range: '5+',
        is_featured: true,
        is_active: true,
        view_count: 167,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        category_id: paintsCategory.id,
        name: 'Crayola Acrylic Paint Set 12-Pack',
        slug: 'crayola-acrylic-paint-set-12-pack',
        description: 'Premium quality acrylic paints in 12 vibrant colors. Great for canvas and wood.',
        price: 14.99,
        sale_price: null,
        sku: 'ACRYL-12',
        stock_quantity: 75,
        specifications: JSON.stringify({
          colors: 12,
          type: 'Acrylic',
          size: '2oz each',
          surface: 'Canvas, wood, paper',
        }),
        age_range: '8+',
        is_featured: false,
        is_active: true,
        view_count: 134,
        created_at: now,
        updated_at: now,
      },
    ];

    await queryInterface.bulkInsert('products', products, {});
    console.log(`✅ ${products.length} products seeded`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
