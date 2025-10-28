// ===========================================
// Units + auto-categoriser for GCSE Foundation
// ===========================================

// ----- UNITS (Option B) -----
export const UNITS = [
  // THEME 1 — People & lifestyle
  { id: 'T1-Family',   theme: 'T1', label: 'T1 Family & relationships' },
  { id: 'T1-Describe', theme: 'T1', label: 'T1 Physical description & personality' },
  { id: 'T1-Daily',    theme: 'T1', label: 'T1 Daily routine & home life' },
  { id: 'T1-Health',   theme: 'T1', label: 'T1 Health & lifestyle' },
  { id: 'T1-Food',     theme: 'T1', label: 'T1 Food & drink' },
  { id: 'T1-Shopping', theme: 'T1', label: 'T1 Shopping & money' },

  // THEME 2 — Popular culture
  { id: 'T2-FreeTime', theme: 'T2', label: 'T2 Free time & going out' },
  { id: 'T2-Music',    theme: 'T2', label: 'T2 Music' },
  { id: 'T2-FilmTV',   theme: 'T2', label: 'T2 Film & TV' },
  { id: 'T2-Tech',     theme: 'T2', label: 'T2 Technology & social media' },
  { id: 'T2-Fashion',  theme: 'T2', label: 'T2 Clothes & fashion' },
  { id: 'T2-Eating',   theme: 'T2', label: 'T2 Eating out' },
  { id: 'T2-Festivals',theme: 'T2', label: 'T2 Festivals & celebrations' },

  // THEME 3 — Communication & world around us
  { id: 'T3-Travel',   theme: 'T3', label: 'T3 Travel & transport' },
  { id: 'T3-Directions', theme: 'T3', label: 'T3 Places & directions' },
  { id: 'T3-Holidays', theme: 'T3', label: 'T3 Holidays & accommodation' },
  { id: 'T3-Weather',  theme: 'T3', label: 'T3 Weather & seasons' },
  { id: 'T3-Environment', theme: 'T3', label: 'T3 Environment' },
  { id: 'T3-School',   theme: 'T3', label: 'T3 School & education' },
  { id: 'T3-Work',     theme: 'T3', label: 'T3 Work & employment' },
  { id: 'T3-TechWork', theme: 'T3', label: 'T3 Tech for work/study' },

  // Glue words if you want a practice set for adverbs/connectors
  { id: 'GL-Glue',     theme: 'T1', label: 'Glue: time words & connectors (any theme)' },
]

// Helper to list units per theme
export function unitsForTheme(themeId) {
  return UNITS.filter(u => u.theme === themeId)
}

// ---------- Auto-categoriser ----------
// We look at Spanish + English for keywords and assign one primary unit.
// If multiple match, priority order decides.

const rx = (arr) => new RegExp(`\\b(?:${arr.map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'i')

const K = {
  family: rx(['padre','madre','hijo','hija','hermano','hermana','abuelo','abuela','tío','tía','primo','prima','novio','novia','esposo','esposa','parientes','familia','amigo','amiga','casado','soltero','divorciado','boda','cumpleaños','regalo','invitado','fiesta','relationship','family','relative','wedding','birthday','gift','invite','guest','boyfriend','girlfriend','husband','wife']),
  describe: rx(['alto','bajo','delgado','gordo','fuerte','débil','guapo','feo','joven','mayor','moreno','rubio','pelirrojo','castaño','liso','rizado','ondulado','calvo','gafas','barba','bigote','ojos','eyes','hair','tall','short','slim','thin','fat','strong','weak','good-looking','attractive','ugly','young','old','bald','beard','moustache','glasses']),
  personality: rx(['simpático','antipático','amable','educado','maleducado','tímido','abierto','cerrado','divertido','serio','trabajador','perezoso','inteligente','lista','tonto','alegre','triste','honesto','mentiroso','generoso','egoísta','friendly','kind','polite','rude','shy','outgoing','fun','serious','hard-working','lazy','clever','intelligent','silly','happy','sad','honest','dishonest','generous','selfish']),
  daily: rx(['levantarse','acostarse','ducharse','lavarse','vestirse','ponerse','desayunar','almorzar','cenar','cocinar','limpiar','planchar','ayudar','pasear','ver la tele','usar el ordenador','navegar','mandar mensajes','descansar','rutina','deberes','poner la mesa','fregar','sacar la basura','stay at home','homework','daily','routine','lay the table','wash the dishes','take out the rubbish']),
  health: rx(['salud','enfermo','fiebre','dolor','cabeza','tos','resfriado','catarro','cansado','saludable','sano','ejercicio','health','ill','fever','headache','cough','cold','tired','healthy','exercise']),
  food: rx(['desayuno','comida','cena','pan','arroz','pasta','carne','pescado','verduras','fruta','agua','zumo','refresco','café','té','leche','restaurante','menú','carta','pedir','servir','cuenta','propina','comida rápida','fast food','junk food','bill','tip','menu','restaurant','drink','beverage']),
  shopping: rx(['comprar','vender','costar','barato','caro','tienda','supermercado','mercado','dinero','efectivo','tarjeta','talla','tamaño','probarse','devolver','shop','supermarket','market','money','cash','card','size','try on','return']),
  freeTime: rx(['tiempo libre','quedar','salir','paseo','parque','cine','fotos','bailar','cantar','pasarlo bien','pasarlo mal','club','disco','bar','café','have a good time','go out','meet up']),
  music: rx(['música','tocar','grupo','banda','concierto','entrada','letra','sonido','altavoz','lyrics','band','concert','speaker']),
  filmTV: rx(['cine','película','actor','actriz','dibujos animados','documental','comedia','drama','terror','acción','aventuras','romántico','ver','pantalla','subtítulos','butaca','tráiler','televisión','serie','episodio','capítulo','telediario','noticias','trailer','screen','subtitles','episode','news','tv','tele']),
  tech: rx(['ordenador','computadora','portátil','móvil','celular','tableta','redes sociales','en línea','internet','descargar','subir','compartir','comentar','me gusta','cuenta','contraseña','privacidad','online','social media','account','password','privacy','download','upload']),
  fashion: rx(['moda','ropa','camiseta','camisa','pantalones','vaqueros','vestido','falda','zapatos','zapatillas','llevar','fashion','clothes','jeans','dress','skirt','shoes','trainers','wear']),
  festivals: rx(['fiesta','festival','fuegos artificiales','Nochevieja','Navidad','Semana Santa','Fallas','Feria','Tomatina','celebrar','invite','guest','Christmas','Eve','fireworks','Easter']),
  travel: rx(['viajar','viaje','billete','boleto','ida','vuelta','estación','parada','andén','horario','salida','llegada','aeropuerto','vuelo','facturar','embarcar','puerta de embarque','equipaje','maleta','perder','coger','train','bus','taxi','flight','airport','luggage','suitcase','ticket','platform','boarding','gate']),
  directions: rx(['mapa','plano','oficina de turismo','centro','afueras','barrio','girar','seguir recto','izquierda','derecha','cerca','lejos','map','tourist office','centre','outskirts','left','right','near','far','neighbourhood']),
  holidays: rx(['hotel','albergue','habitación','individual','doble','baño','ducha','reserva','reservar','llave','recepción','cuenta','factura','quejarse','playa','mar','tomar el sol','hacer turismo','visitar','museo','catedral','iglesia','castillo','park','beach','sea','sunbathe','sightseeing','booking','reception','complain','room']),
  weather: rx(['tiempo','sol','viento','frío','calor','llueve','nieva','nublado','despejado','primavera','verano','otoño','invierno','weather','sunny','windy','cold','hot','rain','snow','cloudy','clear','spring','summer','autumn','winter']),
  environment: rx(['medio ambiente','reciclar','reutilizar','reducir','contaminación','cambio climático','sequía','inundación','basura','residuos','energía','solar','eólica','ahorrar','environment','pollution','climate change','drought','flood','waste','energy','save']),
  school: rx(['instituto','colegio','asignaturas','deberes','exámenes','suspender','aprobar','universidad','carrera','school','subject','homework','exam','fail','pass','university','degree']),
  work: rx(['trabajo','empleo','jefe','jefa','salario','sueldo','horario laboral','tiempo parcial','tiempo completo','buscar trabajo','solicitar un empleo','work','employment','boss','salary','wage','working hours','part-time','full-time','apply']),
  techWork: rx(['correo electrónico','adjuntar','archivo','carpeta','red','conexión','email','attach','file','folder','network','connection']),
  glue: rx(['siempre','nunca','a veces','a menudo','de vez en cuando','normalmente','generalmente','temprano','tarde','antes','después','luego','pronto','ya','todavía','porque','pero','y','o','muy','bastante','un poco','más','menos','demasiado','mejor','peor'])
}

// Priority order if more than one matches
const PRIORITY = [
  'T1-Family','T1-Describe','T1-Health','T1-Food','T1-Daily','T1-Shopping',
  'T2-Music','T2-FilmTV','T2-Tech','T2-FreeTime','T2-Fashion','T2-Eating','T2-Festivals',
  'T3-Travel','T3-Holidays','T3-Directions','T3-Weather','T3-Environment','T3-School','T3-Work','T3-TechWork',
  'GL-Glue'
]

// Main categoriser: returns a unitId for a vocab item ({es, en, theme})
export function categorise(item) {
  const text = `${item.es} ${item.en}`.toLowerCase()

  function hit(key) { return K[key].test(text) }

  const checks = {
    'T1-Family': hit('family'),
    'T1-Describe': (hit('describe') || hit('personality')),
    'T1-Daily': hit('daily'),
    'T1-Health': hit('health'),
    'T1-Food': hit('food'),
    'T1-Shopping': hit('shopping'),

    'T2-FreeTime': hit('freeTime'),
    'T2-Music': hit('music'),
    'T2-FilmTV': hit('filmTV'),
    'T2-Tech': hit('tech'),
    'T2-Fashion': hit('fashion'),
    'T2-Eating': hit('food'),
    'T2-Festivals': hit('festivals'),

    'T3-Travel': hit('travel'),
    'T3-Directions': hit('directions'),
    'T3-Holidays': hit('holidays'),
    'T3-Weather': hit('weather'),
    'T3-Environment': hit('environment'),
    'T3-School': hit('school'),
    'T3-Work': hit('work'),
    'T3-TechWork': hit('techWork'),

    'GL-Glue': hit('glue'),
  }

  // Theme guard: keep within the chosen theme when possible
  const themePrefix = (item.theme || '').toUpperCase()
  const candidates = PRIORITY.filter(u => u.startsWith(themePrefix) || u === 'GL-Glue')

  for (const u of candidates) {
    if (checks[u]) return u
  }
  // Fallback: first unit of the theme if nothing matched
  const first = UNITS.find(x => x.theme === item.theme)
  return first ? first.id : 'GL-Glue'
}
