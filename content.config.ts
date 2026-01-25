import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        hero: z.string().optional(),
        tags: z.array(z.string()).optional(),
        authors: z.array(z.string()).optional(),
      }),
    }),
    docs: defineCollection({
      type: "page",
      source: "docs/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        hero: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
});
