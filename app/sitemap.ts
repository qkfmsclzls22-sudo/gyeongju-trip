import type { MetadataRoute } from "next";
import { LANDMARK_DATA } from "@/lib/landmarks";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/tours",
    "/tours/museum",
    "/tours/night",
    "/tours/bulguksa",
    "/groups",
    "/guide",
    "/company",
    "/help",
    "/quote",
    "/terms",
    "/privacy",
    ...Object.keys(LANDMARK_DATA).map((s) => "/landmarks/" + s),
  ];
  return paths.map((p) => ({
    url: "https://www.gjtrip.co.kr" + p,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p.startsWith("/tours") ? 0.9 : 0.6,
  }));
}
