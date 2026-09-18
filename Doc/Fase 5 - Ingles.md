# Fase 5 — Inglés

> Cierre de la fase 5 del
> [`Plan de desarrollo - Lailu3D.md`](./Plan%20de%20desarrollo%20-%20Lailu3D.md).
> Continúa [`Fase 4 - Cotizador.md`](./Fase%204%20-%20Cotizador.md).
> Fecha: 2026-09-18 · Estado: `pnpm check` en verde, 17 páginas generadas.

---

## Resumen

El sitio es bilingüe. El español sigue en la raíz y el inglés vive bajo `/en`,
con la misma estructura: cada página en español tiene su gemela y el selector de
idioma conserva la ruta, así que desde una ficha de producto se llega a esa
misma ficha en el otro idioma.

| Español | Inglés |
|---|---|
| `/` | `/en/` |
| `/productos` | `/en/productos` |
| `/productos/<slug>` | `/en/productos/<slug>` (5 y 5) |
| `/cotizar` | `/en/cotizar` |
| `/kit` | — (interno, `noindex`, solo español) |

De 9 páginas a 17.

---

## La decisión que sostiene todo: una página, dos rutas

Duplicar las páginas habría significado mantener dos landings, dos catálogos y
dos cotizadores; a la tercera corrección, uno de los dos idiomas se queda atrás.

El cuerpo de cada página vive ahora en `src/components/paginas/` y recibe
`idioma` como prop. Los archivos de `src/pages/` son envoltorios de tres líneas:

```astro
---
import PaginaInicio from '../../components/paginas/PaginaInicio.astro';
---

<PaginaInicio idioma="en" />
```

La contrapartida, anotada en `CLAUDE.md`: **al añadir una página hay que crear
las dos rutas**, o el selector llevará a un 404.

El Header, el Footer, el botón flotante y el `Layout` no necesitan la prop:
`Astro.currentLocale` ya resuelve el idioma desde la URL, y se comprobó en el
HTML generado (`/en/index.html` sale con `lang="en"` y el pie en inglés).

---

## El diccionario se revisa solo

`src/i18n/es.ts` es la **fuente del tipo** y `en.ts` se declara como
`typeof es`. Una clave sin traducir, mal escrita o de más **no compila**, así
que `astro check` —que corre antes de cada build— la caza. No hace falta
acordarse de revisar: el compilador no deja publicar una traducción incompleta.

Por eso el helper es `t(idioma).seccion.clave` y no `t(idioma, 'seccion.clave')`
como decía el plan: una clave dentro de una cadena no la revisa nadie hasta que
falta en pantalla. Con el objeto hay autocompletado y error en compilación, que
es justo lo que se buscaba.

También hay `rutaLocalizada(ruta, idioma)` y `rutaBase(ruta)`. La regla nueva:
**ningún enlace interno se escribe a mano**. Siempre se pasa la ruta en español
y el helper añade el prefijo cuando toca.

---

## Los segmentos de ruta no se traducen

`/en/productos/filamento-pla-azul`, no `/en/products/...`. El slug sale del
nombre del archivo y ya está en español, así que traducir solo el primer
segmento deja una ruta a medias. Además obligaría a mantener un mapa de
segmentos que cualquier enlace escrito a mano se saltaría. Queda anotado en
`i18n/index.ts` por si se quiere revisar con un dominio propio.

---

## Qué más cambió

- **`src/lib/servicios.ts`** se quedó solo con los slugs y su orden; la copia
  (título, texto, chips) pasó al diccionario, porque cambia con el idioma.
- **`FormularioCotizacion.astro`** lee el idioma de `document.documentElement.lang`.
  Un script no recibe props de Astro, y el `lang` ya lo pone `Layout.astro`: en
  `/en/cotizar` el mensaje de WhatsApp sale en inglés sin plomería extra.
- **`Layout.astro`** emite `hreflang` para los dos idiomas más `x-default`
  apuntando al español, y `og:locale:alternate`. Las rutas `noindex` (el kit) no
  declaran alternativas: no tienen gemela y no deben salir en un buscador.
- **`Header.astro`** lleva el selector ES/EN: dos enlaces sueltos, no un
  desplegable, que para dos idiomas se lee mejor. En móvil va dentro del menú.
- **`site.sucursales.join(' y ')`** pasó a `' · '`. Era una conjunción española
  colada en una plantilla compartida.

---

## Un fallo que encontró la traducción

`TarjetaProducto.astro` construía el enlace como `/productos/${id}` a pelo.
Funcionaba mientras solo existía el español; desde `/en`, cada tarjeta y cada
producto relacionado devolvía al visitante al sitio en español sin avisar.
Corregido con `rutaLocalizada`, y de ahí sale la regla de los enlaces internos.

---

## Estado de verificación

| Comprobación | Resultado |
|---|---|
| `pnpm check` | 0 errores, 0 avisos, 18 *hints* (la deprecación de `z`, ya conocida) |
| `pnpm build` | 17 páginas |
| `/en/` | Todo en inglés, `lang="en"`, sin errores de consola |
| `hreflang` | `es`, `en` y `x-default` correctos, conservando el slug del producto |
| Cambio de idioma en una ficha | `/en/productos/filamento-pla-gris/` → `/productos/filamento-pla-gris/`, mismo producto |
| Cotizador en inglés | Mensaje, servicio y validación en inglés; `?servicio=` preselecciona |
| Enlaces internos bajo `/en` | Todos con prefijo tras corregir la tarjeta |
| Móvil (375px) en inglés | Menú y selector ES/EN correctos |

Búsqueda de texto español en los ocho HTML de `dist/en/`: solo aparece en
segmentos de URL e identificadores (`#servicios`, `cat-todos`), no en pantalla.

---

## Lo que queda abierto

- **La traducción es de trabajo, no de un traductor nativo.** Es correcta y
  consistente, pero conviene que alguien de confianza la lea antes de anunciar
  la versión en inglés, sobre todo la landing.
- **El catálogo en inglés sale del frontmatter**, que ya era bilingüe desde la
  fase 0. Cada producto nuevo necesita sus dos idiomas o el esquema falla, que
  es el comportamiento buscado.
- **Fase 6** — sitemap (ahora con 17 URL y sus alternativas), JSON-LD,
  `og:image`, fuentes locales y Lighthouse.
- Sigue pendiente de la fase 4: probar el enlace de WhatsApp en un **móvil
  real** y fijar el horario de atención.

---

## Archivos nuevos y modificados

```
Doc/
├─ Plan de desarrollo - Lailu3D.md    fases 0–5 marcadas
└─ Fase 5 - Ingles.md                 nuevo (este documento)

Lailu3D/
├─ CLAUDE.md                          + reglas de i18n
└─ src/
   ├─ i18n/es.ts, en.ts, index.ts     nuevos
   ├─ lib/servicios.ts                solo slugs y orden
   ├─ components/
   │  ├─ paginas/                      nuevo: PaginaInicio, PaginaCatalogo,
   │  │                                PaginaProducto, PaginaCotizar
   │  ├─ Header.astro                 selector de idioma, textos del diccionario
   │  ├─ Footer.astro                 idem
   │  ├─ TarjetaProducto.astro        enlace localizado
   │  ├─ BotonWhatsAppFlotante.astro  aria-label del diccionario
   │  └─ FormularioCotizacion.astro   idioma desde `lang`
   ├─ layouts/Layout.astro            hreflang, x-default, og:locale:alternate
   └─ pages/
      ├─ index · cotizar · productos/ envoltorios
      └─ en/                          nuevo: las cuatro rutas gemelas
```
