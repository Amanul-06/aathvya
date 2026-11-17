
"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/shopify";

export default function CartPage() {
  const { cart, loading, error, updateItem, removeItem } = useCart();

  const lines = cart?.lines.nodes ?? [];
  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);

  return (
    <>
      <Navbar />

      <main className="cart-page">
        <section className="cart-heading">
          <span className="eyebrow">A LITTLE SOMETHING FOR YOU</span>
          <h1>Your bag<span>.</span></h1>
          <p>
            Thoughtfully chosen. Beautifully yours.
          </p>
        </section>

        {error && (
          <p className="form-error cart-error" role="alert">
            {error}
          </p>
        )}

        {loading && !cart ? (
          <div className="cart-loading">
            <span className="cart-loading-mark">A.</span>
            <p>Preparing your selection...</p>
          </div>
        ) : lines.length === 0 ? (
          <section className="cart-empty">
            <span className="cart-empty-mark">A.</span>
            <span className="eyebrow">NOTHING JUST YET</span>
            <h2>Your bag is waiting.</h2>
            <p>
              There is something special waiting to be discovered.
              Find a piece that feels like you.
            </p>
            <Link href="/collections" className="cart-continue-button">
              EXPLORE THE COLLECTION <span>↗</span>
            </Link>
          </section>
        ) : (
          <section className="cart-content">
            <div className="cart-items-section">
              <div className="cart-section-heading">
                <h2>Your selection</h2>
                <span>
                  {itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"}
                </span>
              </div>

              <div className="cart-items">
                {lines.map((line) => {
                  const product = line.merchandise.product;
                  const image = product.featuredImage;

                  return (
                    <article className="cart-item" key={line.id}>
                      <Link
                        href={`/products/${product.handle}`}
                        className="cart-item-image"
                        aria-label={`View ${product.title}`}
                      >
                        {image ? (
                          <img
                            src={image.url}
                            alt={image.altText || product.title}
                          />
                        ) : (
                          <span className="cart-image-placeholder">A.</span>
                        )}
                      </Link>

                      <div className="cart-item-details">
                        <div className="cart-item-top">
                          <div>
                            <Link
                              href={`/products/${product.handle}`}
                              className="cart-item-title"
                            >
                              {product.title}
                            </Link>

                            <p className="cart-item-variant">
                              {line.merchandise.title !== "Default Title"
                                ? line.merchandise.title
                                : "One beautiful piece"}
                            </p>
                          </div>

                          <strong className="cart-item-price">
                            {formatMoney(line.merchandise.price)}
                          </strong>
                        </div>

                        <div className="cart-item-bottom">
                          <div
                            className="cart-quantity"
                            aria-label="Quantity controls"
                          >
                            <button
                              type="button"
                              disabled={loading || line.quantity <= 1}
                              onClick={() =>
                                void updateItem(line.id, line.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>

                            <span aria-live="polite">{line.quantity}</span>

                            <button
                              type="button"
                              disabled={loading}
                              onClick={() =>
                                void updateItem(line.id, line.quantity + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="cart-remove"
                            disabled={loading}
                            onClick={() => void removeItem(line.id)}
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <Link href="/collections" className="cart-back-link">
                <span>←</span> CONTINUE SHOPPING
              </Link>
            </div>

            <aside className="cart-order-summary">
              <span className="eyebrow">THE DETAILS</span>
              <h2>Order summary</h2>

              <div className="cart-summary-row">
                <span>Subtotal ({itemCount} items)</span>
                <strong>{formatMoney(cart.cost.subtotalAmount)}</strong>
              </div>

              <div className="cart-summary-shipping">
                <span>Shipping & taxes</span>
                <p>Calculated at checkout</p>
              </div>

              <div className="cart-summary-divider" />

              <div className="cart-summary-total">
                <span>Estimated total</span>
                <strong>{formatMoney(cart.cost.subtotalAmount)}</strong>
              </div>

              <p className="cart-summary-note">
                Your final total, including shipping and applicable taxes,
                will be confirmed at checkout.
              </p>

              <a
                href={cart.checkoutUrl}
                className="cart-checkout-button"
              >
                PROCEED TO CHECKOUT <span>↗</span>
              </a>

              <div className="cart-secure-note">
                <span>✳</span>
                <p>Secure checkout. A little luxury, made simple.</p>
              </div>
            </aside>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
