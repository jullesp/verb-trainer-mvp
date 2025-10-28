// ===========================================
// GCSE Spanish Vocab — Foundation (AQA-aligned)
// ===========================================
// Expand freely: just add more items in VOCAB.
// Each item: { theme, unit, es, en }
//
// Themes match AQA’s areas (People & lifestyle; Popular culture; Communication & world around us).
// Units are friendly labels you can group as you wish.
//
// Source examples taken from the uploaded AQA Foundation list. (You can add hundreds more.)
// ===========================================

export const THEMES = [
  { id: 'T1', label: 'Theme 1 — People & lifestyle' },
  { id: 'T2', label: 'Theme 2 — Popular culture' },
  { id: 'T3', label: 'Theme 3 — Communication & world' },
]

export const UNITS = [
  // Make these whatever helps you teach (I’ve suggested a few).
  { id: 'T1-Intro', label: 'T1 Introductory vocab', theme: 'T1' },
  { id: 'T1-Persona', label: 'T1 Describing people', theme: 'T1' },
  { id: 'T2-Musica', label: 'T2 Music & going out', theme: 'T2' },
  { id: 'T2-CineTV', label: 'T2 Film & TV', theme: 'T2' },
  { id: 'T3-Viajes', label: 'T3 Travel & transport', theme: 'T3' },
  { id: 'T3-Vacaciones', label: 'T3 Holidays', theme: 'T3' },
]

// Minimal seed so you can test right away.
// Add as many as you like — the trainer scales fine.
export const VOCAB = [
  // --- Theme 1: People & lifestyle (Introductory / Core forms) ---
  { theme: 'T1', unit: 'T1-Intro', es: 'acabar de', en: 'to have just' },        // AQA foundation list
  { theme: 'T1', unit: 'T1-Intro', es: 'a', en: 'to, at' },                       // AQA foundation list
  { theme: 'T1', unit: 'T1-Intro', es: 'de', en: 'of, from' },                    // AQA foundation list
  { theme: 'T1', unit: 'T1-Intro', es: '¿dónde?', en: 'where?' },                 // AQA foundation list
  { theme: 'T1', unit: 'T1-Intro', es: 'venir', en: 'to come' },                  // AQA foundation list
  { theme: 'T1', unit: 'T1-Persona', es: 'alto/alta', en: 'tall' },               // AQA foundation list
  { theme: 'T1', unit: 'T1-Persona', es: 'bajo/baja', en: 'short (height)' },     // AQA foundation list
  { theme: 'T1', unit: 'T1-Persona', es: 'guapo/guapa', en: 'good-looking' },     // AQA foundation list
  { theme: 'T1', unit: 'T1-Persona', es: 'feo/fea', en: 'ugly' },                 // AQA foundation list
  { theme: 'T1', unit: 'T1-Persona', es: 'delgado/delgada', en: 'slim, thin' },   // AQA foundation list
  { theme: 'T1', unit: 'T1-Persona', es: 'la familia', en: 'family' },            // AQA foundation list

  // --- Theme 2: Popular culture (Music / going out; Film & TV) ---
  { theme: 'T2', unit: 'T2-Musica', es: 'bailar', en: 'to dance' },               // AQA foundation list
  { theme: 'T2', unit: 'T2-Musica', es: 'cantar', en: 'to sing' },                // AQA foundation list
  { theme: 'T2', unit: 'T2-Musica', es: 'escuchar', en: 'to listen' },            // AQA foundation list
  { theme: 'T2', unit: 'T2-Musica', es: 'el concierto', en: 'concert' },          // AQA foundation list
  { theme: 'T2', unit: 'T2-Musica', es: 'la entrada', en: 'ticket' },             // AQA foundation list
  { theme: 'T2', unit: 'T2-CineTV', es: 'el cine', en: 'cinema' },                // AQA foundation list
  { theme: 'T2', unit: 'T2-CineTV', es: 'la película', en: 'film' },              // AQA foundation list
  { theme: 'T2', unit: 'T2-CineTV', es: 'las noticias', en: 'news' },             // AQA foundation list
  { theme: 'T2', unit: 'T2-CineTV', es: 'la pantalla', en: 'screen' },            // AQA foundation list
  { theme: 'T2', unit: 'T2-CineTV', es: 'el programa', en: 'programme' },         // AQA foundation list
  { theme: 'T2', unit: 'T2-CineTV', es: 'ver', en: 'to watch, see' },             // AQA foundation list

  // --- Theme 3: Communication & the world around us (Travel / Holidays) ---
  { theme: 'T3', unit: 'T3-Viajes', es: 'el aeropuerto', en: 'airport' },         // AQA foundation list
  { theme: 'T3', unit: 'T3-Viajes', es: 'el vuelo', en: 'flight' },               // AQA foundation list
  { theme: 'T3', unit: 'T3-Viajes', es: 'viajar', en: 'to travel' },              // AQA foundation list
  { theme: 'T3', unit: 'T3-Viajes', es: 'el tren', en: 'train' },                 // AQA foundation list
  { theme: 'T3', unit: 'T3-Viajes', es: 'el coche', en: 'car' },                  // AQA foundation list
  { theme: 'T3', unit: 'T3-Vacaciones', es: 'la playa', en: 'beach' },            // AQA foundation list
  { theme: 'T3', unit: 'T3-Vacaciones', es: 'el hotel', en: 'hotel' },            // AQA foundation list
  { theme: 'T3', unit: 'T3-Vacaciones', es: 'reservar', en: 'to book' },          // AQA foundation list
  { theme: 'T3', unit: 'T3-Vacaciones', es: 'tomar el sol', en: 'to sunbathe' },  // AQA foundation list
  { theme: 'T3', unit: 'T3-Vacaciones', es: 'visitar', en: 'to visit' },          // AQA foundation list
]

// Utility to fetch units for a given theme (used by the page)
export function unitsForTheme(themeId) {
  return UNITS.filter(u => u.theme === themeId)
}
