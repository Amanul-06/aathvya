export const IMAGE_FRAGMENT = `
  fragment ImageFields on Image {
    url
    altText
    width
    height
  }
`;

export const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCardFields on Product {
    id
    title
    handle
    description
    availableForSale
    featuredImage { ...ImageFields }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
  }
  ${IMAGE_FRAGMENT}
`;

export const HOME_QUERY = `
  query HomePage {
    products(first: 8, sortKey: BEST_SELLING) {
      nodes { ...ProductCardFields }
    }
    collections(first: 3) {
      nodes {
        id title handle description image { ...ImageFields }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const COLLECTIONS_QUERY = `
  query Collections {
    collections(first: 50, sortKey: TITLE) {
      nodes { id title handle description image { ...ImageFields } }
    }
  }
  ${IMAGE_FRAGMENT}
`;

export const COLLECTION_QUERY = `
  query Collection($handle: String!) {
    collection(handle: $handle) {
      id title handle description image { ...ImageFields }
      products(first: 50) { nodes { ...ProductCardFields } }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const PRODUCT_QUERY = `
  query Product($handle: String!) {
    product(handle: $handle) {
      ...ProductCardFields
      images(first: 10) {
        nodes {
          ...ImageFields
        }
      }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const SEARCH_QUERY = `
  query SearchProducts($query: String!) {
    search(query: $query, first: 24, types: PRODUCT) {
      nodes {
        ... on Product { ...ProductCardFields }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id title
            price { amount currencyCode }
            product {
              title handle
              featuredImage { ...ImageFields }
            }
          }
        }
      }
    }
  }
  ${IMAGE_FRAGMENT}
`;
