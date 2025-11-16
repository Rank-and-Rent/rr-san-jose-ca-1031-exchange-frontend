import { MetadataRoute } from "next";
import { servicesData } from "../data/services";
import { locationsData } from "../data/locations";
import { propertyTypesData } from "../data/property-types";
import { LOCATIONS_ROUTE } from "../lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.1031exchangesanjose.com";

  const routes = [
    "",
    "/services",
    LOCATIONS_ROUTE,
    "/property-types",
    "/about",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const serviceRoutes = servicesData.map((service) => ({
    url: `${baseUrl}${service.route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const locationRoutes = locationsData.map((location) => ({
    url: `${baseUrl}${location.route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const propertyTypeRoutes = propertyTypesData.map((propertyType) => ({
    url: `${baseUrl}${propertyType.route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...serviceRoutes, ...locationRoutes, ...propertyTypeRoutes];
}


