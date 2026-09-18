# Fase 4 — Cotizador

> Cierre de la fase 4 del
> [`Plan de desarrollo - Lailu3D.md`](./Plan%20de%20desarrollo%20-%20Lailu3D.md).
> Continúa [`Fases 0-3 - Lo construido.md`](./Fases%200-3%20-%20Lo%20construido.md).
> Fecha: 2026-09-18 · Estado: `pnpm check` en verde, 9 páginas generadas.

---

## Resumen

Ya existe `/cotizar`: el objetivo de negocio del sitio. El visitante escribe qué
quiere fabricar y el botón abre WhatsApp con el mensaje redactado. **No hay
backend**: el formulario no se envía a ningún sitio, no hay endpoint y no se
guarda nada. El sitio sigue sin pedirle una cuenta ni un pago a nadie.

| Ruta | Qué es |
|---|---|
| `/cotizar` | Formulario de cotización (nuevo) |
| `/` · `/productos` · `/productos/<slug>` · `/kit` | Sin cambios de estructura, sí de destino en los CTA |

---

## Qué se construyó

### `src/pages/cotizar.astro`

Dos columnas en escritorio, una en móvil: a la izquierda el formulario, a la
derecha "qué necesitamos saber" (pieza, tamaño y cantidad, fecha) y la salida
directa por WhatsApp para quien prefiera escribir sin formulario.

### `src/components/FormularioCotizacion.astro`

Campos: servicio (desplegable), **idea (obligatoria)**, cantidad, medidas y
enlace de referencia. El `<script>` importa `waCotizacion` —Astro lo empaqueta
para el navegador— arma el enlace y abre WhatsApp.

Tres decisiones que conviene recordar:

- **`novalidate` y validación propia.** El `required` nativo acepta una
  descripción de puros espacios y su globo sale en el idioma del navegador, no
  en el del sitio. La comprobación real es `descripcion.value.trim()`, con
  mensaje propio, `aria-invalid` y foco al campo.
- **El enlace de referencia es `text`, no `url`.** Con `type="url"` el navegador
  rechaza `drive.google.com/...` por no llevar `https://`, que es exactamente lo
  que pega la gente. Bloquear un contacto por una barra de protocolo es peor que
  recibir un enlace sin protocolo.
- **`window.open` con respaldo.** Si el navegador bloquea la pestaña nueva, se
  navega en la misma (`location.href`). Y sin JavaScript, un `<noscript>` ofrece
  el chat directo.

### `src/lib/servicios.ts`

Los cuatro servicios se declaran **una sola vez**. De ahí salen las tarjetas de
la landing y las opciones del desplegable, así que el nombre del servicio no
puede desincronizarse entre ambos. El `slug` viaja en `/cotizar?servicio=laser`
y el script preselecciona la opción en el cliente, que es lo que corresponde a
una página estática servida cacheada.

### `waCotizacion` reescrita

Ahora recibe el servicio y la ruta, y **la idea va al final, en su propio
bloque**, no como viñeta. Motivo concreto: el cliente escribe párrafos, WhatsApp
respeta los saltos de línea y dentro de la lista el segundo párrafo quedaba
pegado a la viñeta siguiente. Se reordena el mensaje en vez de mutilar el texto
del cliente.

```
¡Hola Lailu3D! Quisiera una cotización:

• Servicio: Grabado y corte láser
• Cantidad: 2
• Formulario: https://lailu3d.vercel.app/cotizar

Mi idea:
Una placa grabada con el logo de mi negocio.

Para colgar en la entrada.
```

Los campos vacíos no aparecen. La línea `Formulario:` sirve de atribución: dice
que el mensaje viene del cotizador y no del botón flotante.

---

## Los CTA, reordenados

Hasta ahora todo apuntaba a WhatsApp porque `/cotizar` no existía. Nuevo reparto:

| Elemento | Destino |
|---|---|
| Botón del header · hero · CTA final · "¿No está lo que buscas?" del catálogo | `/cotizar` |
| Tarjetas de servicio | `/cotizar?servicio=<slug>`, con la opción ya elegida |
| Botón flotante · pie · menú móvil · CTA final (secundario) | WhatsApp directo |
| Ficha de producto | WhatsApp directo, sin cambios |

El criterio: **la pieza a medida necesita datos** (descripción y medidas), así
que pasa por el formulario; **el producto de catálogo ya está definido** por su
código, así que va directo al chat. Quien solo quiere preguntar algo suelto
tiene el botón flotante en todas las páginas.

Como las tarjetas de servicio dejaron de escribir a WhatsApp, `waServicio()` se
quedó sin consumidores y se eliminó de `src/lib/whatsapp.ts`.

---

## Componentes tocados

- **`Campo.astro`** — nuevo `tipo="select"` con `opciones`. El chevron va aparte
  porque `appearance-none` borra el nativo.
- **`Boton.astro`** — variantes `inverso` e `inverso-outline` para los bloques
  de fondo cobre, donde el primario se pierde.
- **`/kit`** — muestra el desplegable y las dos variantes nuevas.

---

## Un fallo heredado de la fase 2

El CTA del header llevaba `class="hidden sm:inline-flex"` y **nunca se ocultó**:
entre dos utilidades de la misma propiedad decide el orden de la hoja de
estilos, no el del atributo, y Tailwind emite `.inline-flex` —que `Boton` trae
en su base— después de `.hidden`. Comprobado en el CSS compilado:

```
.hidden       offset 9213
.inline-flex  offset 9234
```

En vez de forzarlo, el botón queda **visible también en móvil**: es el CTA del
negocio, cabe al lado del menú y el resultado es el que se quería. El menú móvil
ya no repite "Cotizar" y ofrece la vía directa por WhatsApp.

De ahí sale la regla nueva de `CLAUDE.md`: **cuando un componente necesite otro
aspecto, se le añade una variante; no se pelea desde `class`.**

---

## Estado de verificación

| Comprobación | Resultado |
|---|---|
| `pnpm check` | 0 errores, 0 avisos, 18 *hints* (la deprecación de `z`, ya conocida) |
| `pnpm build` | 9 páginas |
| Envío en vacío | No abre WhatsApp: aviso, `aria-invalid` y foco al campo |
| Envío completo | Mensaje con servicio, cantidad, medidas, referencia, URL e idea en párrafos |
| `/cotizar?servicio=laser` | Llega con "Grabado y corte láser" preseleccionado |
| Móvil (375px) | Formulario, desplegable y menú correctos |
| Consola | Sin errores |

Comprobado interceptando `window.open` en el navegador; el enlace generado se
leyó decodificado, no se envió ningún mensaje real.

---

## Lo que queda abierto

- **Falta probarlo en un teléfono real.** El criterio de "listo" del plan es que
  el enlace abra la *app* de WhatsApp con los saltos de línea correctos. En el
  navegador de escritorio se verificó el enlace; el salto a la app nativa solo
  se confirma en un móvil.
- **Horario laboral.** El texto dice "de lunes a sábado" sin horas concretas;
  conviene fijarlas con el cliente y, de paso, llevarlas a `src/config/site.ts`.
- **Fase 5** — diccionario `src/i18n/`, rutas `/en` y selector de idioma.
  `waCotizacion` ya tiene el mensaje en inglés y el formulario recibe `idioma`;
  faltan las etiquetas visibles, que hoy están en español dentro del componente.
- **Fase 6** — sitemap, JSON-LD, `og:image`, fuentes locales y Lighthouse.

---

## Archivos nuevos y modificados

```
Doc/
├─ Plan de desarrollo - Lailu3D.md   fases 0–4 marcadas
└─ Fase 4 - Cotizador.md             nuevo (este documento)

Lailu3D/
├─ CLAUDE.md                         + reglas del cotizador y de las variantes
└─ src/
   ├─ lib/servicios.ts               nuevo
   ├─ lib/whatsapp.ts                waCotizacion reescrita, waServicio eliminada
   ├─ pages/cotizar.astro            nuevo
   ├─ pages/index.astro              servicios desde lib, CTA a /cotizar
   ├─ pages/productos/index.astro    CTA a /cotizar
   ├─ pages/kit.astro                select y variantes inversas
   └─ components/
      ├─ FormularioCotizacion.astro  nuevo
      ├─ Header.astro                CTA a /cotizar, botón visible en móvil
      ├─ Footer.astro                + enlace "Cotizar"
      └─ ui/                         Campo (select), Boton (inverso)
```
