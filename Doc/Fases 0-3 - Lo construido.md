# Fases 0–3 — Lo construido

> Cierre de las fases 0, 1, 2 y 3 del
> [`Plan de desarrollo - Lailu3D.md`](./Plan%20de%20desarrollo%20-%20Lailu3D.md).
> Fecha: 2026-09-18 · Estado: `pnpm check` y `pnpm build` en verde, 8 páginas generadas.

---

## Resumen

El sitio pasó de un `<h1>` suelto a una landing completa con catálogo navegable.
Todo camino termina en WhatsApp con el mensaje ya escrito, que es la regla de
negocio del proyecto.

| Ruta | Qué es |
|---|---|
| `/` | Landing: hero, servicios, cómo funciona, destacados, trabajos, CTA |
| `/productos` | Catálogo con filtro por categoría |
| `/productos/<slug>` | Ficha de producto (5 generadas) |
| `/kit` | Banco de pruebas del sistema de diseño (`noindex`, sin enlazar) |

---

## Fase 0 — Saneamiento

- **`CLAUDE.md` reescrito.** Antes se apuntaba a sí mismo, así que el proyecto no
  tenía instrucciones. Ahora contiene las reglas de negocio, la arquitectura, las
  trampas del sistema de diseño y los comandos.
- **`AGENTS.md`** queda como puntero a `CLAUDE.md`.
- **`pnpm check` y `pnpm build`.** `build` ejecuta `astro check` antes de
  compilar: un error de tipos ya no llega a producción.
- **`typescript` fijado en 6.x.** TypeScript 7 (compilador nativo) todavía no
  expone la API programática que usa `astro check`; con 7.x el comando falla
  antes de analizar nada.
- **`sharp` instalado.** `astro:assets` lo necesita para procesar imágenes en el
  build. Sin él solo salía un aviso y las imágenes quedaban sin generar.
- **`public/robots.txt`** con la referencia al sitemap que se creará en la fase 6.
- **Migración de imágenes a `astro:assets`** (la decisión bloqueante del plan):
  las imágenes de producto pasaron de `public/images/productos/` a
  `src/assets/productos/`, y el esquema las valida con `image()`. Si mañana falta
  un archivo, **el build falla** en vez de publicar una imagen rota. Para poner
  la foto real solo hay que reemplazar el archivo.

**Bug encontrado de paso:** `filamento-pla-blanco.svg` tenía los atributos
`stroke` y `stroke-width` duplicados en el mismo `<path>`. Eso es XML inválido,
así que el navegador descartaba la imagen entera y la tarjeta mostraba el texto
alternativo. Corregido con dos trazos (contorno gris + relleno blanco). Los otros
cuatro SVG se revisaron: están limpios.

---

## Fase 1 — Kit de componentes

En `src/components/ui/`, traducido de `Master/DESIGN.md`:

| Componente | Notas |
|---|---|
| `Boton.astro` | Variantes `primary` / `secondary` / `ghost`, tamaños `md` (40px) y `lg` (48px). Con `href` renderiza `<a>`, que es lo que usan todos los CTA de WhatsApp |
| `Chip.astro` | Lectura técnica en mayúsculas. Con `hex` dibuja la muestra del color del filamento |
| `Badge.astro` | Disponibilidad con punto de 6px. Textos ES/EN ya listos |
| `Tarjeta.astro` | `elev-1/2/3`, cabecera opcional con hairline, `href` opcional |
| `Campo.astro` | Input y textarea con focus ring nítido de 1px. Preparado para el cotizador de la fase 4 |
| `Seccion.astro` | Ancho, ritmo vertical y encabezado. Evita repetir el layout en cada bloque |
| `IconoWhatsApp.astro` | Glifo que hereda `currentColor` |

`/kit` muestra todas las variantes juntas para comparar con `Master/screen.png`.
Va con `noindex` y no está enlazada desde ninguna parte del sitio.

### Tres trampas que aparecieron (documentadas en `CLAUDE.md`)

1. **`peer-checked:` usa el combinador `~`, no `+`.** En el grupo de radios del
   filtro encendía *todas* las pastillas posteriores a la vez. Se resolvió con
   una regla propia `input:checked + label`.
2. **Clases interpoladas no existen.** `elev-${n}` no genera nada porque Tailwind
   escanea cadenas completas. Hay que mapear literales.
3. **`text-body-*` ya trae su `font-weight`.** Combinarlo con `font-medium` deja
   el resultado a merced del orden de las utilidades; donde hace falta otro peso
   se fija el tamaño explícito.

---

## Fase 2 — Estructura y landing

- **`Header.astro`** — sticky, logo, navegación, CTA de WhatsApp y menú móvil con
  `<details>` (sin JavaScript). Los anclas funcionan desde cualquier ruta:
  `#servicios` en el home, `/#servicios` desde una ficha.
- **`Footer.astro`** — sucursales, WhatsApp visible, redes y el aviso de que el
  sitio no procesa pagos.
- **`BotonWhatsAppFlotante.astro`** — fijo en todas las páginas.
- **`Layout.astro` ampliado** — `canonical`, `og:url`, `og:locale`, `og:site_name`,
  soporte de `noindex`, enlace de salto al contenido y el andamiaje de
  Header/Footer. El `og:image` se emite solo si se le pasa uno: apuntar a un
  archivo inexistente es peor que no declararlo (fase 6).
- **Landing** con las seis secciones del plan: hero con panel técnico, cuatro
  servicios, los tres pasos de "cómo funciona", destacados del catálogo, galería
  de trabajos y CTA final.

Dos decisiones de contenido:

- **La sección "Cómo funciona" es la respuesta a no publicar precios.** Explica
  por qué cada pieza se cotiza antes de que el visitante lo pregunte.
- **El hero no tiene fotografía** porque todavía no hay material real. En su
  lugar va un panel de datos técnicos del taller, que es coherente con el sistema
  de diseño y no parece un hueco esperando una imagen.

### Sobre los CTA de "Cotizar"

Apuntan hoy a WhatsApp, no a `/cotizar`, porque el formulario es la fase 4. Así
el sitio queda **completo y sin enlaces rotos** al terminar la fase 3. Cuando
exista `/cotizar`, hay que cambiar el destino en `index.astro` y en `Header.astro`.

### Nuevas funciones en `src/lib/whatsapp.ts`

- `waGeneral(idioma, ruta)` — cabecera, botón flotante, pie y CTA genéricos.
- `waServicio(servicio, ruta, idioma)` — tarjetas de servicio, con el servicio ya
  nombrado en el mensaje.

Ambas mantienen la regla: el mensaje siempre lleva la URL de la página desde la
que se escribió.

---

## Fase 3 — Catálogo

- **`TarjetaProducto.astro`** — la misma tarjeta en la landing y en el catálogo.
- **`/productos`** — grilla ordenada por `orden`, con filtro por categoría
  **sin JavaScript**: un grupo de radios y reglas `:has()` generadas solo para las
  categorías que hoy tienen producto. Sin hidratación, sin parpadeo, funciona con
  el teclado.
- **`/productos/[...slug]`** — migas de pan, imagen, precio, disponibilidad,
  chips, ficha técnica que solo lista los campos declarados, descripción y
  productos relacionados de la misma categoría.
- **`src/lib/formato.ts`** — `formatearPrecio()` (que devuelve "Bajo cotización"
  cuando `precio` es `null`, nunca `$0`) y las etiquetas de categoría.

**Verificado en el navegador:** el botón de una ficha abre WhatsApp con

```
¡Hola Lailu3D! Me interesa este producto:

• Filamento PLA Basic Azul
• Código: PLA-BL-005
• Enlace: https://lailu3d.vercel.app/productos/filamento-pla-azul/

¿Me confirman disponibilidad y precio?
```

También se corrigió que la descripción larga se renderizaba como un bloque
único: el YAML plegado (`>-`) deja los saltos de párrafo como `\n`, así que ahora
se parte en párrafos antes de pintarla.

---

## Estado de verificación

| Comprobación | Resultado |
|---|---|
| `pnpm check` | 0 errores, 0 avisos (18 *hints* de la deprecación de `z` en `astro:content`) |
| `pnpm build` | 8 páginas |
| Landing en móvil (375px) | Correcta; menú desplegable funcionando |
| Catálogo y filtro | Pastilla activa correcta tras el arreglo del combinador |
| Ficha de producto | Mensaje de WhatsApp con nombre, código y URL absoluta |
| Imágenes | Las 5 renderizan tras corregir el SVG inválido |

---

## Lo que queda abierto

**Antes de publicar:**

- `site.url` debe coincidir con el dominio real. De ahí salen todas las URL de
  los mensajes de WhatsApp: si está mal, los enlaces se rompen en silencio.
- La galería de trabajos y las imágenes de producto son **placeholders**.
- Nicks reales de Instagram y TikTok en `src/config/site.ts`.

**Pendiente por fase del plan:**

- **Fase 4** — `/cotizar` y el formulario. `Campo.astro` ya está construido para
  eso; falta la página, el script que arma el mensaje y redirigir los CTA.
- **Fase 5** — diccionario `src/i18n/`, rutas `/en` y el selector de idioma en el
  Header (hoy deliberadamente ausente: un control que no lleva a ningún lado es
  peor que no tenerlo). Los datos del catálogo ya son bilingües y los componentes
  aceptan `idioma`.
- **Fase 6** — sitemap, JSON-LD, `og:image`, fuentes locales y Lighthouse.

**Menor:** `astro check` deja 18 *hints* porque Astro 7 marca como obsoleto el
`z` reexportado desde `astro:content`. Se limpia añadiendo `zod` como dependencia
directa; no se hizo ahora para no arriesgar un desajuste de versión por un aviso
sin efecto.

---

## Archivos nuevos y modificados

```
Doc/
├─ Plan de desarrollo - Lailu3D.md      nuevo (sesión anterior)
└─ Fases 0-3 - Lo construido.md         nuevo (este documento)

Lailu3D/
├─ CLAUDE.md                            reescrito
├─ AGENTS.md                            puntero
├─ package.json                         scripts check/build + typescript 6 + sharp
├─ public/robots.txt                    nuevo
├─ src/
│  ├─ content.config.ts                 imagen: image()
│  ├─ content/productos/*.md            rutas de imagen actualizadas (5)
│  ├─ assets/productos/*.svg            movidos desde public/ + SVG blanco corregido
│  ├─ lib/whatsapp.ts                   + waGeneral, waServicio
│  ├─ lib/formato.ts                    nuevo
│  ├─ layouts/Layout.astro              SEO, noindex, header/footer
│  ├─ components/
│  │  ├─ Header.astro                   nuevo
│  │  ├─ Footer.astro                   nuevo
│  │  ├─ BotonWhatsAppFlotante.astro    nuevo
│  │  ├─ TarjetaProducto.astro          nuevo
│  │  └─ ui/                            Boton, Chip, Badge, Tarjeta, Campo,
│  │                                     Seccion, IconoWhatsApp
│  └─ pages/
│     ├─ index.astro                    landing completa
│     ├─ kit.astro                      nuevo (noindex)
│     └─ productos/
│        ├─ index.astro                 nuevo
│        └─ [...slug].astro             nuevo
```
