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
const productos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/productos' }),
  schema: ({ image }) =>
    z.object({
      sku: z.string(),
      categoria: z.enum(['filamento', 'figura', 'llavero', 'lampara']),
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

      destacado: z.boolean().default(false),
      orden: z.number().int().default(100),
    }),
});

export const collections = { productos };
