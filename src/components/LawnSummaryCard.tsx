import RegionalSoilProfile from './RegionalSoilProfile';

interface LawnSummaryCardProps {
  lawnData: any;
  soilData: any;
}

const LawnSummaryCard = ({ lawnData, soilData }: LawnSummaryCardProps) => {

  // ✅ Normalize size → always number
  const getNumericSize = (): number | null => {
    const size = lawnData.size;

    if (!size) return null;

    // custom_5497
    if (typeof size === "string" && size.startsWith("custom_")) {
      return Number(size.split("_")[1]);
    }

    // predefined sizes
    const mapping: Record<string, number> = {
      small: 3000,
      medium: 7500,
      large: 15000,
      xlarge: 25000,
    };

    if (mapping[size]) return mapping[size];

    // already number
    if (typeof size === "number") return size;

    return null;
  };

  // ✅ Convert to label
  const getSizeDisplay = () => {
    const size = getNumericSize();

    if (!size) return "Unknown size";

    let label = "";

    if (size < 5000) label = "Small";
    else if (size < 10000) label = "Medium";
    else if (size < 20000) label = "Large";
    else label = "Extra Large";

    return `${size.toLocaleString()} sq ft (${label})`;
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