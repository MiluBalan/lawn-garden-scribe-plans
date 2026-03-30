import RegionalSoilProfile from './RegionalSoilProfile';

interface LawnSummaryCardProps {
  lawnData: any;
  soilData: any;
}

const LawnSummaryCard = ({ lawnData, soilData }: LawnSummaryCardProps) => {

  const getSizeDisplay = () => {
    const size = lawnData.size;

    if (!size) return "Unknown size";

    // ✅ CUSTOM SIZE → show exact number
    if (typeof size === "string" && size.startsWith("custom_")) {
      const value = Number(size.split("_")[1]);
      return `${value.toLocaleString()} sq ft`;
    }

    // ✅ PREDEFINED → show range
    const mapping: Record<string, string> = {
      small: "0 – 5,000 sq ft",
      medium: "5,000 – 10,000 sq ft",
      large: "10,000 – 20,000 sq ft",
      xlarge: "20,000+ sq ft",
    };

    return mapping[size] || "Unknown size";
  };

  const getGrassDisplay = () => {
    const grassMap: Record<string, string> = {
      bermuda: 'Bermuda Grass',
      kentucky_blue: 'Kentucky Bluegrass',
      tall_fescue: 'Tall Fescue',
      zoysia: 'Zoysia Grass',
      st_augustine: 'St. Augustine',
      centipede: 'Centipede Grass',
      fine_fescue: 'Fine Fescue',
      unknown: 'Mixed/Unknown',
    };

    return grassMap[lawnData.grassType] || 'Unknown';
  };

  if (!soilData) return null;

  return (
    <div className="mb-8">
      <RegionalSoilProfile
        location={lawnData.location}
        soilComposition={soilData.composition}
        grassType={getGrassDisplay()}
        soilType={soilData.type}
        lawnSize={getSizeDisplay()}
      />
    </div>
  );
};

export default LawnSummaryCard;