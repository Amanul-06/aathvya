# House of Aathvya — Shopify storefront

A modular, editorial-style headless Shopify storefront built with Next.js App Router, TypeScript and Tailwind CSS v4.

## Setup

1. Install Node.js 20.9+.
2. Copy `.env.example` to `.env.local`.
3. Add your Shopify store domain and **Storefront API** access token. Never commit `.env.local` or expose the token in browser code.
4. In Shopify Admin, make sure products and collections are published to the Headless sales channel / Storefront API.
5. Run:

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Shopify configuration

Create or use a Shopify Headless sales channel storefront token with the Storefront API permissions required to read products, collections and create/manage carts. The code uses the Storefront GraphQL API and `SHOPIFY_API_VERSION`.

## Included

- Responsive luxury editorial homepage
- Collection index and collection detail pages
- Product detail page with selectable variants
- Shopify cart creation, add/update/remove lines and checkout redirect
- Modular components, contexts, GraphQL queries, types and CSS
- Search page with Shopify product search
- Metadata and responsive mobile navigation

## Notes

- The cart is a Shopify cart, not a simulated local-only cart.
- Checkout is completed on Shopify's hosted checkout URL.
- Replace the sample editorial photography with licensed brand photography before launch.
- Product prices are formatted using the currency returned by Shopify.
