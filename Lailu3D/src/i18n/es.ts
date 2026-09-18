/**
 * Diccionario en español. Es la **fuente** del tipo: `en.ts` se declara como
 * `typeof es`, de modo que una clave sin traducir no compila y `astro check`
 * la caza antes del build.
 *
 * Aquí va solo el texto de la interfaz. El texto de los productos vive en su
 * `.md` (ya bilingüe) y no se duplica aquí.
 */
export const es = {
  html: {
    saltar: 'Saltar al contenido',
  },

  nav: {
    principal: 'Principal',
    principalMovil: 'Principal (móvil)',
    migas: 'Migas de pan',
    inicio: 'Inicio',
    servicios: 'Servicios',
    catalogo: 'Catálogo',
    trabajos: 'Trabajos',
    comoFunciona: 'Cómo funciona',
    cotizar: 'Cotizar',
    abrirMenu: 'Abrir menú',
    logoInicio: 'Lailu3D — inicio',
    escribirWhatsApp: 'Escribir por WhatsApp',
    idioma: 'Idioma',
    verEnIngles: 'Ver esta página en inglés',
    verEnEspanol: 'Ver esta página en español',
  },

  whatsapp: {
    flotante: 'Escribir por WhatsApp a Lailu3D',
  },

  inicio: {
    meta: {
      titulo: 'Impresión 3D personalizada',
      descripcion:
        'Impresiones 3D bajo cotización, grabado y corte láser, filamentos y figuras. Loja y Cuenca, Ecuador.',
    },
    hero: {
      region: 'Ecuador',
      titulo: 'Lo que imaginas, fabricado.',
      texto:
        'Impresión 3D personalizada, grabado y corte láser. Traes una idea, un boceto o una foto; nosotros la convertimos en una pieza real.',
      ctaPrimario: 'Cotizar mi idea',
      ctaSecundario: 'Ver catálogo',
      nota: 'Cotizamos por WhatsApp, pieza por pieza. El sitio no procesa pagos en línea.',
    },
    panel: {
      etiqueta: 'Taller',
      estado: 'Operativo',
      tecnologia: 'Tecnología',
      tecnologiaValor: 'FDM · Láser',
      material: 'Material base',
      materialValor: 'PLA 1.75 mm',
      cantidad: 'Cantidad mínima',
      cantidadValor: '1 pieza',
      entrega: 'Entrega',
    },
    servicios: {
      etiqueta: 'Servicios',
      titulo: 'Qué fabricamos',
      descripcion:
        'Cada trabajo se cotiza según la pieza, el material y el tiempo de producción. Escríbenos y te damos un precio concreto.',
      cta: 'Cotizar este servicio',
    },
    pasos: {
      etiqueta: 'Cómo funciona',
      titulo: 'De la idea a la pieza, en tres pasos',
      descripcion:
        'No publicamos precios fijos porque ninguna pieza es igual a otra. Esto es lo que pasa cuando nos escribes.',
      idea: {
        titulo: 'Cuéntanos la idea',
        texto:
          'Descripción, medidas aproximadas, cantidad y una referencia visual si la tienes. Con eso ya podemos trabajar.',
      },
      cotizamos: {
        titulo: 'Cotizamos por WhatsApp',
        texto:
          'No hay tarifa fija: el precio depende de la pieza, el material y el tiempo de impresión. Te damos un número claro antes de empezar.',
      },
      producimos: {
        titulo: 'Producimos y entregamos',
        texto:
          'Confirmas, fabricamos y coordinamos la entrega en Loja o Cuenca. Te vamos mostrando los avances.',
      },
    },
    destacados: {
      etiqueta: 'Catálogo',
      titulo: 'Productos listos para pedir',
      descripcion:
        'Filamentos y piezas con precio referencial. Se piden por WhatsApp, con el código del producto ya cargado en el mensaje.',
      cta: 'Ver todo el catálogo',
    },
    trabajos: {
      etiqueta: 'Trabajos',
      titulo: 'Algunos encargos que hemos hecho',
      descripcion:
        'Estamos montando la galería con fotografías de trabajos entregados. Mientras tanto, escríbenos y te mandamos ejemplos por WhatsApp.',
      llaveros: { titulo: 'Llaveros personalizados', categoria: 'Impresión 3D' },
      lampara: { titulo: 'Lámpara retrato', categoria: 'Litofanía' },
      figuras: { titulo: 'Figuras y juguetes', categoria: 'Impresión 3D' },
      placa: { titulo: 'Placa grabada en madera', categoria: 'Láser' },
      repuesto: { titulo: 'Repuesto a medida', categoria: 'Modelado' },
      senaletica: { titulo: 'Señalética en acrílico', categoria: 'Corte láser' },
    },
    cta: {
      titulo: '¿Tienes una idea en la cabeza?',
      texto:
        'Mándanos la descripción, la medida aproximada y una referencia. Te respondemos por WhatsApp con la cotización.',
      primario: 'Cotizar mi idea',
      secundario: 'Escribir por WhatsApp',
    },
  },

  /** Copia de cada servicio. El orden y los slugs viven en `lib/servicios.ts`. */
  servicios: {
    'impresion-3d': {
      titulo: 'Impresión 3D personalizada',
      texto:
        'Figuras, prototipos, repuestos y piezas decorativas en PLA. Desde una unidad hasta tiradas pequeñas.',
      chips: ['FDM', 'PLA', 'Bajo cotización'],
    },
    laser: {
      titulo: 'Grabado y corte láser',
      texto:
        'Grabado de nombres, logos y diseños sobre madera, acrílico y cuero. Corte de piezas planas a medida.',
      chips: ['Madera', 'Acrílico', 'A medida'],
    },
    modelado: {
      titulo: 'Modelado 3D desde tu idea',
      texto:
        'No necesitas un archivo listo. Nos mandas un boceto, una foto o una referencia y nosotros modelamos la pieza.',
      chips: ['Boceto', 'Foto', 'Referencia'],
    },
    litofania: {
      titulo: 'Lámparas retrato (litofanía)',
      texto:
        'Tu fotografía convertida en una lámpara: al encenderla aparece la imagen con todos sus grises. El regalo que más nos piden.',
      chips: ['Regalo', 'Litofanía', 'Personalizado'],
    },
  },

  catalogo: {
    meta: {
      titulo: 'Catálogo',
      descripcion:
        'Filamentos PLA, figuras, llaveros y lámparas personalizadas. Precio referencial y pedido directo por WhatsApp.',
    },
    etiqueta: 'Catálogo',
    titulo: 'Productos y filamentos',
    descripcion:
      'Precios referenciales en USD. El pedido se cierra por WhatsApp: al pulsar el botón de una ficha, el mensaje sale con el nombre, el código y el enlace del producto.',
    todos: 'Todos',
    ctaTitulo: '¿No está lo que buscas?',
    ctaTexto: 'Fabricamos piezas a medida. Cuéntanos la idea y te cotizamos.',
    ctaBoton: 'Cotizar una pieza',
  },

  producto: {
    pedir: 'Pedir por WhatsApp',
    notaPedir:
      'Se abre WhatsApp con el nombre, el código y el enlace de este producto ya escritos. Confirmamos disponibilidad y coordinamos la entrega por ahí.',
    descripcion: 'Descripción',
    relacionados: 'Otros de la misma categoría',
    especificaciones: {
      codigo: 'Código',
      marca: 'Marca',
      material: 'Material',
      color: 'Color',
      peso: 'Peso',
      diametro: 'Diámetro',
    },
  },

  cotizar: {
    meta: {
      titulo: 'Cotizar una pieza',
      descripcion:
        'Cuéntanos qué quieres fabricar y te damos un precio por WhatsApp. Impresión 3D, grabado y corte láser en Loja y Cuenca.',
    },
    miga: 'Cotizar',
    etiqueta: 'Cotizador',
    titulo: 'Cuéntanos qué quieres fabricar',
    texto:
      'Rellena lo que sepas y el botón abre WhatsApp con todo escrito. No publicamos precios fijos porque ninguna pieza es igual a otra: con estos datos te damos un número concreto.',
    campos: {
      servicio: 'Qué necesitas',
      servicioVacio: 'Elige un servicio (opcional)',
      servicioOtro: 'Otra cosa / no estoy seguro',
      idea: 'Tu idea',
      ideaPlaceholder:
        'Ej.: un llavero con el logo de mi negocio, en PLA negro, para entregar a clientes.',
      ideaAyuda:
        'Cuanto más concreto, más precisa sale la cotización. Es el único campo obligatorio.',
      cantidad: 'Cantidad',
      cantidadPlaceholder: '1, 20 unidades, aún no lo sé',
      medidas: 'Medidas aproximadas',
      medidasPlaceholder: '10 x 5 cm, tamaño de un llavero',
      referencia: 'Enlace de referencia',
      referenciaPlaceholder:
        'Drive, Instagram, Pinterest, una foto subida a cualquier sitio',
      referenciaAyuda:
        'Opcional. WhatsApp no acepta archivos por enlace, así que si tienes una imagen, pégala aquí o mándanosla en el chat.',
    },
    error: 'Escribe qué quieres fabricar antes de continuar.',
    boton: 'Abrir WhatsApp con mi cotización',
    expectativa:
      'No se envía nada desde esta página: se abre WhatsApp con el mensaje ya escrito y tú decides si lo mandas. Te respondemos por ahí en horario laboral, de lunes a sábado.',
    sinJs: 'El formulario necesita JavaScript para armar el mensaje.',
    sinJsEnlace: 'Escríbenos directamente por WhatsApp',
    sinJsCola: 'y cuéntanos tu idea.',
    necesitamos: {
      titulo: 'Qué necesitamos saber',
      pieza: {
        titulo: 'Qué es la pieza',
        texto:
          'Para qué la quieres y cómo te la imaginas. Una frase suele bastar; si tienes un boceto o una foto, mejor.',
      },
      tamano: {
        titulo: 'Tamaño y cantidad',
        texto:
          'El tiempo de impresión depende del volumen. Una medida aproximada ya cambia la cotización.',
      },
      fecha: {
        titulo: 'Para cuándo',
        texto:
          'Si tiene fecha (un regalo, un evento), dilo en la descripción y te confirmamos si llegamos.',
      },
    },
    directo: {
      titulo: 'Prefieres escribir directo',
      texto:
        'El formulario solo ordena el mensaje. Si te resulta más cómodo, abre el chat y cuéntanos ahí.',
      aviso: 'Ecuador. El sitio no procesa pagos en línea.',
    },
  },

  footer: {
    descripcion:
      'Impresión 3D personalizada, grabado y corte láser. Convertimos tu idea, boceto o foto en una pieza real.',
    region: 'Ecuador',
    sitio: 'Sitio',
    contacto: 'Contacto',
    derechos: 'Todos los derechos reservados.',
    aviso: 'Cotizaciones y pedidos por WhatsApp. El sitio no procesa pagos en línea.',
  },
};
