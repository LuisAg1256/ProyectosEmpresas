# Lailu3D — instrucciones del proyecto

Landing page de Lailu3D: impresión 3D personalizada, grabado y corte láser.
Loja y Cuenca (Ecuador). Documento de negocio:
[`../Doc/Identidad de la empresa - Lailu3D.md`](../Doc/Identidad%20de%20la%20empresa%20-%20Lailu3D.md).
Plan de trabajo: [`../Doc/Plan de desarrollo - Lailu3D.md`](../Doc/Plan%20de%20desarrollo%20-%20Lailu3D.md).

## Reglas de negocio que condicionan el código

- **No hay pagos en el sitio.** Sin carrito, sin checkout, sin pasarela, sin cuentas
  de usuario. Todo camino termina en WhatsApp.
- **Todo mensaje de WhatsApp sale prellenado con contexto.** El cliente nunca
  repite lo que ya eligió en la web. Los enlaces se construyen únicamente en
  [`src/lib/whatsapp.ts`](src/lib/whatsapp.ts) — no armar `wa.me` a mano en un
  componente.
- **El mensaje incluye siempre la URL de referencia** (ficha del producto o
  página). WhatsApp no acepta adjuntos por enlace; el link es la forma acordada
  de pasar la referencia visual.
- **Los servicios no llevan precio publicado.** Los productos de catálogo llevan
  precio referencial. `precio: null` se muestra como "Bajo cotización", nunca
  como `$0`.
- **El cotizador no tiene backend.** `/cotizar` no envía a ningún endpoint, no
  guarda nada y no hay base de datos: el script arma el mensaje y abre WhatsApp.
  Por eso `waCotizacion()` es la única función del módulo que corre en el
  navegador y debe seguir siendo pura, sin dependencias de Node.
- **Los servicios se declaran una sola vez** en
  [`src/lib/servicios.ts`](src/lib/servicios.ts). De ahí salen las tarjetas de
  la landing y el desplegable del cotizador; el `slug` viaja en
  `/cotizar?servicio=` y el script preselecciona la opción en el cliente.

## Arquitectura

- **Astro 7 + Tailwind CSS 4** vía `@tailwindcss/vite`. **No** existe
  `@astrojs/tailwind` en Tailwind 4: no intentar instalarlo.
- **pnpm** como gestor. Node >= 22.12.
- **Salida estática** desplegada en Vercel. Sin adaptador.
- **El catálogo es la base de datos del sitio**: un `.md` por producto en
  `src/content/productos/`, con esquema en
  [`src/content.config.ts`](src/content.config.ts). Para añadir un producto se
  crea un archivo, no se toca código.
- **Datos de la empresa una sola vez** en [`src/config/site.ts`](src/config/site.ts)
  (teléfono, redes, sucursales, URL). Cambiar ahí, nunca en los componentes.
  `site.url` alimenta las URL absolutas de los mensajes de WhatsApp: si está mal,
  todos los enlaces del catálogo se rompen en silencio.
- **Bilingüe ES/EN.** El español vive en la raíz, el inglés bajo `/en`
  (`prefixDefaultLocale: false`). Los datos duros del catálogo (sku, precio,
  color) viven una sola vez; solo el texto visible se duplica por idioma con la
  forma `{ es, en }`.
- **Una página, dos rutas.** El cuerpo de cada página vive en
  `src/components/paginas/` y recibe `idioma`; los archivos de `src/pages/` (y
  sus gemelos en `src/pages/en/`) son envoltorios de tres líneas. Al añadir una
  página hay que crear **las dos** rutas, o el selector de idioma llevará a un
  404.
- **Ningún texto visible se escribe en un componente.** Va en
  [`src/i18n/es.ts`](src/i18n/es.ts), y `en.ts` está declarado como `typeof es`:
  una clave sin traducir **no compila**. Se accede con `t(idioma).seccion.clave`.
- **Ningún enlace interno se escribe a mano.** Se construye con
  `rutaLocalizada(ruta, idioma)`, siempre con la ruta en español (`/productos`):
  el helper añade el prefijo `/en` cuando toca. Un `href="/productos"` escrito a
  pelo devuelve al visitante inglés al español sin avisar.
- **Los segmentos de ruta no se traducen** (`/en/productos/...`). El slug del
  producto sale del nombre del archivo y ya está en español; media ruta
  traducida sería peor que una coherente.

## Sistema de diseño

Fuente de verdad: [`../Master/DESIGN.md`](../Master/DESIGN.md) — "Precision
Industrial Studio". Traducido a tokens de Tailwind 4 en el bloque `@theme` de
[`src/styles/global.css`](src/styles/global.css).

Trampas conocidas:

- **Solo modo claro.** No hay variante oscura ni toggle. No añadir clases `dark:`.
- **Nunca escribir hex en un componente.** Solo clases de token: `bg-primary`,
  `text-on-surface-variant`, `border-outline-variant`.
- **Los pasos de espaciado `xs`–`xl` de DESIGN.md no se declaran como tokens
  nombrados**: chocarían con `max-w-sm/md/lg/xl` de Tailwind. Se usa la escala
  numérica, que da los mismos valores del módulo de 8pt: `xs`=`1`, `sm`=`2`,
  `md`=`4`, `lg`=`6`, `xl`=`10`. Sí están nombrados `gutter` y `margin`.
- **La prosa de DESIGN.md menciona un cobre `#B87333` que se ignora.** El valor
  válido es el del frontmatter YAML: `primary: #894d0d`.
- **Elevación por capas tonales**, no por sombras pesadas: utilidades `elev-1`,
  `elev-2`, `elev-3`.
- **Los botones y los inputs nunca son pill.** Radio de 4px, escrito como
  `rounded-[4px]`: la escala nombrada está remapeada por los tokens
  (`--radius-sm` = 2px), así que `rounded-sm` **no** da los 4px del sistema.
  `rounded-lg` (8px) es el de tarjetas y `rounded-xl` (12px) el de contenedores
  grandes. Las formas circulares se reservan a indicadores de estado.
- **Números con `tabular`** (precios, medidas, mm) para que no salten de ancho.
- **No combinar `text-body-*` con `font-medium`/`font-semibold`.** Los tokens
  tipográficos ya traen su propio `font-weight`, y el resultado depende del
  orden en que Tailwind emita las utilidades. Cuando haga falta otro peso, se
  fija el tamaño explícito (`text-[15px] font-medium`), como en `Boton.astro`.
- **`peer-checked:` usa el combinador `~`, no `+`.** En un grupo de radios
  enciende todas las etiquetas posteriores a la vez. El filtro del catálogo
  resuelve el estado activo con una regla `input:checked + label` propia.
- **Las clases interpoladas no existen.** Tailwind escanea cadenas completas:
  `elev-${n}` no genera nada. Se usa un mapa de literales, como en
  `Tarjeta.astro`.
- **`class` no gana a la base de un componente por estar escrito después.**
  Entre dos utilidades de la misma propiedad decide el orden de la hoja de
  estilos, no el del atributo. Caso real: `<Boton class="hidden sm:inline-flex">`
  **no** oculta nada, porque Tailwind emite `.inline-flex` (que trae la base de
  `Boton`) después de `.hidden`. Cuando haga falta un aspecto distinto, se añade
  una variante al componente —`inverso`, `inverso-outline`— en vez de pelear
  desde fuera.

## SEO y rendimiento

- **Datos estructurados** en [`src/lib/jsonld.ts`](src/lib/jsonld.ts):
  `LocalBusiness` en el home y `Product` + `BreadcrumbList` en cada ficha. Regla:
  **solo se declara lo que el visitante puede leer en pantalla**. Un producto sin
  precio no emite `offers` — un `Offer` sin `price` es inválido y poner `0` diría
  lo contrario de "bajo cotización".
- **Sitemap** con `@astrojs/sitemap` y la configuración `i18n`, que añade los
  `xhtml:link` alternates. El kit queda excluido por el `filter`.
- **Fuentes propias** en `public/fonts`, declaradas en `global.css` y precargadas
  desde `Layout.astro`. Ya no se usa Google Fonts. Los archivos se copian con
  `pnpm fuentes` desde `@fontsource-variable/*`. Van con **ruta estable** porque
  un activo empaquetado lleva hash y no se puede precargar a mano; por eso
  `vercel.json` les pone caché de un año y **si algún día se reemplaza un
  archivo hay que cambiarle el nombre**.
- **`og.png`** se genera con `pnpm og`, no en cada build. Es solo vectorial, sin
  texto: sharp renderiza el SVG con las fuentes del sistema y Space Grotesk no
  tiene por qué estar instalada.
- **La hoja de estilos va en línea** (`build.inlineStylesheets: 'always'`): era
  la única petición que bloqueaba el render.
- **Cero JavaScript** salvo el cotizador, que Astro empotra en línea (~1,8 KB).
  Si una página nueva necesita un `<script>`, es una decisión, no un descuido.

## Imágenes

Las imágenes de producto viven en `src/assets/productos/` y el esquema las valida
con `image()` de `astro:assets`, de modo que un archivo faltante rompe el build en
vez de llegar a producción como enlace roto. Hoy son SVG de placeholder: se
reemplazan por fotos reales sin tocar código, solo cambiando el archivo y la ruta
del frontmatter.

## Comandos

```bash
pnpm dev      # servidor de desarrollo
pnpm check    # astro check (tipos y contenido)
pnpm build    # astro check + build de producción
pnpm og       # regenera public/og.png desde el logo
pnpm fuentes  # recopia los subconjuntos de fuente a public/fonts
```

Para medir con Lighthouse en esta máquina no hay Chrome, pero sí Edge:

```bash
CHROME_PATH="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" pnpm dlx lighthouse http://localhost:4329/ --chrome-flags="--headless=new"
```

Al terminar falla al borrar su perfil temporal (`EPERM`); el informe ya está
escrito, así que el error se puede ignorar.

Dos dependencias con motivo:

- **`typescript` fijado en 6.x.** TypeScript 7 (el compilador nativo) todavía no
  expone la API programática que necesita `astro check`; con 7.x el comando se
  cae antes de analizar nada.
- **`sharp`** es obligatorio para que `astro:assets` genere las imágenes en el
  build. Sin él, el build avisa y deja las imágenes sin procesar.
