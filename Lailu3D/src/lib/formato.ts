import { idiomaPorDefecto, type Idioma } from '../config/site';

const locales: Record<Idioma, string> = {
  es: 'es-EC',
  en: 'en-US',
};

/**
 * Precio referencial del catalogo. `null` significa "solo bajo cotizacion":
 * nunca se muestra como $0, porque no hay tarifa fija para los servicios.
 */
export function formatearPrecio(
  precio: number | null,
  idioma: Idioma = idiomaPorDefecto,
): string {
  if (precio === null) {
    return idioma === 'en' ? 'Quote only' : 'Bajo cotización';
  }

  return new Intl.NumberFormat(locales[idioma], {
    style: 'currency',
    currency: 'USD',
  }).format(precio);
}

/** Etiquetas visibles de las categorias del catalogo. */
export const categorias = {
  filamento: { es: 'Filamentos', en: 'Filaments' },
  figura: { es: 'Figuras', en: 'Figures' },
  llavero: { es: 'Llaveros', en: 'Keychains' },
  lampara: { es: 'Lámparas', en: 'Lamps' },
  navidad: { es: 'Navidad', en: 'Christmas' },
  personalizado: { es: 'Personalizados', en: 'Personalised' },
  hogar: { es: 'Hogar y oficina', en: 'Home & office' },
  taller: { es: 'Taller y gamers', en: 'Workshop & gaming' },
} as const;

export type Categoria = keyof typeof categorias;
