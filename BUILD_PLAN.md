# Build plan

Ten steps. Each ends with something Alex can click or run, and each has a done-check. Order follows the brief's suggested build order with one change: the iPhone download spike (step 3) moves ahead of everything that depends on it, because the brief's assumption that the share sheet into onX "works smoothly" is unverified and it decides what the shared page's buttons are.

Rule for every step: finish the done-check, update `STATUS.md`, log it, commit. No step starts until the previous one's done-check passes.

## 1. Scaffold and deploy

- `create-next-app` with TypeScript, App Router, CSS Modules, no Tailwind.
- `tokens.css` with color, spacing, type, and radius custom properties, light and dark via `prefers-color-scheme`. Alex reviews the tokens.
- Landing page shell: wordmark placeholder, one paragraph, a Create button that goes nowhere yet.
- Add `.next/` to `.gitignore`. MIT `LICENSE`. Minimal `README.md`.
- Connect the GitHub repo to Vercel, deploy.
- **Done:** the `vercel.app` URL loads the landing page on Alex's phone and laptop in light and dark.

## 2. Map renders

- Alex creates the MapTiler account; key goes into Vercel env and `.env.local`.
- MapLibre map component with MapTiler Outdoor and Satellite, a style toggle, MapTiler attribution, opens on Colorado.
- **Done:** both styles load on phone and laptop, toggle works, attribution shows.

## 3. iPhone download spike

- A route handler serves a sample GPX with `Content-Disposition: attachment` and the GPX MIME type.
- A test page with three buttons: Download GPX, Send to GPS app (Web Share API with a file), Open in onX (any deep link found, if one exists).
- Alex tests each button from Safari, from Discord's in-app browser (link pasted in a DM), and imports the result into onX. Also one Gaia import.
- **Done:** a table in `DECISIONS.md` under Export: each path, what happened, which buttons the shared page will show.

## 4. Upload a GPX or KML

- Drop zone and file picker, 10 MB limit, GPX and KML only.
- Parse with `@tmcw/togeojson`, pick or join tracks when a file has several, simplify with Turf, fit the map to the line, show distance in miles.
- Uploaded waypoints appear as pins.
- **Done:** an onX export displays with the right distance (checked against onX's own number) and its pins.

## 5. Draw and edit

- Terra Draw line mode: click to add, drag to move, click the line to insert, undo and redo (keys and buttons), clear.
- Waypoints: add by click, edit name and note, delete.
- Distance updates live. Drafts autosave to the browser.
- **Done:** draw a route with three waypoints, refresh, everything is still there; edit an uploaded route the same way.

## 6. Save and share

- Neon database from the Vercel dashboard. Drizzle schema: `routes` (id, name, description, geometry as GeoJSON, difficulty, drive time, TOR URL, location text, event date, meeting point, visibility, owner_id, duplicated_from, deleted_at, timestamps), `waypoints`, `counters`, `edit_tokens` (hashed).
- Club passphrase gate on the create page, remembered per browser. Passphrase and admin passphrase in Vercel env.
- Save returns the share link, the edit link, and a QR code of the share link.
- Edit link opens the editor with the route loaded; details-only editing on narrow screens.
- **Done:** a saved route opens at `/r/<id>`; the edit link opens the editor on Alex's phone and a detail change shows on the share page.

## 7. Shared route page

- Mobile-first: map (topo default, satellite toggle), stats row (distance, difficulty, drive time, elevation when available), name, description, event block, waypoints list.
- Actions per step 3's findings: Send to GPS app, Download GPX, Download KML, Navigate (Apple Maps and Google Maps), Open in TrailsOffroad when set.
- GPX and KML writers with Vitest tests (valid XML, `trk` plus `wpt`, round-trips through `@tmcw/togeojson`).
- onX import help text, three or four lines.
- View and download counters.
- **Done:** a route saved from an onX export downloads and imports into onX on Alex's iPhone with the same line and pins; one Gaia import succeeds.

## 8. Discord card

- Open Graph and Twitter card tags on the route page, rendered on the server.
- Image route: MapTiler Static Map from the simplified polyline with start and end markers, wordmark composited with `next/og`, cached per route version.
- Second MapTiler key, server-only (`MAPTILER_SERVER_KEY`, no `NEXT_PUBLIC_`, stored as sensitive in Vercel), because the browser key is origin-locked and server requests carry no Origin header (confirmed 403 on 2026-11-08). Used here and for geocoding in step 9.
- Generate the card for one real route in satellite and topo, DM both to Alex. Alex picks.
- `noindex` on every route page.
- **Done:** the card renders in Discord light and dark with name, distance, location, difficulty, and the chosen basemap.

## 9. Details and admin

- Difficulty legend. Drive-time estimate from distance and difficulty, with override.
- Elevation gain and loss via Open Topo Data on save, smoothed; "unknown" when the lookup fails.
- Location text via MapTiler reverse geocoding on save, with override.
- Event date and meeting point pin; past-event state (muted date, Navigate falls back to the trailhead).
- Duplicate action. Soft delete with the "removed" page and 30-day restore.
- Admin page behind its passphrase: list, edit, hide, delete, restore.
- Rate limit on save and upload.
- **Done:** every field round-trips from editor to share page to Discord card; a deleted route shows the removed page and comes back from admin.

## 10. Polish

- Sticky action bar on the shared page, dark theme pass, large tap targets.
- Loading and error states tested with network throttling.
- MapTiler and Neon usage alerts.
- Playwright smoke test: create, save, open share page, download GPX.
- README with setup and env vars.
- Alex's design pass starts here on real screens.
- **Done:** Alex posts a Trailform link for a real event and runs it.
