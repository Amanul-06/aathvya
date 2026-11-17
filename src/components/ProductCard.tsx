import Link from "next/link";
import type { ShopifyProduct } from "@/types/shopify";
import { formatMoney } from "@/lib/shopify";

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.handle}`} className="product-card-image">
        {product.featuredImage ? (
          // Shopify CDN image URL is supplied by the Storefront API.
          <img src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} loading="lazy" />
        ) : <div className="image-placeholder">A.</div>}
        {!product.availableForSale && <span className="sold-out-label">SOLD OUT</span>}
        <span className="product-card-quickview">DISCOVER <span>↗</span></span>
      </Link>
      <div className="product-card-meta">
        <Link href={`/products/${product.handle}`} className="product-card-title">{product.title}</Link>
        <span className="product-card-price">{formatMoney(product.priceRange.minVariantPrice)}</span>
      </div>
    </article>
  );
}
