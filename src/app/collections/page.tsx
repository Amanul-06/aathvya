import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { shopifyFetch } from "@/lib/shopify";
import { COLLECTIONS_QUERY } from "@/lib/queries";
import type { ShopifyCollection } from "@/types/shopify";

export const metadata: Metadata = { title: "Collections" };

export default async function CollectionsPage() {
  let collections: ShopifyCollection[] = [];
  try {
    const data = await shopifyFetch<{ collections: { nodes: ShopifyCollection[] } }>(COLLECTIONS_QUERY);
    collections = data.collections.nodes;
  } catch (error) {
    console.error("Collections error:", error);
  }

  return <>
    <Navbar />
    <main className="listing-page">
      <div className="page-intro"><span className="eyebrow">HOUSE OF AATHVYA</span><h1>Our <em>collections.</em></h1><p>Explore the pieces that bring your personal style to life.</p></div>
      {collections.length ? <div className="collection-grid listing-collection-grid">{collections.map((collection, index) => <Link className="collection-tile" href={`/collections/${collection.handle}`} key={collection.id}><div className="collection-tile-image">{collection.image?.url ? <img src={collection.image.url} alt={collection.title} /> : <div className="image-placeholder">A.</div>}<span className="tile-arrow">↗</span></div><div className="collection-tile-caption"><div><h3>{collection.title}</h3><span>EXPLORE COLLECTION</span></div><span className="tile-index">0{index + 1}</span></div></Link>)}</div> : <div className="empty-store"><h3>No collections to display yet.</h3><p>Publish collections to the Headless sales channel in Shopify.</p></div>}
    </main>
    <Footer />
  </>;
}
