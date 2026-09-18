# Fase 6 — SEO, rendimiento y despliegue

> Cierre de la fase 6 del
> [`Plan de desarrollo - Lailu3D.md`](./Plan%20de%20desarrollo%20-%20Lailu3D.md).
> Continúa [`Fase 5 - Ingles.md`](./Fase%205%20-%20Ingles.md).
> Fecha: 2026-09-18 · Estado: `pnpm check` en verde, 17 páginas, Lighthouse
> móvil **100 / 100 / 100 / 100** sin diagnósticos pendientes.

---

## Resumen

El sitio está listo para publicarse. Falta el despliegue, que es una acción en
la cuenta de Vercel del cliente y no se hizo desde aquí.

| Comprobación | Antes | Ahora |
|---|---|---|
| Sitemap | no existía | 16 URL con alternates por idioma |
| Datos estructurados | ninguno | `LocalBusiness`, `Product`, `BreadcrumbList` |
| `og:image` | no se emitía | `og.png` 1200×630, 22 KB |
| Fuentes | Google Fonts, 2 `preconnect` + hoja externa | propias, precargadas |
| JavaScript | cotizador | igual: **cero** en el resto de páginas |

---

## Sitemap

`@astrojs/sitemap` con la configuración `i18n`: cada URL declara su gemela con
`xhtml:link`, igual que los `hreflang` del `<head>`. El kit de componentes queda
fuera por el `filter` — lleva `noindex`, así que anunciarlo en el sitemap sería
contradecirse. 16 URL de las 17 páginas.

`public/robots.txt` ya apuntaba a `sitemap-index.xml`, que es justo el nombre
que genera la integración.

---

## Datos estructurados

En `src/lib/jsonld.ts`, con una regla: **solo se declara lo que el visitante
puede leer en pantalla**.

- **`LocalBusiness`** en el home (en los dos idiomas), con teléfono, redes,
  `areaServed` (Loja y Cuenca) y los cuatro servicios como `makesOffer`.
- **`Product`** en cada ficha, con `sku`, marca, material, color, peso y
  `offers`.
- **`BreadcrumbList`** con las mismas migas que se ven en la página.

Dos decisiones:

- **Sin precio no se emite `offers`.** Un `Offer` sin `price` es inválido, y
  declarar `0` diría justo lo contrario de "bajo cotización".
- **Sin dirección postal.** Hoy solo se conocen las ciudades, y una dirección
  inventada es peor que ninguna. `areaServed` dice dónde se entrega; cuando haya
  calle y número se añade `address` completo, que es lo que hace útil la ficha
  en Maps.

---

## Imagen social

`public/og.png`, 1200×630, 22 KB. Se genera con `pnpm og`, **no en cada build**:
la imagen solo cambia si cambia la marca.

Es **solo vectorial, sin texto**, y no por pereza: sharp renderiza el SVG con
las fuentes del sistema, y Space Grotesk no tiene por qué estar instalada en la
máquina que compila, así que el texto saldría en otra tipografía sin que nadie
se enterase. Además el título y la descripción ya viajan en `og:title` y
`og:description`; repetirlos dentro de la imagen solo sirve para que se
recorten. La composición es el logo sobre el marco de plano técnico del sistema
de diseño.

`Layout.astro` la usa por defecto y emite `og:image:width/height/alt` y
`twitter:card: summary_large_image`.

---

## Fuentes

Se quitó Google Fonts. Antes eran dos `preconnect` y una hoja externa que
bloqueaba el render: dos viajes a otro dominio antes de pintar la primera letra.

Ahora los `.woff2` se sirven desde `/fonts`, con `@font-face` propio en
`global.css` y `<link rel="preload">` en `Layout.astro`. Solo los subconjuntos
`latin` y `latin-ext`; se comprobó en el navegador que el `unicode-range` hace
su trabajo: con el sitio en español e inglés, el navegador **solo** pide los dos
archivos `latin` (55 KB en total) y nunca los `latin-ext`.

Los archivos salen de `@fontsource-variable/*`, que quedaron como
devDependencias —sirven de origen y de licencia, pero no se importan— y se
copian con `pnpm fuentes`. Van con **ruta estable** a propósito: un activo
empaquetado lleva hash en el nombre y no se puede escribir a mano en un
`preload`. Como contrapartida, `vercel.json` les pone caché de un año, así que
**si algún día se reemplaza un archivo hay que cambiarle el nombre**. Queda
anotado en `CLAUDE.md`.

---

## Accesibilidad: una auditoría propia antes de Lighthouse

Se escribió una comprobación que recorre cada nodo de texto renderizado,
resuelve el color de fondo efectivo subiendo por el árbol, mezcla la
transparencia y calcula el contraste real. Además revisa `alt`, nombres
accesibles, etiquetas de formulario, `id` duplicados, orden de encabezados y
número de `<h1>`.

Encontró tres cosas que el ojo no ve:

1. **El *placeholder* de los campos no llegaba a AA.** Iba al 60 % de opacidad:
   3,19:1, por debajo de 4,5:1. Subido al 75 % → 4,64:1, y sigue leyéndose como
   texto de ayuda y no como contenido.
2. **`/productos` no tenía `<h1>`.** El título lo pintaba `Seccion` como `<h2>`.
   Se le añadió la prop `nivelTitulo`; la página del catálogo pasa `1`.
3. **Y eso destapó un salto de `h1` a `h3`**, que el `h1` ausente ocultaba: las
   tarjetas de producto usan `<h3>`, correcto cuando cuelgan de una sección con
   `<h2>` (la landing), pero no cuando cuelgan del `<h1>` (el catálogo). Misma
   solución: `nivelTitulo` en `TarjetaProducto`, que el catálogo pone en `2`.

Saltarse un nivel rompe la navegación por encabezados de un lector de pantalla,
y es el tipo de fallo que nadie reporta.

El contraste de los tokens también se calculó uno a uno. El que señalaba el plan
—`primary-container` con texto blanco, el estado *hover* del botón— da **4,63:1**:
pasa AA, pero con poco margen. Conviene no bajar más ese cobre.

---

## Lighthouse

Sí se pudo medir. No hay Chrome en esta máquina, pero Edge sirve pasando
`CHROME_PATH`; el comando queda anotado en `CLAUDE.md`. Al terminar falla al
borrar su perfil temporal (`EPERM`), pero el informe ya está escrito.

**Móvil, cinco rutas (`/`, `/en`, `/productos`, una ficha y `/cotizar`):**

| | Resultado |
|---|---|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| LCP | 1,4–1,5 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0 |

La primera pasada ya daba 100, pero dejaba dos diagnósticos abiertos que valía
la pena cerrar:

- **La imagen de la ficha era el elemento LCP y salía con `loading="lazy"`.**
  Es el valor por defecto de `<Image>` de Astro, y ahí juega en contra: el
  navegador no la pide hasta hacer el layout. Ahora va `eager` con
  `fetchpriority="high"`.
- **La hoja de estilos bloqueaba el render 152 ms.** Pasa a ir en línea
  (`inlineStylesheets: 'always'`). Se paga ~6 KB comprimidos en cada HTML a
  cambio de quitar un viaje completo en la primera impresión, que es la que
  decide si alguien se queda.

Tras los dos arreglos, **ningún diagnóstico pendiente** en ninguna ruta.

Una advertencia honesta: la medición es contra `localhost`. Lighthouse simula
CPU y red de móvil, pero no la latencia real hasta el servidor. Los números en
producción serán algo peores; conviene repetir la medición sobre el dominio real
después del despliegue.

**Peso real de la página de inicio:** 36 KB de HTML (5 KB comprimidos, con el
CSS ya dentro), 55 KB de fuentes y los SVG de marca. **Cero archivos JavaScript
emitidos**: el único script del sitio es el del cotizador, que Astro empotra en
línea en 1,8 KB.

---

## Despliegue: preparado, no hecho

Se dejó `vercel.json` con la caché de las fuentes. Astro estático no necesita
adaptador ni más configuración: Vercel detecta el framework y publica `dist`.

**El despliegue no se hizo desde aquí**, porque es una acción en una cuenta que
no es mía. Queda para ti, y con una condición previa:

> **Confirma `site.url` antes del primer deploy.** Hoy dice
> `https://lailu3d.vercel.app`. De ahí salen todas las URL absolutas de los
> mensajes de WhatsApp, los `hreflang`, el canonical y el sitemap. Si el dominio
> final es otro y esto no se cambia, los enlaces que reciba el encargado
> apuntarán a un sitio que no existe, y no lo dirá ningún error: simplemente no
> abrirán nada.

Se cambia en una línea, en `src/config/site.ts`.

---

## Estado de verificación

| Comprobación | Resultado |
|---|---|
| `pnpm check` | 0 errores, 0 avisos, 18 *hints* (la deprecación de `z`, ya conocida) |
| `pnpm build` | 17 páginas + sitemap |
| Lighthouse móvil, 5 rutas | 100/100/100/100, sin diagnósticos pendientes |
| Auditoría propia de accesibilidad, 7 rutas | Sin hallazgos tras los tres arreglos |
| Fuentes | Las dos `latin` se descargan; `latin-ext` nunca se pide |
| Google Fonts | Ninguna petición |
| JSON-LD | Válido y coherente con lo que se ve en pantalla |
| Sitemap | 16 URL, kit excluido, alternates correctos |
| Consola | Sin errores en ninguna ruta |

---

## Lo que queda abierto

- **Desplegar** y repetir Lighthouse sobre el dominio real.
- **`site.url`**, según el punto anterior.
- **Dirección postal** para completar el `LocalBusiness`.
- **Fase 7 — contenido real:** fotografías de trabajos, imágenes de producto
  (hoy son SVG de relleno, y un SVG tampoco es un buen `image` para un `Product`
  de schema.org), nicks reales de Instagram y TikTok.
- Sigue pendiente de la fase 4: probar el enlace de WhatsApp en un **móvil real**
  y fijar el horario de atención.
- La traducción al inglés sigue sin revisar por un nativo (fase 5).

---

## Archivos nuevos y modificados

```
Doc/
├─ Plan de desarrollo - Lailu3D.md      fase 6 marcada salvo el despliegue
└─ Fase 6 - SEO y rendimiento.md        nuevo (este documento)

Lailu3D/
├─ CLAUDE.md                            + sección "SEO y rendimiento"
├─ astro.config.mjs                     sitemap + inlineStylesheets
├─ package.json                          scripts og/fuentes, fontsource en dev
├─ vercel.json                           nuevo: caché de /fonts
├─ scripts/og.mjs, scripts/fuentes.mjs   nuevos
├─ public/og.png, public/fonts/*.woff2   nuevos
└─ src/
   ├─ lib/jsonld.ts                      nuevo
   ├─ components/JsonLd.astro            nuevo
   ├─ components/ui/Seccion.astro        prop nivelTitulo
   ├─ components/ui/Campo.astro          contraste del placeholder
   ├─ components/TarjetaProducto.astro   prop nivelTitulo
   ├─ components/paginas/*.astro         JSON-LD, h1 del catálogo, LCP eager
   ├─ components/Footer.astro            logo diferido
   ├─ layouts/Layout.astro               og:image, preload de fuentes
   ├─ pages/kit.astro                    h1
   └─ styles/global.css                  @font-face propio
```
