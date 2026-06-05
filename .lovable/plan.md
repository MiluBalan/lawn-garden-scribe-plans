## Goal
Apply the "Garden Step 2" treatment (gradient hero banner with blur blobs, hero imagery, step badge, animated icon cards, color-coded selection rings, check badges) across all questionnaire steps and polish the landing page sections — keeping the existing emerald/amber palette, just richer.

## Scope

### Garden flow steps (shared questionnaire)
1. **PlanTypeStep** — gradient banner + plan-type cards with icons, descriptions, hover lift, animated check badges
2. **PlantTypeStep** — banner + flower/fruit/vegetable cards with thematic colors and hero imagery
3. **GardenSizeStep** — already done, leave as is
4. **PlantBasicsStep** — add a top banner section above existing interactive option grids
5. **PlantCareStep** — add a top banner section above existing interactive option grids
6. **LocationStep** — gradient banner + polish ZIP input and map preview card
7. **GardenPlanResults** — already restructured; add a hero banner header to match

### Lawn flow steps
1. **PlanTypeStep** (shared, covered above)
2. **GrassTypeStep** — gradient banner + grass cards with icons + animated selection
3. **LawnSizeStep** — gradient banner + size cards (mirror GardenSizeStep style)
4. **ProblemAreasStep** — banner + checkbox-style problem tiles with icons
5. **SprinklerSystemStep** — banner + yes/no cards with icons
6. **LocationStep** (shared, covered above)
7. **LawnPlanResults** — add gradient hero banner header + polish summary card

### Landing page (Index.tsx sections)
1. **HeroSection** — enhance gradient background, add blur blobs, refine CTA
2. **FeaturesGrid** — animated icon tiles with gradient backgrounds and hover lift
3. **HowItWorksSection** — numbered step cards with gradient accents and connecting flow
4. **WhyBioGrowthSection** — richer cards with icon backgrounds
5. **JoinThousandsSection** — polish stats with gradient numbers
6. **SoilScienceSection** — richer card styling
7. **GreenBackgroundSection** — enhance background imagery and overlay

## Design Pattern (consistent across pages)
- **Banner**: `rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-8 md:p-12` with two `blur-3xl` color blobs, step badge, gradient text headline, supporting illustration/image
- **Option cards**: `rounded-2xl` with `bg-gradient-to-br`, color-coded per-option icon tile with `group-hover:scale-110 group-hover:rotate-3`, `hover:-translate-y-1 hover:shadow-xl`, animated `Check` badge top-right that scales in when selected
- **Color palette per option**: rotate between sky / emerald / amber / violet / rose / teal accents
- **Section headings**: bold with `bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600`

## Generated assets
- New hero images where needed for landing/results banners (reuse existing assets where possible)

## Implementation order
1. Landing page sections (HeroSection, FeaturesGrid, HowItWorksSection, WhyBioGrowthSection)
2. Shared steps (PlanTypeStep, LocationStep)
3. Garden steps (PlantTypeStep, PlantBasicsStep + PlantCareStep banners, GardenPlanResults header)
4. Lawn steps (GrassTypeStep, LawnSizeStep, ProblemAreasStep, SprinklerSystemStep, LawnPlanResults header)

## Out of scope
- No business logic, routing, data, or backend changes
- No design system token changes — visual polish only via Tailwind classes
- Existing flows, navigation, and component APIs preserved
