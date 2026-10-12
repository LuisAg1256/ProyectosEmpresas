# Fase 8 — Mejora de diseño

> **Estado (2026-10-12): implementado** 8.0 a 8.4. `pnpm check` sin errores,
> `pnpm build` con 17 páginas. Lighthouse sin medir (ver §12).
> Continúa [`Fase 6 - SEO y rendimiento.md`](./Fase%206%20-%20SEO%20y%20rendimiento.md).
> Referencias: [`Master/screen.png`](../Master/screen.png) y
> [`Master/code.html`](../Master/code.html) (la pantalla de Stitch) y
> [`Master/DESIGN.md`](../Master/DESIGN.md).
> Fecha: 2026-10-12.

---

## 1. Diagnóstico: por qué se ve básica

Se comparó la landing en marcha con la pantalla de Stitch. El problema no es el
minimalismo, es que **se quedó con el esqueleto del sistema y perdió lo que
Stitch le daba carácter**.

| # | Hallazgo | Evidencia |
|---|---|---|
| 1 | **La paleta se desvió de Stitch.** El sitio usa los tokens del frontmatter de `DESIGN.md` (`surface #faf9fd`, `surface-low #f4f3f7`): son grises con tinte lila. Stitch y la propia prosa de `DESIGN.md` hablan de hueso cálido (`#FBF9F5`, `#F5F2EB`, `#E5E0D8`). Junto al cobre, el lila lee frío y apagado. | `global.css:65-74` vs `code.html` (`tailwind.config`) |
| 2 | **El hero no tiene imagen.** Stitch abre con una foto grande de una pieza; aquí hay un panel con el logo, y existen 15 fotos reales sin usar en esa posición. | `PaginaInicio.astro:95-165` |
| 3 | **Todo es la misma tarjeta.** Servicios, pasos y productos usan `Tarjeta` en rejilla uniforme; no hay jerarquía ni un solo elemento que destaque. | `PaginaInicio.astro:177-236` |
| 4 | **Faltan los recursos propios de Stitch**: insignia de estado con punto, fila de micro-datos, capa de líneas topográficas, insignia flotante sobre la foto, galería con velo al pasar el cursor, numeración técnica, fondo degradado con resplandor cobrizo en el cierre. | `code.html`, secciones 1–11 |
| 5 | **El cierre es el bloque más pesado y menos elegante**: un rectángulo sólido de `#894d0d`. Stitch lo resuelve con un degradado cálido y un resplandor. | `PaginaInicio.astro:282-308` |
| 6 | **El footer** es `bg-surface-low`, una continuación de la página en vez de un cierre. Stitch lo pasa a grafito. | `Footer.astro:36` |
| 7 | **Cero movimiento.** No hay transiciones de entrada ni estados de hover más allá del color. | — |

**Lo que sí está bien y se conserva:** la tipografía (Space Grotesk + Hanken),
las etiquetas técnicas en mayúsculas, el radio de 4/8/12 px, la elevación por
capas, las fuentes propias, el Lighthouse 100 y la regla de cero JavaScript.

---

## 2. Dirección

**"Taller cálido con fotografía real."** Mismo minimalismo, pero con tres
palancas que hoy no se usan:

1. **Calidez de superficie** (hueso, no lila).
2. **Fotografía como protagonista** (hero y galería).
3. **Un contraste fuerte al final**: footer negro con difuminados, que cierra la
   página como un evento y no como un trámite.

Firma visual (el elemento que hace reconocible a Lailu3D): **la regla de
medición**. `DESIGN.md` ya la define ("Dimension Rulers"): marcas finas de mm
con coordenadas. Se usa con moderación, en el borde de la foto del hero, en los
encabezados de sección y en la base del footer.

---

## 3. Fase 8.0 — Tokens (base de todo lo demás)

Se toca solo el bloque `@theme` de [`global.css`](../Lailu3D/src/styles/global.css).
Ningún componente cambia en este paso, así que `/productos`, `/cotizar` y
`/trabajos` se calientan solos.

### 3.1 Superficies hacia el hueso de Stitch

| Token | Hoy | Propuesto |
|---|---|---|
| `surface` / `background` | `#faf9fd` | `#FBF9F5` |
| `surface-low` | `#f4f3f7` | `#F5F2EB` |
| `surface-container` | `#efedf1` | `#EFEBE2` |
| `surface-high` / `surface-highest` | `#e9e7ec` / `#e3e2e6` | `#E8E4DC` / `#E2DDD5` |
| `outline-variant` | `#d8c3b4` | `#E5E0D8` (borde de piedra, más fino y claro) |
| `on-surface` | `#1a1b1e` | `#18191C` (grafito) |

### 3.2 Cobre en dos funciones (decisión de accesibilidad)

El cobre de Stitch (`#C8873F`) **no pasa contraste como texto sobre hueso**.
Medido:

| Combinación | Contraste | Uso |
|---|---|---|
| `#894d0d` sobre `#FBF9F5` | **6,38:1** ✅ | texto, enlaces, etiquetas, relleno de botón (el actual) |
| `#B87333` sobre `#FBF9F5` | 3,61:1 ❌ | solo decorativo |
| `#C8873F` sobre `#FBF9F5` | 2,86:1 ❌ | solo decorativo o texto ≥ 36 px |
| `#C8873F` sobre negro `#0E0F11` | **6,39:1** ✅ | texto y botones **sobre el footer** |
| blanco sobre `#C8873F` | 3,00:1 ❌ | por eso no se copia el botón blanco-sobre-cobre de Stitch |

Por tanto: `primary` sigue siendo `#894d0d` para todo lo que se lee, y se añade un
token nuevo, `copper: #C8873F` (+ `copper-hover: #B87333`), para lo que **no se
lee como texto en claro**: puntos de estado, resplandores, líneas, nodos de la
línea de tiempo, numerales grandes e iconos, y para todo lo que va sobre negro.

### 3.3 Tokens nuevos para el footer

```
--color-ink: #0E0F11;          /* base del footer */
--color-ink-raised: #16171A;   /* botones de red, paneles */
--color-ink-line: #2C2F36;     /* filetes (Stitch) */
--color-ink-text: #A09B92;     /* texto secundario: 6,94:1 sobre ink */
```

`#78736B` (el gris del copyright en Stitch) da **4,08:1** sobre `ink` y no pasa
para texto pequeño: se usa `ink-text` también ahí.

### 3.4 Utilidades

`@utility` nuevas junto a `elev-*`: `glow-copper` (resplandor radial),
`hairline-fade` (filete que se desvanece en los extremos), `grain` (textura de
ruido). Se definen una vez y las usan footer, hero y cierre.

---

## 4. Fase 8.1 — Footer negro con difuminados

El pedido central. Se reescribe [`Footer.astro`](../Lailu3D/src/components/Footer.astro);
la estructura de datos (redes desde `site.redes`, enlaces, `waGeneral`) no cambia.

### 4.1 Capas, de abajo hacia arriba

1. **Base:** `bg-ink` (`#0E0F11`), casi negro con un punto cálido. Es más negro
   que el grafito de Stitch (`#18191C`) a propósito, para dar más profundidad a
   los difuminados; se puede subir a grafito si se prefiere (ver decisiones).
2. **Puente superior:** una franja de ~160 px en la parte alta del footer con un
   degradado de `background` (el color de la sección anterior) a transparente. La
   página **se funde** en el negro en lugar de cortarse con una línea. Debe
   coincidir con el fondo de la última sección (si el cierre pasa a degradado
   cálido, el puente toma ese color final).
3. **Aurora cobriza:** dos `radial-gradient` grandes y suaves —uno arriba a la
   izquierda (cobre al ~20 % de opacidad) y otro abajo a la derecha (~10 %)—.
   Es el mismo recurso de Stitch (`bg-primary/20 blur-3xl` en el bloque de
   cotizar), llevado al negro, donde sí se ve.
4. **Grano:** un SVG `feTurbulence` en línea (data URI) a 3–4 % de opacidad.
   Rompe el *banding* (las bandas visibles) que los degradados oscuros muestran
   en pantallas baratas. Sin petición de red.
5. **Marca gigante:** "LAILU3D" en Space Grotesk 700, `clamp(5rem, 18vw, 16rem)`,
   pegada al borde inferior y recortada por `overflow-hidden`, con relleno
   degradado (`rgb(255 255 255 / .14)` → transparente) vía `background-clip:text`.
   `aria-hidden`: es decoración. Es el difuminado más reconocible del conjunto.
6. **Contenido** (por encima de todo): rejilla de 4 columnas como Stitch.

### 4.2 Contenido y detalles

- **Columna 1:** logo, descripción, y una insignia de estado con punto cobre
  ("Loja · Cuenca — envíos a todo el Ecuador", ya existe en i18n).
- **Columna 2 — Sitio:** enlaces; hover a `copper` con transición.
- **Columna 3 — Contacto:** el WhatsApp pasa de enlace de texto a **botón
  protagonista** (contorno cobre sobre negro, 6,39:1), porque es el único
  camino de conversión del negocio.
- **Columna 4 — Redes:** botones cuadrados de 36 px (`ink-raised`, borde
  `ink-line`, hover cobre), como en Stitch, en lugar de lista de texto.
- **Filetes** entre franjas con `hairline-fade` (transparente → blanco 12 % →
  transparente), no una línea sólida de borde a borde.
- **Franja inferior:** copyright y aviso en `ink-text`, con una regla de marcas
  de mm muy tenue encima (la firma visual).

### 4.3 Restricciones

- **Logo sobre negro: comprobado, funciona.** El texto de
  `logo-horizontal.svg` es naranja (`#F9871C`) y cobre (`#C4825F`), no marrón
  como se supuso al escribir este plan. No hizo falta una versión clara.
- **Cero JavaScript.** Todo es CSS.
- **Contraste:** todo texto del footer ≥ 4,5:1 (medido arriba).
- **Regla del proyecto:** `CLAUDE.md` dice "solo modo claro, sin `dark:`". El
  footer **no es un modo oscuro**: es una superficie oscura fija. Hay que
  reescribir esa línea para que no parezca una contradicción.

---

## 5. Fase 8.2 — Hero

[`PaginaInicio.astro`](../Lailu3D/src/components/paginas/PaginaInicio.astro), bloque hero.

- **Foto real** en lugar del panel con logo, formato 4:3, esquinas `rounded-xl`,
  con velo `from-ink/50` abajo y zoom lento al pasar el cursor. Va con
  `loading="eager"` y `fetchpriority="high"` (es el LCP) y `widths` propios.
- **Insignia flotante de vidrio** sobre la foto (blanco 90 %, `backdrop-blur`),
  como la de Stitch. Contenido: los datos que **ya existen y son ciertos** en
  `inicio.panel` (tecnología, material, cantidad mínima, entrega). El panel actual
  desaparece, pero sus datos se reutilizan.
- **Regla de medición** pegada al borde inferior de la foto.
- **Insignia de estado** sobre el título: punto cobre con pulso + "Loja · Cuenca
  — envíos a todo el Ecuador".
- **Título** con la última frase ("fabricado.") en `copper`. **Sin cursiva:**
  Stitch usa `italic`, pero Space Grotesk no tiene cursiva y el navegador la
  falsearía torciendo las letras, que se ve mal. El énfasis va por color y un
  subrayado degradado fino.
- **Fila de micro-datos** con filetes verticales, **solo con cifras verificables
  y derivadas del código**, nunca inventadas: *N piezas en el archivo*
  (`trabajos().length`), *2 talleres* (`site.sucursales.length`), *N referencias
  en catálogo* (`getCollection('productos')`). Si crece el sitio, las cifras
  crecen solas.
- **Fondo:** capa de líneas topográficas/isométricas en arena a 40 % de opacidad
  (SVG en línea, como Stitch) con `mask-image` para que se desvanezca hacia los
  bordes.

---

## 6. Fase 8.3 — Secciones

| Sección | Hoy | Propuesta (de Stitch) |
|---|---|---|
| **Franja de materiales** (nueva, entre hero y servicios) | no existe | En Stitch es una franja de clientes. No tenemos clientes que citar, así que se reemplaza por **muestras de color de filamento** tomadas del `hex` real del catálogo: puntos de color + nombre de material. Es verdad, es visual y lleva al catálogo. |
| **Servicios** | 4 tarjetas iguales | Cuadrícula tipo *bento*: la tarjeta de "Impresión 3D" más ancha. Cada tarjeta con **tile de icono** (cobre al 10 %), índice `01–04`, y flecha que se desplaza al pasar el cursor. Iconos SVG en línea (no se importa Material Symbols: es una fuente externa más, y el sitio acaba de sacar las suyas de Google Fonts). |
| **Cómo funciona** | 3 tarjetas | **Línea de tiempo** horizontal: filete que une nodos cobre, numerales grandes en contorno y baja opacidad. Los nodos se rellenan al pasar el cursor. |
| **Trabajos** (galería) | tarjetas con texto debajo | Fotos a sangre con **velo grafito al pasar el cursor** y etiqueta de material + título (Stitch). En móvil, que no tiene hover, la etiqueta queda siempre visible. Primera foto en tamaño doble (*bento* de 3 columnas: 1 grande + 2 pequeñas + 3 pequeñas = 6, que es `TRABAJOS_EN_INICIO`). |
| **Catálogo destacado** | 4 tarjetas planas | Mantener el contenido; mejorar la tarjeta: bandeja de imagen en `surface-low` con **muesca de esquina**, precio en `tabular`, y un punto de color con el `hex` del filamento. |
| **Cierre / CTA** | bloque sólido `#894d0d` | **Banda de degradado cálido** (`#F7F2E8 → #E9DEC9`) con resplandor cobrizo difuso arriba y título grande. En lugar del formulario de Stitch (nombre + correo, que aquí no tiene dónde ir porque no hay backend), una **barra de cuatro chips de servicio** que enlazan a `/cotizar?servicio=<slug>` (mecanismo que ya existe) más el botón de WhatsApp. |
| **Encabezados de sección** | etiqueta + título | Etiqueta con numeración técnica (`01 — SERVICIOS`) y, en escritorio, un dato tipo placa alineado a la derecha (como "RESOLUCIÓN 25µm–100µm" de Stitch). Solo con datos ciertos. |

**Opcional, sin comprometerse:** Stitch pone el catálogo sobre tarjetas
oscuras (`#1F2127`). Con el footer negro ya hay un contraste fuerte al final;
una segunda zona oscura diluiría el efecto, y los placeholders actuales (carretes
dibujados) en negro desaparecerían sobre fondo oscuro. Recomendación: **no**,
hasta tener fotos reales de producto.

---

## 7. Fase 8.4 — Movimiento y micro-interacciones

Todo en CSS, para conservar el "cero JavaScript":

- **Entrada al hacer scroll:** `animation-timeline: view()` con aparición
  ascendente de 12 px, dentro de `@supports`. Los navegadores sin soporte ven el
  contenido ya visible, sin degradación.
- **Hover de imágenes:** `scale(1.05)` en 500–700 ms (Stitch).
- **Punto de estado:** pulso suave.
- **Enlaces de navegación:** subrayado cobre que crece desde la izquierda; estado
  activo para la página actual (hoy no existe).
- **`prefers-reduced-motion`:** todo lo anterior se apaga.

---

## 8. Lo que NO se copia de Stitch

La pantalla de Stitch es de otra marca ("VOLUMEN3D") con contenido inventado. Se
toma **su diseño, no sus afirmaciones**:

- "+500 piezas impresas", "72 h de entrega", "12 materiales industriales".
- "ISO TESTED", "Tolerancias certificadas", "Tolerancia ±0.15 mm".
- "Respuesta en menos de 4 horas", "Acuerdo de confidencialidad (NDA)".
- Los nombres de clientes (Studio Kroma, Nexus Robotics…) y los testimonios.
- "Resina", "ABS técnico" y cualquier material que Lailu3D no ofrezca.
- Formulario con correo y envío: **no hay pagos ni backend**; todo camino
  termina en WhatsApp.

Si el negocio tiene cifras o certificaciones reales, entran por `i18n` y `site.ts`
en la Fase 7 de contenido, no por diseño.

---

## 9. Restricciones técnicas (vienen de `CLAUDE.md`)

- Ningún hex en componentes: solo tokens. Los nuevos (`copper`, `ink*`) se
  declaran en `@theme`.
- Todo texto visible nuevo va a `es.ts` **y** `en.ts` (`en` es `typeof es`: lo
  que falte no compila).
- Enlaces internos con `rutaLocalizada`; WhatsApp solo vía `src/lib/whatsapp.ts`.
- Sin fuentes ni scripts externos; las imágenes pasan por `astro:assets`.
- **Presupuesto de rendimiento:** mantener Lighthouse móvil en 100/100/100/100.
  Riesgos concretos: la foto del hero (LCP), el SVG de ruido y las capas con
  `blur`/`mask` (coste de pintado en móviles baratos).
- Las páginas internas no se rediseñan una a una: heredan por tokens y por
  `Seccion`/`Tarjeta`/`Boton`.

---

## 10. Orden de ejecución

| Paso | Qué | Tamaño | Depende de |
|---|---|---|---|
| 8.0 | Tokens y utilidades | S | — |
| 8.1 | Footer negro con difuminados | M | 8.0 |
| 8.2 | Hero con foto, insignia y micro-datos | M | 8.0 |
| 8.3 | Servicios, línea de tiempo, galería, cierre, encabezados | L | 8.0 |
| 8.4 | Movimiento | S | 8.3 |
| 8.5 | QA: `pnpm check`, `pnpm build`, Lighthouse, 375 / 768 / 1440 px, contraste, `prefers-reduced-motion`, ES y EN | S | todo |

Se recomienda **8.0 → 8.1 → 8.2** como primera entrega: con tokens, footer y
hero cambia la percepción de todo el sitio y se puede aprobar antes de invertir
en las secciones.

---

## 11. Decisiones abiertas (necesito tu respuesta)

1. **Superficies cálidas.** ¿Se adopta el hueso de Stitch en lugar del gris lila
   actual? *Recomendado: sí.* Es el cambio de mayor efecto con menor esfuerzo.
2. **Negro del footer.** `ink #0E0F11` (más profundo, difuminados más visibles)
   o grafito `#18191C` (el de Stitch, más suave). *Recomendado: `ink`.*
3. **Foto del hero.** Hay 15 piezas; la elección es de criterio visual y de
   negocio. Hace falta que digas cuál representa mejor a Lailu3D (o que se
   permita rotar 3).
4. **Cifras del hero.** ¿Solo las derivadas del código (propuesta), o hay datos
   reales del negocio (piezas entregadas, tiempo de respuesta) que quieras mostrar?
5. **Titulares en mayúsculas.** Stitch usa mayúsculas y `tracking-tight` en el
   título principal (rótulo industrial). En español, con acentos y frases largas,
   cansa más. *Recomendado: mayúsculas solo en las etiquetas técnicas, título en
   frase normal.*

---

## 12. Cierre de la implementación

### Decisiones tomadas (las de §11 se resolvieron con la opción recomendada)

| # | Decisión | Resultado |
|---|---|---|
| 1 | Superficies | Hueso cálido de Stitch. |
| 2 | Negro del footer | `ink #0E0F11`. |
| 3 | Foto del hero | `ave-personalizada` (el águila): es la pieza más vistosa y es un *modelo personalizado*, el núcleo del negocio. Cambiarla es cambiar un `import` en `PaginaInicio.astro`. |
| 4 | Cifras del hero | Solo derivadas del código: piezas en la galería (`trabajos().length`), talleres (`site.sucursales.length`) y la pieza mínima (1). |
| 5 | Mayúsculas | Solo en etiquetas técnicas. | 

### Cambios respecto al plan

- **La galería no oculta el texto al pasar el cursor**, como hace Stitch: en
  móvil no hay hover y en `/trabajos` el título es la información. El velo se
  oscurece y la foto se acerca al pasar el cursor.
- **La franja de capacidades** usa una lista fija en i18n (`inicio.franja`) y no
  muestras de color: el catálogo publicado tiene 4 colores, demasiado pocos para
  una franja. Las muestras de color reales van en la tarjeta de filamentos.
- **El anillo de foco de `Boton`** se movió de la base a cada variante (ver
  `CLAUDE.md`): `ring-primary` ganaba por orden alfabético.

### Archivos

`global.css` (tokens y utilidades), `Footer.astro` (reescrito), `Header.astro`
(subrayado y estado activo), `Seccion.astro` (`indice`, `meta`),
`PaginaInicio.astro` (reescrito), `TarjetaTrabajo.astro`, `TarjetaProducto.astro`,
`Boton.astro` (variante `tinta`), `IconoServicio.astro` (nuevo), `es.ts`/`en.ts`.

### Pendiente

- **Lighthouse.** Esta máquina (Linux) no tiene Chrome ni Edge. Medir antes de
  publicar. Lo que se sabe: el HTML de la home pasó de 14 KB a 21 KB comprimido
  (el CSS en línea creció por los degradados y los colores con opacidad); la foto
  del hero, que es el LCP, sale con `fetchpriority="high"` y pesa 10–27 KB según
  el ancho. Riesgo a vigilar: el coste de pintado de `backdrop-blur` y las
  máscaras en móviles de gama baja.
