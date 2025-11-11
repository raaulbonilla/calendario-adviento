export type SurpriseType = 'text' | 'image' | 'video' | 'audio' | 'link' | 'gallery';

export interface BaseSurprise {
  type: SurpriseType;
  title: string;
  message?: string;
}

export interface TextSurprise extends BaseSurprise {
  type: 'text';
  message: string;
}

export interface ImageSurprise extends BaseSurprise {
  type: 'image';
  mediaUrl: string;
}

export interface VideoSurprise extends BaseSurprise {
  type: 'video';
  mediaUrl: string;
  poster?: string;
}

export interface AudioSurprise extends BaseSurprise {
  type: 'audio';
  mediaUrl: string;
}

export interface LinkSurprise extends BaseSurprise {
  type: 'link';
  ctaText: string;
  ctaHref: string;
}

export interface GallerySurprise extends BaseSurprise {
  type: 'gallery';
  mediaUrl: string[];
}

export type Surprise = TextSurprise | ImageSurprise | VideoSurprise | AudioSurprise | LinkSurprise | GallerySurprise;

export const YEAR = new Date().getFullYear();
export const TIMEZONE = 'Europe/Madrid';
export const UNLOCK_HOUR = 9; // 09:00

// Default romantic surprises for the advent calendar
export const surprises: Record<number, Surprise> = {
  1: {
    type: 'text',
    title: 'Bienvenida, mi amor',
    message: 'Comienza nuestro viaje de adviento juntos. Cada día tendrás una nueva sorpresa que he preparado especialmente para ti. Te amo más de lo que las palabras pueden expresar. 💕'
  },
  2: {
    type: 'image',
    title: 'Recuerdo especial',
    message: 'Este momento quedó grabado en mi corazón para siempre.',
    mediaUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop'
  },
  3: {
    type: 'text',
    title: 'Lo que más amo de ti',
    message: 'Tu sonrisa ilumina incluso los días más oscuros. La forma en que me miras me hace sentir como la persona más especial del mundo.'
  },
  4: {
    type: 'image',
    title: 'Nuestro lugar',
    message: 'Donde comenzó todo...',
    mediaUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop'
  },
  5: {
    type: 'text',
    title: 'Un sueño contigo',
    message: 'Sueño con todos los momentos que nos quedan por vivir juntos. Cada día a tu lado es un regalo.'
  },
  6: {
    type: 'link',
    title: 'Una canción para ti',
    message: 'Esta canción siempre me recuerda a nosotros.',
    ctaText: 'Escuchar ahora',
    ctaHref: 'https://open.spotify.com/search/romantic%20songs'
  },
  7: {
    type: 'text',
    title: 'Promesa',
    message: 'Prometo estar siempre a tu lado, en los buenos y malos momentos, celebrando tus alegrías y consolando tus penas.'
  },
  8: {
    type: 'image',
    title: 'Atardecer juntos',
    message: 'Como los atardeceres que compartimos.',
    mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop'
  },
  9: {
    type: 'text',
    title: 'Tu risa',
    message: 'Tu risa es mi melodía favorita. Haría cualquier cosa solo para verte sonreír.'
  },
  10: {
    type: 'text',
    title: 'Razones por las que te amo',
    message: 'Te amo por cómo eres, por cómo me haces sentir, por tu bondad, tu inteligencia, tu belleza interior y exterior, y por mil razones más que descubro cada día.'
  },
  11: {
    type: 'image',
    title: 'Magia invernal',
    message: 'El invierno es más hermoso contigo.',
    mediaUrl: 'https://images.unsplash.com/photo-1482148453744-cfb5b3b0d0a5?w=800&auto=format&fit=crop'
  },
  12: {
    type: 'text',
    title: 'Aventuras',
    message: 'Quiero vivir mil aventuras más a tu lado. Explorar el mundo contigo, crear nuevos recuerdos inolvidables.'
  },
  13: {
    type: 'text',
    title: 'Tu apoyo',
    message: 'Gracias por estar siempre ahí, por creer en mí incluso cuando yo no lo hago. Eres mi mayor apoyo y mi fuerza.'
  },
  14: {
    type: 'image',
    title: 'Corazones',
    message: 'Mi corazón late por ti.',
    mediaUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop'
  },
  15: {
    type: 'text',
    title: 'Nuestro futuro',
    message: 'Imagino nuestro futuro juntos y solo veo felicidad, amor y complicidad. Cada día estoy más seguro de que eres la persona con quien quiero compartir mi vida.'
  },
  16: {
    type: 'link',
    title: 'Vale especial',
    message: 'Un vale para una cita especial que tú elijas.',
    ctaText: 'Reclamar vale',
    ctaHref: '#'
  },
  17: {
    type: 'text',
    title: 'Tu esencia',
    message: 'Amo tu esencia, esa chispa única que te hace ser tú. No cambiaría nada de ti.'
  },
  18: {
    type: 'image',
    title: 'Luces navideñas',
    message: 'Pero ninguna brilla tanto como tú.',
    mediaUrl: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=800&auto=format&fit=crop'
  },
  19: {
    type: 'text',
    title: 'Agradecimiento',
    message: 'Gracias por enseñarme lo que es el amor verdadero. Por mostrarme que el amor no solo existe en las películas.'
  },
  20: {
    type: 'text',
    title: 'Cada momento',
    message: 'Cada momento contigo es un tesoro. Desde las grandes aventuras hasta los pequeños momentos en casa, todo es especial porque estás tú.'
  },
  21: {
    type: 'image',
    title: 'Juntos',
    message: 'Así quiero estar siempre, junto a ti.',
    mediaUrl: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&auto=format&fit=crop'
  },
  22: {
    type: 'text',
    title: 'Tu mirada',
    message: 'En tu mirada encuentro hogar. Cuando me miras, sé que estoy exactamente donde debo estar.'
  },
  23: {
    type: 'text',
    title: 'Casi Navidad',
    message: 'Solo quedan dos días para Navidad, pero el mejor regalo ya lo tengo: tu amor.'
  },
  24: {
    type: 'gallery',
    title: 'Nuestros mejores momentos',
    message: 'Una colección de los momentos más especiales que hemos vivido juntos.',
    mediaUrl: [
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop'
    ]
  },
  25: {
    type: 'text',
    title: '¡Feliz Navidad, mi amor!',
    message: '🎄 Hoy es el día más especial del año. Espero que este calendario te haya hecho sonreír tanto como tú me haces sonreír a mí cada día. Te amo con todo mi corazón. Feliz Navidad, mi amor. Que este sea el primero de muchos diciembres juntos. Con todo mi amor, para siempre tuyo. 💕✨'
  }
};

// Utility to get/set custom surprises from localStorage
const STORAGE_KEY = 'advent-calendar-surprises';

export function getStoredSurprises(): Record<number, Surprise> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading custom surprises:', e);
  }
  return surprises;
}

export function saveCustomSurprises(customSurprises: Record<number, Surprise>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customSurprises));
  } catch (e) {
    console.error('Error saving custom surprises:', e);
  }
}

export function resetSurprises() {
  localStorage.removeItem(STORAGE_KEY);
}
