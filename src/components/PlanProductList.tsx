import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";
import {
  fetchProductImageMap,
  findProductImage,
  shortenProductTitle,
} from "@/lib/productImages";

interface PlanProductListProps {
  products: { productTitle: string; multiplier: number }[];
}

export default function PlanProductList({ products }: PlanProductListProps) {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    fetchProductImageMap().then((map) => {
      if (!cancelled) setImages(map);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ul className="space-y-2">
      {products.map((product, index) => {
        const image = findProductImage(images, product.productTitle);
        return (
          <li
            key={`${product.productTitle}-${index}`}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-2"
          >
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white border border-gray-100 flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt={product.productTitle}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              ) : (
                <Leaf className="h-4 w-4 text-green-600" />
              )}
            </div>
            <p
              className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800"
              title={product.productTitle}
            >
              {shortenProductTitle(product.productTitle)}
            </p>
            {product.multiplier > 1 && (
              <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-gray-500 border border-gray-200">
                ×{product.multiplier}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
