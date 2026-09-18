/** Datos unicos de la empresa. Cambiar aqui, no en los componentes. */
export const site = {
  nombre: 'Lailu3D',
  /** Dominio final en Vercel. Ajustar cuando se compre el dominio propio. */
  url: 'https://lailu3d.vercel.app',

  /** Numero de contacto. `wa` es el formato que exige wa.me: solo digitos. */
  whatsapp: {
    wa: '593993645060',
    display: '+593 99 364 5060',
  },

  sucursales: ['Loja', 'Cuenca'] as const,

  redes: {
    instagram: { nick: '@lailu3d', url: 'https://instagram.com/lailu3d' },
    tiktok: { nick: '@lailu3d', url: 'https://tiktok.com/@lailu3d' },
  },
} as const;

export const idiomas = ['es', 'en'] as const;
export const idiomaPorDefecto = 'es' as const;
export type Idioma = (typeof idiomas)[number];
