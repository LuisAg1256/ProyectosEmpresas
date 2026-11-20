import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Campo de texto traducido. Toda cadena visible del catalogo vive en ambos idiomas. */
const i18nText = z.object({
  es: z.string(),
  en: z.string(),
});

/**
 * Catalogo de productos. Funciona como "base de datos" del sitio: cada archivo
 * YAML es un producto. Los datos duros (sku, precio, color) viven una sola vez;
 * solo el texto visible se duplica por idioma.
 */
/**
 * Catalogo publicado. Solo entran los archivos de esta lista: el resto de
 * `src/content/productos/` queda en el repositorio como borrador y no genera
 * tarjeta, ficha ni ruta. Para publicar otro color o pieza, se agrega su
 * archivo aqui. El orden en pantalla lo decide `orden`, no esta lista.
 */
const publicados = [
  // Filamentos con precio referencial.
  'filamento-pla-basic-blanco-jade',
  'filamento-pla-basic-negro',
  'filamento-pla-basic-turquesa',
  'filamento-pla-basic-gris',
  // Piezas impresas del Catalogo Navidad 2026, sin precio publicado.
  'familia-pinguinos-tejidos',
  'familia-renos-tejidos',
  'galletas-jengibre-tejidas',
  'ositos-polares-tejidos',
  'munecos-nieve-tejidos',
  'papa-noel-tejido',
  'pinguino-con-gorro-tejido',
  'arbolito-tejido',
  'caja-regalo-tejida',
  'escena-pinguino-muneco-nieve',
  'escena-osito-reno',
  'escena-feliz-navidad',
  'escena-galleta-muneco-nieve',
  'escena-trio-navideno',
  'escena-reno-feliz-navidad',
  'escena-pesebre-arbol',
  'bandejas-acanaladas',
  'sagrada-familia-minimalista',
  'sagrada-familia-efecto-piedra',
  'trio-renos-estilizados',
  'renos-acanalados',
  'muneco-nieve-nordico',
  'reno-de-pie-tejido',
  'arbolitos-con-estrella',
  'copos-de-nieve',
  'bowl-papa-noel',
  'bowl-duende',
  'macetero-santa',
  'contenedor-traje-santa',
  'bowl-muneco-nieve',
  'saco-de-regalos',
  'regalo-con-patitas',
  'gnomo-sentado-patitas',
  'gnomo-de-pie',
  'servilletero-arbol-calado',
  'servilletero-arbol-nordico',
  'servilletero-copo-nieve',
  'servilleteros-coleccion-navidena',
  'servilletero-ho-ho-ho',
  'arbol-de-nombres',
  'bolas-navidenas-acanaladas',
  'cascanueces',
  'gnomos-nordicos',
  'bandeja-acebo',
  'bandeja-ovalada-ondulada',
  'porta-rosario-sagrado-corazon',
  'servilletero-paisaje-montana',
  'libro-de-recuerdos',
  'letra-con-nombre',
  'colgadores-con-nombre',
  'cuadro-relieve-gato',
  'lampara-litofania-foto',
  'lampara-ondas',
  'llavero-litofania-foto',
  'llavero-nombre-teclas',
  'bandeja-organizadora-llaves',
  'organizador-cables',
  'dispensador-te',
  'base-reloj',
  'jabita-pilas-aa',
  'porta-notas-plantillas',
  'destapador-contador',
  'porta-controles-verde',
  'organizador-controles-negro',
  'porta-toallas-cocina',
  'palillero',
  'dispensador-hisopos',
  'dispensador-huevos',
  'porta-lentes',
  'ganchos-pared',
  'prensa-tipo-c',
  'organizador-imanes',
  'soporte-tarjeta-grafica',
];

const productos = defineCollection({
  loader: glob({
    pattern: publicados.map((id) => `${id}.md`),
    base: './src/content/productos',
  }),
  schema: ({ image }) =>
    z.object({
      sku: z.string(),
      categoria: z.enum([
        'filamento',
        'figura',
        'llavero',
        'lampara',
        'navidad',
        'personalizado',
        'hogar',
        'taller',
      ]),
      nombre: i18nText,
      /** Texto corto para tarjetas de catalogo. */
      resumen: i18nText,
      /** Texto largo para la ficha individual del producto. */
      descripcion: i18nText,

      marca: z.string().optional(),
      material: z.string().optional(),
      color: z
        .object({
          nombre: i18nText,
          hex: z.string().regex(/^#[0-9a-fA-F]{6}$/),
        })
        .optional(),
      pesoGramos: z.number().positive().optional(),
      diametroMm: z.number().positive().optional(),

      /** Precio referencial. `null` = solo bajo cotizacion. */
      precio: z.number().nonnegative().nullable().default(null),
      moneda: z.literal('USD').default('USD'),

      disponibilidad: z
        .enum(['disponible', 'bajo_pedido', 'agotado'])
        .default('disponible'),

      /**
       * Imagen del producto, en `src/assets/productos/`. La valida
       * `astro:assets`: si el archivo falta, el build falla en vez de publicar
       * un enlace roto. Hoy son SVG de placeholder; para poner la foto real
       * basta con reemplazar el archivo.
       */
      imagen: image(),
      imagenAlt: i18nText.optional(),
      /**
       * Fotos adicionales de la ficha (otra vista, la pieza abierta...). La
       * tarjeta del catalogo solo usa `imagen`.
       */
      galeria: z
        .array(z.object({ imagen: image(), alt: i18nText }))
        .default([]),

      destacado: z.boolean().default(false),
      orden: z.number().int().default(100),
    }),
});

export const collections = { productos };
