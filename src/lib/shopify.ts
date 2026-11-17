const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const version = process.env.SHOPIFY_API_VERSION || "2026-10";

type ShopifyResponse<T> = { data: T; errors?: { message: string }[] };

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate = 60
): Promise<T> {
  if (!domain || !token) {
    throw new Error("Shopify is not configured. Add the required values to .env.local.");
  }

  const response = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate }
  });

  const result = (await response.json()) as ShopifyResponse<T>;
  if (!response.ok || result.errors?.length) {
    throw new Error(result.errors?.map((error) => error.message).join("; ") || "Shopify request failed.");
  }
  return result.data;
}

export function formatMoney(money: { amount: string; currencyCode: string }) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: 0
  }).format(Number(money.amount));
}
