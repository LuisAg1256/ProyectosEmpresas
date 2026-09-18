import { site, idiomaPorDefecto, type Idioma } from '../config/site';

/**
 * Construye el enlace de WhatsApp con el mensaje ya redactado.
 *
 * Regla del proyecto: el encargado nunca debe pedirle al cliente que repita lo
 * que ya eligio en la web. Por eso todo mensaje incluye la URL de referencia
 * (ficha del producto o la propia pagina), que es la forma acordada de pasar la
 * referencia visual: WhatsApp no acepta adjuntos por enlace, pero si un link.
 */
function enlace(mensaje: string): string {
  return `https://wa.me/${site.whatsapp.wa}?text=${encodeURIComponent(mensaje)}`;
}

/** Enlace para un producto del catalogo. `ruta` es la URL de su ficha. */
export function waProducto(
  producto: { nombre: Record<Idioma, string>; sku: string },
  ruta: string,
  idioma: Idioma = idiomaPorDefecto,
): string {
  const url = new URL(ruta, site.url).href;
  const cuerpo =
    idioma === 'en'
      ? `Hi Lailu3D! I'm interested in this product:\n\n• ${producto.nombre.en}\n• Code: ${producto.sku}\n• Link: ${url}\n\nCould you confirm availability and price?`
      : `¡Hola Lailu3D! Me interesa este producto:\n\n• ${producto.nombre.es}\n• Código: ${producto.sku}\n• Enlace: ${url}\n\n¿Me confirman disponibilidad y precio?`;
  return enlace(cuerpo);
}

/**
 * Enlace sin contexto de producto: cabecera, boton flotante, pie.
 * Lleva igualmente la URL de la pagina desde donde se escribio, para que el
 * encargado sepa que estaba mirando el cliente.
 */
export function waGeneral(
  idioma: Idioma = idiomaPorDefecto,
  ruta = '/',
): string {
  const url = new URL(ruta, site.url).href;
  const cuerpo =
    idioma === 'en'
      ? `Hi Lailu3D! I'd like to ask about your 3D printing and laser services.\n\n• Page: ${url}`
      : `¡Hola Lailu3D! Quisiera consultar por sus servicios de impresión 3D y láser.\n\n• Página: ${url}`;
  return enlace(cuerpo);
}

export type DatosCotizacion = {
  descripcion: string;
  /** Nombre visible del servicio, no el slug: va tal cual en el mensaje. */
  servicio?: string;
  cantidad?: string;
  medidas?: string;
  /** Enlace a la referencia visual del cliente (Drive, Imgur, post de IG...). */
  referencia?: string;
};

/**
 * Enlace para el formulario de cotizacion personalizada.
 *
 * Esta funcion es la unica del modulo que se ejecuta **en el navegador**
 * (la importa el script de `FormularioCotizacion.astro`). Debe seguir siendo
 * pura y sin dependencias de Node: solo plantillas y `encodeURIComponent`.
 *
 * La descripcion va al final y en su propio bloque, no como vinieta: el cliente
 * escribe parrafos y WhatsApp respeta los saltos de linea, asi que dentro de la
 * lista el segundo parrafo quedaba pegado a la vinieta siguiente. El texto se
 * manda tal cual lo escribio: mutilarlo es peor que reordenar el mensaje.
 */
export function waCotizacion(
  datos: DatosCotizacion,
  ruta = '/cotizar',
  idioma: Idioma = idiomaPorDefecto,
): string {
  const url = new URL(ruta, site.url).href;
  const linea = (etiqueta: string, valor?: string) =>
    valor?.trim() ? `\n• ${etiqueta}: ${valor.trim()}` : '';

  const cuerpo =
    idioma === 'en'
      ? `Hi Lailu3D! I'd like a quote:\n` +
        linea('Service', datos.servicio) +
        linea('Quantity', datos.cantidad) +
        linea('Size', datos.medidas) +
        linea('Reference', datos.referencia) +
        `\n• Form: ${url}` +
        `\n\nMy idea:\n${datos.descripcion.trim()}`
      : `¡Hola Lailu3D! Quisiera una cotización:\n` +
        linea('Servicio', datos.servicio) +
        linea('Cantidad', datos.cantidad) +
        linea('Medidas', datos.medidas) +
        linea('Referencia', datos.referencia) +
        `\n• Formulario: ${url}` +
        `\n\nMi idea:\n${datos.descripcion.trim()}`;

  return enlace(cuerpo);
}
