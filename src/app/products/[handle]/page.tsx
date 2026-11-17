import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToBag from "@/components/AddToBag";
import { shopifyFetch, formatMoney } from "@/lib/shopify";
import { PRODUCT_QUERY } from "@/lib/queries";
import type { ShopifyProduct } from "@/types/shopify";

type Result = { product: ShopifyProduct | null };

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  try {
    const data = await shopifyFetch<Result>(PRODUCT_QUERY, { handle });
    return { title: data.product?.title || "Product" };
  } catch { return { title: "Product" }; }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  let product: ShopifyProduct | null = null;
  try {
    const data = await shopifyFetch<Result>(PRODUCT_QUERY, { handle });
    product = data.product;
  } catch (error) {
    console.error("Product detail error:", error);
  }
  if (!product) notFound();

  const images = product.images.nodes.length ? product.images.nodes : product.featuredImage ? [product.featuredImage] : [];
  const firstAvailable = product.variants.nodes.find(variant => variant.availableForSale);

  return <>
    <Navbar />
    <main className="product-page">
      <div className="breadcrumb"><Link href="/">HOME</Link><span>/</span><Link href="/collections">COLLECTIONS</Link><span>/</span><span>{product.title.toUpperCase()}</span></div>
      <div className="product-layout">
        <div className="product-gallery">{images.length ? images.map((image, index) => <div className="product-gallery-image" key={`${image.url}-${index}`}><img src={image.url} alt={image.altText || product.title} /></div>) : <div className="image-placeholder">A.</div>}</div>
        <div className="product-information">
          <span className="eyebrow">HOUSE OF AATHVYA</span>
          <h1>{product.title}</h1>
          <div className="product-price">{formatMoney(product.priceRange.minVariantPrice)}</div>
          <div className="product-description">{product.description}</div>
          {firstAvailable ? <AddToBag variantId={firstAvailable.id} available={product.availableForSale} /> : <button className="button button-dark add-to-bag" disabled>SOLD OUT</button>}
          <div className="product-note"><span>✳</span><p>Thoughtfully selected. Made to become part of your story.</p></div>
          <div className="product-accordion"><details open><summary>PRODUCT DETAILS</summary><p>{product.description || "A considered piece from House of Aathvya."}</p></details><details><summary>CARE & CONSIDERATION</summary><p>Store your jewellery in a dry place and avoid direct contact with perfumes, lotions and harsh chemicals. Follow the care guidance supplied with your piece.</p></details></div>
        </div>
      </div>
    </main>
    <Footer />
  </>;
}
