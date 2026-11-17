export type Money = { amount: string; currencyCode: string };
export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};
export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  price: Money;
  selectedOptions: { name: string; value: string }[];
};
export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  variants: { nodes: ProductVariant[] };
};
export type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products?: { nodes: ShopifyProduct[] };
};
export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { title: string; handle: string; featuredImage: ShopifyImage | null };
    price: Money;
  };
};
export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money; totalAmount: Money };
  lines: { nodes: CartLine[] };
};
