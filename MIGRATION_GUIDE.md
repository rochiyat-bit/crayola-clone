# 📚 Database Migration & Seeding Guide

Panduan lengkap untuk mengelola database menggunakan Sequelize migrations dan seeders.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Migration Commands](#migration-commands)
- [Seeding Commands](#seeding-commands)
- [Database Schema](#database-schema)
- [Demo Data](#demo-data)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Pastikan Anda sudah:

1. ✅ Install PostgreSQL
2. ✅ Buat database `crayola_db`
3. ✅ Configure `.env.local` dengan DATABASE_URL yang benar
4. ✅ Install dependencies dengan `npm install`

---

## 🚀 Quick Start

### Setup Database Pertama Kali

```bash
# Jalankan semua migrations dan seeders
npm run db:setup
```

Command ini akan:
1. ✅ Membuat semua tables (12 migrations)
2. ✅ Mengisi data demo (users, categories, products, activities)

### Reset Database (Development)

```bash
# Hapus semua data dan rebuild dari awal
npm run db:reset
```

⚠️ **WARNING**: Command ini akan menghapus semua data!

---

## 📊 Migration Commands

### Jalankan Migrations

```bash
# Run semua pending migrations
npm run db:migrate
```

### Undo Migrations

```bash
# Undo migration terakhir
npm run db:migrate:undo

# Undo semua migrations
npm run db:migrate:undo:all
```

### Migration Files

Migrations berada di: `src/lib/db/migrations/`

**Urutan Eksekusi:**
1. `20240101000001-create-users.js` - Tabel users
2. `20240101000002-create-categories.js` - Tabel categories
3. `20240101000003-create-products.js` - Tabel products
4. `20240101000004-create-product-images.js` - Tabel product_images
5. `20240101000005-create-activities.js` - Tabel activities
6. `20240101000006-create-activity-steps.js` - Tabel activity_steps
7. `20240101000007-create-media-files.js` - Tabel media_files
8. `20240101000008-create-cms-pages.js` - Tabel cms_pages
9. `20240101000009-create-cms-blocks.js` - Tabel cms_blocks
10. `20240101000010-create-orders.js` - Tabel orders
11. `20240101000011-create-order-items.js` - Tabel order_items
12. `20240101000012-create-reviews.js` - Tabel reviews

---

## 🌱 Seeding Commands

### Jalankan Seeders

```bash
# Run semua seeders
npm run db:seed
```

### Undo Seeders

```bash
# Hapus semua seeded data
npm run db:seed:undo
```

### Seeder Files

Seeders berada di: `src/lib/db/seeders/`

**Urutan Eksekusi:**
1. `20240101000001-demo-users.js` - Demo users (admin, editor, customer)
2. `20240101000002-demo-categories.js` - Product categories (11 categories)
3. `20240101000003-demo-products.js` - Sample products (7 products)
4. `20240101000004-demo-activities.js` - Creative activities (3 activities + steps)

---

## 🗄️ Database Schema

### Tables Overview

| Table | Description | Relationships |
|-------|-------------|---------------|
| `users` | User accounts (admin, customers) | → orders, media_files, reviews |
| `categories` | Hierarchical product categories | → products, activities (self-referencing) |
| `products` | Product catalog | → product_images, order_items, reviews |
| `product_images` | Multiple images per product | ← products |
| `activities` | Creative tutorials | → activity_steps |
| `activity_steps` | Step-by-step instructions | ← activities |
| `media_files` | Mega.io file tracking | ← users |
| `cms_pages` | Dynamic content pages | - |
| `cms_blocks` | Reusable content blocks | - |
| `orders` | Customer orders | ← users, → order_items |
| `order_items` | Order line items | ← orders, ← products |
| `reviews` | Product reviews | ← users, ← products |

### Key Features

✅ **UUID Primary Keys** - Semua tables menggunakan UUID
✅ **snake_case Fields** - Database menggunakan snake_case (e.g., `created_at`)
✅ **JSONB Support** - Specifications, addresses, metadata
✅ **Cascade Deletes** - Auto-delete related records
✅ **Indexes** - Optimized queries dengan proper indexes
✅ **Constraints** - Foreign keys dan check constraints

---

## 📦 Demo Data

### 1. Users (3 users)

| Email | Password | Role |
|-------|----------|------|
| admin@crayola-store.com | Admin123!@# | super_admin |
| editor@crayola-store.com | Admin123!@# | editor |
| customer@example.com | Admin123!@# | customer |

### 2. Categories (11 categories)

**Root Categories:**
- Crayons
- Markers
- Paints
- Coloring Books
- Activities & Kits

**Sub-categories:**
- Classic Crayons, Twistable Crayons
- Washable Markers, Permanent Markers
- Watercolors, Acrylic Paints

### 3. Products (7 products)

| Product | SKU | Price | Stock |
|---------|-----|-------|-------|
| Crayola Crayons 24-Pack | CRAY-24 | $4.99 | 150 |
| Crayola Crayons 64-Pack | CRAY-64 | $9.99 → $7.99 | 85 |
| Crayola Twistables 24-Pack | TWIST-24 | $6.99 | 120 |
| Super Tips Markers 50-Pack | MARK-50 | $12.99 | 95 |
| Broad Line Markers 10-Pack | MARK-10 | $3.99 | 200 |
| Watercolors 16-Pack | PAINT-16 | $5.99 → $4.99 | 110 |
| Acrylic Paint Set 12-Pack | ACRYL-12 | $14.99 | 75 |

### 4. Activities (3 activities + 16 steps)

1. **Rainbow Paper Plate Craft** (Easy, 30 min)
2. **DIY Greeting Cards** (Medium, 45 min)
3. **Watercolor Landscape Painting** (Hard, 60 min, Premium)

---

## 🛠️ Manual Database Operations

### Using Sequelize CLI Directly

```bash
# Generate new migration
npx sequelize-cli migration:generate --name add-column-to-users

# Generate new seeder
npx sequelize-cli seed:generate --name demo-reviews

# Check migration status
npx sequelize-cli db:migrate:status
```

### Using psql

```bash
# Connect to database
psql -U postgres -d crayola_db

# List all tables
\dt

# Describe table structure
\d users

# Count records
SELECT COUNT(*) FROM users;

# Check seeded data
SELECT email, role FROM users;
SELECT name, slug FROM categories WHERE parent_id IS NULL;
SELECT name, sku, price FROM products LIMIT 5;
```

---

## 🐛 Troubleshooting

### Migration Failed

**Error: relation already exists**

```bash
# Drop and recreate
npm run db:reset
```

**Error: cannot drop table because other objects depend on it**

```bash
# Undo migrations in reverse order
npm run db:migrate:undo:all
npm run db:migrate
```

### Seeder Failed

**Error: duplicate key value violates unique constraint**

```bash
# Clear seeders and reseed
npm run db:seed:undo
npm run db:seed
```

### Connection Error

**Error: connect ECONNREFUSED**

```bash
# Check PostgreSQL service
sudo service postgresql status

# Start PostgreSQL
sudo service postgresql start

# Verify .env.local
cat .env.local | grep DATABASE_URL
```

### Permission Denied

```bash
# Grant permissions
psql -U postgres
GRANT ALL PRIVILEGES ON DATABASE crayola_db TO your_user;
```

---

## 📝 Best Practices

### Development

1. ✅ **Always backup** sebelum menjalankan migrations
2. ✅ **Test migrations** di development dulu
3. ✅ **Review generated SQL** sebelum production
4. ✅ **Use transactions** untuk complex migrations
5. ✅ **Never edit** migration files setelah di-commit

### Production

1. ✅ **Backup database** sebelum migrate
2. ✅ **Run migrations** saat maintenance window
3. ✅ **Monitor** migration process
4. ✅ **Have rollback plan** ready
5. ✅ **Never seed** production with demo data

### Creating Migrations

```javascript
// Good - Reversible
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'phone', {
      type: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'phone');
  }
};
```

```javascript
// Bad - Not reversible
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'phone', {
      type: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    // No rollback provided!
  }
};
```

---

## 🔄 Common Workflows

### Adding New Table

```bash
# 1. Generate migration
npx sequelize-cli migration:generate --name create-wishlists

# 2. Edit migration file
# src/lib/db/migrations/XXXXXX-create-wishlists.js

# 3. Run migration
npm run db:migrate

# 4. Create seeder (optional)
npx sequelize-cli seed:generate --name demo-wishlists

# 5. Edit seeder file
# src/lib/db/seeders/XXXXXX-demo-wishlists.js

# 6. Run seeder
npm run db:seed
```

### Modifying Existing Table

```bash
# 1. Generate migration
npx sequelize-cli migration:generate --name add-discount-to-products

# 2. Edit migration file
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'discount_percent', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'discount_percent');
  }
};

# 3. Run migration
npm run db:migrate
```

---

## 📚 Resources

- [Sequelize Migrations Docs](https://sequelize.org/docs/v6/other-topics/migrations/)
- [Sequelize CLI Docs](https://github.com/sequelize/cli)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🎯 Summary

**Initial Setup:**
```bash
npm run db:setup
```

**Reset Database:**
```bash
npm run db:reset
```

**Login Credentials:**
- Admin: `admin@crayola-store.com` / `Admin123!@#`
- Editor: `editor@crayola-store.com` / `Admin123!@#`
- Customer: `customer@example.com` / `Admin123!@#`

**Demo Data:**
- ✅ 3 Users
- ✅ 11 Categories
- ✅ 7 Products
- ✅ 3 Activities (16 steps)

---

**Happy Migrating! 🚀**
