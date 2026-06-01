# Plan: Plant-Type-Specific Questions in Garden Flow

Add 2 new steps after the current Garden step 3 (Location & Conditions) and before the existing Garden Preferences step, with questions tailored to the chosen plant type (Flowers / Vegetables / Fruits). Report generation runs after all steps are complete.

## New Flow (Garden)

1. Plant Type
2. Garden Size
3. Location & Conditions (Sunlight + Soil)
4. **NEW — Step 4: Plant Basics** (2 shared + 1 specific)
5. **NEW — Step 5: Plant Care** (1 shared + 2 specific)
6. Garden Preferences (existing)
7. Generate Report

## Questions

### Step 4 — Plant Basics

**Shared (all plant types):**
- *Are you growing from seeds, seedlings, or established plants?*
  - Seeds
  - Seedlings / starts
  - Established plants
  - Mix of these
- *Which season are you planting in?*
  - Spring
  - Summer
  - Fall
  - Year-round / indoor

**Specific:**
- **Flowers:** *What type of flowers are you growing?*
  - Annuals
  - Perennials
  - Bulbs
  - Mix
- **Vegetables:** *What vegetables are you primarily growing?*
  - Leafy greens
  - Root vegetables
  - Fruiting vegetables (tomatoes, peppers)
  - Herbs
  - Mix
- **Fruits:** *What type of fruit plants?*
  - Berry bushes
  - Fruit trees
  - Vines (grapes, melons)
  - Mix

### Step 5 — Plant Care

**Shared:**
- *How would you describe the spacing of your plants?*
  - Densely planted
  - Moderately spaced
  - Widely spaced

**Specific:**
- **Flowers:**
  - *What's your main flower goal?* — More blooms / Longer bloom season / Bigger, fuller plants / Vibrant colors
  - *Any pest or disease issues?* — Aphids/pests / Powdery mildew / Yellowing leaves / None
- **Vegetables:**
  - *What's most important to you?* — Higher yield / Faster harvest / Better flavor / Pest resistance
  - *Any current issues?* — Slow growth / Pests / Yellow leaves / Poor fruiting / None
- **Fruits:**
  - *What's your main fruit goal?* — Bigger fruit / Sweeter taste / Higher yield / Healthier trees/bushes
  - *Any current issues?* — Few fruits / Pests / Leaf disease / Dropping fruit / None

## Technical Details

**New files:**
- `src/components/PlantBasicsStep.tsx` — Step 4 component
- `src/components/PlantCareStep.tsx` — Step 5 component

Both render different specific questions based on `planData.plantType`, using the same card/radio styling as existing `GardenPreferencesStep.tsx`.

**Edits to `src/components/LawnQuestionnaire.tsx`:**
- Extend `planData` state with new fields:
  - `growthStage`, `plantingSeason`, `plantSpacing` (shared)
  - `flowerType` | `vegetableType` | `fruitType` (one set used)
  - `plantGoal`, `plantIssues` (specific per type)
- Update `getTotalSteps()` garden branch from `4` → `6` (Plan type + 5 garden steps, plus existing Preferences step which is already counted in current flow — confirm during implementation).
- Insert cases `4` (PlantBasicsStep) and `5` (PlantCareStep) before the existing Garden Preferences case; renumber subsequent steps.
- Add titles in `getStepTitle()`: "Plant Basics", "Plant Care".
- Add validation in `canProceed()` for each new step (all questions required except issues which can be "None").
- Reset new fields in `handleRestart()`.

**No backend / business-logic changes.** Plan generation continues to fire after the final step.