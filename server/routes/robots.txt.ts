export default defineEventHandler((event) => {
  const robotsTxt = `# robots.txt - Allow search engines to crawl your site
# https://www.robotstxt.org/

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /.nuxt/
Disallow: /.git/
Disallow: /node_modules/
Crawl-delay: 0

# Specific rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 0

# Disallow bad bots
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

# Sitemaps
Sitemap: https://slung.tech/sitemap.xml
`;

  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setHeader(event, "Cache-Control", "public, max-age=86400");
  return robotsTxt;
});
