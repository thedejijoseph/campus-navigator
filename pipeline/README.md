# Pipeline

Capture to splat. Steps run on a local machine or a GPU notebook, not on the VPS.

| Step | Tool | Status |
|---|---|---|
| 1. Extract frames | `extract_frames.sh` (ffmpeg) | Written |
| 2. Camera poses | COLMAP or GLOMAP | Planned |
| 3. Train splat | Nerfstudio (splatfacto), gsplat or Brush | Planned |
| 4. Clean and crop | SuperSplat or a script | Planned |
| 5. Compress | SPZ or compressed PLY | Planned |
| 6. Georeference | Similarity transform from GCPs | Planned |

Raw data goes in `data/raw/` (git-ignored). See `docs/capture-guide.md` first.
