# Project Brief: Trailform Routes

## Summary

**Trailform Routes** is a free, no-paywall web app for my 4x4 group, Trailform Collective. The club has approved the name, but the app is my personal project, not owned by the club. Members draw or upload off-road routes, share them as links in our Discord server, and anyone can open the link and download the route into whatever GPS app they use (onX Offroad, Gaia GPS, etc.).

This is **not** an onX or TrailsOffroad competitor. It's a neutral route hub that sits between them. Over time, the routes people create become a shared library of trails for the group.

## Background and problem

- Our group posts events (trail runs) in Discord.
- Routes are currently shared from TrailsOffroad (TOR), onX Offroad, and possibly other apps. Not everyone uses the same app.
- TOR fans like its trail content. onX users like its CarPlay support. Neither app lets you easily share a route with someone who uses the other one.
- TOR does **not** support importing custom GPX routes, so TOR can't be an export target.
- onX Offroad **does** import GPX and KML (web map and app).

The goal: one link per event that works for everyone, regardless of which app they use.

## About me (how to work with me)

- I'm a senior UX/product designer moving into front-end development. I'm strong in HTML, CSS, and SCSS, but newer to JavaScript, React, and Next.js.
- Explain architecture decisions and newer concepts (React patterns, state, data fetching, etc.) as you go. Skip HTML/CSS basics.
- Help me think through planning and trade-offs, not just implementation.
- You choose the tech stack. Explain why you picked each piece, and prefer free or generous-free-tier services. This is a hobby project for a club, not a business.

## Before writing any code: interview me

This brief is a starting point, not a spec. Before you plan the architecture or write any code, interview me extensively. No amount of questions is too many. I'd rather answer 100 questions now than rework the app later.

How to run the interview:

- Ask a few related questions at a time, not one giant list. Wait for my answers before moving on.
- Follow up on my answers. If something I say is vague, contradicts the brief, or has trade-offs I may not see, dig in.
- When there's a decision to make, give me the options, the trade-offs, and your recommendation. Then let me decide.
- Don't assume. If the brief is silent or unclear on something, ask.
- Keep going until you have no open questions. Then ask if there's anything I want to add.

Areas to cover (at minimum):

- **Goals and success:** What does a successful first version look like? How will I know people are using it?
- **Users and flows:** Step by step, how does someone create a route, share it, open it, and get it into onX? What happens on a phone versus a laptop?
- **Route data:** What details does a route need (name, description, difficulty, vehicle requirements, event date, meeting point, waypoints)? What's required versus optional?
- **Editing and ownership:** Who can edit or delete a route? What happens if someone loses their edit link?
- **Sharing and privacy:** Are all routes public by link? Should some be unlisted or hidden later?
- **Discord preview:** What should the unfurl card show, and in what order?
- **Map and drawing UX:** Map styles, layers, drawing controls, undo, editing uploaded GPX.
- **Export:** Formats, file naming, and how the iPhone download flow should work.
- **Visual design:** Look and feel, brand, dark mode, sunlight readability.
- **Tech stack:** Your proposed stack, with reasons and trade-offs, for my approval.
- **Hosting and cost:** Accounts and domains in my name, free tier limits, what happens if usage grows.
- **Future phases:** What to plan for now so accounts, a route library, and snap-to-trail are easy to add later.
- **Moderation and abuse:** Spam, inappropriate content, deleting routes.
- **My learning:** Which parts I want to build myself versus have you build and explain.

When the interview is done:

1. Write a `DECISIONS.md` file that captures every decision we made and the reasoning behind it.
2. Write a build plan broken into small, testable steps.
3. Ask me to review and approve both before you write any code.

## Users

1. **Route creator:** A group member planning an event. Usually on a laptop. Draws a route or uploads a GPX exported from onX or another app.
2. **Route viewer:** Everyone else in the Discord. Almost always on a phone. Taps the link, looks at the route, downloads it into their GPS app, or gets directions to the trailhead.

Design route creation desktop-first. Design the shared route view mobile-first.

## MVP scope

### 1. Map
- Interactive map with satellite imagery and a topo/outdoor style that clearly shows dirt roads, 4x4 tracks, and forest roads.
- Toggle between basemap styles.
- Focus on the US (our group is based in Colorado).

### 2. Create a route
- **Draw:** Click to add points, drag points to edit, undo, clear.
- **Upload:** Import a GPX or KML file (for example, a route exported from onX) and show it on the map. Let the user edit it after upload.
- Route details: name (required), description (optional), and optional event info such as date and meeting point.
- Show total distance automatically. An elevation profile is a nice-to-have.

### 3. Share
- Saving a route creates a short, unguessable share URL (for example `/r/k3x9fq`).
- **No accounts in the MVP.** When a route is created, the creator's browser keeps a secret edit token. Anyone with the link can view the route, and only the holder of the edit token can edit or delete it.
- Design the data model so accounts can be added later and existing routes can be claimed by the account that created them.

### 4. Discord link preview (high priority)
- When the share URL is pasted into Discord, it should unfurl with:
  - A map preview image of the route
  - Route name
  - Distance and general location
- Most people will judge the app by this preview card, so it needs to look great.

### 5. View and export (shared route page)
- Mobile-first page showing the route on the map with its details.
- Clear actions:
  - **Download GPX** (primary, works with onX, Gaia, and most GPS apps)
  - **Download KML**
  - **Navigate to trailhead:** opens Google Maps or Apple Maps with directions to the route's start point. (Google Maps can't navigate a GPX track, so this is the right Google feature.)
- Short, plain-language instructions for importing a GPX into onX Offroad and Gaia GPS. Treat these as help text, not a manual.
- Make sure GPX downloads work well on iPhone (share sheet into onX should work smoothly).

## Explicitly out of scope

- **Offline maps.** Do not build any offline functionality. Users get offline through their own GPS app after importing the GPX.
- Turn-by-turn navigation or live GPS tracking.
- Native iOS/Android apps. This is a responsive web app.
- Private land parcel data.
- Payments or premium features. Everything is free.
- Exporting into TrailsOffroad (not supported by TOR).

## Future phases (plan for, don't build)

- **Accounts:** Sign in (Discord login would be ideal since the whole group already uses it), a "My routes" page, and claiming routes created before sign-in.
- **Route library:** Browse and search all public routes. Content builds itself as people create routes for events.
- **Snap-to-trail:** Snap drawn routes to real trail and road geometry so lines don't cut across switchbacks.
- **Trail legality layers:** US Forest Service MVUM (Motor Vehicle Use Map) data and BLM roads, including seasonal closures.
- **Public land boundaries** (for example, USGS PAD-US).
- **Discord bot or webhook** to post new routes or events directly into a channel.
- Waypoints and points of interest (obstacles, camp spots, bail-out points).

## Non-functional requirements

- Free or close to free to run at club scale (dozens of users, hundreds of routes).
- Fast on phones with mediocre cell signal at a trailhead.
- Simple to deploy and maintain by one person.
- Accessible: good contrast in sunlight, large tap targets (people may be wearing gloves), readable on a small screen.
- Exported GPX and KML must be valid and tested by importing into onX Offroad and Gaia GPS.

## Reference projects

Study these for ideas and behavior. Don't fork them, and don't copy code without checking the license.

| Project | What to learn from it | What to avoid |
|---|---|---|
| **[BRouter Web](https://brouter.de/brouter-web)** | The best snap-to-trail feel I've found. Routing profiles that prefer tracks and unpaved roads. BRouter is a strong candidate engine for the future snap-to-trail phase. | Cluttered, dated UI. |
| **[gpx.studio](https://gpx.studio)** | GPX editing, drawing, and dragging route points. MapLibre-based. | Feature creep. It asks for an activity type up front from a long, bike-heavy list. Our app has one use case (4x4), so skip the activity picker entirely. |
| **[Wanderer](https://github.com/open-wanderer/wanderer)** | Trail library, search, lists, sharing, GPX import/export, and route editing with Valhalla routing. Good model for the future route library phase. | It's a self-hosted personal trail catalogue for hiking and biking, it needs accounts, and it runs as several Docker services. Licensed AGPLv3, so don't copy code into this project. |

UX principle drawn from all three: they feel clunky because features were tacked on over time. Keep this app focused on one job (draw or upload, share, download) and resist adding settings and modes.

## Suggested build order

1. Project setup and a map that renders with satellite and topo styles.
2. GPX/KML upload that displays a route.
3. Drawing and editing a route.
4. Saving a route and generating a share URL with an edit token.
5. Shared route view page with GPX/KML download and "Navigate to trailhead."
6. Discord link preview (Open Graph tags and a generated map preview image).
7. Polish: mobile layout, distance and elevation, help text.

## Open questions to raise with me

- Visual identity for the app (name is decided: Trailform Routes).
- Whether routes should have an expiration or stay forever.
- Whether any route should be hideable from a future public library (event-only routes).
