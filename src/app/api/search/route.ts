import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";
import { SEARCH_QUERY } from "@/lib/queries";
import type { ShopifyProduct } from "@/types/shopify";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim();
  if (!query) return NextResponse.json({ products: [] });
  try {
    const data = await shopifyFetch<{ search: { nodes: ShopifyProduct[] } }>(
      SEARCH_QUERY, { query: `title:*${query}*` }, 30
    );
    return NextResponse.json({ products: data.search.nodes });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Search failed." }, { status: 500 });
  }
}
