/**
 * Orden y slugs de los servicios.
 *
 * La copia (título, texto, chips) vive en el diccionario, bajo `servicios`,
 * porque cambia con el idioma. Aquí queda lo que no cambia: cuáles hay y en qué
 * orden se muestran. El slug es lo que viaja en `/cotizar?servicio=`.
 */
export const slugsServicio = [
  'impresion-3d',
  'laser',
  'modelado',
  'litofania',
] as const;

export type SlugServicio = (typeof slugsServicio)[number];
