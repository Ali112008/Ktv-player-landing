---
Task ID: 1
Agent: Main Agent
Task: Fix Light/Dark theme toggle - background colors not changing when switching themes

Work Log:
- Read all project files: page.tsx, globals.css, layout.tsx, useTheme.tsx, ThemeToggle.tsx, ParticleBackground.tsx, AutoScrollGallery.tsx, FloatingWhatsApp.tsx
- Identified root cause: `@theme inline` in globals.css was causing Tailwind v4 to INLINE color values directly into utility classes instead of using CSS variable references
- This meant the `[data-theme="light"]` CSS variable overrides had NO EFFECT
- The only reason the Navbar changed was because of an explicit `[data-theme="light"] nav` CSS override that bypassed Tailwind

Fixes Applied:
1. globals.css: Changed `@theme inline` to `@theme`
2. globals.css: Added light theme override for gradient-text-red
3. ParticleBackground.tsx: Made particles theme-aware with MutationObserver
4. layout.tsx: Added inline script to apply saved theme before paint
5. useTheme.tsx: Ensured data-theme attribute is always set on mount

Stage Summary:
- Root cause was `@theme inline` preventing CSS variable overrides from working
- Changed to `@theme` which generates var() references in utility classes
- Verified build output confirms CSS variables are now used
- All sections should now properly switch backgrounds when toggling themes
