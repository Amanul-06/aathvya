"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import type { ShopifyProduct } from "@/types/shopify";

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function search(event: React.FormEvent) {
    event.preventDefault();
    if (!term.trim()) return;
    setLoading(true); setError(""); setSearched(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Search failed.");
      setProducts(data.products);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed.");
    } finally { setLoading(false); }
  }

  return <>
    <Navbar />
    <main className="search-page">
      <div className="page-intro"><span className="eyebrow">FIND YOUR AATHVYA</span><h1>What are you <em>looking for?</em></h1></div>
      <form className="search-form" onSubmit={search}><input value={term} onChange={e => setTerm(e.target.value)} placeholder="Search jewellery, pieces, collections..." aria-label="Search products" /><button type="submit" disabled={loading}>{loading ? "SEARCHING..." : "SEARCH ↗"}</button></form>
      {error && <p className="form-error">{error}</p>}
      {searched && !loading && !error && <><p className="search-count">{products.length} result(s) for “{term}”</p>{products.length ? <div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-store"><h3>No pieces found.</h3><p>Try another search.</p></div>}</>}
    </main>
    <Footer />
  </>;
}
