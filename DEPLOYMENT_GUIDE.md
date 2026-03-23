# SEVCO Admin Dashboard - Deployment Guide

## Quick Start

### Local Development

```bash
# 1. Clone the repository
cd sevco-web

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Start development server
npm run dev

# 5. Open browser
# http://localhost:3000
# Admin dashboard: http://localhost:3000/admin
# Auth: http://localhost:3000/auth
```

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Enter project details:
   - Project name: `sevco-mission-control`
   - Database password: Save this securely
   - Region: Choose closest to your location
4. Wait for project to initialize

### 2. Create Database Tables

Run these SQL commands in Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'viewer' CHECK (role IN ('admin', 'manager', 'viewer')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pages table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'archived')),
  owner_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- KPI data table
CREATE TABLE kpi_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric TEXT NOT NULL CHECK (metric IN ('revenue', 'users', 'projects', 'streams')),
  value NUMERIC NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_published ON pages(published);
CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_kpi_metric ON kpi_data(metric);
CREATE INDEX idx_kpi_timestamp ON kpi_data(timestamp);
```

### 3. Enable Row Level Security (Optional but Recommended)

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_data ENABLE ROW LEVEL SECURITY;

-- Create policies (example for users)
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    auth.jwt() ->> 'role' = 'admin'
  );
```

### 4. Get Credentials

1. In Supabase dashboard, go to Settings → API
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Public Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_KEY` (keep secure!)

## Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
SUPABASE_SERVICE_KEY=eyJhbGc...your-service-key-here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Production (for Vercel)
# NEXT_PUBLIC_API_URL=https://sevco-mission-control.vercel.app
```

## Building for Production

```bash
# Build optimized production bundle
npm run build

# Test production build locally
npm start

# Build and push to GitHub
git add -A
git commit -m "Build for production"
git push origin main
```

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration (Recommended)

1. Push code to GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
   - `NEXT_PUBLIC_API_URL` (set to your production domain)

6. Click "Deploy"

### Option 3: Custom Domain (sevco.us)

1. After Vercel deployment succeeds
2. In Vercel dashboard → Settings → Domains
3. Add custom domain: `sevco.us`
4. Add DNS records as shown in Vercel
5. Update `NEXT_PUBLIC_API_URL` environment variable to `https://sevco.us`

## Post-Deployment

### 1. Verify Deployment

```bash
# Check deployment is live
curl https://sevco.us/admin
curl https://sevco.us/api/users

# Should return 200 OK
```

### 2. Set Up Monitoring

- Vercel: Analytics & Monitoring dashboard
- Supabase: Database usage, API stats
- Google Analytics (optional)

### 3. Configure Supabase Auth

1. Go to Supabase → Authentication → Providers
2. Enable email/password authentication
3. (Optional) Enable OAuth:
   - Google OAuth
   - GitHub OAuth

### 4. Create Initial Admin User

```sql
-- Insert initial admin user (replace values)
INSERT INTO users (email, name, role) VALUES
  ('admin@sevco.us', 'Admin User', 'admin'),
  ('peter@sevco.us', 'Peter', 'admin'),
  ('seve@sevco.us', 'Seve', 'admin');
```

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Deployment Stuck

```bash
# Check build logs in Vercel dashboard
# Common issues:
# - Missing environment variables
# - TypeScript errors
# - Package version conflicts
```

### Database Connection Error

```
Error: NEXT_PUBLIC_SUPABASE_URL is not set
```

**Solution**: Check `.env.local` and Vercel environment variables are set correctly.

### 404 on Pages

```
Routes not found: /admin/users, /admin/pages, etc.
```

**Solution**: Make sure deployment includes all files:
```bash
git status
git add -A
git commit -m "Add missing files"
git push
```

## Performance Optimization

### Images
- Use Next.js `<Image>` component
- Enable Vercel Image Optimization

### Database
- Add indexes (already included in schema)
- Implement query pagination
- Cache KPI data (implement Redis later)

### Frontend
- Enable ISR (Incremental Static Regeneration) for pages
- Implement code splitting for charts
- Use `next/dynamic` for heavy components

## Security Checklist

- [ ] Environment variables not committed to git
- [ ] `.env.local` in `.gitignore`
- [ ] RLS policies enabled on Supabase
- [ ] API routes validate input
- [ ] Rate limiting implemented (ready to add)
- [ ] CORS configured for Supabase
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Regular backups of Supabase database

## Database Backups

### Supabase Automatic Backups
- Go to Supabase Dashboard → Settings → Database
- Backups are automatically created daily
- Retention: 7 days free, 30+ days with plan upgrade

### Manual Backup
```bash
# Export database (if needed)
pg_dump "postgresql://user:password@db.supabase.co" > backup.sql
```

## Monitoring & Maintenance

### Daily Checks
- Monitor error logs in Vercel
- Check Supabase API usage
- Review user activity in dashboard

### Weekly Checks
- Review database performance
- Check backup status
- Test authentication flow

### Monthly Tasks
- Update dependencies: `npm update`
- Review and optimize slow queries
- Plan feature releases

## Scaling (Future)

When traffic increases:

1. **Database**: Upgrade Supabase plan
2. **Storage**: Implement S3 for file uploads
3. **Caching**: Add Redis for KPI data
4. **CDN**: Vercel CDN (automatic)
5. **API**: Add rate limiting

## Support & Issues

- GitHub Issues: [Project Issues](https://github.com/yourusername/sevco-web/issues)
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)

## Contact

For deployment questions, contact: peter@sevco.us

---

**Last Updated**: March 22, 2026
**Version**: 1.0.0
