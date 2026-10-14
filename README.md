# Rune Crystal Defense

A landscape tower-defense game: auto-fighting heroes defend a crystal. Three modes (Classic, Magic NoNo and the late-game Arcane Siege), a skill tree, level 10 hero skills and revive bars. Installable as a PWA and works offline after the first visit.

## Files
- `index.html` - the whole game
- `manifest.json`, `sw.js`, `icons/`, `screenshots/` - PWA files
- `.nojekyll` - tells GitHub Pages to serve files as-is

## Publish on GitHub Pages
1. Create a repo and upload everything in this folder to the root of the `main` branch (keep the `icons` and `screenshots` folders).
2. Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Your URL will be `https://<user>.github.io/<repo>/` (HTTPS is required for PWABuilder).

## Package with PWABuilder
1. Open pwabuilder.com and paste your GitHub Pages URL.
2. The report should show the manifest, service worker and icons as passing.
3. Choose Package for Stores (Android / Windows / iOS) and download.

## Updating the game later
Replace `index.html`, then change the version in `sw.js` (`const V='rune-defense-v8'` to `v9`, and so on) so installed copies refresh their cache. Page loads are network-first, so players normally get the new version on their next online visit.

## Notes
- Progress is saved in each player's browser (local storage), not on a server.
- The Silkscreen pixel font loads from Google Fonts and is cached after the first online visit. Without it the game falls back to a monospace font.
