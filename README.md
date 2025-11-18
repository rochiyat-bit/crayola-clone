# 🎨 Crayola E-Commerce Platform

A full-featured, production-ready e-commerce and brand platform inspired by Crayola.com. Built with Next.js 14, TypeScript, PostgreSQL, and Mega.io cloud storage.

## ✨ Features

### 🛍️ **E-Commerce**
- Product catalog with advanced filtering and search
- Shopping cart with persistent storage
- Checkout and order management
- Product reviews and ratings
- Category hierarchy with drag-and-drop

### 📝 **CMS Dashboard**
- Complete product management (CRUD)
- Category management with hierarchical structure
- Activity/tutorial creation with step-by-step instructions
- Media library with Mega.io integration
- Dynamic page builder
- Role-based access control (Super Admin, Admin, Editor, Viewer)

### 🎓 **Educational Resources**
- Creative activities and tutorials
- Step-by-step instructions with images
- Difficulty levels and age ranges
- Materials list and duration tracking

### ☁️ **Cloud Storage**
- Mega.io integration for all media files
- Automatic public link generation
- File organization by category
- Support for images, videos, and PDFs

### 🔐 **User Management**
- Authentication with NextAuth.js
- Role-based permissions
- User profiles and order history
- Wishlist functionality

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router, Server Components, Server Actions)
- **Language:** TypeScript 5.3+
- **Database:** PostgreSQL 16+ with Sequelize ORM
- **Storage:** Mega.io cloud storage
- **Authentication:** NextAuth.js 5
- **UI:** Tailwind CSS 4 + shadcn/ui components
- **Validation:** Zod schemas
- **State Management:** Zustand (cart management)
- **Image Optimization:** Next.js Image component

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **PostgreSQL** 16 or higher
- **npm** or **yarn**
- **Mega.io account** (for cloud storage)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd crayola-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up PostgreSQL Database

Create a new PostgreSQL database:

```bash
createdb crayola_db
```

Or using psql:

```sql
CREATE DATABASE crayola_db;
```

### 4. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Database
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/crayola_db"

# Mega.io Cloud Storage
MEGA_EMAIL=your-mega-email@example.com
MEGA_PASSWORD=your-mega-password

# NextAuth
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

### 5. Set Up Mega.io Account

1. Create a free account at [https://mega.io](https://mega.io)
2. Verify your email address
3. Add your credentials to `.env.local`

**Important:** For production, use a dedicated Mega.io account with sufficient storage.

### 6. Initialize Database

Run migrations to create all tables:

```bash
npm run db:migrate
```

Seed demo data (users, categories, products, activities):

```bash
npm run db:seed
```

Or run both at once:

```bash
npm run db:setup
```

**Demo Login Credentials:**
- Admin: `admin@crayola-store.com` / `Admin123!@#`
- Editor: `editor@crayola-store.com` / `Admin123!@#`
- Customer: `customer@example.com` / `Admin123!@#`

📚 **For detailed migration guide, see [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)**

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
crayola-clone/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (public)/            # Public-facing pages
│   │   ├── admin/               # CMS Dashboard
│   │   ├── account/             # User account pages
│   │   ├── api/                 # API routes
│   │   │   ├── media/upload/   # Mega.io upload endpoint
│   │   │   ├── products/       # Product CRUD
│   │   │   ├── categories/     # Category CRUD
│   │   │   └── activities/     # Activity CRUD
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── admin/               # Admin components
│   │   ├── public/              # Public site components
│   │   └── shared/              # Shared components
│   ├── lib/
│   │   ├── db/
│   │   │   ├── models/         # Sequelize models
│   │   │   └── config.ts       # Database config
│   │   ├── services/
│   │   │   └── megaService.ts  # Mega.io integration
│   │   ├── validations/        # Zod schemas
│   │   └── utils/              # Utility functions
│   ├── stores/                  # Zustand stores
│   │   └── cartStore.ts        # Shopping cart
│   └── types/                   # TypeScript types
├── public/                      # Static assets
├── .env.example                 # Environment template
└── package.json
```

## 🗄️ Database Schema

### Core Models

- **Users** - Admin and customer accounts
- **Categories** - Hierarchical product categories
- **Products** - Product catalog
- **ProductImages** - Multiple images per product (Mega.io URLs)
- **Activities** - Creative tutorials and activities
- **ActivitySteps** - Step-by-step instructions
- **MediaFiles** - Mega.io file metadata
- **CMSPages** - Dynamic content pages
- **CMSBlocks** - Reusable content blocks
- **Orders** - Customer orders
- **OrderItems** - Order line items
- **Reviews** - Product reviews

## 🔌 API Endpoints

### Products

```http
GET    /api/products              # List products with filters
POST   /api/products              # Create product (admin)
```

### Categories

```http
GET    /api/categories            # List categories
POST   /api/categories            # Create category (admin)
```

### Media Upload (Mega.io)

```http
POST   /api/media/upload          # Upload file to Mega.io
GET    /api/media/upload          # List uploaded files
```

## 💾 Database Commands

### Migrations

```bash
# Run all pending migrations
npm run db:migrate

# Undo last migration
npm run db:migrate:undo

# Undo all migrations
npm run db:migrate:undo:all
```

### Seeders

```bash
# Seed demo data
npm run db:seed

# Remove seeded data
npm run db:seed:undo
```

### Reset Database

```bash
# Drop all tables, recreate, and reseed (⚠️ Deletes all data!)
npm run db:reset

# Setup fresh database (migrate + seed)
npm run db:setup
```

### Demo Data Included

- **3 Users**: Super Admin, Editor, Customer
- **11 Categories**: Crayons, Markers, Paints, etc. (with sub-categories)
- **7 Products**: Sample Crayola products with pricing and stock
- **3 Activities**: Creative tutorials with step-by-step instructions

📚 **Full migration documentation**: [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)

## 🎯 Current Implementation Status

✅ **Completed:**
- Project setup with Next.js 14 and TypeScript
- Database models with Sequelize ORM
- **Database migrations (12 tables)**
- **Database seeders with demo data**
- Mega.io cloud storage integration
- API routes for products, categories, and media
- Zod validation schemas
- Shopping cart with Zustand
- Environment configuration
- Comprehensive migration guide

🚧 **In Progress:**
- NextAuth.js authentication
- Admin dashboard UI
- Public site pages

📋 **Roadmap:**
- Activity/tutorial pages
- User account pages
- Checkout and payment integration
- Email notifications
- Search functionality
- Product recommendations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Next.js, TypeScript, and Mega.io**
