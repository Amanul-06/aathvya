import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { shopifyFetch } from "@/lib/shopify";
import { HOME_QUERY } from "@/lib/queries";
import type { ShopifyProduct, ShopifyCollection } from "@/types/shopify";

type HomeData = {
  products: { nodes: ShopifyProduct[] };
  collections: { nodes: ShopifyCollection[] };
};

const collectionImages = [
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85"
];

export default async function HomePage() {
  let products: ShopifyProduct[] = [];
  let collections: ShopifyCollection[] = [];
  let storeConnected = true;

  try {
    const data = await shopifyFetch<HomeData>(HOME_QUERY);
    products = data.products.nodes;
    collections = data.collections.nodes;
  } catch (error) {
    storeConnected = false;
    console.error("House of Aathvya storefront:", error);
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <div className="hero-image" />
          <div className="hero-shade" />
          <div className="hero-content">
            <span className="eyebrow hero-eyebrow">A SIGNATURE OF YOU</span>
            <h1>Elegance, in<br /><em>every detail.</em></h1>
            <p>Jewellery that feels personal. Pieces that become part of your story, every day.</p>
            <Link href="/collections" className="button button-ivory">DISCOVER THE COLLECTION <span>↗</span></Link>
          </div>
          <div className="hero-foot"><span>HOUSE OF AATHVYA</span><span>TIMELESS · PERSONAL · YOURS</span></div>
        </section>

        <section className="intro-section section-shell">
          <span className="eyebrow">A HOUSE OF MEANINGFUL DETAILS</span>
          <div>
            <h2>Some things are worn.<br /><em>Some become a part of you.</em></h2>
            <p>At House of Aathvya, we believe in the quiet confidence of a piece chosen just right. Discover considered designs that bring a little more beauty to the everyday.</p>
            <Link href="/collections" className="text-link">THE HOUSE, DISCOVERED <span>↗</span></Link>
          </div>
        </section>

        <section className="collections-section">
          <div className="section-shell">
            <div className="section-heading">
              <div><span className="eyebrow">CURATED FOR YOU</span><h2>Find your <em>expression.</em></h2></div>
              <Link href="/collections" className="text-link">VIEW ALL COLLECTIONS ↗</Link>
            </div>
            <div className="collection-grid">
              {(collections.length ? collections.slice(0, 3) : [
                { id: "fallback-1", title: "Everyday Edit", handle: "", description: "", image: null },
                { id: "fallback-2", title: "The Statement", handle: "", description: "", image: null },
                { id: "fallback-3", title: "Timeless Icons", handle: "", description: "", image: null }
              ]).map((collection, index) => (
                <Link href={collection.handle ? `/collections/${collection.handle}` : "/collections"} className="collection-tile" key={collection.id}>
                  <div className="collection-tile-image">
                    <img src={collection.image?.url || collectionImages[index]} alt={collection.title} loading="lazy" />
                    <span className="tile-arrow">↗</span>
                  </div>
                  <div className="collection-tile-caption"><div><h3>{collection.title}</h3><span>EXPLORE COLLECTION</span></div><span className="tile-index">0{index + 1}</span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bestsellers-section section-shell" id="bestsellers">
          <div className="section-heading">
            <div><span className="eyebrow">THE AATHVYA SELECTION</span><h2>Beloved <em>pieces.</em></h2></div>
            <Link href="/collections" className="text-link">SHOP ALL PIECES ↗</Link>
          </div>
          {products.length ? (
            <div className="product-grid">{products.slice(0, 8).map(product => <ProductCard key={product.id} product={product} />)}</div>
          ) : (
            <div className="empty-store">
              <span className="empty-monogram">A.</span>
              <h3>{storeConnected ? "A new collection is taking shape." : "Our collection is momentarily unavailable."}</h3>
              <p>{storeConnected ? "Our latest pieces will appear here soon." : "Please check the Shopify Storefront API configuration and product publishing settings."}</p>
              <Link href="/collections" className="button button-dark">EXPLORE THE HOUSE ↗</Link>
            </div>
          )}
        </section>

        <section className="editorial-section">
          <div className="editorial-photo" />
          <div className="editorial-copy"><span className="eyebrow">THE AATHVYA PERSPECTIVE</span><h2>Not made for<br /><em>the occasion.</em><br />Made for you.</h2><p>The best pieces are the ones that feel like they have always belonged. Find the details that make your everyday unmistakably yours.</p><Link href="/collections" className="button button-ivory">FIND YOUR PIECE ↗</Link></div>
        </section>

        <section className="promise-row section-shell">
          <div><span>✳</span><h3>Thoughtful selection</h3><p>Pieces chosen with an eye for detail.</p></div>
          <div><span>◇</span><h3>Everyday expression</h3><p>Personal style, made beautifully simple.</p></div>
          <div><span>○</span><h3>Made to be gifted</h3><p>A meaningful gesture for someone special.</p></div>
        </section>

        <section className="closing-section">
          <span className="eyebrow">WELCOME TO THE HOUSE</span>
          <h2>Make it <em>personal.</em></h2>
          <p>Discover the pieces that feel like you.</p>
          <Link href="/collections" className="button button-dark">EXPLORE HOUSE OF AATHVYA ↗</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
