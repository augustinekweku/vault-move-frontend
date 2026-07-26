import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import type { Property } from "~/types";
import { cn } from "~/lib/utils";
import "leaflet/dist/leaflet.css";

/** Fallback centre (Achimota, Accra) when there are no pins to fit. */
const DEFAULT_CENTER: [number, number] = [5.6145, -0.2269];

/** Brand-blue teardrop pin, matching the Figma markers. Rendered as a
 *  divIcon so no image assets need to be resolved through the bundler. */
const PIN_HTML = `<svg width="28" height="38" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.27 21.73 0 14 0Z" fill="#1e347a"/><circle cx="14" cy="13.5" r="5.5" fill="#ffffff"/></svg>`;

/** Popup card: 24px extrabold title over a nested bordered box holding the
 *  light price label and the 18px bold price, per the Figma (345×145).
 *  Tailwind classes in this string are picked up by the CSS scanner. */
function popupHtml(property: Property): string {
  const priceLabel = property.category === "rent" ? "Rent Price" : "Sale Price";
  const priceSuffix = property.priceUnit === "month" ? " /month" : "";
  return `<div class="w-86.25 rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
  <p class="text-2xl font-extrabold leading-6 text-black">${property.title}</p>
  <div class="mt-4 rounded-xl border border-line bg-white px-4 py-3 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
    <p class="text-xs font-light leading-4 text-brand-navy/55">${priceLabel}</p>
    <p class="mt-1.5 text-lg font-bold leading-6 text-black">${property.price} ${property.currency}${priceSuffix}</p>
  </div>
</div>`;
}

interface MapViewProps {
  properties: Property[];
  className?: string;
}

/** Interactive OpenStreetMap with a pin + price popup per property.
 *  Leaflet touches `window` at import time, so it is loaded dynamically
 *  inside useEffect — the server renders only the loading placeholder. */
export function MapView({ properties, className }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, { scrollWheelZoom: false });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const icon = L.divIcon({
        html: PIN_HTML,
        className: "",
        iconSize: [28, 38],
        iconAnchor: [14, 38],
        popupAnchor: [0, -38],
      });

      const bounds: [number, number][] = [];
      properties.forEach((property, i) => {
        const position: [number, number] = [
          property.coordinates.lat,
          property.coordinates.lng,
        ];
        bounds.push(position);
        const marker = L.marker(position, { icon }).addTo(map);
        marker.bindPopup(popupHtml(property), {
          className: "vm-map-popup",
          closeButton: false,
          maxWidth: 345,
          offset: [0, -4],
        });
        // The Figma shows the first property's popup open on load.
        if (i === 0) marker.openPopup();
      });

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [48, 48] });
      } else {
        map.setView(DEFAULT_CENTER, 13);
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [properties]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-center justify-center bg-surface text-sm text-ink/50">
        Loading map…
      </div>
      <div
        ref={containerRef}
        role="application"
        aria-label="Map of property locations"
        className="relative z-10 size-full"
      />
    </div>
  );
}
