# Status

## Last session (2026-11-07)

- Step 1 built and deployed: https://trailform-routes.vercel.app (Next.js 16, `app/tokens.css`, landing shell, MIT, README). Deployed from the CLI, not from GitHub.

## Now

- Step 1 done-check waiting on Alex: open the URL on phone and laptop in light and dark, review `app/tokens.css`.

## Blocked

- GitHub push. Claude's permission classifier denied `gh repo create` (creating a public surface). Alex runs it: `! gh repo create trailform-routes --public --source=. --remote=origin --push`, then `! vercel git connect` so pushes to main auto-deploy.

## Next

- Alex creates a MapTiler account before step 2.
- Step 2: MapLibre map with MapTiler Outdoor and Satellite, style toggle, opens on Colorado.

## Later

Ideas, not decisions.

- Figma file generated from shipped tokens and components via Figma Console MCP.
- Elevation profile chart with hover sync.
- Waypoint categories and icons.
- Custom domain.
