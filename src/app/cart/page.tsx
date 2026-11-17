"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/shopify";

export default function CartPage() {
  const { cart, loading, error, updateItem, removeItem } = useCart();

  return <>
    <Navbar />
    <main className="cart-page">
      <div className="page-intro"><span className="eyebrow">YOUR SELECTION</span><h1>Your <em>bag.</em></h1><p>A few beautiful things, chosen by you.</p></div>
      {error && <p className="form-error">{error}</p>}
      {!cart?.lines.nodes.length ? <div className="empty-store"><span className="empty-monogram">A.</span><h3>Your bag is waiting.</h3><p>Explore the collection and find something that feels like you.</p><Link href="/collections" className="button button-dark">DISCOVER THE COLLECTION ↗</Link></div> :
        <div className="cart-layout">
          <div className="cart-lines">{cart.lines.nodes.map(line => <article className="cart-line" key={line.id}>
            <Link href={`/products/${line.merchandise.product.handle}`} className="cart-line-image">{line.merchandise.product.featuredImage && <img src={line.merchandise.product.featuredImage.url} alt={line.merchandise.product.title} />}</Link>
            <div className="cart-line-info"><Link href={`/products/${line.merchandise.product.handle}`}>{line.merchandise.product.title}</Link><span>{line.merchandise.title}</span><strong>{formatMoney(line.merchandise.price)}</strong><div className="quantity-control"><button disabled={loading || line.quantity <= 1} onClick={() => void updateItem(line.id, line.quantity - 1)} aria-label="Decrease quantity">−</button><span>{line.quantity}</span><button disabled={loading} onClick={() => void updateItem(line.id, line.quantity + 1)} aria-label="Increase quantity">+</button></div><button className="remove-line" onClick={() => void removeItem(line.id)}>REMOVE</button></div>
          </article>)}</div>
          <aside className="cart-summary"><span className="eyebrow">ORDER SUMMARY</span><div><span>Subtotal</span><strong>{formatMoney(cart.cost.subtotalAmount)}</strong></div><p>Shipping and taxes are calculated at checkout.</p><a href={cart.checkoutUrl} className="button button-dark checkout-button">PROCEED TO CHECKOUT ↗</a><Link href="/collections" className="continue-shopping">CONTINUE SHOPPING</Link></aside>
        </div>}
    </main>
    <Footer />
  </>;
}
