# Data Schema (draft v0)

A campus is a folder under `data/campuses/<campus-id>/`. IDs are lowercase kebab-case.

```
data/campuses/<campus-id>/
  campus.json       metadata
  features.geojson  buildings, paths, entrances, POIs
  scenes.json       splat scenes and their georeference
```

## campus.json
```json
{
  "id": "nile-university",
  "name": "Nile University of Nigeria",
  "city": "Abuja",
  "country": "NG",
  "center": [7.4245, 9.0165],
  "bounds": null,
  "license": "TBD",
  "schema_version": 0
}
```
`center` is `[lon, lat]`. Values are approximate until checked on site.

## features.geojson
A GeoJSON FeatureCollection in WGS84. Each feature has `properties.kind`:

| kind | geometry | key properties |
|---|---|---|
| `building` | Polygon | `name`, `short_name`, `levels` |
| `path` | LineString | `surface`, `accessible` (bool), `bidirectional` (default true) |
| `entrance` | Point | `building_id`, `accessible` |
| `poi` | Point | `name`, `category` (lecture, admin, food, library, sports, hostel, other), `scene_id` |

Every feature has a stable `properties.id`. Paths connect at shared endpoint coordinates, which is what the routing graph is built from.

## scenes.json
```json
[
  {
    "id": "nile-main-gate-001",
    "poi_id": "main-gate",
    "url": "scenes/nile-main-gate-001.spz",
    "format": "spz",
    "gaussians": 800000,
    "captured": "2026-10-10",
    "georef": {
      "origin": [7.4245, 9.0165],
      "heading_deg": 0,
      "scale": 1.0,
      "altitude_m": 0,
      "gcp_rmse_m": null
    }
  }
]
```
`georef` places the scene's local coordinate frame on the map. `gcp_rmse_m` records how well the ground control points fit, so poor placements can be flagged.

## Rules for contributors
- Don't commit raw captures or splats. Link them by `url`.
- Don't include personal data.
- Cite the capture date and method in `scenes.json`.
