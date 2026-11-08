# Decisions

Every decision made for Trailform Routes, with the reason. From the interview held 2026-11-05 to 2026-11-07. `BRIEF.md` is the starting point; where this file disagrees with the brief, this file wins. Items marked **(Claude's call)** were chosen by Claude under the brief's "you choose the stack" instruction and stand unless Alex objects.

## Changed from the brief

- **Creation is behind a club passphrase**, not open to anyone. Only Alex creates routes at first, and an open create page invites spam with no accounts to trace it. Viewing stays open.
- **Edit rights travel in a secret edit link**, in addition to the browser token. Alex wants to fix route details from a phone, and a browser-only token can't leave the laptop.
- **Waypoints are in the MVP** (add, edit, delete). The brief listed them as a future phase. Alex chose this over Claude's read-only recommendation because onX exports carry pins and he wants to place his own.
- **Elevation gain and loss are required stats**, not a nice-to-have. Alex wants them for the "look, then decide" viewer. This adds an elevation data source.
- **Gaia GPS is test-only.** Nobody in the group uses it. We import one file once as a second validity check and write no Gaia help text.
- **TrailsOffroad gets a link field.** TOR can't import GPX, so a route can carry an optional TOR URL shown as "Open in TrailsOffroad". That makes one link useful for all three camps.
- **Meeting point is a pin**, and Navigate goes to it when set and upcoming, otherwise to the route start. Groups meet at gas stations, not trailheads.
- **Drive time is estimated with an override.** The brief had no drive time. The app guesses from distance and difficulty; the creator corrects it.

## Goals and success

- **Success for v1:** one real event runs on a Trailform link. onX users import the route; everyone else views it and navigates to the meeting point.
- **Creators in v1:** Alex only. Reason: it lets the creation flow ship rougher while the shared page and the Discord card get the polish, since those are what members judge.
- **Usage measurement:** per-route view and download counters (GPX and KML counted separately) in our own database. Reason: no third-party tracking, no cookie banner, and it answers "did anyone download it" exactly.
- **Deadline:** none. Build at learning pace.

## Users and flows

- **Route sources:** onX exports and routes drawn from scratch. Both upload and draw are first-class. No recorded tracks, so no track cleanup beyond simplification.
- **GPS apps in the group:** onX Offroad, TrailsOffroad, and Apple or Google Maps only.
- **Phones:** mostly iPhone. iOS Safari, Discord's in-app browser, and the share sheet are tested first.
- **Viewer goal:** look, then decide. The shared page leads with map and stats; actions sit below or in a sticky bar.
- **Phone editing:** details only (name, description, date, meeting point, difficulty, drive time, TOR link). Geometry edits are laptop only. Reason: touch drawing roughly doubles the editor work for a flow Alex rarely needs.
- **Creator to onX handoff:** the "route saved" screen shows a QR code that opens the share page on the phone. On the phone, "Send to GPS app" uses the Web Share API with the GPX file attached so onX appears in the share sheet. Falls back to Download GPX if Safari or onX refuses the file. Verified on Alex's iPhone in build step 3 before the shared page is designed.

## Route data

- **Fields:** name (required), description, event date, meeting point (pin plus label), difficulty 1 to 10, estimated drive time, TrailsOffroad URL. Computed: distance, elevation gain and loss, location text.
- **Difficulty scale:** 1 to 10 with a short legend on the shared page. Reason: it matches the scale members already know from TrailsOffroad. Verify TOR's scale wording before writing the legend.
- **Drive time:** estimated from distance and difficulty, creator can override. The formula is ours to tune; the override exists because off-road pace varies too much for a formula to be trusted alone.
- **Elevation:** total gain and loss in v1, high point if cheap. Profile chart is a later item.
- **Location text:** reverse-geocoded from the route start on save (nearest town and state), creator can override. Reason: nearest-town lookups misfire in remote areas.
- **Re-runs:** a Duplicate action copies the route to a new link with a new date and records `duplicated_from`. Reason: old Discord posts keep showing the event they were posted for. The future library groups duplicates.
- **Waypoints:** name plus optional note, one pin style. Categories and icons later. Exported as GPX `wpt` and KML placemarks.
- **Units:** miles and feet.

## Editing and ownership

- **Edit access:** saving returns a share link and a secret edit link that carries the token. The token is also kept in the creating browser. Losing the edit link means losing edit rights unless admin steps in.
- **Admin:** one page behind a passphrase stored as a Vercel environment variable. Lists every route with edit, hide, delete, restore. Reason: covers lost edit links and moderation without accounts.
- **Deletes are soft.** The link shows "This route was removed". Restorable from admin for 30 days, then erased.
- **Expiration:** never. Hundreds of routes is tiny data, old links keep working, and every route feeds the future library.

## Sharing, privacy, abuse

- **Creation gate:** the create page asks once for a club passphrase and remembers it in that browser. Alex hands the passphrase to organizers when ready.
- **Search engines:** every route page is no-index. Reason: a page can say where and when a group of trucks will gather.
- **Library flag:** each route stores `visibility`, default `link-only`. When the library ships, routes are opted in. No route created today gets listed by surprise.
- **Past events:** the date shows as past ("Ran on 2027-05-14"), the meeting point leaves the main actions, Navigate goes to the trailhead.
- **Limits (Claude's call):** 10 MB upload, GPX and KML only, parsed server-side with the same parser as the client, basic rate limit on save and upload.

## Discord card

- **Text:** title is the route name. The line under it carries distance, location, and difficulty, for example "12.4 mi near Idaho Springs, CO · Difficulty 5/10". No event date (Discord caches cards, so a date goes stale), no elevation or drive time (truncation on phones).
- **Image:** the route line on the map with start and end markers and a small Trailform Routes wordmark in a corner. No stats baked in; Discord prints them as text above the image.
- **Basemap for the card:** undecided on purpose. In build step 8, generate the card for a real route in satellite and topo, DM both to Alex on Discord, and pick by eye in light and dark themes.
- **Discord testing:** DMs to self.

## Map and drawing

- **Drawing:** click to add, drag to move, click a line to insert a point, undo and redo (Cmd+Z, Shift+Cmd+Z, plus buttons), clear. No freehand, no snap-to-trail. Reason: predictable, and the base snap-to-trail plugs into later.
- **Uploaded routes** are simplified on upload to an editable point count, shape kept within a few meters, then edited like drawn routes. Downloads carry the simplified line, which is also a smaller file for phones.
- **Route shape:** one continuous line. A multi-track file means picking one track or joining them in order.
- **Styles:** topo/outdoor and satellite, toggle on both pages. The shared page opens on topo because vector tile data is far lighter than satellite imagery on weak signal. The editor opens on Colorado.
- **Drafts** autosave in the browser so a refresh doesn't lose a drawing.

## Export

- **File names:** route name slug, `red-cone-pass.gpx` and `red-cone-pass.kml`.
- **GPX structure (Claude's call):** the line is a `trk` (apps follow tracks exactly, unlike `rte`), waypoints are `wpt`. Confirmed in the onX import test in step 7.
- **Navigate:** Apple Maps and Google Maps, both offered.
- **Test device:** Alex's iPhone with a paid onX subscription.

## Visual design

- **Brand:** its own identity, designed by Alex. No club assets, since the app is Alex's, not the club's.
- **Direction:** quiet, map-first. Neutral surfaces, one strong accent for the route line and primary button. Reason: easiest to keep high-contrast in sun and fits the "one job" principle.
- **Theme:** light and dark following the system setting. The light theme is tuned for direct sun: high-contrast text, no thin gray type.
- **Design flow:** Claude builds each screen functional and plain on design tokens. Alex designs on top afterward, once real behavior (map controls, iOS download quirks) is known. Alex has input on the tokens.
- **Hands-on:** Claude writes the code and explains each step and concept. Alex steers.
- **CSS:** CSS Modules with modern CSS (native nesting, custom properties). No Sass, no Tailwind. Reason: reads like the SCSS Alex knows with no extra build step, and it's built into Next.js.

## Tech stack

Approved by Alex 2026-11-07: Next.js on Vercel, Neon + Drizzle, MapTiler. The rest is Claude's call. Free-tier figures below were checked against provider pages on 2026-11-07.

- **Next.js (App Router) + TypeScript, hosted on Vercel Hobby.** Discord needs Open Graph tags rendered on the server, downloads need server routes with file headers, and the preview image is generated server-side. One framework does all three. Also the stack Alex wants to learn. Vercel Hobby is free for non-commercial use: 100 GB fast data transfer, 1,000,000 function invocations, 1,000,000 CDN requests per month. Exceeding a limit pauses the feature for 30 days rather than billing.
- **MapLibre GL JS** for the map. Open source, vector tiles, same engine as gpx.studio.
- **MapTiler, one API key** for the Outdoor and Satellite styles, Static Maps (card image), reverse geocoding, and terrain fallback. Free plan: 100,000 API requests and 5,000 sessions per month, 1,000 search sessions for geocoding, MapTiler logo required on the map, personal and non-commercial use. One static image costs 15 requests, so card images are cached per route version. If the quota is exceeded the service pauses until the next month, which is why usage alerts are in step 10 and the $25 ceiling exists.
- **Neon Postgres + Drizzle ORM.** Free plan: 1 GB storage and 100 compute hours per project, suspends after 5 minutes idle and wakes automatically. Postgres so the future library can use PostGIS. Drizzle over Prisma because it reads like SQL and is easier to learn from. Rejected Supabase: its free plan may pause projects after 7 days of low activity and restoring is manual, which would break an old route link during a quiet month.
- **Discord login later:** Auth.js with the Discord provider. Free, no vendor. The routes table carries a nullable `owner_id` from day one so claiming works.
- **Preview image:** MapTiler Static Maps renders the route from an encoded, simplified polyline; `next/og` composites the wordmark. Cached per route version with long cache headers.
- **Elevation:** on save, sample the line to about 200 points and query Open Topo Data's `ned10m` dataset (10 m resolution, continental US) server-side. Public API limits: 100 locations per request, 1 request per second, 1,000 requests per day. Smooth before summing so noise doesn't inflate gain. Fallback is MapTiler terrain tiles. If both prove unreliable, show "unknown" rather than a wrong number.
- **Geometry utilities:** `@tmcw/togeojson` (GPX and KML to GeoJSON), Turf `length` and `simplify`, hand-written GPX and KML writers so the output is fully under our control for the onX test.
- **Drawing:** Terra Draw with its MapLibre adapter for line drawing, vertex drag, and midpoint insert. Replaced with custom code only if it fights the UX.
- **IDs and tokens:** `nanoid`. Share ID 8 URL-safe characters. Edit token 24+ characters, stored hashed, shown only in the edit link.
- **Testing:** Vitest for the GPX and KML writers, distance, and simplification. Playwright for one create, share, download smoke test. Manual: import into onX on Alex's iPhone and into Gaia once.

## Hosting and cost

- **Accounts:** all in Alex's name. Has GitHub and Vercel. Needs MapTiler (free, no card). Neon is created from the Vercel dashboard.
- **Spend ceiling:** about $25 a month if free tiers are exceeded. Usage alerts regardless.
- **Repo:** public on GitHub, MIT license. Secrets live in Vercel environment variables; `private/` is git-ignored.
- **Domain:** `*.vercel.app` for now. A custom domain later keeps the old address working, so posted links survive.
- **Home page:** a short landing (what the app is, how a shared link works) plus a Create button behind the passphrase. The future library lives here.

## Built into v1 for future phases

- `owner_id` (nullable) on routes, for claiming after Discord login.
- `visibility` on routes, default `link-only`, for the library.
- `duplicated_from` on routes, so the library can group re-runs.
- Route geometry stored as GeoJSON in Postgres; PostGIS can be enabled later without a rewrite.
- Drawing kept as "points in, line out" so snap-to-trail can replace straight segments.

## Later (ideas, not decisions)

- Figma file generated from the shipped tokens and components with the Figma Console MCP, so Alex can edit the design system there.
- Elevation profile chart, with hover sync to the map.
- Waypoint categories and icons.
- Custom domain.
