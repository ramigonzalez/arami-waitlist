# Arami Waitlist

<div align="center">
  <img src="public/arami-logo.png" alt="Arami Logo" width="200"/>
  
  **Daily three-minute voice ritual guided by an empathic AI avatar**
  
  [![Built with Bolt.new](https://img.shields.io/badge/Built%20with-Bolt.new-6B46C1)](https://bolt.new)
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.45.4-3ECF8E?logo=supabase)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
</div>

## 🌟 Overview

Arami is a revolutionary wellness application that provides daily three-minute voice rituals guided by an empathic AI avatar. This waitlist application captures early interest and manages user registration for the upcoming launch.

### Key Features

- **🎯 Tier-based Registration**: Voice-only free tier and full avatar premium tier
- **🔗 Referral System**: Built-in referral tracking with unique codes
- **⚡ Early Bird Access**: Priority access for early supporters
- **📧 Email Integration**: Automated welcome emails and notifications
- **📱 Responsive Design**: Optimized for all devices and screen sizes
- **🔒 Privacy-First**: Secure data handling with Supabase backend
- **📊 Analytics Ready**: Google Tag Manager integration for tracking

## 🚀 Live Demo

Visit the live application: [Arami Waitlist](https://your-domain.com)

## 🛠️ Tech Stack

### Frontend

- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.2** - Fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend

- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Deno Edge Functions** - Serverless functions for business logic
- **PostgreSQL** - Robust relational database

### DevOps & Tools

- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Supabase account** and project
- **Git** for version control

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/arami-waitlist.git
cd arami-waitlist
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase Setup

#### Database Migrations

Run the included migrations to set up your database:

```bash
# Using Supabase CLI
supabase db push

# Or manually run the migrations in order:
# 1. supabase/migrations/20250612235804_tender_smoke.sql
# 2. supabase/migrations/20250613182648_gentle_tower.sql
# 3. supabase/migrations/20250613190426_wispy_trail.sql
```

#### Edge Functions

Deploy the Supabase Edge Functions:

```bash
supabase functions deploy waitlist-signup
supabase functions deploy eleven-labs-signed-url
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🗄️ Database Schema

### Tables

#### `waitlist_subscribers`

- `id` (bigint, primary key) - Unique identifier
- `email` (text, unique) - Subscriber email address
- `tier` (text) - Selected tier ('free' or 'premium')
- `ref_code` (text, unique) - Unique referral code
- `ref_by` (text, nullable) - Referrer's code
- `referrals_count` (integer) - Number of successful referrals
- `early_bird` (boolean) - Early bird status
- `created_at` (timestamptz) - Registration timestamp

#### `waitlist_meta`

- `id` (bigint, primary key)
- `early_bird_cap` (integer) - Maximum early bird slots
- `total_subscribers` (integer) - Total subscriber count

### Views

#### `v_waitlist_rank`

- Provides ranking and position information for non-early-bird subscribers

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**

   ```bash
   npm install -g vercel
   vercel
   ```

2. **Environment Variables**
   Add the following in Vercel dashboard:

   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

3. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Netlify

1. **Deploy from Git**

   - Connect your repository
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**
   Set the same environment variables in Netlify dashboard

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist folder to your hosting provider
```

## 📊 Analytics Integration

The application includes Google Tag Manager integration for tracking user behavior:

### Events Tracked

- `join_waitlist` - When user successfully joins
- `tier_selected` - When user selects a tier
- Page views and user engagement

### Setup GTM

1. Add your GTM container ID to `index.html`
2. Configure triggers and tags in GTM dashboard
3. Set up conversion tracking as needed

## 🔧 Configuration

### Tailwind Configuration

Custom design tokens are defined in `tailwind.config.js`:

```javascript
colors: {
  'bg-01': '#201C2E',      // Deep purple background
  'bg-02': '#2F2B40',      // Secondary background
  'primary-base': '#8B7EE6', // Primary brand color
  'accent-300': '#5CC6A4',   // Accent color
  // ... more colors
}
```

### Custom Animations

- `pulse-btn` - Custom button pulse animation
- `gradient-pulse` - Gradient text animation
- Smooth scroll behaviors

## 🧪 Testing

### Run Linting

```bash
npm run lint
```

### Manual Testing Checklist

- [ ] Email validation works correctly
- [ ] Duplicate email detection
- [ ] Tier selection functionality
- [ ] Referral code validation
- [ ] Success modal display
- [ ] Responsive design on all devices
- [ ] Analytics events firing

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Email validation** on both client and server
- **Rate limiting** on Edge Functions
- **CORS protection** for API endpoints
- **Input sanitization** for all user inputs

## 📱 Browser Support

- **Chrome** (latest 2 versions)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 API Documentation

### Waitlist Signup Endpoint

**POST** `/functions/v1/waitlist-signup`

```json
{
  "email": "user@example.com",
  "tier": "free",
  "ref_by": "ABC123"
}
```

**Response:**

```json
{
  "id": 123,
  "email": "user@example.com",
  "tier": "free",
  "ref_code": "DEF456",
  "early_bird": true,
  "position": null
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Issues**

   - Verify environment variables are set correctly
   - Check Supabase project URL and anon key
   - Ensure RLS policies are properly configured

2. **Build Failures**

   - Clear node_modules and reinstall dependencies
   - Check for TypeScript errors
   - Verify all imports are correct

3. **Email Not Sending**
   - Check Supabase email configuration
   - Verify SMTP settings
   - Check Edge Function logs

## 🙏 Acknowledgments

- Built with [Bolt.new](https://bolt.new) for rapid development
- Powered by [Supabase](https://supabase.com) for backend infrastructure
- Design inspiration from modern wellness applications
- Icons by [Lucide](https://lucide.dev)

---

<div align="center">
  <p>Made with ❤️ for the Arami community</p>
  <p>
    <a href="https://arami.space">Website</a> •
    <a href="https://twitter.com/aramiapp">Twitter</a> •
    <a href="https://linkedin.com/company/arami">LinkedIn</a>
  </p>
</div>
