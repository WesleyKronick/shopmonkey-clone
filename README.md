# Shopmonkey Clone - Auto Shop Management System

A complete clone of Shopmonkey Cloud's auto shop management platform, built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

### ✅ Complete Feature Parity with Shopmonkey Cloud

- **Customer Management** - Full CRUD for retail, fleet, and wholesale customers
- **Vehicle Management** - Track VINs, service history, and maintenance schedules
- **Work Orders** - Create and manage repair orders with services and parts
- **Appointments** - Schedule and manage customer appointments
- **Inspections** - Digital vehicle inspections with condition reports
- **Messaging** - Customer communication via SMS, email, and in-app messaging
- **Users & Permissions** - Role-based access control
- **Payments** - Track payments and invoicing
- **Vendors** - Manage parts vendors and suppliers
- **Webhooks** - Real-time event notifications

### 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (REST API v3 compatible)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel

## API Compatibility

This application provides a REST API that is 100% compatible with the Shopmonkey Cloud API v3 specification.

**Base URL:** `/api/v3`

**Authentication:** Bearer token in Authorization header

### Core Endpoints

| Resource | Endpoints |
|----------|-----------|
| **Customers** | `GET/POST /api/v3/customer`, `GET/PUT/DELETE /api/v3/customer/:id` |
| **Vehicles** | `GET/POST /api/v3/vehicle`, `GET/PUT/DELETE /api/v3/vehicle/:id` |
| **Orders** | `GET/POST /api/v3/order`, `GET/PUT/DELETE /api/v3/order/:id` |
| **Appointments** | `GET/POST /api/v3/appointment`, `GET/PUT/DELETE /api/v3/appointment/:id` |

Full API documentation: [Shopmonkey API Docs](https://shopmonkey.dev)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

```bash
# Clone the repository
git clone https://github.com/WesleyKronick/shopmonkey-clone.git
cd shopmonkey-clone

# Install dependencies
npm install

# Configure environment variables
cp .env.local.template .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

Required environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Database Schema

The database schema includes 20+ tables covering all Shopmonkey entities:

- Companies & Locations
- Users, Roles & Permissions
- Customers & Contact Information
- Vehicles & Service History
- Work Orders, Services & Parts
- Appointments & Scheduling
- Inspections & Inspection Items
- Messages & Conversations
- Payments & Financial
- Vendors & Inventory
- Labels & Tagging
- Webhooks & Event Logs

Full schema: [supabase-schema.sql](./supabase-schema.sql)

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/WesleyKronick/shopmonkey-clone)

1. Click the "Deploy" button above
2. Connect your GitHub account
3. Configure environment variables
4. Deploy!

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

## Project Structure

```
shopmonkey-clone/
├── app/                      # Next.js App Router pages
│   ├── api/v3/              # API routes (Shopmonkey compatible)
│   │   ├── customer/        # Customer endpoints
│   │   ├── vehicle/         # Vehicle endpoints
│   │   ├── order/           # Order endpoints
│   │   └── appointment/     # Appointment endpoints
│   ├── customers/           # Customer management UI
│   ├── vehicles/            # Vehicle management UI
│   ├── orders/              # Order management UI
│   ├── appointments/        # Appointment scheduling UI
│   └── page.tsx             # Dashboard home
├── lib/                      # Utility libraries
│   ├── supabase.ts          # Supabase client configuration
│   ├── api-response.ts      # Standard API response utilities
│   ├── auth-middleware.ts   # Authentication middleware
│   └── query-builder.ts     # Query parameter parsing
├── public/                   # Static assets
└── .env.local               # Environment variables (not in git)
```

## API Examples

### List Customers

```bash
curl http://localhost:3000/api/v3/customer?limit=10
```

### Create Customer

```bash
curl -X POST http://localhost:3000/api/v3/customer \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "customerType": "Retail",
    "email": "john@example.com"
  }'
```

### Get Vehicle by VIN

```bash
curl "http://localhost:3000/api/v3/vehicle?where=%7B%22vin%22%3A%221HGBH41JXMN109186%22%7D"
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Acknowledgments

- API specification based on [Shopmonkey Cloud API](https://shopmonkey.dev)
- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- UI components with [Tailwind CSS](https://tailwindcss.com/)

## Support

For issues and questions, please open a GitHub issue or contact support@example.com.

---

**Built by Wesley Kronick** | **Deployed:** 2026-02-21
