// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import { site, idiomas, idiomaPorDefecto } from './src/config/site.ts';

// https://astro.build/config
export default defineConfig({
  site: site.url,

  // Español en la raíz (/), inglés bajo /en.
  i18n: {
    locales: [...idiomas],
    defaultLocale: idiomaPorDefecto,
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
