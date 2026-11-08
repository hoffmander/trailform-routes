# Status

## Last session (2026-11-08)

- Step 2 built and deployed: MapLibre map at https://trailform-routes.vercel.app/create with Topo/Satellite toggle, attribution, MapTiler logo, opens on Colorado. Repo https://github.com/hoffmander/trailform-routes auto-deploys from main.
- MapTiler key (browser, origin-locked to `trailform-routes.vercel.app` and `localhost`) is in Vercel env and `.env.local` as `NEXT_PUBLIC_MAPTILER_KEY`.

## Now

- Done-checks waiting on Alex: steps 1 and 2 on his phone and laptop, light and dark. Both styles load, toggle works, attribution shows. Review `app/tokens.css`.

## Blocked

## Next

- Step 3: iPhone download spike (sample GPX route handler, test page with Download / Send to GPS app / Open in onX, Alex tests from Safari and Discord's browser, imports into onX and Gaia).

## Later

Ideas, not decisions.

- Figma file generated from shipped tokens and components via Figma Console MCP.
- Elevation profile chart with hover sync.
- Waypoint categories and icons.
- Custom domain.
