import { idiomas, idiomaPorDefecto, type Idioma } from '../config/site';
import { es } from './es';
import { en } from './en';

export type Textos = typeof es;

const diccionarios: Record<Idioma, Textos> = { es, en };

/**
 * Textos de la interfaz en un idioma.
 *
 * Devuelve el diccionario entero en vez de resolver una clave en cadena
 * (`t(idioma, 'nav.servicios')`): así el acceso es `t(idioma).nav.servicios`,
 * con autocompletado y con el error en tiempo de compilación. Una clave escrita
 * a mano dentro de una cadena no la revisa nadie hasta que falta en pantalla.
 */
export function t(idioma: Idioma = idiomaPorDefecto): Textos {
  return diccionarios[idioma];
}

/** Idiomas distintos del de la ruta, para el selector y los `hreflang`. */
export const otrosIdiomas = (idioma: Idioma): Idioma[] =>
  idiomas.filter((i) => i !== idioma);

/**
 * Ruta sin prefijo de idioma: `/en/productos/x/` → `/productos/x/`.
 * Es la forma canónica con la que se compara y se vuelve a construir.
 */
export function rutaBase(ruta: string): string {
  for (const idioma of idiomas) {
    if (idioma === idiomaPorDefecto) continue;
    if (ruta === `/${idioma}` || ruta === `/${idioma}/`) return '/';
    if (ruta.startsWith(`/${idioma}/`)) return ruta.slice(idioma.length + 1);
  }
  return ruta;
}

/**
 * Misma página en otro idioma. El español vive en la raíz y el inglés bajo
 * `/en` (`prefixDefaultLocale: false`), así que el selector de idioma conserva
 * la ruta: desde una ficha de producto se llega a esa misma ficha, no al home.
 *
 * Los segmentos de ruta **no** se traducen (`/en/productos/...`, no
 * `/en/products/...`): el slug del producto sale del nombre del archivo y ya
 * está en español, así que una ruta mitad inglesa mitad española sería peor que
 * una coherente. Cambiarlo obligaría a mantener un mapa de segmentos y a que
 * ningún enlace escrito a mano se lo saltara.
 */
export function rutaLocalizada(ruta: string, idioma: Idioma): string {
  const base = rutaBase(ruta);
  if (idioma === idiomaPorDefecto) return base;
  return base === '/' ? `/${idioma}/` : `/${idioma}${base}`;
}
