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
          langs: ["rust", "zig", "sql", "toml"],
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
    },
  },
});
