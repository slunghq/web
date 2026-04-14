/**
 * Composable for generating Schema.org structured data
 * Helps with rich snippets, knowledge panels, and SEO
 */

export const useStructuredData = () => {
  /**
   * Generate Organization schema
   */
  const organizationSchema = (overrides = {}) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Slung",
    url: "https://slung.tech",
    logo: "https://slung.tech/logo.png",
    description:
      "An ontology-driven compute engine that executes work based on real-time facts about relationships between components in your system.",
    sameAs: ["https://twitter.com/slunghq", "https://github.com/slunghq/slung"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Technical Support",
      url: "https://github.com/slunghq/slung/issues",
    },
    ...overrides,
  });

  /**
   * Generate WebPage schema
   */
  const webPageSchema = (
    title: string,
    description: string,
    overrides = {},
  ) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: "https://slung.tech",
    publisher: organizationSchema(),
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    ...overrides,
  });

  /**
   * Generate BlogPosting schema for articles
   */
  const blogPostingSchema = (
    title: string,
    description: string,
    author: string = "Slung Team",
    publishedDate: string = new Date().toISOString(),
    overrides = {},
  ) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: organizationSchema(),
    datePublished: publishedDate,
    dateModified: new Date().toISOString(),
    ...overrides,
  });

  /**
   * Generate BreadcrumbList schema
   */
  const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });

  /**
   * Generate Product schema
   */
  const productSchema = (
    name: string,
    description: string,
    image: string,
    overrides = {},
  ) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: name,
    description: description,
    image: image,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: organizationSchema(),
    ...overrides,
  });

  /**
   * Generate FAQPage schema
   */
  const faqPageSchema = (
    faqs: Array<{ question: string; answer: string }>,
  ) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });

  /**
   * Generate LocalBusiness schema
   */
  const localBusinessSchema = (overrides = {}) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Slung",
    url: "https://slung.tech",
    description: "An ontology-driven compute engine for real-time decisions.",
    logo: "https://slung.tech/logo.png",
    ...overrides,
  });

  /**
   * Generate WebSite schema with SearchAction
   */
  const webSiteSchema = () => ({
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
  });

  /**
   * Add schema to head
   */
  const addSchema = (schema: Record<string, any>) => {
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(schema),
        },
      ],
    });
  };

  /**
   * Add multiple schemas to head
   */
  const addSchemas = (schemas: Record<string, any>[]) => {
    useHead({
      script: schemas.map((schema) => ({
        type: "application/ld+json",
        innerHTML: JSON.stringify(schema),
      })),
    });
  };

  return {
    organizationSchema,
    webPageSchema,
    blogPostingSchema,
    breadcrumbSchema,
    productSchema,
    faqPageSchema,
    localBusinessSchema,
    webSiteSchema,
    addSchema,
    addSchemas,
  };
};
