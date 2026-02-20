# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a component library for Techspirex, a digital agency. It contains standalone HTML/CSS components designed to be integrated into a WordPress website. Each component is self-contained with inline styles and can be copied directly into the site.

## Architecture

### Component Structure

Components are organized by purpose:
- `header_footer/` - Navigation header and service-specific page layouts
- `homepage/` - Homepage sections (hero, about, services, team, testimonials, contact)
- `services/` - Service-specific hero sections for each offering
- `exp_components/` - Experimental components organized by page type
- `new_services_page/` - Alternative services page layouts

### Technology Stack

- **Pure HTML/CSS** - No build system, bundlers, or frameworks
- **Self-contained components** - Each `.html` file includes its own `<style>` block
- **No external dependencies** - All styles are inline, no separate CSS files
- **Modern CSS** - Uses CSS Grid, Flexbox, CSS variables, backdrop-filter, animations
- **Google Fonts** - Primary fonts: Inter, Outfit, Poppins, Fira Code

### Integration Pattern

Components are designed to be copied into WordPress pages. Image URLs reference `https://techspirex.com/wp-content/uploads/` indicating WordPress media library integration.

## Design System

### Brand Colors

```css
--tsp-primary: #453478;        /* Brand purple */
--tsp-primary-light: #6a4bc4;  /* Lighter purple for hovers */
--tsp-accent: #00d2ff;         /* Cyan accent */
--tsp-bg-dark: #0f0f12;        /* Dark background */
--tsp-text-muted: #94a3b8;     /* Muted text */
```

### Naming Conventions

- **CSS Variables**: `--tsp-*` (tsp = Techspirex)
- **CSS Classes**: `.tsp-*` prefix for all component classes
- **Component Sections**: Use semantic names (`.tsp-hero`, `.tsp-nav-container`, `.tsp-card`)

### Typography

- **Headings**: Outfit (800 weight), large sizes (48-72px), tight line-height (1.05-1.1)
- **Body Text**: Inter (400-600 weight), 16-18px, comfortable line-height (1.6-1.7)
- **Buttons**: Outfit (600-700 weight), 14-16px
- **Code**: Fira Code (monospace fallback)

### Visual Style

- **Glassmorphism**: `backdrop-filter: blur(20px)` with semi-transparent backgrounds
- **Rounded corners**: Pill shapes (50-100px) for buttons/badges, 12-32px for cards
- **Shadows**: Layered box-shadows for depth (`0 10px 30px rgba(0,0,0,0.3)`)
- **Animations**: Subtle float/hover effects, 0.3-0.5s transitions
- **Responsive**: Mobile breakpoints at 900px and 480px

## Creating New Components

When creating new components, follow these patterns:

1. **Self-contained structure**: Include all styles in a `<style>` block at the top
2. **Use CSS variables**: Define component-specific variables in `:root`
3. **Prefix all classes**: Use `.tsp-*` to avoid conflicts
4. **Dark theme default**: Most components use dark backgrounds (#0f0f12)
5. **Responsive design**: Include mobile breakpoints (@media queries)
6. **Semantic HTML**: Use proper HTML5 elements (section, header, nav, etc.)

### Component Template Pattern

```html
<style>
    :root {
        --tsp-primary: #453478;
        --tsp-accent: #00d2ff;
        /* Component-specific variables */
    }

    .tsp-component-name {
        /* Base styles */
    }

    /* Responsive */
    @media (max-width: 900px) { }
    @media (max-width: 480px) { }
</style>

<section class="tsp-component-name">
    <!-- Component markup -->
</section>
```

## Version Control

This repository uses Git with a simple workflow:
- Main branch: `main`
- Commits follow descriptive patterns: "Added social cta", "Setup main hero section"
- No formal branching strategy - direct commits to main for component updates

## Notes

- No build, test, or lint commands - components are static HTML/CSS
- Components are developed individually and tested by copying into WordPress
- Image assets are hosted on the WordPress site, not in this repository
- The `exp_components/temp_web_dev/.agents/` directory contains Claude Code skill configurations (can be ignored for component development)
