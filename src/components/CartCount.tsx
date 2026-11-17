"use client";
import { useCart } from "@/context/CartContext";

export default function CartCount() {
  const { cart } = useCart();
  return <span className="cart-count">({cart?.totalQuantity ?? 0})</span>;
}
