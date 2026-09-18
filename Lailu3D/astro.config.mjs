// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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

  build: {
    /*
     * La hoja compartida pesa ~6 KB comprimidos y era la unica peticion que
     * bloqueaba el render (152 ms medidos con Lighthouse). Va en linea: se
     * paga ese peso en cada HTML a cambio de quitar un viaje completo en la
     * primera impresion, que es la que decide si alguien se queda.
     */
    inlineStylesheets: 'always',
  },

  integrations: [
    sitemap({
      /*
       * Con `i18n`, el sitemap emite `xhtml:link` alternates: cada URL declara
       * su gemela en el otro idioma, igual que los `hreflang` del <head>.
       */
      i18n: {
        defaultLocale: idiomaPorDefecto,
        locales: { es: 'es-EC', en: 'en-US' },
      },
      // El kit de componentes lleva `noindex`: no debe entrar en el sitemap.
      filter: (pagina) => !pagina.includes('/kit'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
