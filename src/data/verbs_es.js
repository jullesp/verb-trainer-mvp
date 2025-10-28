// ===============================
// Spanish Verb Trainer Data File
// ===============================
// Subjects, tenses, and full GCSE verb bank (Top 50 + reflexives + modals)
// ===============================

export const SUBJECTS = ['yo','tú','él/ella/usted','nosotros','vosotros','ellos/ustedes']
export const TENSES = ['presente','pretérito','imperfecto','futuro']

export const VERB_BANK = [

  // ---------- TOP 10 CORE (Irregular) ----------
  {infinitive:'ser',regular:false,packs:['top10','top50','gcse'],
    tenses:{'presente':['soy','eres','es','somos','sois','son'],'pretérito':['fui','fuiste','fue','fuimos','fuisteis','fueron'],'imperfecto':['era','eras','era','éramos','erais','eran'],'futuro':['seré','serás','será','seremos','seréis','serán']}},
  {infinitive:'estar',regular:false,packs:['top10','top50','gcse'],
    tenses:{'presente':['estoy','estás','está','estamos','estáis','están'],'pretérito':['estuve','estuviste','estuvo','estuvimos','estuvisteis','estuvieron'],'imperfecto':['estaba','estabas','estaba','estábamos','estabais','estaban'],'futuro':['estaré','estarás','estará','estaremos','estaréis','estarán']}},
  {infinitive:'tener',regular:false,packs:['top10','top50','gcse'],
    tenses:{'presente':['tengo','tienes','tiene','tenemos','tenéis','tienen'],'pretérito':['tuve','tuviste','tuvo','tuvimos','tuvisteis','tuvieron'],'imperfecto':['tenía','tenías','tenía','teníamos','teníais','tenían'],'futuro':['tendré','tendrás','tendrá','tendremos','tendréis','tendrán']}},
  {infinitive:'hacer',regular:false,packs:['top10','top50','gcse'],
    tenses:{'presente':['hago','haces','hace','hacemos','hacéis','hacen'],'pretérito':['hice','hiciste','hizo','hicimos','hicisteis','hicieron'],'imperfecto':['hacía','hacías','hacía','hacíamos','hacíais','hacían'],'futuro':['haré','harás','hará','haremos','haréis','harán']}},
  {infinitive:'ir',regular:false,packs:['top10','top50','gcse'],
    tenses:{'presente':['voy','vas','va','vamos','vais','van'],'pretérito':['fui','fuiste','fue','fuimos','fuisteis','fueron'],'imperfecto':['iba','ibas','iba','íbamos','ibais','iban'],'futuro':['iré','irás','irá','iremos','iréis','irán']}},
  {infinitive:'poder',regular:false,packs:['top10','top50','gcse'],
    tenses:{'presente':['puedo','puedes','puede','podemos','podéis','pueden'],'pretérito':['pude','pudiste','pudo','pudimos','pudisteis','pudieron'],'imperfecto':['podía','podías','podía','podíamos','podíais','podían'],'futuro':['podré','podrás','podrá','podremos','podréis','podrán']}},
  {infinitive:'querer',regular:false,packs:['top10','top50','gcse'],
    tenses:{'presente':['quiero','quieres','quiere','queremos','queréis','quieren'],'pretérito':['quise','quisiste','quiso','quisimos','quisisteis','quisieron'],'imperfecto':['quería','querías','quería','queríamos','queríais','querían'],'futuro':['querré','querrás','querrá','querremos','querréis','querrán']}},
  {infinitive:'decir',regular:false,packs:['top10','top50','gcse'],
    tenses:{'presente':['digo','dices','dice','decimos','decís','dicen'],'pretérito':['dije','dijiste','dijo','dijimos','dijisteis','dijeron'],'imperfecto':['decía','decías','decía','decíamos','decíais','decían'],'futuro':['diré','dirás','dirá','diremos','diréis','dirán']}},
  {infinitive:'poner',regular:false,packs:['top10','top50','gcse'],
    tenses:{'presente':['pongo','pones','pone','ponemos','ponéis','ponen'],'pretérito':['puse','pusiste','puso','pusimos','pusisteis','pusieron'],'imperfecto':['ponía','ponías','ponía','poníamos','poníais','ponían'],'futuro':['pondré','pondrás','pondrá','pondremos','pondréis','pondrán']}},
  {infinitive:'salir',regular:false,packs:['top10','top50','gcse'],
    tenses:{'presente':['salgo','sales','sale','salimos','salís','salen'],'pretérito':['salí','saliste','salió','salimos','salisteis','salieron'],'imperfecto':['salía','salías','salía','salíamos','salíais','salían'],'futuro':['saldré','saldrás','saldrá','saldremos','saldréis','saldrán']}},

  // ---------- REGULARS ----------
  {infinitive:'hablar',regular:true,packs:['top50','gcse'],
    tenses:{'presente':['hablo','hablas','habla','hablamos','habláis','hablan'],'pretérito':['hablé','hablaste','habló','hablamos','hablasteis','hablaron'],'imperfecto':['hablaba','hablabas','hablaba','hablábamos','hablabais','hablaban'],'futuro':['hablaré','hablarás','hablará','hablaremos','hablaréis','hablarán']}},
  {infinitive:'comer',regular:true,packs:['top50','gcse'],
    tenses:{'presente':['como','comes','come','comemos','coméis','comen'],'pretérito':['comí','comiste','comió','comimos','comisteis','comieron'],'imperfecto':['comía','comías','comía','comíamos','comíais','comían'],'futuro':['comeré','comerás','comerá','comeremos','comeréis','comerán']}},
  {infinitive:'vivir',regular:true,packs:['top50','gcse'],
    tenses:{'presente':['vivo','vives','vive','vivimos','vivís','viven'],'pretérito':['viví','viviste','vivió','vivimos','vivisteis','vivieron'],'imperfecto':['vivía','vivías','vivía','vivíamos','vivíais','vivían'],'futuro':['viviré','vivirás','vivirá','viviremos','viviréis','vivirán']}},

  // ---------- AQA GCSE COMMONS ----------
  {infinitive:'dar',regular:false,packs:['top50','gcse'],
    tenses:{'presente':['doy','das','da','damos','dais','dan'],'pretérito':['di','diste','dio','dimos','disteis','dieron'],'imperfecto':['daba','dabas','daba','dábamos','dabais','daban'],'futuro':['daré','darás','dará','daremos','daréis','darán']}},
  {infinitive:'ver',regular:false,packs:['top50','gcse'],
    tenses:{'presente':['veo','ves','ve','vemos','veis','ven'],'pretérito':['vi','viste','vio','vimos','visteis','vieron'],'imperfecto':['veía','veías','veía','veíamos','veíais','veían'],'futuro':['veré','verás','verá','veremos','veréis','verán']}},
  {infinitive:'venir',regular:false,packs:['top50','gcse'],
    tenses:{'presente':['vengo','vienes','viene','venimos','venís','vienen'],'pretérito':['vine','viniste','vino','vinimos','vinisteis','vinieron'],'imperfecto':['venía','venías','venía','veníamos','veníais','venían'],'futuro':['vendré','vendrás','vendrá','vendremos','vendréis','vendrán']}},
  {infinitive:'quedar',regular:true,packs:['gcse'],
    tenses:{'presente':['quedo','quedas','queda','quedamos','quedáis','quedan'],'pretérito':['quedé','quedaste','quedó','quedamos','quedasteis','quedaron'],'imperfecto':['quedaba','quedabas','quedaba','quedábamos','quedabais','quedaban'],'futuro':['quedaré','quedarás','quedará','quedaremos','quedaréis','quedarán']}},

  // ---------- REFLEXIVES ----------
  {infinitive:'levantarse',regular:true,packs:['gcse'],
    tenses:{'presente':['me levanto','te levantas','se levanta','nos levantamos','os levantáis','se levantan'],'pretérito':['me levanté','te levantaste','se levantó','nos levantamos','os levantasteis','se levantaron'],'imperfecto':['me levantaba','te levantabas','se levantaba','nos levantábamos','os levantabais','se levantaban'],'futuro':['me levantaré','te levantarás','se levantará','nos levantaremos','os levantaréis','se levantarán']}},
  {infinitive:'acostarse',regular:false,packs:['gcse'],
    tenses:{'presente':['me acuesto','te acuestas','se acuesta','nos acostamos','os acostáis','se acuestan'],'pretérito':['me acosté','te acostaste','se acostó','nos acostamos','os acostasteis','se acostaron'],'imperfecto':['me acostaba','te acostabas','se acostaba','nos acostábamos','os acostabais','se acostaban'],'futuro':['me acostaré','te acostarás','se acostará','nos acostaremos','os acostaréis','se acostarán']}},
  {infinitive:'ducharse',regular:true,packs:['gcse'],
    tenses:{'presente':['me ducho','te duchas','se ducha','nos duchamos','os ducháis','se duchan'],'pretérito':['me duché','te duchaste','se duchó','nos duchamos','os duchasteis','se ducharon'],'imperfecto':['me duchaba','te duchabas','se duchaba','nos duchábamos','os duchabais','se duchaban'],'futuro':['me ducharé','te ducharás','se duchará','nos ducharemos','os ducharéis','se ducharán']}},
  {infinitive:'ponerse',regular:false,packs:['gcse'],
    tenses:{'presente':['me pongo','te pones','se pone','nos ponemos','os ponéis','se ponen'],'pretérito':['me puse','te pusiste','se puso','nos pusimos','os pusisteis','se pusieron'],'imperfecto':['me ponía','te ponías','se ponía','nos poníamos','os poníais','se ponían'],'futuro':['me pondré','te pondrás','se pondrá','nos pondremos','os pondréis','se pondrán']}},
  {infinitive:'sentirse',regular:false,packs:['gcse'],
    tenses:{'presente':['me siento','te sientes','se siente','nos sentimos','os sentís','se sienten'],'pretérito':['me sentí','te sentiste','se sintió','nos sentimos','os sentisteis','se sintieron'],'imperfecto':['me sentía','te sentías','se sentía','nos sentíamos','os sentíais','se sentían'],'futuro':['me sentiré','te sentirás','se sentirá','nos sentiremos','os sentiréis','se sentirán']}},

  // ---------- MODALS ----------
  {infinitive:'deber',regular:true,packs:['gcse'],
    tenses:{'presente':['debo','debes','debe','debemos','debéis','deben'],'pretérito':['debí','debiste','debió','debimos','debisteis','debieron'],'imperfecto':['debía','debías','debía','debíamos','debíais','debían'],'futuro':['deberé','deberás','deberá','deberemos','deberéis','deberán']}},
  {infinitive:'tener que',regular:false,packs:['gcse'],
    tenses:{'presente':['tengo que','tienes que','tiene que','tenemos que','tenéis que','tienen que'],'pretérito':['tuve que','tuviste que','tuvo que','tuvimos que','tuvisteis que','tuvieron que'],'imperfecto':['tenía que','tenías que','tenía que','teníamos que','teníais que','tenían que'],'futuro':['tendré que','tendrás que','tendrá que','tendremos que','tendréis que','tendrán que']}},
  {infinitive:'ir a',regular:false,packs:['gcse'],
    tenses:{'presente':['voy a','vas a','va a','vamos a','vais a','van a'],'pretérito':['fui a','fuiste a','fue a','fuimos a','fuisteis a','fueron a'],'imperfecto':['iba a','ibas a','iba a','íbamos a','ibais a','iban a'],'futuro':['iré a','irás a','irá a','iremos a','iréis a','irán a']}}
]
