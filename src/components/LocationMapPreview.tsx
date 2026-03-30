import { useEffect, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LocationMapPreviewProps {
  location: string;
  onAreaChange?: (area: number) => void;
  isActive?: boolean; // 🔥 controls estimation
}

interface GeoResult {
  lat: string;
  lon: string;
  display_name: string;
}

const ZOOM = 19;

const LocationMapPreview = ({
  location,
  onAreaChange,
  isActive = false,
}: LocationMapPreviewProps) => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const [estimatedArea, setEstimatedArea] = useState<number | null>(null);
  const [multiplier, setMultiplier] = useState(1);

  // 🔍 Fetch coordinates
  useEffect(() => {
    if (!location || location.length < 3) {
      setCoords(null);
      setEstimatedArea(null);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            location
          )}&countrycodes=us&limit=1`,
          { headers: { "User-Agent": "BioGrowthApp/1.0" } }
        );

        const data: GeoResult[] = await res.json();

        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          setCoords({ lat, lon });
          setDisplayName(
            data[0].display_name.split(",").slice(0, 3).join(",")
          );
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

  // 🌱 Area estimation (ONLY if active)
  useEffect(() => {
    if (!coords || !isActive) return;

    const latRad = (coords.lat * Math.PI) / 180;

    const metersPerPixel =
      (156543.03392 * Math.cos(latRad)) / Math.pow(2, ZOOM);

    const housePixelWidth = 80;
    const houseWidthMeters = housePixelWidth * metersPerPixel;

    const plotAreaSqMeters = houseWidthMeters * houseWidthMeters * 2;

    let lawnSqMeters = plotAreaSqMeters * 0.6;
    let lawnSqFt = lawnSqMeters * 10.7639;

    lawnSqFt = Math.max(500, Math.min(lawnSqFt, 12000));

    setEstimatedArea(Math.round(lawnSqFt));
    setMultiplier(1);
  }, [coords, isActive]);

  const finalArea =
    isActive && estimatedArea
      ? Math.round(estimatedArea * multiplier)
      : null;

  // 📤 Send to parent ONLY when active
  useEffect(() => {
    if (!isActive) return;

    if (finalArea && onAreaChange) {
      onAreaChange(finalArea);
    }
  }, [finalArea, isActive, onAreaChange]);

  if (!location || location.length < 3) return null;

  if (loading) {
    return (
      <div className="mt-4 rounded-xl border-2 border-gray-200 bg-gray-50 p-6 flex items-center justify-center gap-2">
        <Loader2 className="h-5 w-5 animate-spin text-green-600" />
        <span className="text-sm text-gray-600">
          Finding your location...
        </span>
      </div>
    );
  }

  if (!coords) return null;

  const mapUrl = `https://www.google.com/maps?q=${coords.lat},${coords.lon}&z=${ZOOM}&output=embed`;

  return (
    <Card className="mt-6 border-green-200 shadow-md">
      <CardContent className="p-0">
        {/* MAP */}
        <iframe
          title="Location Map"
          src={mapUrl}
          className="w-full h-72 border-0"
          loading="lazy"
        />

        {/* LOCATION */}
        {displayName && (
          <div className="bg-green-50 px-4 py-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800 truncate">
              {displayName}
            </span>
          </div>
        )}

        {/* AREA (ONLY UNKNOWN MODE) */}
        {isActive && finalArea && (
          <div className="px-4 py-4 border-t space-y-3">
            <p className="text-center text-sm text-gray-700">
              <span className="font-semibold">
                Estimated lawn size:
              </span>{" "}
              {finalArea.toLocaleString()} sq ft
            </p>

            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={multiplier}
              onChange={(e) =>
                setMultiplier(parseFloat(e.target.value))
              }
              className="w-full"
            />

            <p className="text-xs text-gray-500 text-center">
              Adjust ({Math.round(multiplier * 100)}%)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationMapPreview;