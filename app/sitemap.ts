import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  return [
    {
      url: "https://www.umrahtours.co",
      lastModified: new Date(),
    },

    {
      url: "https://www.umrahtours.co/umrah",
      lastModified: new Date(),
    },

    {
      url: "https://www.umrahtours.co/visa",
      lastModified: new Date(),
    },

    {
      url: "https://www.umrahtours.co/hotels",
      lastModified: new Date(),
    },

    {
      url: "https://www.umrahtours.co/contact",
      lastModified: new Date(),
    },
  ];
}