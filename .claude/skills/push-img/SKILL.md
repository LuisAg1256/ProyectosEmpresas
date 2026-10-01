---
name: push-img
description: Publica en la galería de trabajos de Lailu3D (página /trabajos y los 6 recientes de la landing) las fotos que están en ReferenciasImagenes/Imagenes_Productos_Impresos/Listas_prod. Las recorta al formato de la galería, las agrega con textos ES/EN, compila, mueve los originales a Produccion y hace commit + push. Usar cuando el usuario escriba /push-img o pida subir las fotos listas a trabajos.
disable-model-invocation: true
---

# push-img — publicar fotos de trabajos realizados

Rutas relativas a la raíz del repo (`ProyectosEmpresas/`):

| Qué | Dónde |
|---|---|
| Fotos pendientes | `ReferenciasImagenes/Imagenes_Productos_Impresos/Listas_prod/` |
| Originales ya publicados | `ReferenciasImagenes/Imagenes_Productos_Impresos/Produccion/` |
| Imágenes de la galería | `Lailu3D/src/assets/trabajos/<slug>.jpg` |
| Registro de la galería | `Lailu3D/src/lib/trabajos.ts` (`const registro`, en orden de subida) |
| Textos | `Lailu3D/src/i18n/es.ts` y `en.ts`, en `trabajos.piezas.<clave>` |

La galería no se edita en ninguna página. `/trabajos` muestra todo el registro y la landing muestra los 6 más recientes (`TRABAJOS_EN_INICIO`). Las dos ponen primero la última pieza del registro, así que una pieza agregada al final aparece arriba en las dos.
| Utilidad | `.claude/skills/push-img/scripts/procesar.mjs` (usa el `sharp` de `Lailu3D`) |

## Formato de la galería

Lo aplica el script, no se hace a mano:

- JPEG cuadrado, progresivo, mozjpeg calidad 80 y sin EXIF.
- Lado del cuadrado = lado corto del original, con un tope de 1400 px. **Nunca se amplía.** La galería solo sirve versiones de 400 y 800 px.
- Nombre del archivo: slug en kebab-case, en español, que describa la pieza (`dragon-articulado`, `llavero-bateria`). No puede repetir un slug que ya exista.
- La categoría de todas las piezas que publica esta skill es fija: ES `'Trabajos realizados'`, EN `'Completed work'`.

## Flujo

Sigue los pasos en orden. Si un paso falla, detente: no muevas originales ni hagas commit de un estado roto.

### 1. Inspeccionar

```bash
node .claude/skills/push-img/scripts/procesar.mjs inspeccionar
```

- Si `Listas_prod` está vacía, avisa al usuario y termina.
- Si un archivo aparece como `NO LEGIBLE` (por ejemplo, un HEIC que `sharp` no decodifica), sácalo del lote y pide al usuario que lo exporte como JPEG.
- Ten en cuenta los `AVISO: menor de 800 px`. Esas fotos se publican igual, pero menciónalo en la tabla.

### 2. Mirar cada foto e identificar la pieza

Abre cada archivo con Read. Anota qué pieza es, de qué color y material se ve, y dónde está dentro del encuadre.

**Marcas registradas: nunca se publican.** Es una regla fija del usuario. Si la pieza reproduce un personaje o una marca con dueño (Bob Esponja, Paw Patrol, Hora de Aventura/BMO, Poro/League of Legends, Pokémon, Marvel, Disney, logos de clubes, etc.), igual aparece en la tabla con ⚠️ y el dueño de la marca, pero queda **excluida del lote** sin preguntar: no se recorta, no se registra y no se mueve. La foto se queda en `Listas_prod`.

### 3. Proponer la tabla y esperar la aprobación

Muestra una tabla con una fila por foto, incluidas las ⚠️, que en la columna Recorte llevan "no se publica":

| Archivo | Slug | Clave i18n | Título ES | Título EN | Alt ES | Alt EN | Recorte | ⚠️ |

Reglas para los textos, con el mismo estilo de las entradas que ya existen en `es.ts`:

- **Clave i18n:** el slug en camelCase (`dragon-articulado` → `dragonArticulado`). No puede repetir una clave existente.
- **Título:** corto y concreto, en estilo frase (`Dragón articulado`).
- **Alt:** describe lo que se ve, incluido el color y el material (`Dragón articulado impreso en PLA negro con cuernos y espinas blancos`). No empieces con "Imagen de".
- **Recorte:** `attention` por defecto. Usa un cuadro `{x, y, lado}` cuando la pieza no quepa o quede descentrada.

**No escribas nada hasta que el usuario apruebe la tabla.** Si corrige algo, actualiza la tabla y vuelve a confirmar.

### 4. Recortar

Escribe el plan aprobado en un JSON dentro del scratchpad (nunca en el repo):

```json
[
  { "archivo": "WhatsApp Image 2026-09-30 at 1.18.08 PM (1).jpeg", "slug": "dragon-articulado", "recorte": "attention" },
  { "archivo": "WhatsApp Image 2026-09-30 at 1.17.53 PM.jpeg", "slug": "recortes-paw-patrol", "recorte": { "x": 150, "y": 0, "lado": 896 } }
]
```

```bash
node .claude/skills/push-img/scripts/procesar.mjs recortar <plan.json>
```

**Revisa cada resultado con Read.** La pieza debe verse completa o, como mínimo, entera en su parte reconocible. Si el recorte la corta mal:

1. Borra ese `.jpg` de `src/assets/trabajos/`.
2. Ajusta su entrada con un cuadro explícito, usando como referencia las medidas que dio `inspeccionar`.
3. Vuelve a ejecutar `recortar` solo con esa entrada.

### 5. Registrar las piezas en el sitio

En `src/lib/trabajos.ts`:

- Agrega un `import` por pieza, a continuación del último import de `../assets/trabajos/`. El nombre de la variable es la clave i18n.
- Agrega las entradas **al final** de `registro`, en el orden de la tabla y con la forma `{ clave: '<clave>', imagen: <variable> },`. La última entrada es la más reciente. No reordenes las entradas que ya existen.

En `es.ts` y `en.ts`, dentro de `trabajos.piezas`, agrega cada clave después de la última pieza:

```ts
        dragonArticulado: {
          titulo: 'Dragón articulado',
          categoria: 'Trabajos realizados',
          alt: '…',
        },
```

`en.ts` está tipado como `typeof es`, y `registro` solo acepta claves que existan en `trabajos.piezas`. Si una clave falta, el build falla.

### 6. Compilar

```bash
pnpm --dir Lailu3D build
```

Si falla, corrige el error y vuelve a compilar. No sigas al paso 7 sin un build limpio.

### 7. Mover los originales a Produccion

Con el mismo plan:

```bash
node .claude/skills/push-img/scripts/procesar.mjs mover <plan.json>
```

Cada original se renombra al slug y conserva su extensión en minúsculas, por ejemplo `Produccion/dragon-articulado.jpeg`. El script no sobrescribe archivos existentes.

### 8. Commit y push

El árbol de trabajo puede tener cambios ajenos a esta skill, como la reorganización de `ReferenciasImagenes`. **Prepara solo los archivos de este lote**, nunca con `git add -A` ni `git add .`:

```bash
git add -- Lailu3D/src/assets/trabajos/<slug>.jpg … \
  Lailu3D/src/lib/trabajos.ts \
  Lailu3D/src/i18n/es.ts Lailu3D/src/i18n/en.ts \
  "ReferenciasImagenes/Imagenes_Productos_Impresos/Produccion/<slug>.<ext>" …
git diff --cached --stat
```

Confirma que el diff preparado solo contiene esos archivos. Después haz el commit con el estilo del repo y la línea de coautoría que indique la sesión:

```
ADD: Trabajos realizados — <slug-1>, <slug-2>, …
```

Luego `git push origin main`. Si el push falla (rechazo, credenciales, rama desactualizada), **no fuerces**: informa al usuario del error y deja el commit local.

### 9. Informe final

Incluye en el informe:

- Una tabla `slug → título ES` con el tamaño final de cada imagen.
- Las fotos que quedaron en `Listas_prod` y el motivo (marca rechazada, archivo ilegible).
- El hash del commit y el resultado del push.
