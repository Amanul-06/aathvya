import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { shopifyFetch } from "@/lib/shopify";
import { COLLECTION_QUERY } from "@/lib/queries";
import type { ShopifyCollection } from "@/types/shopify";
import { notFound } from "next/navigation";

type Result = { collection: ShopifyCollection | null };

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  try {
    const data = await shopifyFetch<Result>(COLLECTION_QUERY, { handle });
    return { title: data.collection?.title || "Collection" };
  } catch { return { title: "Collection" }; }
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  let collection: ShopifyCollection | null = null;
  try {
    const data = await shopifyFetch<Result>(COLLECTION_QUERY, { handle });
    collection = data.collection;
  } catch (error) {
    console.error("Collection detail error:", error);
  }
  if (!collection) notFound();

  return <>
    <Navbar />
    <main className="listing-page">
      <div className="breadcrumb"><Link href="/">HOME</Link><span>/</span><Link href="/collections">COLLECTIONS</Link><span>/</span><span>{collection.title.toUpperCase()}</span></div>
      <div className="page-intro collection-page-intro"><span className="eyebrow">THE AATHVYA EDIT</span><h1>{collection.title}<em>.</em></h1>{collection.description && <p>{collection.description}</p>}</div>
      {collection.products?.nodes.length ? <div className="product-grid">{collection.products.nodes.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-store"><h3>More beautiful things, soon.</h3><p>There are no products in this collection yet.</p></div>}
    </main>
    <Footer />
  </>;
}
