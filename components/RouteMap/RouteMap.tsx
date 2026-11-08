"use client";

/*
 * RouteMap renders a MapLibre map with MapTiler tiles and a Topo/Satellite
 * toggle.
 *
 * Why "use client": MapLibre touches the DOM and WebGL, which only exist in
 * the browser. Next.js renders components on the server by default, so this
 * directive opts the file into running in the browser.
 *
 * Why useRef + useEffect: MapLibre wants a real DOM element to draw into.
 * The ref gives us that element after React has rendered it, and useEffect
 * runs after render, which is the first moment the element exists. The
 * cleanup function returned from useEffect destroys the map when the
 * component unmounts so we don't leak WebGL contexts.
 */

import { useEffect, useRef, useState } from "react";
import { Map as MapLibreMap, NavigationControl, setWorkerUrl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// MapLibre does its heavy lifting (parsing vector tiles) in a Web Worker and
// locates the worker file relative to its own URL. Bundlers move files
// around, so that lookup fails under Next.js. This tells the bundler to ship
// the worker as a static asset and hands MapLibre the resulting URL.
setWorkerUrl(
  new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).href,
);

import {
  COLORADO_VIEW,
  MAPTILER_KEY,
  styleUrl,
  type MapStyleId,
} from "@/lib/maptiler";
import styles from "./RouteMap.module.css";

type Props = {
  initialStyle?: MapStyleId;
};

export default function RouteMap({ initialStyle = "topo" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [style, setStyle] = useState<MapStyleId>(initialStyle);
  // Which style the map currently has, so the effect below doesn't re-fetch
  // the initial style on mount (the constructor already loaded it).
  const appliedStyleRef = useRef<MapStyleId>(initialStyle);

  // Create the map once, on mount.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new MapLibreMap({
      container: containerRef.current,
      style: styleUrl(initialStyle),
      center: COLORADO_VIEW.center,
      zoom: COLORADO_VIEW.zoom,
      // MapTiler's styles carry their own attribution text; MapLibre shows it
      // through this control. Compact mode collapses it behind an (i) button.
      attributionControl: { compact: true },
    });

    map.addControl(
      new NavigationControl({ showCompass: false }),
      "bottom-right",
    );

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // initialStyle is only read on mount; later changes go through setStyle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Swap the basemap when the toggle changes.
  // Note for step 5: setStyle drops any layers we add ourselves (the route
  // line, waypoints). They must be re-added on the map's "style.load" event.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || appliedStyleRef.current === style) return;
    appliedStyleRef.current = style;
    map.setStyle(styleUrl(style));
  }, [style]);

  if (!MAPTILER_KEY) {
    return (
      <div className={styles.missingKey} role="alert">
        Map unavailable: <code>NEXT_PUBLIC_MAPTILER_KEY</code> is not set.
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.map} />

      <div
        className={styles.toggle}
        role="radiogroup"
        aria-label="Map style"
      >
        <StyleButton
          value="topo"
          label="Topo"
          current={style}
          onSelect={setStyle}
        />
        <StyleButton
          value="satellite"
          label="Satellite"
          current={style}
          onSelect={setStyle}
        />
      </div>

      {/* MapTiler's free plan requires their logo on the map. */}
      <a
        className={styles.logo}
        href="https://www.maptiler.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="MapTiler"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://api.maptiler.com/resources/logo.svg"
          alt=""
          width="90"
          height="24"
        />
      </a>
    </div>
  );
}

type StyleButtonProps = {
  value: MapStyleId;
  label: string;
  current: MapStyleId;
  onSelect: (value: MapStyleId) => void;
};

function StyleButton({ value, label, current, onSelect }: StyleButtonProps) {
  const selected = value === current;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={styles.toggleButton}
      onClick={() => onSelect(value)}
    >
      {label}
    </button>
  );
}
