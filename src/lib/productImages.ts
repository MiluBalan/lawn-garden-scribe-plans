const STORE_PRODUCTS_URL = "https://biogrowthorganics.com/products.json?limit=250";

const normalize = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");

let cache: Promise<Record<string, string>> | null = null;

/**
 * Public storefront product feed → { normalizedTitle: imageUrl }.
 * The subscription API doesn't return images, so we map by product title.
 */
export function fetchProductImageMap(): Promise<Record<string, string>> {
  if (!cache) {
    cache = fetch(STORE_PRODUCTS_URL)
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, string> = {};
        (data?.products || []).forEach((p: any) => {
          const src = p?.images?.[0]?.src;
          if (p?.title && src) map[normalize(p.title)] = src;
        });
        return map;
      })
      .catch(() => ({}));
  }
  return cache;
}

/** Match a subscription product title against the storefront titles. */
export function findProductImage(
  map: Record<string, string>,
  title: string,
): string | undefined {
  if (!title) return undefined;
  const key = normalize(title);
  if (map[key]) return map[key];

  const entries = Object.entries(map);
  const partial = entries.find(
    ([storeKey]) => storeKey.startsWith(key) || key.startsWith(storeKey),
  );
  if (partial) return partial[1];

  // Fall back to the leading brand/product word (e.g. "VitaLawn", "Catalyst").
  const firstWord = normalize(title.split(/\s+/)[0] || "");
  if (firstWord.length >= 4) {
    const byWord = entries.find(([storeKey]) => storeKey.startsWith(firstWord));
    if (byWord) return byWord[1];
  }

  return undefined;
}

/**
 * Trim marketing tails so the card shows a short, single-line product name.
 * "Citrus Liquid Organic Plant Vitamin for Lemon, Orange..." → "Citrus Liquid Organic Plant Vitamin"
 */
export function shortenProductTitle(title: string): string {
  if (!title) return "";
  return title
    .replace(/\s*[-–—|]\s*.*$/, "")
    .replace(/\s+for\s+.*$/i, "")
    .replace(/\s*\([^)]*\)\s*$/, "")
    .trim() || title;
}
