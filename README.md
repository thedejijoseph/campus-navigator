# Campus Navigator

An open map of university campuses, with a 2D navigation layer and immersive 3D Gaussian splat scenes. It starts with Nile University of Nigeria (Abuja) and is designed so others can contribute their own campuses.

It's also a learning project: map building, photogrammetry and Gaussian splatting, captured with a phone only.

- Goals and decisions: [`objective.md`](objective.md)
- How to capture data: [`docs/capture-guide.md`](docs/capture-guide.md)
- Architecture and stack: [`docs/architecture.md`](docs/architecture.md)
- Data schema: [`docs/data-schema.md`](docs/data-schema.md)

## Layout
| Path | What |
|---|---|
| `web/` | Vite + TypeScript frontend (MapLibre) |
| `api/` | Cloudflare Worker (Hono), contribution API |
| `pipeline/` | Capture-to-splat scripts |
| `data/campuses/` | Campus metadata and vector features |

## Run the web app
```
cd web
npm install
npm run dev
```

## Run the API
```
cd api
npm install
npm run dev
```

## Status
Scaffold only. Next step is the pilot capture: one walkway or building, end to end.
