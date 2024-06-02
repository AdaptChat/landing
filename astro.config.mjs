import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: 'https://adapt.chat',
  integrations: [tailwind({
    config: {
      path: 'tailwind.config.cjs',
      applyBaseStyles: false
    }
  }), sitemap(), mdx()],
  adapter: cloudflare()
});