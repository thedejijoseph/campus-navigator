import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import campus from "../../data/campuses/nile-university/campus.json";
import features from "../../data/campuses/nile-university/features.geojson?raw";

// Blank style: no third-party tile server, we draw our own campus data.
const map = new maplibregl.Map({
  container: "map",
  center: campus.center as [number, number],
  zoom: 16,
  style: {
    version: 8,
    sources: {},
    layers: [{ id: "bg", type: "background", paint: { "background-color": "#eef1ec" } }],
  },
});

map.on("load", () => {
  map.addSource("campus", { type: "geojson", data: JSON.parse(features) });
  map.addLayer({
    id: "buildings",
    type: "fill",
    source: "campus",
    filter: ["==", ["get", "kind"], "building"],
    paint: { "fill-color": "#c9b79c" },
  });
  map.addLayer({
    id: "paths",
    type: "line",
    source: "campus",
    filter: ["==", ["get", "kind"], "path"],
    paint: { "line-color": "#6b7280", "line-width": 2 },
  });
  map.addLayer({
    id: "pois",
    type: "circle",
    source: "campus",
    filter: ["==", ["get", "kind"], "poi"],
    paint: { "circle-radius": 6, "circle-color": "#d9480f" },
  });
});
