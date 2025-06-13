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

## [1.1.0] - Visual Refinements (Colours v2.0)
**Date**: 2025-01-27
**Status**: ✅ Completed

### Added
- **Brand Identity Integration**
  - Official Arami logo integration in header
  - Responsive logo positioning with proper spacing
  - Enhanced brand recognition and visual consistency

### Changed
- **Color Palette (Colours v2.0)**
  - Updated `bg-01` from `#0D0D0D` to `#201C2E` (deep purple)
  - Updated `bg-02` from `#1A1A1E` to `#2F2B40` (Arami brand purple)
  - Updated `accent-lilac` from `#BB9CF6` to `#8B7EE6` (logo-inspired purple)
  - Retained `accent-moss` `#5CC6A4` for contrast and functional use
  - Updated `gradient-pulse` to use new accent-lilac value

- **Visual Design Improvements**
  - Enhanced brand consistency across all components
  - Improved color harmony inspired by official Arami logo
  - Better visual hierarchy with refined purple tones
  - Maintained accessibility and contrast ratios

### Technical Details
- **Files Modified**
  - `tailwind.config.js` - Updated color tokens and gradient
  - `src/App.tsx` - Added header with logo integration
  - Documentation files updated to reflect changes

### Design Philosophy
- Aligned visual identity with official Arami branding
- Maintained existing functionality while enhancing aesthetics
- Preserved responsive design and accessibility standards
- Created cohesive brand experience from logo to color palette

### Notes
- Logo automatically scales responsively across all device sizes
- New color scheme maintains excellent contrast ratios
- All existing animations and interactions preserved
- Brand consistency now established for future development

## [1.2.0] - Hero Section Enhancements
**Date**: 2025-01-27
**Status**: ✅ Completed

### Added
- **Hero Section Call-to-Action**
  - Primary "Join the Waitlist" button prominently displayed in hero section
  - Smooth scroll functionality to form section when clicked
  - Supporting text with value proposition ("Get early access • No spam, ever")
  - Enhanced button styling with shadow effects and hover animations

- **Improved Logo Visibility**
  - Fixed header with enhanced backdrop blur and border
  - Increased logo size from h-12 to h-16 for better visibility
  - Added drop shadow effect to logo for better contrast
  - Sticky header ensures brand visibility throughout page scroll

### Changed
- **Header Design**
  - Changed from absolute to fixed positioning for persistent visibility
  - Added semi-transparent background with backdrop blur effect
  - Enhanced padding and spacing for better visual hierarchy
  - Added subtle border for definition against hero background

- **Hero Section Layout**
  - Added prominent CTA button above value propositions
  - Adjusted padding-top to accommodate fixed header
  - Improved visual flow from headline to action
  - Enhanced user engagement with immediate call-to-action

- **Form Section**
  - Added unique ID for smooth scroll targeting
  - Maintained existing functionality and styling
  - Improved accessibility with proper scroll behavior

### Technical Details
- **Smooth Scrolling**: Implemented native `scrollIntoView` with smooth behavior
- **Fixed Header**: Enhanced with backdrop blur and transparency effects
- **Responsive Design**: All enhancements maintain mobile-first approach
- **Performance**: No additional dependencies required

### User Experience Improvements
- **Immediate Action**: Users can join waitlist without scrolling
- **Brand Recognition**: Logo remains visible throughout interaction
- **Clear Navigation**: Smooth scroll provides seamless user flow
- **Visual Hierarchy**: Enhanced prominence of primary action

### Files Modified
- `src/App.tsx` - Added hero CTA, improved header, smooth scroll functionality
- `changelog.md` - Updated with enhancement details

### Notes
- Hero CTA reduces friction for immediate user engagement
- Fixed header ensures consistent brand presence
- Smooth scroll enhances user experience and accessibility
- All existing functionality preserved and enhanced

## [1.2.1] - Header Overlap Fix
**Date**: 2025-01-27
**Status**: ✅ Completed

### Fixed
- **Header Overlap Issue**
  - Fixed header overlapping form section when scrolling from hero CTA
  - Updated scroll behavior to account for fixed header height (88px)
  - Replaced `scrollIntoView` with `window.scrollTo` for precise positioning
  - Improved user experience with proper scroll offset calculation

### Technical Details
- **Scroll Offset**: Added 88px offset to account for header height and padding
- **Smooth Scrolling**: Maintained smooth scroll behavior with precise positioning
- **Cross-browser Compatibility**: Used standard `window.scrollTo` API

### Files Modified
- `src/App.tsx` - Updated scrollToForm function with proper offset calculation

### Notes
- Form section now displays properly below fixed header
- Smooth scroll animation preserved with accurate positioning
- No visual overlap between header and form content