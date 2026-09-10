interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
  image: string;
  price?: number | string | { toString(): string };
  currency?: string;
  sku?: string;
  category?: string;
}

export default function ProductSchema({
  name,
  description,
  url,
  image,
  price,
  currency = "AED",
  sku,
  category = "Umrah Travel Package",
}: ProductSchemaProps) {
  const numericPrice = Number(price);

  /*
   * Remove Markdown formatting from descriptions before
   * placing them inside structured data.
   */
  const cleanDescription = description
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\r?\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",

    "@id": `${url}#product`,

    name,
    description: cleanDescription,
    url,

    image: [image],

    /*
     * Connect the Product to the main Umrah Tours
     * organization entity.
     */
    brand: {
  "@type": "Brand",
  name: "Umrah Tours",
},

    category,

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