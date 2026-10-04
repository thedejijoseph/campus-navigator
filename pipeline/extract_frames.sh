#!/usr/bin/env bash
# Extract frames from a phone video for SfM.
# Usage: pipeline/extract_frames.sh <video> <out_dir> [fps]
# Default 2 fps: about 70-80% overlap at slow walking pace. Raise it if you moved faster.
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "usage: $0 <video> <out_dir> [fps]" >&2
  exit 1
fi

video="$1"
out="$2"
fps="${3:-2}"

command -v ffmpeg >/dev/null || { echo "ffmpeg not found" >&2; exit 1; }

mkdir -p "$out"
ffmpeg -hide_banner -loglevel error -i "$video" -vf "fps=${fps}" -qscale:v 2 "$out/frame_%05d.jpg"
echo "wrote $(ls "$out" | wc -l) frames to $out"
