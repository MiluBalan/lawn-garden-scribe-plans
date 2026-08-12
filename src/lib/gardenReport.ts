export interface GardenAnswers {
  planType?: string;
  plantType?: string;
  plantSubtype?: string;
  growingSetup?: string;
  gardenStage?: string;
  sunlight?: string;
  soilType?: string;
  location?: string;
}

export const SETUP_LABELS: Record<string, string> = {
  'in-ground': 'In-ground Garden',
  'raised-beds': 'Raised Beds',
  containers: 'Container Gardening',
  greenhouse: 'Green House',
  vertical: 'Vertical Garden',
  hydroponics: 'Hydroponics',
  'cold-frames': 'Cold Frames',
  'high-tunnels': 'High Tunnels',
};

export const PLANT_TYPE_LABELS: Record<string, string> = {
  flowers: 'Flowers',
  'vegetables-fruits': 'Vegetables / Fruits',
  trees: 'Trees',
};

export const VARIETY_LABELS: Record<string, string> = {
  roses: 'Roses',
  orchids: 'Orchids',
  'indoor-plants': 'Indoor Plants',
  'ornamental-foliage': 'Ornamental Foliage Plants',
  tomato: 'Tomato',
  'citrus-fruits': 'Citrus Fruits',
  'other-vegetables': 'Other Vegetables',
  'hemp-herbs': 'Hemps & Herbs',
  'other-fruits': 'Other Fruits',
  'citrus-tree': 'Citrus Tree',
  'shade-trees': 'Shade Trees',
  'ornamental-trees': 'Ornamental Trees',
};

export const STAGE_LABELS: Record<string, string> = {
  'preparing-soil': 'Preparing soil before planting',
  'planted-seeds': 'Seeds just planted',
  'planted-seedlings': 'Seedlings / saplings recently planted',
  'actively-growing': 'Actively growing — needs regular feeding',
};

export const SUNLIGHT_LABELS: Record<string, string> = {
  full_sun: 'Full Sun (6+ hrs)',
  partial_sun: 'Partial Sun (4-6 hrs)',
  partial_shade: 'Partial Shade (2-4 hrs)',
  full_shade: 'Full Shade (<2 hrs)',
};

export const SOIL_LABELS: Record<string, string> = {
  'raised-bed-mix': 'Raised Bed Mix',
  'native-compost': 'Native Soil + Compost',
  'potting-mix': 'Potting Mix',
  'no-soil': 'Soilless (coco, rockwool, clay)',
  'lightweight-potting-mix': 'Lightweight Potting Mix',
  clay: 'Clay Soil',
  sandy: 'Sandy Soil',
  loamy: 'Loamy Soil',
  unknown: 'Not sure',
};

export const label = (map: Record<string, string>, key?: string) =>
  (key && map[key]) || (key ? key.replace(/-/g, ' ') : '—');

/** Stage-driven action plan: what to do right now. */
export function getStageActions(a: GardenAnswers): { title: string; steps: string[] } {
  const variety = label(VARIETY_LABELS, a.plantSubtype).toLowerCase();
  switch (a.gardenStage) {
    case 'preparing-soil':
      return {
        title: 'Prep Phase — build the foundation',
        steps: [
          'Loosen the growing medium to 8-12 inches and remove old roots and debris',
          'Blend in 2-3 inches of finished compost to raise organic matter',
          'Apply a gentle soil primer 7-10 days before planting so biology can establish',
          `Confirm drainage and pH suit ${variety} before transplanting`,
        ],
      };
    case 'planted-seeds':
      return {
        title: 'Germination Phase — keep it consistent',
        steps: [
          'Keep the top inch evenly moist — light, frequent watering beats deep soaking',
          'Hold off on strong fertilizer; use a diluted starter at 1/4 strength only',
          'Maintain warmth and airflow to prevent damping-off',
          'Thin seedlings once true leaves appear to reduce competition',
        ],
      };
    case 'planted-seedlings':
      return {
        title: 'Establishment Phase — grow roots first',
        steps: [
          'Water deeply every 2-3 days to encourage roots to chase moisture downward',
          'Apply a root-focused biostimulant every 2 weeks for the first 6 weeks',
          'Mulch lightly, keeping material off stems and trunks',
          `Shelter young ${variety} from wind and midday heat for the first 10-14 days`,
        ],
      };
    case 'actively-growing':
    default:
      return {
        title: 'Active Growth Phase — feed on rhythm',
        steps: [
          'Feed every 2 weeks during the active season and taper as growth slows',
          'Scout weekly for pests, discoloration and nutrient deficiency signs',
          `Support ${variety} with staking, pruning or trellising as it fills out`,
          'Keep moisture consistent — swings drive blossom drop and split fruit',
        ],
      };
  }
}

/** Feeding cadence tuned to setup + medium. */
export function getFeedingPlan(a: GardenAnswers): { cadence: string; note: string; water: string } {
  const soilless = a.soilType === 'no-soil' || a.growingSetup === 'hydroponics';
  const container =
    a.growingSetup === 'containers' ||
    a.growingSetup === 'vertical' ||
    a.soilType === 'potting-mix' ||
    a.soilType === 'lightweight-potting-mix';

  if (soilless) {
    return {
      cadence: 'Every watering (low dose)',
      note: 'Soilless media hold no nutrients — deliver a complete balanced solution at every irrigation and flush weekly to stop salt build-up.',
      water: 'Monitor EC and pH daily; target pH 5.5-6.2.',
    };
  }
  if (container) {
    return {
      cadence: 'Every 7-10 days',
      note: 'Containers leach nutrients fast with each watering, so feed lighter but more often than in-ground beds.',
      water: 'Water until 10-20% drains from the bottom; check moisture daily in heat.',
    };
  }
  if (a.growingSetup === 'raised-beds') {
    return {
      cadence: 'Every 2 weeks',
      note: 'Raised bed mixes drain quickly — a steady biweekly feed keeps nutrition available without flushing.',
      water: 'Deep soak 2-3 times per week; beds dry faster than native ground.',
    };
  }
  if (a.growingSetup === 'greenhouse' || a.growingSetup === 'high-tunnels' || a.growingSetup === 'cold-frames') {
    return {
      cadence: 'Every 10-14 days',
      note: 'Protected growing extends the season, so feeding continues later into fall than outdoor beds.',
      water: 'Vent for airflow and water in the morning to control humidity and disease.',
    };
  }
  return {
    cadence: 'Every 3-4 weeks',
    note: 'In-ground soil buffers nutrients well — space feedings out and lean on compost between applications.',
    water: 'Deliver 1-1.5 inches of water per week, ideally in one or two deep sessions.',
  };
}

/** Recommendations driven by every answer the user gave. */
export function getGardenRecommendations(a: GardenAnswers, pH?: number): string[] {
  const recs: string[] = [];

  // Variety specific
  const varietyRecs: Record<string, string> = {
    roses: 'Feed roses with a bloom-supporting formula and prune to an open center for airflow',
    orchids: 'Use bark-based media, water weekly and feed at 1/4 strength — orchids burn easily',
    'indoor-plants': 'Rotate pots weekly for even light and wipe leaves monthly to keep pores clear',
    'ornamental-foliage': 'Prioritize nitrogen for lush leaves and pinch tips to keep growth compact',
    tomato: 'Side-dress tomatoes with calcium at first fruit set to prevent blossom-end rot',
    'citrus-fruits': 'Citrus are heavy feeders — supply iron, zinc and magnesium to avoid yellowing leaves',
    'other-vegetables': 'Rotate vegetable families every season to break pest and disease cycles',
    'hemp-herbs': 'Harvest herbs frequently and keep nitrogen moderate to preserve aromatic oils',
    'other-fruits': 'Thin fruit early so the plant channels energy into fewer, larger harvests',
    'citrus-tree': 'Feed citrus trees three times a year and keep mulch clear of the trunk',
    'shade-trees': 'Water shade trees at the drip line, not the trunk, and deep-soak monthly',
    'ornamental-trees': 'Prune ornamentals right after flowering to protect next season’s buds',
  };
  if (a.plantSubtype && varietyRecs[a.plantSubtype]) recs.push(varietyRecs[a.plantSubtype]);

  // Setup specific
  const setupRecs: Record<string, string> = {
    'in-ground': 'Top-dress with compost twice a year to keep native soil biology active',
    'raised-beds': 'Refresh 20% of the bed volume with fresh mix each season as it settles',
    containers: 'Repot or replace 1/3 of the potting mix annually to restore structure',
    greenhouse: 'Track day/night temperature swings and vent early to avoid heat stress',
    vertical: 'Upper tiers dry first — check top rows before assuming the wall needs no water',
    hydroponics: 'Change reservoir solution every 7-14 days and keep roots oxygenated',
    'cold-frames': 'Prop the lid open on sunny days to prevent cooking your plants',
    'high-tunnels': 'Use drip irrigation under cover to keep foliage dry and disease low',
  };
  if (a.growingSetup && setupRecs[a.growingSetup]) recs.push(setupRecs[a.growingSetup]);

  // Sunlight
  if (a.sunlight === 'full_sun') recs.push('With full sun, expect faster drying — mulch and water early in the morning');
  if (a.sunlight === 'partial_sun') recs.push('Partial sun suits most crops; place tallest plants north to avoid shading others');
  if (a.sunlight === 'partial_shade') recs.push('In partial shade, reduce nitrogen slightly and expect a slower, longer growth curve');
  if (a.sunlight === 'full_shade') recs.push('Full shade limits fruiting — prioritize foliage plants or add supplemental grow lighting');

  // Medium
  if (a.soilType === 'native-compost') recs.push('Test native soil annually; compost alone can leave phosphorus and potassium gaps');
  if (a.soilType === 'no-soil') recs.push('Soilless media need a complete nutrient solution including calcium and magnesium');
  if (a.soilType === 'lightweight-potting-mix') recs.push('Lightweight mixes dry fast — consider a wetting agent or moisture-retaining amendment');

  if (typeof pH === 'number') {
    if (pH < 6) recs.push(`Local soil pH is ${pH.toFixed(1)} (acidic) — add lime to move toward the 6.2-6.8 sweet spot`);
    else if (pH > 7.3) recs.push(`Local soil pH is ${pH.toFixed(1)} (alkaline) — incorporate sulfur or peat to lower it`);
    else recs.push(`Local soil pH is ${pH.toFixed(1)} — in the ideal range for nutrient availability`);
  }

  recs.push('Apply 2-3 inches of mulch to hold moisture and steady root-zone temperature');
  return recs;
}
