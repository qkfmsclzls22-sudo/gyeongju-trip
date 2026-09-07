import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules:
      process.env.VERCEL_ENV === "preview"
        ? { userAgent: "*", disallow: "/" }
        : {
            userAgent: "*",
            allow: "/",
            disallow: [
              "/api/",
              "/account",
              "/login",
              "/checkout",
              "/payments/",
            ],
          },
    sitemap: "https://www.gjtrip.co.kr/sitemap.xml",
  };
}
