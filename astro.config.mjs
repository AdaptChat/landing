import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: 'https://adapt.chat',
  integrations: [
    tailwind({
      config: { path: 'tailwind.config.cjs', applyBaseStyles: false },
    }),
    sitemap(),
  ],
});