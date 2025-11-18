'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Get activities category
    const categories = await queryInterface.sequelize.query(
      `SELECT id, slug FROM categories WHERE slug = 'activities-kits';`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const activityCategory = categories[0];

    const activity1Id = uuidv4();
    const activity2Id = uuidv4();
    const activity3Id = uuidv4();

    const activities = [
      {
        id: activity1Id,
        category_id: activityCategory?.id || null,
        title: 'Rainbow Paper Plate Craft',
        slug: 'rainbow-paper-plate-craft',
        description: 'Create a beautiful rainbow using paper plates and crayons. Perfect for rainy day activities!',
        difficulty: 'easy',
        age_range: '3-6 years',
        duration: 30,
        materials_needed: JSON.stringify([
          'Paper plates',
          'Crayola Crayons',
          'Cotton balls',
          'Glue',
          'Scissors'
        ]),
        cover_image_url: 'https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Rainbow+Craft',
        video_url: null,
        is_premium: false,
        view_count: 456,
        like_count: 89,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: activity2Id,
        category_id: activityCategory?.id || null,
        title: 'DIY Greeting Cards',
        slug: 'diy-greeting-cards',
        description: 'Learn to make personalized greeting cards for birthdays, holidays, or just because!',
        difficulty: 'medium',
        age_range: '6-10 years',
        duration: 45,
        materials_needed: JSON.stringify([
          'Cardstock paper',
          'Crayola Markers',
          'Stickers',
          'Glitter glue',
          'Ruler'
        ]),
        cover_image_url: 'https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Greeting+Cards',
        video_url: null,
        is_premium: false,
        view_count: 312,
        like_count: 67,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: activity3Id,
        category_id: activityCategory?.id || null,
        title: 'Watercolor Landscape Painting',
        slug: 'watercolor-landscape-painting',
        description: 'Discover the basics of watercolor painting by creating stunning landscapes.',
        difficulty: 'hard',
        age_range: '10+ years',
        duration: 60,
        materials_needed: JSON.stringify([
          'Watercolor paper',
          'Crayola Watercolors',
          'Paintbrushes',
          'Cup of water',
          'Paper towels'
        ]),
        cover_image_url: 'https://via.placeholder.com/400x300/FFE66D/000000?text=Watercolor+Art',
        video_url: null,
        is_premium: true,
        view_count: 234,
        like_count: 45,
        is_active: true,
        created_at: now,
        updated_at: now,
      },
    ];

    await queryInterface.bulkInsert('activities', activities, {});
    console.log(`✅ ${activities.length} activities seeded`);

    // Add activity steps
    const steps = [
      // Steps for Rainbow Paper Plate Craft
      {
        id: uuidv4(),
        activity_id: activity1Id,
        step_number: 1,
        title: 'Cut the Paper Plate',
        description: 'Cut a paper plate in half to create the base for your rainbow.',
        image_url: null,
        created_at: now,
      },
      {
        id: uuidv4(),
        activity_id: activity1Id,
        step_number: 2,
        title: 'Draw Rainbow Arcs',
        description: 'Use different colored crayons to draw curved lines (arcs) across the plate. Start with red on the outside, then orange, yellow, green, blue, and purple.',
        image_url: null,
        created_at: now,
      },
      {
        id: uuidv4(),
        activity_id: activity1Id,
        step_number: 3,
        title: 'Add Clouds',
        description: 'Glue cotton balls at each end of the rainbow to create fluffy clouds.',
        image_url: null,
        created_at: now,
      },
      {
        id: uuidv4(),
        activity_id: activity1Id,
        step_number: 4,
        title: 'Display Your Rainbow',
        description: 'Let the glue dry and display your beautiful rainbow craft on your wall or window!',
        image_url: null,
        created_at: now,
      },

      // Steps for DIY Greeting Cards
      {
        id: uuidv4(),
        activity_id: activity2Id,
        step_number: 1,
        title: 'Fold the Cardstock',
        description: 'Fold a piece of cardstock in half to create the card base.',
        image_url: null,
        created_at: now,
      },
      {
        id: uuidv4(),
        activity_id: activity2Id,
        step_number: 2,
        title: 'Design the Front',
        description: 'Use markers to draw a design or write a message on the front of the card. Be creative!',
        image_url: null,
        created_at: now,
      },
      {
        id: uuidv4(),
        activity_id: activity2Id,
        step_number: 3,
        title: 'Add Decorations',
        description: 'Enhance your card with stickers, glitter glue, or other embellishments.',
        image_url: null,
        created_at: now,
      },
      {
        id: uuidv4(),
        activity_id: activity2Id,
        step_number: 4,
        title: 'Write Your Message',
        description: 'Open the card and write a personal message inside for the recipient.',
        image_url: null,
        created_at: now,
      },

      // Steps for Watercolor Landscape
      {
        id: uuidv4(),
        activity_id: activity3Id,
        step_number: 1,
        title: 'Sketch Your Landscape',
        description: 'Lightly sketch your landscape composition with a pencil on watercolor paper.',
        image_url: null,
        created_at: now,
      },
      {
        id: uuidv4(),
        activity_id: activity3Id,
        step_number: 2,
        title: 'Paint the Sky',
        description: 'Wet your brush and start painting the sky with light blue watercolors. Use more water for lighter colors.',
        image_url: null,
        created_at: now,
      },
      {
        id: uuidv4(),
        activity_id: activity3Id,
        step_number: 3,
        title: 'Add Landscape Elements',
        description: 'Paint the ground, trees, and other landscape features using various colors. Layer colors for depth.',
        image_url: null,
        created_at: now,
      },
      {
        id: uuidv4(),
        activity_id: activity3Id,
        step_number: 4,
        title: 'Add Final Details',
        description: 'Once dry, add final details like tree branches, grass, or highlights with more concentrated paint.',
        image_url: null,
        created_at: now,
      },
    ];

    await queryInterface.bulkInsert('activity_steps', steps, {});
    console.log(`✅ ${steps.length} activity steps seeded`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('activity_steps', null, {});
    await queryInterface.bulkDelete('activities', null, {});
  }
};
