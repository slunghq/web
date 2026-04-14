export default defineEventHandler(async (event) => {
  const baseURL = "https://slung.tech";

  const pages = [
    {
      url: "/",
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      url: "/roadmap",
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      url: "/usecases/real-time-pipelines",
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: "/usecases/event-workflows",
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: "/usecases/state-management",
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: "/usecases/business-logic",
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: "/docs",
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      url: "/blog",
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: "0.7",
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseURL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  setHeader(event, "Content-Type", "application/xml");
  return sitemap;
});
