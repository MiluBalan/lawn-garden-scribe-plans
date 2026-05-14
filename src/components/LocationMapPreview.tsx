import { useEffect, useState, useMemo, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { MapPin, Loader2, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN ?? "";

const ZOOM = 15;

const LocationMapPreview = ({ location, onAreaChange, isActive = false }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [positions, setPositions] = useState([]);

  const [estimatedArea, setEstimatedArea] = useState(null);
  const [multiplier, setMultiplier] = useState(1);

  // ---------------- HASH ----------------
  const stringToHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  // ---------------- SEEDED RANDOM ----------------
  const seededRandom = (seed) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // ---------------- GENERATE POINTS ----------------
  const generateCustomerPoints = (lat, lon) => {
    const baseSeed = stringToHash(`${lat},${lon}`);
    const visibleCount = 2 + (baseSeed % 4);

    const zoom = mapInstance.current?.getZoom() || ZOOM;
    const spread = 0.09 / Math.pow(2, zoom - 12);

    const points = [];

    for (let i = 0; i < visibleCount; i++) {
      const seed = baseSeed + i;

      const r = Math.pow(seededRandom(seed), 0.6); // radial distribution
      const theta = seededRandom(seed + 1) * 2 * Math.PI;

      const offsetLat = r * spread * Math.cos(theta);
      const offsetLon = r * spread * Math.sin(theta);

      points.push({
        lat: lat + offsetLat,
        lon: lon + offsetLon,
        id: i,
      });
    }

    return points;
  };

  const customerPoints = useMemo(() => {
    if (!coords) return [];
    return generateCustomerPoints(coords.lat, coords.lon);
  }, [coords]);

  // Customer count = dots count
  const customerCount = customerPoints.length;

  // ---------------- INIT MAP ----------------
  useEffect(() => {
    if (!coords || !mapRef.current) return;

    // ✅ prevent re-creating map
    if (mapInstance.current) {
      mapInstance.current.setCenter([coords.lon, coords.lat]);
      return;
    }

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [coords.lon, coords.lat],
      zoom: ZOOM,
    });

    mapInstance.current = map;

    return () => {
      // ✅ safe cleanup
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [coords]);

  // ---------------- SYNC DOTS ----------------
  useEffect(() => {
    if (!mapInstance.current) return;

    const map = mapInstance.current;

    const update = () => {
      const rect = mapRef.current?.getBoundingClientRect();

      const newPositions = customerPoints.map((p) => {
        const projected = map.project([p.lon, p.lat]);

        const x = Math.max(0, Math.min(projected.x, rect?.width || 0));
        const y = Math.max(0, Math.min(projected.y, rect?.height || 0));

        return {
          id: p.id,
          x,
          y,
        };
      });

      setPositions(newPositions);
    };

    map.on("move", update);
    map.on("zoom", update);

    update();

    return () => {
      map.off("move", update);
      map.off("zoom", update);
    };
  }, [customerPoints]);

  // ---------------- FETCH LOCATION ----------------
  useEffect(() => {
    if (!location || location.length < 3) {
      setCoords(null);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            location,
          )}&limit=1`,
        );

        const data = await res.json();

        if (data.length > 0) {
          setCoords({
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
          });

          setDisplayName(data[0].display_name.split(",").slice(0, 3).join(","));
        } else {
          setCoords(null);
        }
      } catch {
        setCoords(null);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [location]);

  // ---------------- AREA ESTIMATION ----------------
  useEffect(() => {
    if (!coords || !isActive) return;

    const latRad = (coords.lat * Math.PI) / 180;
    const metersPerPixel =
      (156543.03392 * Math.cos(latRad)) / Math.pow(2, ZOOM);

    const houseWidthMeters = 80 * metersPerPixel;
    const plotAreaSqMeters = houseWidthMeters ** 2 * 2;

    let lawnSqFt = plotAreaSqMeters * 0.6 * 10.7639;
    lawnSqFt = Math.max(500, Math.min(lawnSqFt, 12000));

    setEstimatedArea(Math.round(lawnSqFt));
    setMultiplier(1);
  }, [coords, isActive]);

  const finalArea =
    isActive && estimatedArea ? Math.round(estimatedArea * multiplier) : null;

  useEffect(() => {
    if (!isActive) return;
    if (finalArea && onAreaChange) onAreaChange(finalArea);
  }, [finalArea, isActive]);

  // ---------------- UI ----------------
  if (!location || location.length < 3) return null;

  if (loading) {
    return (
      <div className="mt-4 p-6 flex items-center justify-center gap-2">
        <Loader2 className="animate-spin text-green-600" />
        <span>Finding your location...</span>
      </div>
    );
  }

  if (!coords) return null;

  return (
    <Card className="mt-6 border-green-200 shadow-md">
      <CardContent className="p-0">
        <div className="relative w-full h-72 overflow-hidden">
          {/* MAP */}
          <div ref={mapRef} className="absolute inset-0" />

          {/* DOTS */}
          {positions.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 blur-sm" />
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-indigo-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
          ))}

          {/* COUNT */}
          <div className="absolute top-4 right-4 bg-green-600 text-white text-xs px-3 py-2 rounded-full flex items-center gap-1">
            <Users className="h-3 w-3" />
            {customerCount} customers
          </div>
        </div>

        {/* LOCATION */}
        {displayName && (
          <div className="bg-green-50 px-4 py-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800 truncate">
              {displayName}
            </span>
          </div>
        )}

        {/* AREA */}
        {isActive && finalArea && (
          <div className="px-4 py-4 border-t space-y-3">
            <p className="text-center text-sm">
              Estimated lawn size: {finalArea.toLocaleString()} sq ft
            </p>

            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={multiplier}
              onChange={(e) => setMultiplier(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationMapPreview;
