"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToBag({ variantId, available }: { variantId: string; available: boolean }) {
  const { addItem, loading } = useCart();
  const [added, setAdded] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAdd() {
    setMessage("");
    setAdded(false);
    try {
      await addItem(variantId);
      setAdded(true);
      setMessage("Added to your bag.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not add this item.");
    }
  }

  return (
    <div className="add-to-bag-wrap">
      <button className="button button-dark add-to-bag" disabled={!available || loading} onClick={handleAdd}>
        {loading ? "ADDING..." : added ? "ADDED TO BAG ✓" : available ? "ADD TO BAG" : "SOLD OUT"}
      </button>
      {message && <p className={added ? "form-success" : "form-error"} role="status">{message}</p>}
    </div>
  );
}
