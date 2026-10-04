# Capture Guide (phone only)

How to capture a building, walkway or open space so it can be reconstructed into a Gaussian splat and georeferenced onto the campus map. Written for a single learner with one phone, and later for contributors.

The rule of thumb: **splat quality is decided at capture time.** Training can't invent views you didn't shoot.

## 0. Before you go
- **Get permission** from the campus (security, estates or student affairs). Mention that the data will be published.
- **Check the weather.** Overcast light is best. Avoid harsh midday sun, which gives hard shadows that change between passes. Avoid rain and wet lenses.
- **Choose a quiet time.** Fewer people and cars means fewer moving objects, which reconstruct as ghosts.
- **Prepare the phone.** Clean the lens, charge it, free 10+ GB of storage, and turn on airplane mode only if you don't need GPS (GPS needs to stay on).
- **Keep a capture log** (see section 7), even a note in your phone.

## 1. Phone settings
| Setting | Value | Why |
|---|---|---|
| Mode | Video (4K, 30 fps) or photo burst | Video is faster and gives dense overlap. Photos are sharper. |
| Resolution | 4K video, or 12 MP photos | Higher gives no real benefit past what training uses. |
| Lens | Main (1x) camera only | Don't switch lenses mid-capture. Ultra-wide has distortion that hurts SfM. |
| Zoom | Never zoom | Changing focal length breaks camera calibration. |
| Exposure and focus | Lock AE/AF (long-press on screen) | Stops brightness and focus from shifting between frames. |
| HDR | Off if possible | HDR can alter tone between frames. |
| Stabilization | On for video | Helps with motion blur. |
| Flash | Off | |
| Location | On | EXIF GPS gives a rough georeference. |
| Format | Keep originals (HEIC/JPEG are fine) | Don't let the gallery compress on upload. |

## 2. Moving: the core technique
- **Move slowly.** Walk at roughly half your normal pace. Motion blur is the top cause of bad reconstructions.
- **Overlap 70-80%** between consecutive frames. If you're shooting stills, take a step, then a photo.
- **Move your body, don't just pan.** Rotating on the spot gives no parallax, so SfM can't triangulate. Translate the camera through space.
- **Keep the subject in view.** Hold the phone at chest height and tilt, don't zoom.
- **No blur, no pointing at the sky or blank walls.** Textureless surfaces and clear sky confuse feature matching.

## 3. Capture patterns
### Building exterior (orbit)
1. Walk a loop around the building at a steady distance (5-15 m, depending on height), camera facing the building.
2. Do a second loop **closer** and **at a different height** (crouch or hold higher) if you can.
3. Close the loop: finish where you started and keep going about 10 frames past the start.
4. Add a **third pass facing outward** at each corner and entrance for context.

### Walkway or street (corridor)
1. Walk down one side filming straight ahead, then return filming the other direction.
2. Add a **sideways pass**: walk the length filming sideways at each side, then repeat in the opposite direction. This is the pass that gives the 3D geometry.
3. Keep lighting and exposure the same across passes.

### Open space (courtyard, field)
Walk a spiral or lawn-mower pattern, pointing inward and outward alternately, with 70-80% overlap between rows.

### Entrances and interiors
Film slowly through the door with the camera at chest height. Interiors are harder: low light causes blur, and glass and mirrors cause artifacts. Do exteriors first and save interiors for later.

## 4. What to avoid
- Moving objects: people, vehicles, flags, trees in the wind. Wait for gaps.
- Reflective and transparent surfaces: glass facades, car bodies, water, polished floors. These are hard for any method.
- Fast turns, quick tilts, or running.
- Mixed lighting from separate sessions (morning and evening) in one scene.
- Large changes in distance. Shoot a close pass and a far pass as **separate** passes, not one continuous zoom-like walk.
- Faces and licence plates in frame. See privacy below.

## 5. Georeferencing: capture for the map
Phone GPS is only accurate to about 3-10 m, so don't rely on it alone.
- Keep **Location on** so frames carry rough EXIF GPS.
- Note **at least 3-4 ground control points** per scene: distinct, permanent, easily identified spots (building corners, steps, bollards, lamp posts). Record the phone GPS **at the spot** (stand there for 30-60 seconds) and take a close photo of each.
- Measure **one or two known distances** with a tape or by pacing (a door width, the length of a wall). This fixes scale.
- Prefer features that also exist in satellite imagery, so you can place them on the map later.

## 6. Privacy and safety
- Avoid capturing identifiable people and licence plates. Blur or crop them before publishing.
- Don't capture restricted areas (labs, security posts, hostels) without permission.
- Don't capture documents, screens or other private information.
- Watch your footing, traffic and campus security. Don't film while walking backwards.

## 7. Capture log
One entry per scene, saved alongside the data (`data/raw/<scene-id>/log.md`, not committed).

```
scene_id:        nile-main-gate-001
campus:          nile-university
date / time:     2026-10-10 08:15
weather:         overcast
phone / lens:    <model>, 1x main
mode:            4K 30fps video
pattern:         orbit x2 + sideways pass
duration:        6 min
gcps:            see gcp.csv (name, lat, lon, accuracy_m, photo)
known distance:  gate pillar width 1.2 m (tape)
moving objects:  a few pedestrians
issues:          sun glare on last 30 s
```

## 8. After capture
1. Copy originals off the phone to local storage (never straight to the VPS).
2. Name folders `<campus>/<scene-id>/` and keep the log with them.
3. Run `pipeline/extract_frames.sh` to pull sharp frames from video.
4. Continue with the pipeline in `docs/architecture.md`.

## 9. Quick checklist
- [ ] Permission, weather, quiet time
- [ ] 1x lens, no zoom, AE/AF locked
- [ ] Slow walk, 70-80% overlap, loop closed
- [ ] 2+ passes at different distances or heights
- [ ] 3-4 GCPs with GPS dwell, photos
- [ ] One known distance measured
- [ ] Capture log filled in
