'use strict';

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const hashedPassword = await bcrypt.hash('Admin123!@#', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        email: 'admin@crayola-store.com',
        password: hashedPassword,
        name: 'Super Admin',
        role: 'super_admin',
        avatar: null,
        email_verified: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        email: 'editor@crayola-store.com',
        password: hashedPassword,
        name: 'Content Editor',
        role: 'editor',
        avatar: null,
        email_verified: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        email: 'customer@example.com',
        password: hashedPassword,
        name: 'John Doe',
        role: 'customer',
        avatar: null,
        email_verified: true,
        created_at: now,
        updated_at: now,
      },
    ], {});

    console.log('✅ Demo users seeded');
    console.log('📧 Admin: admin@crayola-store.com / Admin123!@#');
    console.log('📧 Editor: editor@crayola-store.com / Admin123!@#');
    console.log('📧 Customer: customer@example.com / Admin123!@#');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: {
        [Sequelize.Op.in]: [
          'admin@crayola-store.com',
          'editor@crayola-store.com',
          'customer@example.com'
        ]
      }
    }, {});
  }
};
