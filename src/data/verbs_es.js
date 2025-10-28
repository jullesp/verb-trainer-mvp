// Subjects stay the same order
export const SUBJECTS = ['yo','tú','él/ella/usted','nosotros','vosotros','ellos/ustedes']

// Tenses supported by the trainer
export const TENSES = ['presente','pretérito','imperfecto','futuro']

// Verb bank: each verb has multiple tenses and optional packs
// NOTE: This is a minimal demo set; expand as needed.
export const VERB_BANK = [
  {
    infinitive: 'hablar',
    regular: true,
    packs: ['top50', 'gcse'],
    tenses: {
      'presente': ['hablo','hablas','habla','hablamos','habláis','hablan'],
      'pretérito': ['hablé','hablaste','habló','hablamos','hablasteis','hablaron'],
      'imperfecto': ['hablaba','hablabas','hablaba','hablábamos','hablabais','hablaban'],
      'futuro': ['hablaré','hablarás','hablará','hablaremos','hablaréis','hablarán']
    }
  },
  {
    infinitive: 'comer',
    regular: true,
    packs: ['top50', 'gcse'],
    tenses: {
      'presente': ['como','comes','come','comemos','coméis','comen'],
      'pretérito': ['comí','comiste','comió','comimos','comisteis','comieron'],
      'imperfecto': ['comía','comías','comía','comíamos','comíais','comían'],
      'futuro': ['comeré','comerás','comerá','comeremos','comeréis','comerán']
    }
  },
  {
    infinitive: 'vivir',
    regular: true,
    packs: ['top50', 'gcse'],
    tenses: {
      'presente': ['vivo','vives','vive','vivimos','vivís','viven'],
      'pretérito': ['viví','viviste','vivió','vivimos','vivisteis','vivieron'],
      'imperfecto': ['vivía','vivías','vivía','vivíamos','vivíais','vivían'],
      'futuro': ['viviré','vivirás','vivirá','viviremos','viviréis','vivirán']
    }
  },
  {
    infinitive: 'ir',
    regular: false,
    packs: ['top50', 'gcse'],
    tenses: {
      'presente': ['voy','vas','va','vamos','vais','van'],
      'pretérito': ['fui','fuiste','fue','fuimos','fuisteis','fueron'],
      'imperfecto': ['iba','ibas','iba','íbamos','ibais','iban'],
      'futuro': ['iré','irás','irá','iremos','iréis','irán']
    }
  },
  {
    infinitive: 'ser',
    regular: false,
    packs: ['top50', 'gcse'],
    tenses: {
      'presente': ['soy','eres','es','somos','sois','son'],
      'pretérito': ['fui','fuiste','fue','fuimos','fuisteis','fueron'],
      'imperfecto': ['era','eras','era','éramos','erais','eran'],
      'futuro': ['seré','serás','será','seremos','seréis','serán']
    }
  },
  {
    infinitive: 'tener',
    regular: false,
    packs: ['top50', 'gcse'],
    tenses: {
      'presente': ['tengo','tienes','tiene','tenemos','tenéis','tienen'],
      'pretérito': ['tuve','tuviste','tuvo','tuvimos','tuvisteis','tuvieron'],
      'imperfecto': ['tenía','tenías','tenía','teníamos','teníais','tenían'],
      'futuro': ['tendré','tendrás','tendrá','tendremos','tendréis','tendrán']
    }
  },
  {
    infinitive: 'hacer',
    regular: false,
    packs: ['top50', 'gcse'],
    tenses: {
      'presente': ['hago','haces','hace','hacemos','hacéis','hacen'],
      'pretérito': ['hice','hiciste','hizo','hicimos','hicisteis','hicieron'],
      'imperfecto': ['hacía','hacías','hacía','hacíamos','hacíais','hacían'],
      'futuro': ['haré','harás','hará','haremos','haréis','harán']
    }
  },
  {
    infinitive: 'salir',
    regular: false,
    packs: ['top50', 'gcse'],
    tenses: {
      'presente': ['salgo','sales','sale','salimos','salís','salen'],
      'pretérito': ['salí','saliste','salió','salimos','salisteis','salieron'],
      'imperfecto': ['salía','salías','salía','salíamos','salíais','salían'],
      'futuro': ['saldré','saldrás','saldrá','saldremos','saldréis','saldrán']
    }
  },
  {
    infinitive: 'leer',
    regular: true,
    packs: ['gcse'],
    tenses: {
      'presente': ['leo','lees','lee','leemos','leéis','leen'],
      'pretérito': ['leí','leíste','leyó','leímos','leísteis','leyeron'],
      'imperfecto': ['leía','leías','leía','leíamos','leíais','leían'],
      'futuro': ['leeré','leerás','leerá','leeremos','leeréis','leerán']
    }
  },
  {
    infinitive: 'beber',
    regular: true,
    packs: ['gcse'],
    tenses: {
      'presente': ['bebo','bebes','bebe','bebemos','bebéis','beben'],
      'pretérito': ['bebí','bebiste','bebió','bebimos','bebisteis','bebieron'],
      'imperfecto': ['bebía','bebías','bebía','bebíamos','bebíais','bebían'],
      'futuro': ['beberé','beberás','beberá','beberemos','beberéis','beberán']
    }
  }
]
