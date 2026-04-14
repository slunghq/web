// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["./app/assets/style.css"],
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "motion-v/nuxt",
    "@solar-icons/nuxt",
    "@vesp/nuxt-fontawesome",
  ],
  vite: { plugins: [tailwindcss()] },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "gruvbox-light-medium",
          langs: [
            "rust",
            "zig",
            "sql",
            "toml",
            "bash",
            "shell",
            "zsh",
            "fish",
            "sh",
          ],
        },
      },
    },
  },
  fontawesome: {
    icons: {
      regular: ["clone"],
      solid: ["pen", "check"],
    },
  },
  app: {
    head: {
      titleTemplate: "%s | Slung",
      meta: [
        {
          name: "description",
          content:
            "An ontology-driven compute engine that executes work based on real-time facts. Deploy adaptive systems that propagate changes automatically.",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "theme-color",
          content: "#faf8f4",
        },
        {
          name: "robots",
          content:
            "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
        },
        {
          property: "og:locale",
          content: "en_US",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:site_name",
          content: "Slung",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:site",
          content: "@slunghq",
        },
        {
          name: "twitter:creator",
          content: "@slunghq",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://slung.tech",
        },
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        {
          rel: "alternate",
          type: "application/rss+xml",
          href: "/feed.xml",
        },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Slung",
            url: "https://slung.tech",
            logo: "https://slung.tech/logo.png",
            description:
              "An ontology-driven compute engine that executes work based on real-time facts about relationships between components in your system.",
            sameAs: [
              "https://twitter.com/slunghq",
              "https://github.com/slunghq/slung",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Support",
              url: "https://github.com/slunghq/slung/issues",
            },
          }),
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Slung",
            description:
              "An ontology-driven compute engine for real-time decisions and adaptive systems.",
            url: "https://slung.tech",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Linux, macOS, Windows",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              ratingCount: "1",
            },
          }),
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://slung.tech",
            name: "Slung",
            description:
              "Compute engine for real-time decisions based on changing facts.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://slung.tech/search?q={search_term_string}",
              },
              query_input: "required name=search_term_string",
            },
          }),
        },
      ],
    },
  },

  routeRules: {
    "/api/**": { cache: { maxAge: 60 } },
    "/usecases/**": { swr: 3600 },
    "/docs/**": { swr: 86400 },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        "/roadmap",
        "/usecases/real-time-pipelines",
        "/usecases/event-workflows",
        "/usecases/state-management",
        "/usecases/business-logic",
        "/sitemap.xml",
        "/robots.txt",
      ],
      ignore: ["/admin"],
    },
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
    },
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
  },
});
