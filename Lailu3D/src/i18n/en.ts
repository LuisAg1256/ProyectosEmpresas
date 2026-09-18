import type { es } from './es';

/**
 * English dictionary. Typed as `typeof es`: a missing or misspelled key is a
 * compile error, so `astro check` catches an untranslated string before build.
 */
export const en: typeof es = {
  html: {
    saltar: 'Skip to content',
  },

  nav: {
    principal: 'Main',
    principalMovil: 'Main (mobile)',
    migas: 'Breadcrumb',
    inicio: 'Home',
    servicios: 'Services',
    catalogo: 'Catalogue',
    trabajos: 'Work',
    comoFunciona: 'How it works',
    cotizar: 'Get a quote',
    abrirMenu: 'Open menu',
    logoInicio: 'Lailu3D — home',
    escribirWhatsApp: 'Message us on WhatsApp',
    idioma: 'Language',
    verEnIngles: 'View this page in English',
    verEnEspanol: 'View this page in Spanish',
  },

  whatsapp: {
    flotante: 'Message Lailu3D on WhatsApp',
  },

  inicio: {
    meta: {
      titulo: 'Custom 3D printing',
      descripcion:
        'Made-to-order 3D printing, laser engraving and cutting, filaments and figures. Workshop in Loja and Cuenca, delivering anywhere in Ecuador.',
    },
    hero: {
      region: 'We deliver anywhere in Ecuador',
      titulo: 'What you imagine, made real.',
      texto:
        'Custom 3D printing, laser engraving and cutting. Bring an idea, a sketch or a photo; we turn it into a real object.',
      ctaPrimario: 'Quote my idea',
      ctaSecundario: 'Browse the catalogue',
      nota: 'We quote over WhatsApp, piece by piece. This site does not process online payments.',
    },
    panel: {
      etiqueta: 'Workshop',
      estado: 'Running',
      tecnologia: 'Technology',
      tecnologiaValor: 'Laser · 3D printing · 3D modelling',
      material: 'Base material',
      materialValor: 'PLA BASIC',
      cantidad: 'Minimum order',
      cantidadValor: '1 piece',
      entrega: 'Delivery',
      entregaValor: 'Anywhere in Ecuador',
    },
    servicios: {
      etiqueta: 'Services',
      titulo: 'What we make',
      descripcion:
        'Every job is quoted on the piece, the material and the production time. Write to us and we give you a concrete price.',
      cta: 'Quote this service',
    },
    pasos: {
      etiqueta: 'How it works',
      titulo: 'From idea to object, in three steps',
      descripcion:
        'We do not publish fixed prices because no two pieces are alike. This is what happens when you write to us.',
      idea: {
        titulo: 'Tell us the idea',
        texto:
          'A description, rough measurements, quantity and a visual reference if you have one. That is enough to start.',
      },
      cotizamos: {
        titulo: 'We quote on WhatsApp',
        texto:
          'There is no flat rate: the price depends on the piece, the material and the printing time. You get a clear number before we start.',
      },
      producimos: {
        titulo: 'We produce and deliver',
        texto:
          'You confirm, we manufacture and we arrange delivery in Ecuador. We show you the progress along the way.',
      },
    },
    destacados: {
      etiqueta: 'Catalogue',
      titulo: 'Products ready to order',
      descripcion:
        'Filaments and pieces with a reference price. Ordered over WhatsApp, with the product code already in the message.',
      cta: 'See the whole catalogue',
    },
    trabajos: {
      etiqueta: 'Work',
      titulo: 'Some of the jobs we have done',
      descripcion:
        'Pieces that came out of our workshop. If you want something along these lines, send us the reference and we will quote it on WhatsApp.',
      litofaniaEncendida: {
        titulo: 'Lithophane lit up',
        categoria: 'Lithophane',
        alt: 'Backlit lithophane showing the portrait of a rabbit',
      },
      litofaniaApagada: {
        titulo: 'The same piece, with no light behind it',
        categoria: 'Lithophane',
        alt: 'Unlit lithophane: the portrait reads as a white relief',
      },
      bateria: {
        titulo: 'Drum kit keychain',
        categoria: 'Keychain',
        alt: 'Keychain of a drum kit printed in black PLA',
      },
      cubo: {
        titulo: 'Articulated infinity cube',
        categoria: 'Figure',
        alt: 'Infinity cube printed in green PLA, articulated and screwless',
      },
      guante: {
        titulo: 'MMA glove keychain',
        categoria: 'Keychain',
        alt: 'Keychain shaped like an MMA glove printed in black PLA',
      },
      mancuerna: {
        titulo: 'Dumbbell keychain',
        categoria: 'Keychain',
        alt: 'Dumbbell keychain printed in grey and black PLA',
      },
      shaker: {
        titulo: 'Shaker bottle keychain',
        categoria: 'Keychain',
        alt: 'Keychain shaped like a shaker bottle printed in green and white PLA',
      },
      disco: {
        titulo: 'Gym plate keychain',
        categoria: 'Keychain',
        alt: 'Keychain of a 20 kg weight plate printed in black PLA',
      },
      pesaRusa: {
        titulo: 'Kettlebell keychains',
        categoria: 'Keychain',
        alt: 'Three kettlebell keychains printed in white and black PLA',
      },
    },
    cta: {
      titulo: 'Got an idea in your head?',
      texto:
        'Send us the description, the rough size and a reference. We answer on WhatsApp with the quote.',
      primario: 'Quote my idea',
      secundario: 'Message us on WhatsApp',
      cobertura: 'We deliver anywhere in Ecuador',
    },
  },

  servicios: {
    'impresion-3d': {
      titulo: 'Custom 3D printing',
      texto:
        'Figures, prototypes, spare parts and decorative pieces in PLA. From a single unit to short runs.',
      chips: ['FDM', 'PLA', 'Quote only'],
    },
    laser: {
      titulo: 'Laser engraving and cutting',
      texto:
        'Engraving and cutting of made-to-measure pieces, ideal for architecture and decoration work.',
      chips: ['Personalised', 'Made to measure'],
    },
    modelado: {
      titulo: '3D modelling from your idea',
      texto:
        'You do not need a finished file. Send us a sketch, a photo or a reference and we model the piece.',
      chips: ['Sketch', 'Photo', 'Reference'],
    },
    litofania: {
      titulo: 'Filament sales',
      texto:
        'PLA filaments in solid, translucent and gradient colours. For 3D printing.',
      chips: ['PLA', '3D printing', 'Personalised'],
    },
  },

  catalogo: {
    meta: {
      titulo: 'Catalogue',
      descripcion:
        'PLA filaments, figures, keychains and custom lamps. Reference prices, ordering over WhatsApp and delivery anywhere in Ecuador.',
    },
    etiqueta: 'Catalogue',
    titulo: 'Products and filaments',
    descripcion:
      'Reference prices in USD. Orders are closed over WhatsApp: press the button on a product page and the message goes out with its name, code and link.',
    todos: 'All',
    ctaTitulo: 'Not finding what you need?',
    ctaTexto: 'We make pieces to measure. Tell us the idea and we will quote it.',
    ctaBoton: 'Quote a piece',
  },

  producto: {
    pedir: 'Order on WhatsApp',
    notaPedir:
      'WhatsApp opens with the name, the code and the link of this product already written. We confirm availability and arrange delivery there.',
    descripcion: 'Description',
    relacionados: 'More in the same category',
    especificaciones: {
      codigo: 'Code',
      marca: 'Brand',
      material: 'Material',
      color: 'Colour',
      peso: 'Weight',
      diametro: 'Diameter',
    },
  },

  cotizar: {
    meta: {
      titulo: 'Quote a piece',
      descripcion:
        'Tell us what you want made and we give you a price on WhatsApp. 3D printing, laser engraving and cutting, delivered anywhere in Ecuador.',
    },
    miga: 'Quote',
    etiqueta: 'Quote form',
    titulo: 'Tell us what you want made',
    texto:
      'Fill in what you know and the button opens WhatsApp with everything written. We do not publish fixed prices because no two pieces are alike: with these details we give you a concrete number.',
    campos: {
      servicio: 'What you need',
      servicioVacio: 'Choose a service (optional)',
      servicioOtro: 'Something else / not sure',
      idea: 'Your idea',
      ideaPlaceholder:
        'E.g.: a keychain with my shop logo, in black PLA, to hand out to customers.',
      ideaAyuda:
        'The more specific you are, the more accurate the quote. This is the only required field.',
      cantidad: 'Quantity',
      cantidadPlaceholder: '1, 20 units, not sure yet',
      medidas: 'Approximate size',
      medidasPlaceholder: '10 x 5 cm, the size of a keychain',
      referencia: 'Reference link',
      referenciaPlaceholder:
        'Drive, Instagram, Pinterest, a photo uploaded anywhere',
      referenciaAyuda:
        'Optional. WhatsApp does not take files by link, so if you have an image, paste it here or send it to us in the chat.',
    },
    error: 'Write what you want made before continuing.',
    boton: 'Open WhatsApp with my quote',
    expectativa:
      'Nothing is sent from this page: WhatsApp opens with the message already written and you decide whether to send it. We answer there during business hours, Monday to Saturday.',
    sinJs: 'The form needs JavaScript to build the message.',
    sinJsEnlace: 'Write to us directly on WhatsApp',
    sinJsCola: 'and tell us your idea.',
    necesitamos: {
      titulo: 'What we need to know',
      pieza: {
        titulo: 'What the piece is',
        texto:
          'What you want it for and how you picture it. One sentence is usually enough; a sketch or a photo is better.',
      },
      tamano: {
        titulo: 'Size and quantity',
        texto:
          'Printing time depends on volume. Even a rough measurement changes the quote.',
      },
      fecha: {
        titulo: 'When you need it',
        texto:
          'If it has a date (a gift, an event), say so in the description and we confirm whether we can make it.',
      },
    },
    directo: {
      titulo: 'Rather write directly',
      texto:
        'The form only tidies up the message. If it suits you better, open the chat and tell us there.',
      aviso: 'We deliver anywhere in Ecuador. This site does not process online payments.',
    },
  },

  footer: {
    descripcion:
      'Custom 3D printing, laser engraving and cutting. We turn your idea, sketch or photo into a real object.',
    region: 'We deliver anywhere in Ecuador',
    sitio: 'Site',
    contacto: 'Contact',
    derechos: 'All rights reserved.',
    aviso: 'Quotes and orders over WhatsApp. This site does not process online payments.',
  },
};
