interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
  image: string;
  price?: number | string | { toString(): string };
  currency?: string;
  sku?: string;
  brand?: string;
}

export default function ProductSchema({
  name,
  description,
  url,
  image,
  price,
  currency = "AED",
  sku,
  brand = "Umrah Tours",
}: ProductSchemaProps) {
  const numericPrice = Number(price);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,

    name,
    description,
    url,

    image: [image],

    brand: {
      "@type": "Brand",
      name: brand,
    },

    category: "Holiday Travel Package",

    ...(sku
      ? {
          sku,
        }
      : {}),

    ...(Number.isFinite(numericPrice) && numericPrice > 0
      ? {
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: currency,
            price: numericPrice.toFixed(2),
            availability: "https://schema.org/InStock",

            seller: {
              "@id": "https://umrahtours.co/#organization",
            },
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}