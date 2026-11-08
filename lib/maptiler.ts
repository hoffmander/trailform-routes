/**
 * MapTiler config shared by the map component and, later, the server-side
 * static card image. The key is public by design (it ships to browsers so
 * MapLibre can fetch tiles) and is protected by MapTiler's origin allowlist.
 */

export const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY ?? "";

export type MapStyleId = "topo" | "satellite";

/** MapTiler style ids per our two views. Topo is the default everywhere. */
const STYLE_IDS: Record<MapStyleId, string> = {
  topo: "outdoor-v2",
  satellite: "satellite",
};

export function styleUrl(style: MapStyleId): string {
  return `https://api.maptiler.com/maps/${STYLE_IDS[style]}/style.json?key=${MAPTILER_KEY}`;
}

/** Colorado, roughly centered on the Front Range. The editor opens here. */
export const COLORADO_VIEW = {
  center: [-105.6, 39.1] as [number, number],
  zoom: 6.4,
};
