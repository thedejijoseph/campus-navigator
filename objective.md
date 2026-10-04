# Campus Navigator: Objective

## Purpose
Learn how map building and 3D reconstruction (photogrammetry, Gaussian splatting) work by building something real: a navigable, accurate digital representation of a university campus that other people can use and, later, contribute to.

## Goals
1. **Learn**: the full pipeline from capture to georeferencing to processing to serving. This covers 2D mapping, SfM/photogrammetry and 3D Gaussian splatting.
2. **Build something useful**: a campus map for wayfinding and orientation, with an immersive 3D view.
3. **Start with Nile University of Nigeria (Abuja)** as the pilot campus.
4. **Design for many campuses**: the data model, capture guidelines and tooling should let others add their own campus later, in a crowd-sourced, contributory format.

## Decisions so far
| Topic | Decision |
|---|---|
| Primary user | The author, as a learner first. Other users come later. |
| Capture hardware | Phone only (photos and video). No drone, 360 camera or RTK GPS. |
| Platform | Web only. No native mobile app. |
| Dataset | Separate, self-owned dataset. Not published directly into OpenStreetMap. May export to or import from OSM later. |
| Infrastructure | Small VPS plus free Cloudflare resources (see `Architecture notes`). |

## Architecture notes
- **Two layers.**
  - 2D/vector map layer: buildings, paths, entrances, POIs, routing. This is the lightweight source of truth for navigation.
  - 3D/splat layer: immersive scenes, georeferenced to the map and linked to POIs. It is visual, not authoritative.
- **Formats.** GeoJSON for features, PMTiles for map tiles, and compressed splat formats (SPZ or compressed PLY) for web delivery. Raw PLY is kept as an archival format only.
- **Heavy compute is not on the VPS or Cloudflare.** SfM and splat training need a GPU. Use a free Colab or Kaggle GPU, a local GPU, or cheap rented GPU hours. Serving is cheap and static.
- **Hosting.** Cloudflare R2 for splats and tiles (free tier, no egress fees), Cloudflare Pages for the web app, and optionally Workers and D1 for the contribution API. The VPS handles processing orchestration and anything stateful.

## Rough size and compute budget (to be validated by the pilot)
| Item | Estimate |
|---|---|
| Raw capture, one building (phone) | 1-3 GB (200-500 photos or a few minutes of 4K video) |
| Raw capture, whole campus | 50-200 GB. Keep it off the VPS (local disk or backup). |
| Trained splat, 1M gaussians, raw PLY | ~250 MB |
| Same, compressed (SPZ or similar) | ~15-30 MB |
| Web budget per scene | 0.5-1.5M gaussians on mobile, up to ~3M on desktop |
| Vector map data, whole campus | Under 10 MB |

## Non-goals (for now)
- Native apps, drone or LiDAR capture, centimetre-level surveying.
- Replacing OpenStreetMap or Google Maps.
- Full multi-campus contribution tooling. We design the schema for it but do not build it first.

## Proposed order of work
1. Pilot: capture one walkway or building end to end (phone, SfM, splat, web viewer).
2. Build the 2D campus map (buildings, paths, entrances, POIs) and a simple routing demo.
3. Georeference the splat scenes onto the map and link them to POIs.
4. Cover the rest of the campus.
5. Define the campus schema and contribution workflow so other campuses can be added.

## Open questions
- How accurate does georeferencing need to be with phone GPS only (ground control points from known landmarks)?
- What licence for the dataset and the code?
- Who moderates contributions, and how are they validated?
