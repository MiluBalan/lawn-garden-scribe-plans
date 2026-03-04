import { useEffect, useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface LocationMapPreviewProps {
  location: string;
}

interface GeoResult {
  lat: string;
  lon: string;
  display_name: string;
}

const LocationMapPreview = ({ location }: LocationMapPreviewProps) => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (!location || location.length < 3) {
      setCoords(null);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&countrycodes=us&limit=1`,
          { headers: { 'User-Agent': 'BioGrowthApp/1.0' } }
        );
        const data: GeoResult[] = await res.json();
        if (data.length > 0) {
          setCoords({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) });
          setDisplayName(data[0].display_name.split(',').slice(0, 3).join(','));
        } else {
          setCoords(null);
        }
      } catch {
        setCoords(null);
      } finally {
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [location]);

  if (!location || location.length < 3) return null;

  if (loading) {
    return (
      <div className="mt-4 rounded-xl border-2 border-gray-200 bg-gray-50 p-6 flex items-center justify-center gap-2">
        <Loader2 className="h-5 w-5 animate-spin text-green-600" />
        <span className="text-sm text-gray-600">Finding your location...</span>
      </div>
    );
  }

  if (!coords) return null;

  const mapUrl = `https://www.google.com/maps?q=${coords.lat},${coords.lon}&z=12&output=embed`;

  return (
    <div className="mt-6 rounded-xl overflow-hidden border-2 border-green-200 shadow-md animate-fade-in">
      <div className="relative">
        <iframe
          title="Location Map"
          src={mapUrl}
          className="w-full h-72 border-0"
          loading="lazy"
        />
      </div>
      {displayName && (
        <div className="bg-green-50 px-4 py-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-green-600 flex-shrink-0" />
          <span className="text-sm text-green-800 truncate">{displayName}</span>
        </div>
      )}
    </div>
  );
};

export default LocationMapPreview;
