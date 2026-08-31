# Lawn plans: drive recommendations from Shopify data

Yes — and this is currently broken, which is worth fixing at the same time.

## What the live Shopify data actually says

Your new Seal rule is live in the feed — I can see it:

```text
Small Lawn - Monthly Plan | Monthly subscription | "Under 2499 sq.ft"
  on: VitaLawn Liquid Organic Grass Food & Vitamin
  on: EverGrow Liquid Organic Plant Vitamin for Strong Roots & Flowers
```

The other lawn plans still use the older buckets:

```text
Under 5000 sq.ft
Medium Lawn (5,000 – 10,000 sq ft)
Large Lawn (10,000 – 20,000 sq ft)
Extra Large (20000 - 25000 sq.ft)
```

The app does not show the new rule today. The lawn size selector offers 1,000–2,499 / 2,500–3,999 / 4,000–5,499 / 5,500–6,999 / 7,000+, and the matcher in `SubscriptionPlans.tsx` requires the description to contain both "1000" and "2499" (or the literal "under 2500") — "Under 2499 sq.ft" fails both tests. Even if it matched, the hardcoded `planMap` only knows Basic Green / Eco Saver / Year Round Care, so a group named "Small Lawn - Monthly Plan" would never render. Same story for Extra Large, which uses Core Coverage / Intensive Growth.


## What to build

1. **Parse size buckets out of the Shopify description instead of string-hunting.**
   A parser reads any of the forms above into a numeric `{ min, max }` range (handles "Under N", "N – M", "N - M", commas, "sq.ft"/"sq ft", "N+"). Garden-tagged descriptions (`Garden-...`) stay excluded from the lawn flow.

2. **Map the user's lawn size to a bucket by number, not by text.**
   The selected range resolves to a representative square footage (custom calculator values already give an exact number), then picks the Shopify bucket whose range contains it. Proposed mapping:

   | User selection | Sq ft used | Shopify bucket |
   | --- | --- | --- |
   | 1,000 – 2,499 | 2,499 | **Under 2499 sq.ft (your new Small Lawn rule)** |
   | 2,500 – 3,999 | 3,999 | Under 5,000 |
   | 4,000 – 5,499 | 5,499 | Medium (5,000 – 10,000) |
   | 5,500 – 6,999 | 6,999 | Medium (5,000 – 10,000) |
   | 7,000+ | 7,000 | Medium (5,000 – 10,000) |
   | Custom (calculator) | exact value | narrowest bucket containing it |

   When two buckets both contain a size (2,499 fits both "Under 2499" and "Under 5000"), the narrowest one wins — so the new Small Lawn rule takes precedence for small lawns. Sizes above every bucket fall back to the largest bucket plus the Enterprise card.


3. **Build the tier cards from whatever Shopify returns, instead of a fixed name list.**
   Group the matched selling plans by plan group name (same approach the garden flow already uses in `groupGardenSubscriptionPlans`), sort by discount, and apply the existing three visual tiers (Basic/Advanced/Premium styling) by position. That way Core Coverage / Intensive Growth render correctly for Extra Large, and any new plan group added in Shopify shows up without a code change.

4. **Handle the empty state.** If no bucket matches, show a clear "no plans for this size" message with the Enterprise/contact card rather than a blank grid.

## Technical notes

- Changes are confined to `src/components/SubscriptionPlans.tsx` plus a small shared helper (e.g. `src/lib/lawn.ts`) for bucket parsing and size resolution; quantity multipliers keep using `getProductQuantityMultiplier`.
- No change to the Shopify endpoint, cart/add behaviour, or the garden flow.
- The Extra Large duplicate-render branch in `SubscriptionPlans.tsx` gets removed — the dynamic grouping covers it.

If you'd rather the 4,000–5,499 band stay on the "Under 5,000" product (it straddles the boundary), say so and I'll flip that row before building.
