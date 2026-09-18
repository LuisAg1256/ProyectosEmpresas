import type { CollectionEntry } from 'astro:content';
import { site, type Idioma } from '../config/site';
import { t } from '../i18n';
import { slugsServicio } from './servicios';

/**
 * Datos estructurados. Describen para un buscador lo que la pagina ya dice en
 * pantalla: no se inventa nada que el visitante no pueda leer.
 */

/** Ancla estable del negocio, para que las fichas puedan referenciarlo. */
export const idNegocio = `${site.url}/#negocio`;

const absoluta = (ruta: string) => new URL(ruta, site.url).href;

/**
 * `LocalBusiness` del home.
 *
 * Falta la direccion postal: hoy solo se conocen las ciudades, y una direccion
 * inventada es peor que ninguna. `areaServed` dice donde se entrega; cuando
 * haya calle y numero se anade `address` completo, que es lo que hace util la
 * ficha en Maps.
 */
export function negocio(idioma: Idioma) {
  const txt = t(idioma);

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': idNegocio,
    name: site.nombre,
    description: txt.inicio.meta.descripcion,
    url: absoluta(idioma === 'es' ? '/' : `/${idioma}/`),
    image: absoluta('/og.png'),
    telephone: `+${site.whatsapp.wa}`,
    priceRange: '$$',
    currenciesAccepted: 'USD',
    knowsLanguage: ['es', 'en'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: site.pais.codigo,
    },
    /**
     * Se entrega en todo el pais, no solo donde estan los talleres: el pais va
     * primero y las ciudades quedan como el detalle que el visitante tambien
     * lee en el pie.
     */
    areaServed: [
      { '@type': 'Country', name: site.pais.nombre },
      ...site.sucursales.map((ciudad) => ({
        '@type': 'City',
        name: ciudad,
      })),
    ],
    sameAs: [site.redes.instagram.url, site.redes.tiktok.url],
    makesOffer: slugsServicio.map((slug) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: txt.servicios[slug].titulo,
        description: txt.servicios[slug].texto,
      },
    })),
  };
}

const disponibilidades = {
  disponible: 'https://schema.org/InStock',
  bajo_pedido: 'https://schema.org/BackOrder',
  agotado: 'https://schema.org/OutOfStock',
} as const;

/**
 * `Product` de una ficha.
 *
 * Sin precio no se emite `offers`: un `Offer` sin `price` es invalido, y
 * declarar `0` diria justo lo contrario de "bajo cotizacion".
 */
export function producto(
  entrada: CollectionEntry<'productos'>,
  idioma: Idioma,
  ruta: string,
) {
  const { data } = entrada;
  const url = absoluta(ruta);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.nombre[idioma],
    description: data.resumen[idioma],
    sku: data.sku,
    image: [absoluta(data.imagen.src)],
    url,
    ...(data.marca ? { brand: { '@type': 'Brand', name: data.marca } } : {}),
    ...(data.material ? { material: data.material } : {}),
    ...(data.color ? { color: data.color.nombre[idioma] } : {}),
    ...(data.pesoGramos
      ? {
          weight: {
            '@type': 'QuantitativeValue',
            value: data.pesoGramos,
            unitCode: 'GRM',
          },
        }
      : {}),
    ...(data.precio !== null
      ? {
          offers: {
            '@type': 'Offer',
            price: data.precio,
            priceCurrency: data.moneda,
            availability: disponibilidades[data.disponibilidad],
            url,
            seller: { '@id': idNegocio },
          },
        }
      : {}),
  };
}

/** Migas de pan de la ficha, las mismas que se ven en pantalla. */
export function migas(pasos: { nombre: string; ruta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pasos.map((paso, indice) => ({
      '@type': 'ListItem',
      position: indice + 1,
      name: paso.nombre,
      item: absoluta(paso.ruta),
    })),
  };
}
