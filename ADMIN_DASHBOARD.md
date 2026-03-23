# SEVCO Admin Dashboard - Mission Control

## Overview

SEVCO Mission Control is the centralized admin dashboard for managing SEVCO operations, including user management, content pages, projects, and KPI metrics.

## Features

### 1. **User Authentication** 
- Supabase-based authentication
- Role-based access control (Admin, Manager, Viewer)
- OAuth integration ready (Google, GitHub)

### 2. **KPI Dashboard**
- Live graphs showing:
  - Revenue trends (Monthly revenue)
  - Active users growth
  - Project status distribution
  - Stream counts
- Real-time data visualization using Recharts
- Recent activity timeline
- Performance metrics

### 3. **User Management**
- Create, read, update, delete users
- Role-based permissions (Admin, Manager, Viewer)
- User search and filtering
- Batch operations ready

### 4. **Content Page Manager**
- CRUD operations for dynamic pages
- URL slug management
- Publish/unpublish controls
- Rich content support
- Page metadata (created by, created date)

### 5. **Project/App Control System**
- Create and manage projects
- Status management (Active, Paused, Archived)
- Project ownership and assignment
- Performance tracking
- Bulk operations ready

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase
- **Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React

## SEVCO Brand Colors

- **Primary Blue**: `#0037FF`
- **Accent Red**: `#BD0000`
- **Warning Yellow**: `#FCC318`
- **Success Green**: `#00A611`

## Directory Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx           # Admin layout with sidebar
│   │   ├── page.tsx             # Main dashboard
│   │   ├── users/               # User management
│   │   ├── pages/               # Page manager
│   │   └── projects/            # Project management
│   ├── auth/
│   │   └── page.tsx             # Authentication page
│   └── globals.css              # Global styles
├── components/
│   ├── AdminNav.tsx             # Sidebar navigation
│   ├── UserDialog.tsx           # User form dialog
│   ├── PageDialog.tsx           # Page form dialog
│   ├── ProjectDialog.tsx        # Project form dialog
│   └── ui/                      # shadcn/ui components
└── lib/
    ├── supabase.ts              # Supabase client & types
    └── utils.ts                 # Utility functions
```

## Environment Configuration

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Building for Production

```bash
npm run build
npm start
```

## Supabase Setup

### Required Tables

1. **users**
   - id (UUID)
   - email (string, unique)
   - name (string)
   - role (enum: admin, manager, viewer)
   - created_at (timestamp)
   - updated_at (timestamp)

2. **pages**
   - id (UUID)
   - slug (string, unique)
   - title (string)
   - content (text)
   - published (boolean)
   - created_at (timestamp)
   - updated_at (timestamp)
   - created_by (string/FK)

3. **projects**
   - id (UUID)
   - name (string)
   - description (text)
   - status (enum: active, paused, archived)
   - owner_id (string/FK)
   - created_at (timestamp)
   - updated_at (timestamp)

4. **kpi_data**
   - id (UUID)
   - metric (enum: revenue, users, projects, streams)
   - value (number)
   - timestamp (timestamp)

## API Integration

The dashboard is ready to integrate with APIs:

- `/api/auth/*` - Authentication endpoints
- `/api/users/*` - User management endpoints
- `/api/pages/*` - Page CRUD endpoints
- `/api/projects/*` - Project management endpoints
- `/api/kpi/*` - KPI data endpoints

## Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Vercel Configuration

```bash
# Environment variables needed in Vercel dashboard
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_KEY
NEXT_PUBLIC_API_URL (production URL)
```

## Security Considerations

- All API routes require authentication
- Role-based access control on frontend and backend
- Sensitive data in environment variables
- CORS configuration for Supabase
- Rate limiting on API endpoints (ready to implement)

## Next Steps

1. **Backend API Integration**: Connect to actual Supabase backend
2. **Real Data**: Replace mock data with live database queries
3. **Authentication Flow**: Complete Supabase auth integration
4. **Advanced Features**:
   - Bulk export (CSV/PDF)
   - Advanced filtering and search
   - Activity audit logs
   - Role-based page access
   - Webhook management
5. **Testing**: Add unit and integration tests
6. **Analytics**: Google Analytics or custom tracking
7. **Notifications**: Email alerts and in-app notifications

## Support

For issues or feature requests, refer to the main SEVCO repository.
