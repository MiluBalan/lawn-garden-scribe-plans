

## Plan: Unique colors per subscription card with hover effects

### Color scheme per card

| Card | Badge | Button | Hover border | Icon/Price/Check |
|------|-------|--------|-------------|-----------------|
| Basic | `bg-blue-500` | `bg-blue-500 hover:bg-blue-600` | `border-blue-500` | `text-blue-500` |
| Advanced | `bg-green-600` | `bg-green-600 hover:bg-green-700` | `border-green-600` | `text-green-600` |
| Premium | `bg-purple-600` | `bg-purple-600 hover:bg-purple-700` | `border-purple-600` | `text-purple-600` |
| Enterprise | `bg-amber-500` | `bg-amber-500 hover:bg-amber-600` | `border-amber-500` | `text-amber-500` |

### Changes in `src/components/SubscriptionPlans.tsx`

1. **Add color config to `allPlans`**: Each plan gets a color object with `badge`, `button`, `buttonHover`, `border`, `text` classes.

2. **Card hover effect**: Add `transition-all duration-300 hover:shadow-xl hover:-translate-y-1` and `hover:border-2 hover:border-{color}` using the plan's assigned border color. Use `border-2 border-transparent` as default so layout doesn't shift on hover.

3. **Dynamic badge color**: Replace hardcoded `bg-green-600` with each plan's badge color.

4. **Dynamic button color**: Replace hardcoded `bg-green-600 hover:bg-green-700` with each plan's button colors.

5. **Dynamic icon, price, check, discount colors**: Replace `text-green-600` with each plan's text color.

6. **Enterprise card**: Update from `border-green-600` to `border-amber-500`, button to amber, icon/checks to amber. Same hover effect.

### Technical detail

Since Tailwind needs full class names (no string interpolation), the color config will use complete class strings like `"bg-blue-500"` rather than constructing them dynamically.

