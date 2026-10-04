# Architecture

## Principles
- **Two layers.** A 2D vector map is the source of truth for navigation. 3D splat scenes are georeferenced, linked to POIs, and visual only.
- **Static first.** The reader-facing site is static files plus PMTiles and compressed splats on Cloudflare. A small API is added only for contributions.
- **Open formats.** GeoJSON, PMTiles, glTF/PLY/SPZ. No lock-in, so other campuses and tools can use the data.
- **Heavy compute stays off the server.** GPU work runs on Colab, Kaggle, a local GPU or rented hours.

## Stack
| Part | Choice | Why |
|---|---|---|
| Web app | Vite + TypeScript, no UI framework yet | Fewer moving parts for a learner. A framework can be added when the UI grows. |
| 2D map | MapLibre GL JS + PMTiles | Open source, vector tiles, and PMTiles is a single static file with HTTP range requests. |
| Splat viewer | Spark (three.js based) | Loads PLY, SPZ and `.splat` in the browser. Revisit once the pilot is running. |
| Routing | Client-side graph search over path GeoJSON | No server needed for one campus. |
| API | Cloudflare Workers + Hono (TypeScript) | Free tier, same language as the frontend. |
| Metadata | Cloudflare D1 (SQLite) | Campuses, scenes, POIs, contributions. |
| Files | Cloudflare R2 | Splats and tiles, no egress fees. |
| Pipeline | Python and shell: ffmpeg, COLMAP/GLOMAP, Nerfstudio or gsplat | Standard open-source tools. |
| VPS | Optional: job queue, moderation tooling | Only for what Workers can't do. |

## Repository layout
```
objective.md          goals and decisions
docs/                 capture guide, architecture, data schema
data/campuses/<id>/   campus metadata and vector features (small, committed)
web/                  Vite + TypeScript frontend
api/                  Cloudflare Worker (Hono)
pipeline/             capture-to-splat scripts
```
Raw captures and trained splats are **not** committed. They live on local disk and in R2.

## Pipeline: capture to web
```
phone video/photos
  -> ffmpeg: extract sharp frames
  -> COLMAP / GLOMAP: camera poses + sparse points
  -> Nerfstudio / gsplat / Brush: train Gaussian splat (GPU)
  -> clean + crop (remove floaters, background)
  -> compress to SPZ / compressed PLY
  -> georeference: similarity transform from GCPs (lat/lon, scale, heading)
  -> upload to R2, register scene in D1 / data/campuses/<id>
  -> web viewer loads scene when its POI is opened
```

## Data model (summary)
See `docs/data-schema.md`. A **campus** has **features** (buildings, paths, entrances, POIs) and **scenes** (splats with a georeference transform). Everything is plain files so a contributor can add a campus with a pull request or an upload.

## Delivery
- `web/` deploys to Cloudflare Pages.
- Tiles and splats are served from R2 behind a custom domain or public bucket URL, with CORS and range requests enabled.
- Pages has a per-file size limit (~25 MB), so splats never go in the Pages deploy.

## Open decisions
- Splat viewer: Spark vs PlayCanvas vs another, after a trial with a real scene.
- Whether to generate PMTiles from our own GeoJSON (tippecanoe) or use a hosted basemap for context.
- Contribution flow: pull requests for data, an upload form later.
- Licences for code and data.
