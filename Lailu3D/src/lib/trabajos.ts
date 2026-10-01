import type { ImageMetadata } from 'astro';
import type { Idioma } from '../config/site';
import { t } from '../i18n';
import type { es } from '../i18n/es';
import avePersonalizada from '../assets/trabajos/ave-personalizada.jpg';
import litofaniaEncendida from '../assets/trabajos/litofania-encendida.jpg';
import litofaniaApagada from '../assets/trabajos/litofania-apagada.jpg';
import bateria from '../assets/trabajos/llavero-bateria.jpg';
import cubo from '../assets/trabajos/cubo-infinito.jpg';
import guante from '../assets/trabajos/llavero-guante.jpg';
import mancuerna from '../assets/trabajos/llavero-mancuerna.jpg';
import shaker from '../assets/trabajos/llavero-shaker.jpg';
import disco from '../assets/trabajos/llavero-disco-gimnasio.jpg';
import pesaRusa from '../assets/trabajos/llavero-pesa-rusa.jpg';
import cuboInfinitoTriangulos from '../assets/trabajos/cubo-infinito-triangulos.jpg';
import estrellaFlexible from '../assets/trabajos/estrella-flexible.jpg';
import exhibidorModular from '../assets/trabajos/exhibidor-modular.jpg';
import trompoEspiral from '../assets/trabajos/trompo-espiral.jpg';
import dragonArticulado from '../assets/trabajos/dragon-articulado.jpg';

type ClavePieza = keyof typeof es.trabajos.piezas;

/**
 * Galeria de trabajos entregados, **en orden de subida: el mas antiguo arriba,
 * el ultimo subido al final**. No hay fecha guardada: la posicion en esta lista
 * es la fecha. Una pieza nueva se anade siempre al final.
 *
 * La foto vive aqui porque i18n solo guarda texto; el titulo, la categoria y el
 * alt salen de `trabajos.piezas.<clave>` del diccionario.
 */
const registro: { clave: ClavePieza; imagen: ImageMetadata }[] = [
  { clave: 'litofaniaEncendida', imagen: litofaniaEncendida },
  { clave: 'litofaniaApagada', imagen: litofaniaApagada },
  { clave: 'bateria', imagen: bateria },
  { clave: 'cubo', imagen: cubo },
  { clave: 'guante', imagen: guante },
  { clave: 'mancuerna', imagen: mancuerna },
  { clave: 'shaker', imagen: shaker },
  { clave: 'disco', imagen: disco },
  { clave: 'pesaRusa', imagen: pesaRusa },
  { clave: 'avePersonalizada', imagen: avePersonalizada },
  { clave: 'cuboInfinitoTriangulos', imagen: cuboInfinitoTriangulos },
  { clave: 'estrellaFlexible', imagen: estrellaFlexible },
  { clave: 'exhibidorModular', imagen: exhibidorModular },
  { clave: 'trompoEspiral', imagen: trompoEspiral },
  { clave: 'dragonArticulado', imagen: dragonArticulado },
];

/** Cuantos trabajos recientes muestra la landing. */
export const TRABAJOS_EN_INICIO = 6;

/** Todos los trabajos con su texto, del mas reciente al mas antiguo. */
export function trabajos(idioma: Idioma) {
  const piezas = t(idioma).trabajos.piezas;
  return registro
    .map(({ clave, imagen }) => ({ clave, imagen, ...piezas[clave] }))
    .reverse();
}

export type Trabajo = ReturnType<typeof trabajos>[number];
