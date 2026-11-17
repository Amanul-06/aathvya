import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";
import { CART_FRAGMENT } from "@/lib/queries";
import type { ShopifyCart } from "@/types/shopify";

type CartResult = { cart: ShopifyCart | null };

const CREATE_CART = `
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;
const GET_CART = `
  query GetCart($id: ID!) {
    cart(id: $id) { ...CartFields }
  }
  ${CART_FRAGMENT}
`;
const ADD_LINES = `
  mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;
const UPDATE_LINES = `
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;
const REMOVE_LINES = `
  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, cartId, variantId, quantity = 1, lineId } = body;

    if (action === "get") {
      const data = await shopifyFetch<{ cart: ShopifyCart | null }>(GET_CART, { id: cartId }, 0);
      return NextResponse.json({ cart: data.cart });
    }

    if (action === "add") {
      if (!variantId) return NextResponse.json({ error: "Choose a product option first." }, { status: 400 });
      if (cartId) {
        const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart; userErrors: { message: string }[] } }>(
          ADD_LINES, { cartId, lines: [{ merchandiseId: variantId, quantity }] }, 0
        );
        if (data.cartLinesAdd.userErrors.length) throw new Error(data.cartLinesAdd.userErrors.map(e => e.message).join(", "));
        return NextResponse.json({ cart: data.cartLinesAdd.cart });
      }
      const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart; userErrors: { message: string }[] } }>(
        CREATE_CART, { input: { lines: [{ merchandiseId: variantId, quantity }] } }, 0
      );
      if (data.cartCreate.userErrors.length) throw new Error(data.cartCreate.userErrors.map(e => e.message).join(", "));
      return NextResponse.json({ cart: data.cartCreate.cart });
    }

    if (!cartId || !lineId) return NextResponse.json({ error: "Cart information is missing." }, { status: 400 });

    if (action === "update") {
      const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart; userErrors: { message: string }[] } }>(
        UPDATE_LINES, { cartId, lines: [{ id: lineId, quantity }] }, 0
      );
      if (data.cartLinesUpdate.userErrors.length) throw new Error(data.cartLinesUpdate.userErrors.map(e => e.message).join(", "));
      return NextResponse.json({ cart: data.cartLinesUpdate.cart });
    }

    if (action === "remove") {
      const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart; userErrors: { message: string }[] } }>(
        REMOVE_LINES, { cartId, lineIds: [lineId] }, 0
      );
      if (data.cartLinesRemove.userErrors.length) throw new Error(data.cartLinesRemove.userErrors.map(e => e.message).join(", "));
      return NextResponse.json({ cart: data.cartLinesRemove.cart });
    }

    return NextResponse.json({ error: "Unsupported cart action." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Cart request failed." },
      { status: 500 }
    );
  }
}
