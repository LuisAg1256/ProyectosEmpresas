/**
 * Genera la imagen social `public/og.png` (1200x630) a partir del logo.
 *
 * Se ejecuta a mano (`pnpm og`), no en cada build: la imagen solo cambia si
 * cambia la marca, y meterla en el build obligaria a tener sharp resolviendo
 * SVG en cada despliegue para un archivo que es siempre el mismo.
 *
 * La composicion es **solo vectorial, sin texto**. Dos motivos: el renderizador
 * de SVG de sharp usa las fuentes del sistema y Space Grotesk no tiene por que
 * estar instalada, con lo que el texto saldria en otra tipografia; y el titulo
 * y la descripcion ya viajan en `og:title` y `og:description`, asi que
 * repetirlos dentro de la imagen solo sirve para que se recorten.
 */
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const ANCHO = 1200;
const ALTO = 630;

/** Tokens del sistema de diseño, copiados de `styles/global.css`. */
const color = {
  fondo: '#faf9fd',
  superficie: '#ffffff',
  contorno: '#d8c3b4',
  cobre: '#894d0d',
};

const logo = await readFile(resolve(raiz, 'src/assets/brand/logo-horizontal.svg'), 'utf8');

/** El logo va como SVG anidado: conserva su viewBox y se escala solo. */
const logoAncho = 620;
const logoAlto = Math.round((logoAncho * 112) / 401);
const logoInterior = logo
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '');

const composicion = `<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}" viewBox="0 0 ${ANCHO} ${ALTO}">
  <rect width="${ANCHO}" height="${ALTO}" fill="${color.fondo}"/>

  <!-- Marco de plano tecnico -->
  <rect x="48" y="48" width="${ANCHO - 96}" height="${ALTO - 96}" fill="${color.superficie}" stroke="${color.contorno}" stroke-width="2"/>

  <!-- Marcas de esquina -->
  <g stroke="${color.cobre}" stroke-width="3" fill="none">
    <path d="M48 96 L48 48 L96 48"/>
    <path d="M${ANCHO - 96} 48 L${ANCHO - 48} 48 L${ANCHO - 48} 96"/>
    <path d="M48 ${ALTO - 96} L48 ${ALTO - 48} L96 ${ALTO - 48}"/>
    <path d="M${ANCHO - 48} ${ALTO - 96} L${ANCHO - 48} ${ALTO - 48} L${ANCHO - 96} ${ALTO - 48}"/>
  </g>

  <!-- Reglilla de cota bajo el logo -->
  <g stroke="${color.contorno}" stroke-width="2">
    <path d="M${(ANCHO - logoAncho) / 2} ${ALTO / 2 + 92} H${(ANCHO + logoAncho) / 2}"/>
    <path d="M${(ANCHO - logoAncho) / 2} ${ALTO / 2 + 80} V${ALTO / 2 + 104}"/>
    <path d="M${(ANCHO + logoAncho) / 2} ${ALTO / 2 + 80} V${ALTO / 2 + 104}"/>
  </g>
  <rect x="${(ANCHO - 160) / 2}" y="${ALTO / 2 + 86}" width="160" height="12" fill="${color.cobre}"/>

  <svg x="${(ANCHO - logoAncho) / 2}" y="${(ALTO - logoAlto) / 2 - 30}" width="${logoAncho}" height="${logoAlto}" viewBox="0 0 401 112">
    ${logoInterior}
  </svg>
</svg>`;

const salida = resolve(raiz, 'public/og.png');
await sharp(Buffer.from(composicion)).png({ compressionLevel: 9 }).toFile(salida);

const { size } = await stat(salida);
console.log(`og.png generado: ${ANCHO}x${ALTO}, ${Math.round(size / 1024)} KB`);
