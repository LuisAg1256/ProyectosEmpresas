/**
 * Copia los subconjuntos de fuente que usa el sitio a `public/fonts/`.
 *
 * Los paquetes `@fontsource-variable/*` son devDependencias: sirven de origen y
 * de licencia, pero no se importan desde el CSS. Los archivos se sirven desde
 * `public/` con una ruta estable (`/fonts/...`), que es lo que permite
 * precargarlos desde `Layout.astro`; un activo empaquetado lleva un hash en el
 * nombre y no se puede escribir a mano en un `<link rel="preload">`.
 *
 * Solo `latin` y `latin-ext`: cubren el español y el inglés. El resto de
 * subconjuntos del paquete (cirílico, vietnamita) no se copian.
 */
import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, basename } from 'node:path';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destino = resolve(raiz, 'public/fonts');

const archivos = [
  '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2',
  '@fontsource-variable/space-grotesk/files/space-grotesk-latin-ext-wght-normal.woff2',
  '@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2',
  '@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-ext-wght-normal.woff2',
];

await mkdir(destino, { recursive: true });

for (const archivo of archivos) {
  const origen = resolve(raiz, 'node_modules', archivo);
  await copyFile(origen, resolve(destino, basename(archivo)));
  console.log(`copiada ${basename(archivo)}`);
}
