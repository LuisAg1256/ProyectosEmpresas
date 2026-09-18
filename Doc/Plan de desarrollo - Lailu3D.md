# Plan de desarrollo — Lailu3D

> Documento de ejecución. La fuente de verdad del negocio es
> [`Identidad de la empresa - Lailu3D.md`](./Identidad%20de%20la%20empresa%20-%20Lailu3D.md);
> la del diseño, [`../Master/DESIGN.md`](../Master/DESIGN.md).
> Fecha: 2026-09-17

---

## 0. Punto de partida (lo que ya existe)

| Pieza | Estado |
|---|---|
| Astro 7 + Tailwind 4 vía `@tailwindcss/vite` | ✅ configurado |
| i18n en `astro.config.mjs` (`es` en la raíz, `en` bajo `/en`) | ✅ configurado, ❌ sin rutas EN |
| Tokens del sistema de diseño en `src/styles/global.css` | ✅ completo (colores, tipografía, `elev-1/2/3`, `tabular`) |
| `src/config/site.ts` (teléfono, redes, sucursales) | ✅ |
| `src/lib/whatsapp.ts` (`waProducto`, `waCotizacion`) | ✅ escrito, ❌ sin consumidores |
| `src/content.config.ts` + 5 productos `.md` | ✅ esquema y datos semilla |
| Logos SVG en `src/assets/brand/` | ✅ |
| **UI** | ❌ `index.astro` es un stub de 14 líneas, no hay componentes |
| **Catálogo navegable** (`/productos`, `/productos/<slug>`) | ❌ no existe |
| **Cotizador** | ❌ no existe |
| **SEO** (sitemap, canonical, hreflang, og:image) | ❌ |

**Conclusión:** los cimientos están puestos y son buenos. Falta todo lo visible.
El plan va de dentro hacia fuera: kit de componentes → páginas → conversión → idioma → despliegue.

---

## Fase 0 — Saneamiento de base

Trabajo corto, evita arrastrar fricción en todas las fases siguientes.

- [x] **Arreglar `CLAUDE.md` y `AGENTS.md`**: hoy ambos dicen "las instrucciones viven en `CLAUDE.md`" apuntándose a sí mismos. `CLAUDE.md` debe contener las reglas reales (sin pagos, todo a WhatsApp; patrón de Content Collections; trampas de espaciado de Tailwind 4) y `AGENTS.md` quedar como puntero.
- [x] **Scripts de verificación** en `package.json`: `"check": "astro check"` más la dependencia `typescript`. Sin esto no hay forma de validar los tipos del contenido.
- [x] **`public/robots.txt`** y confirmar el dominio provisional (`lailu3d.vercel.app` ya está en `site.ts`).
- [x] **Decisión de imágenes** (bloquea la Fase 3): los productos hoy referencian rutas string bajo `/public` (`imagen: /images/productos/*.svg`). Para fotos reales conviene migrar el esquema a `image()` de `astro:assets` con los archivos en `src/assets/productos/`, lo que da optimización, `srcset` y verificación en build. Cambia el esquema y las 5 fichas semilla: hacerlo ahora cuesta minutos, después cuesta una migración.

**Listo cuando:** `pnpm check` y `pnpm build` pasan limpios.

---

## Fase 1 — Kit de componentes

Construir el vocabulario visual una sola vez, traducido de `Master/DESIGN.md`.
Todo en `src/components/ui/`.

- [x] `Boton.astro` — variantes `primary` (cobre sólido), `secondary` (blanco con borde), `ghost`. Altura 40px, radio 4px. **Nunca pill.** Soporta `as="a"` para los enlaces de WhatsApp.
- [x] `Chip.astro` — lectura técnica en mayúsculas, `text-label-sm`, fondo `surface-container`.
- [x] `Badge.astro` — estado de disponibilidad con punto de 6px (`disponible` / `bajo_pedido` / `agotado`).
- [x] `Tarjeta.astro` — superficie `elev-2`, padding 24px, cabecera con hairline.
- [x] `Campo.astro` — input y textarea con focus ring nítido de 1px en cobre (sin blur).
- [x] `Seccion.astro` — envoltorio de ancho y ritmo vertical (`px-margin-mobile md:px-margin`, `max-w-6xl`), para no repetir el layout en cada bloque.

**Regla:** ninguna página escribe hex a mano. Solo clases de token (`bg-primary`, `text-on-surface-variant`, `border-outline-variant`).

**Listo cuando:** existe una ruta temporal de prueba que muestra todas las variantes y se ve coherente con `Master/screen.png`.

---

## Fase 2 — Estructura del sitio y landing en español

- [x] `src/components/Header.astro` — `logo-horizontal.svg`, navegación (Servicios · Catálogo · Trabajos · Cotizar), selector de idioma (inerte hasta la Fase 5) y CTA de WhatsApp.
- [x] `src/components/Footer.astro` — sucursales Loja y Cuenca, WhatsApp visible, Instagram y TikTok, aviso de "cotizaciones por WhatsApp, sin pagos en línea".
- [x] `src/components/BotonWhatsAppFlotante.astro` — presente en todas las páginas, con mensaje genérico prellenado.
- [x] Ampliar `Layout.astro`: `canonical`, `og:image`, `og:url`, `og:locale` y slots para Header y Footer.
- [x] **Landing** (`src/pages/index.astro`), en este orden — el sitio es vitrina y captador:
  1. **Hero** — promesa ("lo que imaginas, fabricado") y CTA doble: *Cotizar mi idea* / *Ver catálogo*.
  2. **Servicios** — 4 tarjetas: impresión 3D, grabado y corte láser, modelado desde boceto, lámparas litofanía.
  3. **Cómo funciona** — 3 pasos: cuéntanos la idea → cotizamos por WhatsApp → producimos y entregamos. Es la sección que baja la fricción de no publicar precios.
  4. **Productos destacados** — 3 o 4 fichas desde la colección (`destacado: true`), con enlace al catálogo.
  5. **Trabajos previos** — galería como prueba social visual. Hoy con placeholders.
  6. **CTA final** — bloque de cotización.

**Listo cuando:** la landing se ve terminada en móvil (375px) y en escritorio, sin textos de relleno, y todos los CTA abren WhatsApp con mensaje prellenado.

---

## Fase 3 — Catálogo

El corazón de datos del sitio; `content.config.ts` ya lo soporta.

- [x] `src/pages/productos/index.astro` — grilla de `getCollection('productos')`, ordenada por `orden`, con filtro por `categoria` (filamento / figura / llavero / lámpara). El filtro puede ser CSS o JS mínimo; no hace falta un framework.
- [x] `src/pages/productos/[...slug].astro` — ficha individual vía `getStaticPaths()`: imagen, nombre, descripción larga (`<Content />`), ficha técnica en tabla (`marca`, `material`, `color` con muestra del hex, `pesoGramos`, `diametroMm`), precio referencial con `tabular`, badge de disponibilidad y botón **"Pedir por WhatsApp"** con `waProducto(producto, Astro.url.pathname, idioma)`.
- [x] `src/components/TarjetaProducto.astro` — reutilizada en la landing y en el catálogo.
- [x] Manejo de `precio: null` → mostrar "Bajo cotización", nunca "$0".

**Listo cuando:** los 5 productos semilla tienen ficha navegable y el mensaje de WhatsApp llega con nombre, SKU y URL absoluta correcta.

---

## Fase 4 — Cotizador

Es el objetivo de negocio del sitio; merece su propia fase.

- [x] `src/pages/cotizar.astro` — formulario: descripción de la idea (obligatoria), cantidad, medidas, enlace de referencia y tipo de servicio.
- [x] `src/components/FormularioCotizacion.astro` — script de cliente que, al enviar, arma el enlace con la misma lógica de `waCotizacion` y abre WhatsApp. **No hay backend, no hay endpoint, no se guarda nada.**
  - Nota técnica: `waCotizacion` hoy se usa en el servidor. Para usarla en el cliente basta con que el script la importe (Astro la empaqueta); hay que mantenerla pura, sin dependencias de Node.
- [x] Validación mínima en cliente: sin descripción no se abre WhatsApp.
- [x] Texto de expectativa: "te respondemos por WhatsApp en horario laboral" — evita la sensación de formulario al vacío.

**Listo cuando:** en un móvil real el mensaje generado abre la app de WhatsApp con todos los campos completos y los saltos de línea correctos.

---

## Fase 5 — Inglés

Dejarlo para después de cerrar el español evita traducir tres veces lo mismo.

- [x] `src/i18n/` con diccionario por idioma (`es.ts`, `en.ts`), helper `t(idioma, clave)` y `rutaLocalizada()`.
- [x] Duplicar rutas bajo `src/pages/en/` (`index`, `productos/index`, `productos/[...slug]`, `cotizar`) reutilizando los mismos componentes; el contenido del catálogo ya es bilingüe en el frontmatter.
- [x] Selector de idioma funcional en el Header: conserva la ruta equivalente, no manda siempre al home.
- [x] `hreflang` alternates y `og:locale:alternate` en `Layout.astro`.

**Listo cuando:** cada página en español tiene su equivalente en inglés y el cambio de idioma conserva el producto que se estaba viendo.

---

## Fase 6 — SEO, rendimiento y despliegue

- [x] `@astrojs/sitemap` con la configuración `i18n`.
- [x] Datos estructurados JSON-LD: `LocalBusiness` (Loja y Cuenca) en el home, `Product` en cada ficha.
- [x] Imagen social `og:image` (1200×630) con la marca.
- [x] Fuentes: hoy se cargan desde Google Fonts con dos `preconnect`. Evaluar fuentes locales para quitar el bloqueo de render.
- [x] Lighthouse móvil: Performance ≥ 95 y Accesibilidad 100. Verificar el contraste del cobre sobre fondos cálidos, en particular `primary-container` con texto blanco.
- [ ] Despliegue en Vercel: salida estática, sin adaptador; rama `main` a producción. Confirmar que `site.url` coincide con el dominio real **antes** del primer deploy, porque de ahí salen las URL de los mensajes de WhatsApp.

**Listo cuando:** el sitio está en línea, indexable, y un enlace de WhatsApp generado en producción abre la ficha correcta.

---

## Fase 7 — Contenido real (en paralelo, no bloquea el código)

Depende del cliente, no del desarrollo. Puede avanzar desde la Fase 2.

- [ ] Fotografías reales de productos y trabajos previos (hoy hay SVG de placeholder). En `ReferenciasImagenes/` ya hay material: disco de gimnasio, pesas, batería y el logo.
- [ ] Nicks reales de Instagram y TikTok en `src/config/site.ts`.
- [ ] Catálogo real: filamentos por color y las figuras y llaveros que se vendan.
- [ ] Dominio propio, con actualización de `site.url`.
- [ ] Analítica (fase 2 del proyecto): Vercel Analytics o Plausible.

---

## Orden y dependencias

```
Fase 0 ──► Fase 1 ──► Fase 2 ──► Fase 3 ──► Fase 4 ──► Fase 5 ──► Fase 6
   │                     │
   │                     └── Fase 7 (contenido) corre en paralelo desde aquí
   └── la decisión de imágenes bloquea la Fase 3
```

**Primer entregable publicable:** el final de la Fase 4 — landing, catálogo y cotizador, solo en español.
Eso ya cumple los tres objetivos del documento de identidad. El inglés y el SEO fino son mejora, no requisito de lanzamiento.

---

## Riesgos y decisiones abiertas

| Riesgo | Mitigación |
|---|---|
| Los placeholders SVG llegan a producción | La Fase 7 arranca en paralelo; marcar cada producto sin foto real y no publicar el catálogo completo hasta tenerlas |
| `site.url` incorrecto en el deploy | Las URL de WhatsApp se construyen con `new URL(ruta, site.url)`: un dominio mal puesto rompe en silencio todos los enlaces del catálogo. Verificar en la Fase 6 |
| Duplicación al traducir | El diccionario de la Fase 5 debe existir *antes* de crear `src/pages/en/`, no después |
| La falta de precios genera abandono | La sección "Cómo funciona" (Fase 2) es la respuesta de diseño: explicar el porqué antes de que el usuario lo pregunte |
