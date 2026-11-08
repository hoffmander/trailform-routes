# Trailform Routes

A free web app for sharing off-road routes. Draw or upload a route, share one link in Discord, and anyone can download it into their own GPS app (onX Offroad, Gaia GPS, and others).

Built for the Trailform Collective 4x4 group. Not affiliated with onX, Gaia, or TrailsOffroad.

## Stack

Next.js (App Router, TypeScript, CSS Modules) on Vercel. Map and drawing libraries, database, and tile provider are added in later steps; see `BUILD_PLAN.md`. Every decision and its reason is in `DECISIONS.md`.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## License

MIT. See `LICENSE`.
