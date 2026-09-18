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

/** Enlace para una tarjeta de servicio: el servicio ya viene nombrado. */
export function waServicio(
  servicio: string,
  ruta = '/',
  idioma: Idioma = idiomaPorDefecto,
): string {
  const url = new URL(ruta, site.url).href;
  const cuerpo =
    idioma === 'en'
      ? `Hi Lailu3D! I'm interested in this service:\n\n• Service: ${servicio}\n• Page: ${url}\n\nI'd like a quote.`
      : `¡Hola Lailu3D! Me interesa este servicio:\n\n• Servicio: ${servicio}\n• Página: ${url}\n\nQuisiera una cotización.`;
  return enlace(cuerpo);
}

export type DatosCotizacion = {
  descripcion: string;
  cantidad?: string;
  medidas?: string;
  /** Enlace a la referencia visual del cliente (Drive, Imgur, post de IG...). */
  referencia?: string;
};

/** Enlace para el formulario de cotizacion personalizada. */
export function waCotizacion(
  datos: DatosCotizacion,
  idioma: Idioma = idiomaPorDefecto,
): string {
  const linea = (etiqueta: string, valor?: string) =>
    valor?.trim() ? `\n• ${etiqueta}: ${valor.trim()}` : '';

  const cuerpo =
    idioma === 'en'
      ? `Hi Lailu3D! I'd like a quote:\n\n• Idea: ${datos.descripcion}` +
        linea('Quantity', datos.cantidad) +
        linea('Size', datos.medidas) +
        linea('Reference', datos.referencia)
      : `¡Hola Lailu3D! Quisiera una cotización:\n\n• Idea: ${datos.descripcion}` +
        linea('Cantidad', datos.cantidad) +
        linea('Medidas', datos.medidas) +
        linea('Referencia', datos.referencia);

  return enlace(cuerpo);
}
