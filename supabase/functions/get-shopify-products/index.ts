import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  variants: Array<{
    id: number;
    price: string;
    compare_at_price: string | null;
  }>;
  images: Array<{
    src: string;
    alt: string | null;
  }>;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get Shopify credentials from secrets
    const { data: secrets, error: secretsError } = await supabaseClient
      .from('decrypted_secrets')
      .select('name, secret')
      .in('name', ['SHOPIFY_ADMIN_API_ACCESS_TOKEN', 'SHOPIFY_STORE_DOMAIN']);

    if (secretsError) throw secretsError;

    const accessToken = secrets.find(s => s.name === 'SHOPIFY_ADMIN_API_ACCESS_TOKEN')?.secret;
    const storeDomain = secrets.find(s => s.name === 'SHOPIFY_STORE_DOMAIN')?.secret;

    if (!accessToken || !storeDomain) {
      throw new Error('Shopify credentials not configured');
    }

    // Fetch products from Shopify
    const body = await req.json().catch(() => ({}));
    const { productType } = body;
    
    let url = `https://${storeDomain}/admin/api/2024-01/products.json?limit=10`;
    if (productType) {
      url += `&product_type=${encodeURIComponent(productType)}`;
    }

    const response = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform products to a simpler format
    const products = data.products.map((product: ShopifyProduct) => ({
      id: product.id,
      title: product.title,
      description: product.body_html?.replace(/<[^>]*>/g, '').substring(0, 150) || '',
      price: product.variants[0]?.price || '0',
      compareAtPrice: product.variants[0]?.compare_at_price,
      image: product.images[0]?.src || '',
      productType: product.product_type,
      vendor: product.vendor,
    }));

    return new Response(JSON.stringify({ products, storeDomain }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
