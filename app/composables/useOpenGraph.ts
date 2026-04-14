export const useOpenGraph = (options: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  twitterHandle?: string;
}) => {
  const {
    title = "Slung - Compute Engine for Real-time Decisions",
    description = "An ontology-driven compute engine that executes work based on real-time facts about relationships between components in your system.",
    image = "https://slung.tech/og-image.png",
    url = "https://slung.tech",
    type = "website",
    twitterHandle = "@slunghq",
  } = options;

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: "image/png",
    ogType: type,
    ogUrl: url,
    ogLocale: "en_US",
    ogSiteName: "Slung",
    twitterCard: "summary_large_image",
    twitterSite: twitterHandle,
    twitterCreator: twitterHandle,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  });

  // Structured data for the page
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === "article" ? "BlogPosting" : "WebPage",
          headline: title,
          description: description,
          image: {
            "@type": "ImageObject",
            url: image,
            width: 1200,
            height: 630,
          },
          url: url,
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          publisher: {
            "@type": "Organization",
            name: "Slung",
            logo: {
              "@type": "ImageObject",
              url: "https://slung.tech/logo.png",
            },
          },
          author: {
            "@type": "Organization",
            name: "Slung",
          },
        }),
      },
    ],
  });
};
