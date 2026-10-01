#!/usr/bin/env node
/**
 * Utilidad de la skill push-img.
 *
 *   node procesar.mjs inspeccionar
 *   node procesar.mjs recortar <plan.json>
 *   node procesar.mjs mover    <plan.json>
 *
 * El plan es un arreglo de entradas:
 *   [{ "archivo": "WhatsApp Image ... .jpeg", "slug": "dragon-articulado",
 *      "recorte": "attention" }]
 *
 * `recorte` puede ser "attention" (por defecto), "entropy", "centre", "north",
 * "south", "east", "west"..., o un cuadro explícito { "x": 0, "y": 120, "lado": 900 }
 * en píxeles de la imagen ya orientada.
 *
 * Formato de salida (el de src/assets/trabajos/): JPEG cuadrado, progresivo,
 * mozjpeg calidad 80, sin EXIF. Lado = el lado corto del original, con tope de
 * 1400 px. Nunca se amplía.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const LAILU = path.join(RAIZ, 'Lailu3D');
const LISTAS = path.join(RAIZ, 'ReferenciasImagenes/Imagenes_Productos_Impresos/Listas_prod');
const PRODUCCION = path.join(RAIZ, 'ReferenciasImagenes/Imagenes_Productos_Impresos/Produccion');
const TRABAJOS = path.join(LAILU, 'src/assets/trabajos');
const LADO_MAX = 1400;
const EXTENSIONES = /\.(jpe?g|jfif|png|webp|heic|heif|avif|tiff?)$/i;

// sharp vive en las dependencias del sitio, no junto a este script.
const sharp = createRequire(path.join(LAILU, 'package.json'))('sharp');

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function leerPlan(ruta) {
  if (!ruta) fallar('Falta la ruta del plan JSON.');
  const plan = JSON.parse(fs.readFileSync(ruta, 'utf8'));
  if (!Array.isArray(plan) || plan.length === 0) fallar('El plan debe ser un arreglo no vacío.');
  const slugs = new Set();
  for (const e of plan) {
    if (!e.archivo || !e.slug) fallar(`Entrada incompleta: ${JSON.stringify(e)}`);
    if (!SLUG.test(e.slug)) fallar(`Slug inválido "${e.slug}": solo minúsculas, números y guiones.`);
    if (slugs.has(e.slug)) fallar(`Slug repetido en el plan: ${e.slug}`);
    slugs.add(e.slug);
  }
  return plan;
}

function fallar(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}

async function inspeccionar() {
  const archivos = fs.existsSync(LISTAS)
    ? fs.readdirSync(LISTAS).filter((f) => EXTENSIONES.test(f))
    : [];
  if (archivos.length === 0) {
    console.log('Listas_prod está vacía: no hay nada que publicar.');
    return;
  }
  for (const f of archivos) {
    const ruta = path.join(LISTAS, f);
    try {
      const m = await sharp(ruta).metadata();
      // autoOrient da las medidas tal como se ve la foto (EXIF aplicado).
      const { width: w, height: h } = m.autoOrient ?? m;
      const lado = Math.min(w, h, LADO_MAX);
      console.log(`${f}\t${w}x${h}\t-> ${lado}x${lado}${Math.min(w, h) < 800 ? '\t(AVISO: menor de 800 px)' : ''}`);
    } catch (err) {
      console.log(`${f}\tNO LEGIBLE (${err.message.split('\n')[0]})`);
    }
  }
  console.log(`\nSlugs ya usados en trabajos: ${fs.readdirSync(TRABAJOS).map((f) => path.parse(f).name).join(', ')}`);
}

async function recortar(plan) {
  for (const e of plan) {
    const destino = path.join(TRABAJOS, `${e.slug}.jpg`);
    if (fs.existsSync(destino)) fallar(`Ya existe ${path.relative(RAIZ, destino)}. Elige otro slug.`);
    if (!fs.existsSync(path.join(LISTAS, e.archivo))) fallar(`No existe en Listas_prod: ${e.archivo}`);
  }
  for (const e of plan) {
    const origen = path.join(LISTAS, e.archivo);
    const destino = path.join(TRABAJOS, `${e.slug}.jpg`);
    // Se orienta primero para que el recorte use las coordenadas que se ven.
    const orientada = await sharp(origen).rotate().toBuffer({ resolveWithObject: true });
    const { width: w, height: h } = orientada.info;
    const corto = Math.min(w, h);
    const lado = Math.min(corto, LADO_MAX);
    let img = sharp(orientada.data);
    const r = e.recorte ?? 'attention';
    if (typeof r === 'object') {
      const { x, y, lado: l } = r;
      if (x < 0 || y < 0 || x + l > w || y + l > h) fallar(`Recorte fuera de la imagen en ${e.slug} (${w}x${h}).`);
      img = img.extract({ left: Math.round(x), top: Math.round(y), width: Math.round(l), height: Math.round(l) }).resize(lado, lado, { withoutEnlargement: true });
    } else {
      const posicion = r === 'attention' || r === 'entropy' ? sharp.strategy[r] : r;
      img = img.resize(lado, lado, { fit: 'cover', position: posicion, withoutEnlargement: true });
    }
    const info = await img
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(destino);
    console.log(`OK ${path.relative(RAIZ, destino)}\t${info.width}x${info.height}\t${Math.round(info.size / 1024)} KB`);
  }
}

function mover(plan) {
  fs.mkdirSync(PRODUCCION, { recursive: true });
  for (const e of plan) {
    const ext = path.extname(e.archivo).toLowerCase();
    const destino = path.join(PRODUCCION, `${e.slug}${ext}`);
    if (fs.existsSync(destino)) fallar(`Ya existe ${path.relative(RAIZ, destino)}. No se sobrescribe.`);
  }
  for (const e of plan) {
    const origen = path.join(LISTAS, e.archivo);
    const destino = path.join(PRODUCCION, `${e.slug}${path.extname(e.archivo).toLowerCase()}`);
    fs.renameSync(origen, destino);
    console.log(`MOVIDO ${e.archivo} -> ${path.relative(RAIZ, destino)}`);
  }
}

const [comando, arg] = process.argv.slice(2);
if (comando === 'inspeccionar') await inspeccionar();
else if (comando === 'recortar') await recortar(leerPlan(arg));
else if (comando === 'mover') mover(leerPlan(arg));
else fallar('Uso: procesar.mjs inspeccionar | recortar <plan.json> | mover <plan.json>');
