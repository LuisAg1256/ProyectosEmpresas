# Identidad de la empresa — Lailu3D

> Documento fuente de verdad para el desarrollo de la landing page.
> Referencias: [`../Master/DESIGN.md`](../Master/DESIGN.md) (sistema de diseño) · [`../Master/code.html`](../Master/code.html) (plantilla) · [`../README.md`](../README.md)

---

## 1. Datos de la empresa

| Campo                    | Valor                                                          |
| ------------------------ | -------------------------------------------------------------- |
| **Nombre**               | Lailu3D                                                        |
| **Rubro**                | Impresión 3D personalizada, grabado y corte láser              |
| **Sucursales digitales** | Loja y Cuenca (Ecuador)                                        |
| **WhatsApp**             | +593 99 364 5060 → `wa.me/593993645060`                        |
| **Instagram**            | [@lailu3d](https://instagram.com/lailu3d) *(nick provisional)* |
| **TikTok**               | [@lailu3d](https://tiktok.com/@lailu3d) *(nick provisional)*   |
| **Moneda**               | USD                                                            |
| **Idiomas**              | Español (por defecto) e Inglés                                 |
| **Despliegue**           | Vercel                                                         |

---

## 2. Propósito

Landing page que funciona como **vitrina y captador de cotizaciones**. Su trabajo es convencer al cliente de que *lo que imagina se puede fabricar*: juguetes, accesorios, figuras, lámparas, llaveros.

**Objetivos del sitio**
1. Mostrar capacidad técnica y trabajos previos (prueba social visual).
2. Presentar el catálogo de productos predefinidos y filamentos.
3. Convertir interés en una conversación de WhatsApp con contexto ya cargado.

**Lo que el sitio NO hace**
- No procesa pagos ni checkout.
- No gestiona inventario en tiempo real ni cuentas de usuario.
- No cierra la cotización: solo la origina y la deriva.

---

## 3. Qué ofrecemos

| Servicio / Producto | Modalidad | Flujo |
|---|---|---|
| **Impresiones 3D personalizadas** | Bajo cotización | Formulario → WhatsApp |
| **Grabado y corte láser** | Bajo cotización | Formulario → WhatsApp |
| **Modelado 3D desde idea o boceto** | Bajo cotización | Formulario + referencia → WhatsApp |
| **Lámparas tipo retrato (litofanía)** | Personalizado | Formulario + foto → WhatsApp |
| **Llaveros personalizados** | Personalizado | Formulario → WhatsApp |
| **Venta de filamentos** | Catálogo (Bambu Lab, PLA) | Ficha → WhatsApp |
| **Juguetes y figuras prediseñadas** | Catálogo | Ficha → WhatsApp |

Referencia de lámparas retrato: https://www.youtube.com/watch?v=zZk4zuiwAcE

**Precios:** no hay tarifa fija. Cada trabajo se cotiza según la pieza. Los productos de catálogo llevan precio referencial; los servicios van sin precio publicado.

---

## 4. Ruta del cliente

**Camino A — Cotización personalizada**

```
Cliente explora el sitio
   └─> Pulsa "Cotizar mi idea"
        └─> Completa contexto: descripción, medidas, cantidad, enlace de referencia
             └─> La página arma el mensaje y abre WhatsApp
                  └─> Cliente y encargado cierran la cotización fuera del sitio
```

**Camino B — Producto del catálogo**

```
Cliente explora el catálogo
   └─> Selecciona un producto
        └─> Pulsa "Pedir por WhatsApp"
             └─> La página abre WhatsApp con nombre, SKU y URL de la ficha
                  └─> Cliente y encargado cierran la venta fuera del sitio
```

**Regla común:** todo camino termina en WhatsApp, y el mensaje sale **prellenado con contexto**. El cliente nunca debe tener que explicar desde cero lo que ya indicó en la página.

---

## 5. Reglas del proyecto

- ✅ Toda cotización y venta se deriva al WhatsApp de la empresa.
- ✅ El mensaje incluye **la URL de referencia** del producto o de la página. WhatsApp no acepta adjuntos por enlace, así que el link es la forma de pasar la referencia y de que el encargado vea exactamente qué pidió el cliente.
- ✅ En cotizaciones el cliente puede pegar un **enlace a su referencia visual** (Drive, Imgur, post de Instagram) o adjuntar la foto ya dentro del chat.
- ❌ Sin pasarela de pagos dentro de la página.
- 🎨 El diseño sigue el sistema **Precision Industrial Studio** definido en `Master/DESIGN.md`.

---

## 6. Stack y arquitectura

| Área | Decisión |
|---|---|
| **Framework** | Astro 7 + Tailwind CSS 4 (vía `@tailwindcss/vite`, no `@astrojs/tailwind`) |
| **Gestor de paquetes** | pnpm |
| **Catálogo** | Astro **Content Collections** — un `.md` por producto en `src/content/productos/`, funciona como base de datos del sitio. Cada producto tiene ficha individual en `/productos/<slug>` |
| **Idiomas** | Bilingüe ES/EN. Los datos duros (SKU, precio, color) viven una sola vez; solo el texto visible se duplica por idioma |
| **Contacto** | Enlaces `wa.me` generados en `src/lib/whatsapp.ts` |
| **Hosting** | Vercel |
| **Analítica** | Fase 2 — no entra en la primera versión |

### Archivos clave

```
Lailu3D/
├─ src/
│  ├─ content.config.ts          esquema del catálogo
│  ├─ content/productos/*.md     un archivo por producto
│  ├─ config/site.ts             teléfono, redes, sucursales, idiomas
│  ├─ lib/whatsapp.ts            construcción de mensajes prellenados
│  └─ assets/brand/              logo en SVG (mark, stacked, horizontal, favicon)
└─ public/images/productos/      imágenes de producto
```

---

## 7. Identidad visual

- **Modo:** solo claro. No hay variante oscura ni toggle.
- **Paleta:** el frontmatter YAML de `Master/DESIGN.md` es la fuente de verdad (`primary: #894d0d`). La prosa del mismo archivo menciona un cobre distinto (`#B87333`); se ignora.
- **Tokens:** traducidos a Tailwind 4 en `src/styles/global.css` (bloque `@theme`).
- **Espaciado:** los pasos `xs`-`xl` de DESIGN.md se usan vía la escala numérica de Tailwind (`p-1 p-2 p-4 p-6 p-10`), que da los mismos valores. Declararlos con nombre rompía `max-w-sm/md/lg/xl`. Sí están nombrados `gutter` y `margin`.
- **Logo:** vectorizado en `src/assets/brand/` — `logo-mark.svg` (símbolo), `logo.svg` (vertical), `logo-horizontal.svg` (navbar), `favicon.svg`.
- **Color de marca:** cobre / naranja sobre fondos cálidos. El sistema completo está en `Master/DESIGN.md`.
- **Tipografía:** Space Grotesk (títulos y datos técnicos) + Hanken Grotesk (texto corrido).

---

## 8. Pendiente

- [ ] Fotografías reales de productos y trabajos previos *(hoy hay placeholders)*
- [ ] Nicks reales de Instagram y TikTok
- [ ] Catálogo real de filamentos y figuras *(hoy hay 5 filamentos genéricos)*
- [ ] Dominio propio
- [ ] Analítica (fase 2)
