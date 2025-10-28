import { Card } from '@/components/ui/card';
import { Package, Loader2, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface ShopifyProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  productType: string;
  vendor: string;
}

const ProductRecommendationsCard = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [storeDomain, setStoreDomain] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    fetchShopifyProducts();
  }, []);

  const fetchShopifyProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('get-shopify-products', {
        body: { productType: 'Lawn Care' }
      });

      if (error) throw error;

      if (data?.products && data.products.length > 0) {
        setProducts(data.products.slice(0, 3));
      }
      
      if (data?.storeDomain) {
        setStoreDomain(data.storeDomain);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Unable to load products",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6 bg-white rounded-xl shadow-md mb-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      </Card>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 bg-white rounded-xl shadow-md mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Package className="h-6 w-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">
          Recommended Products for Your Lawn
        </h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product: ShopifyProduct) => (
          <div key={product.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            {product.image && (
              <div className="relative pb-[75%] mb-3 overflow-hidden rounded-lg bg-white">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">{product.description}</p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl font-bold text-green-600">${product.price}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-gray-400 line-through">${product.compareAtPrice}</span>
              )}
            </div>
            {storeDomain && (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.open(`https://${storeDomain}/products/${product.title.toLowerCase().replace(/\s+/g, '-')}`, '_blank')}
              >
                View Product <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProductRecommendationsCard;
