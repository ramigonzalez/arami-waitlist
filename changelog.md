# Changelog - Waitlist Application

## [1.0.0] - Initial Release
**Date**: 2025-01-27
**Status**: ✅ Completed

### Added
- **Project Documentation**
  - Created `project-phases.md` with detailed task breakdown
  - Set up `memory.md` for task tracking
  - Initialized `changelog.md` for change logging

- **Core Application Features**
  - Responsive hero section with fixed copy as specified
  - Email capture form with required validation
  - Tier preference radio buttons (Voice-Only Free / Full Avatar Premium)
  - Primary CTA button with "Join the Waitlist" label
  - Teaser price badge with introductory pricing disclaimer
  - Social proof line with beta user count
  - Compliance footer with privacy link

- **Visual Design**
  - Custom Tailwind configuration with specified design tokens
  - Dark gradient theme (bg-01: #0D0D0D, bg-02: #1A1A1E)
  - Accent colors (accent-lilac: #BB9CF6, accent-moss: #5CC6A4)
  - Custom fonts (DM Sans for display, Inter for body)
  - Custom pulse animation on primary CTA (600ms ease-out with lilac glow)

- **Supabase Integration**
  - Database client setup with environment configuration
  - waitlist_subscribers table structure (id, email, tier, created_at)
  - Insert functionality with duplicate email handling
  - Error handling for database operations

- **Interactive Components**
  - Success modal with "You're in!" headline
  - Tweet share functionality
  - Form validation and error states
  - Responsive design for all device sizes

- **Analytics Integration**
  - Google Tag Manager event tracking
  - Custom dataLayer pushes for 'join_waitlist' and 'tier_selected' events
  - Tier preference tracking

### Technical Details
- **Framework**: React 18.3.1 + TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **Backend**: Supabase with @supabase/supabase-js v2
- **Icons**: Lucide React
- **Build Tool**: Vite

### Dependencies Added
```json
{
  "@supabase/supabase-js": "^2.45.4"
}
```

### Files Modified
- `package.json` - Added Supabase dependency
- `tailwind.config.js` - Added custom design tokens and animations
- `src/App.tsx` - Complete waitlist application implementation
- `index.html` - Updated title and meta information

### Notes
- Application ready for Supabase connection
- All Phase 1 requirements implemented as specified
- Custom animations working with Tailwind @keyframes
- Responsive design tested across breakpoints