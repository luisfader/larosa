(function () {
  'use strict';

  var NOVEL = window.NOVEL, EX = window.EXTRAS;
  var LANGS = ['tr', 'es', 'en'];
  var LITMIR = 'https://luisfader.github.io/litmir/?lang=tr#/col-gulu';
  var FADERPEDIA = 'https://luisfader.github.io/faderpedia/';

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('lr-' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('lr-' + k, JSON.stringify(v)); } catch (e) {} }
  };

  function guessLang() {
    var n = (navigator.language || 'es').slice(0, 2);
    return LANGS.indexOf(n) >= 0 ? n : 'es';
  }
  var lang = store.get('lang', null) || guessLang();
  if (LANGS.indexOf(lang) < 0) lang = 'es';

  var T = {
    tr: {
      title: 'Çöl Gülü', alt: 'Kıyamet sonrası bir aşk romanı', home: 'Ana sayfa', read: 'Oku', chapters: 'Bölümler',
      characters: 'Karakterler', rose: 'Çöl gülü', necro: 'Nekroloji', test: 'Hangi karaktersin?', gallery: 'Galeri',
      start: 'Okumaya başla', resume: 'Devam et', chapter: 'Bölüm', interview: 'Röportaj', ending: 'Son',
      min: 'dk', words: 'kelime', readDone: 'Okundu', quizScore: 'Test',
      tabRead: 'Oku', tabQuiz: 'Sorular', tabPsy: 'Psikoloji', tabPhi: 'Felsefe', tabCur: 'İlginç bilgiler',
      textLang: 'Metin', prev: 'Önceki', next: 'Sonraki', toc: 'İçindekiler',
      glossNote: 'Altı çizili kelimelere dokun: İspanyolca ve İngilizce anlamları görünür.',
      quizIntro: 'Bölümü ne kadar iyi okudun? Doğru cevabı seç.', yourScore: 'Puanın', retry: 'Tekrar dene',
      psyTitle: 'Karakterlerin zihnine bir bakış', phiTitle: 'Bölümün sorduğu büyük soru', curTitle: 'Bunu biliyor muydun?',
      explore: 'Romanın dünyasını keşfet', exChars: 'Rosa, Robert, Luis ve diğerleri.', exRose: 'Romanın simgesi gerçekten var: kumdan bir kristal.',
      exNecro: 'Yeraltındaki cennet ve onun karanlık sırrı.', exTest: 'Altı soru: Rosa mısın, Robert mi, Luis mi?', exGal: 'Rosa\'nın resimleri.',
      quote: 'Aşkı kimse inşa etmez. Sadece yağmuru beklersin. Ve bir gece, çöle yağmur yağar.', quoteBy: 'Rosa',
      blurb: 'Büyük Felaket\'ten bu yana üç yıl geçti. Robert, yirminci yüzyıldan kalma eski motosikletiyle çölün kızgın sessizliğini yırtarak kendi ütopyasını kuracak insanları arıyor. Yolu, isyancıların lideri Rosa ile kesişir. Birlikte turkuaz duvarlı bir kale kurmaya çalışırlar; ama vahşiler, mancınıklar ve içeriden gelen ihanetler bu hayali tehdit eder.',
      genre: 'Kıyamet sonrası · Macera · Aşk', by: 'Roberto Fader', langsNote: 'Türkçe · İspanyolca · İngilizce',
      progress: 'Okuma ilerlemen', of: '/', testIntro: 'Altı soruyu yanıtla ve Ütopyamız\'da kim olacağını öğren.', seeResult: 'Sonucu gör',
      youAre: 'Sen…', again: 'Yeniden başla', answerAll: 'Tüm soruları yanıtla.',
      roseFrom: 'Rosa\'nın armağanı', footer: 'Roberto Fader\'ın romanı. Orijinal metin', footer2: 'Faderpedia\'da daha fazla karakter',
      galCap: ['Tüfeğiyle, kalenin önünde', 'Dürbünüyle ufku izlerken', 'Fener ışığında', 'Robert ile', 'Turkuaz eşarbıyla', 'Defterine yazarken', 'Ateşin başında', 'Çöl gülü', 'Gülümseyen Rosa', 'Kapak'],
      theme: 'Tema', topics: 'Okuma rehberi'
    },
    es: {
      title: 'La rosa del desierto', alt: 'Una novela de amor posapocalíptica', home: 'Inicio', read: 'Leer', chapters: 'Capítulos',
      characters: 'Personajes', rose: 'La rosa del desierto', necro: 'Necrología', test: '¿Qué personaje sos?', gallery: 'Galería',
      start: 'Empezar a leer', resume: 'Seguir leyendo', chapter: 'Capítulo', interview: 'Entrevista', ending: 'Final',
      min: 'min', words: 'palabras', readDone: 'Leído', quizScore: 'Test',
      tabRead: 'Leer', tabQuiz: 'Preguntas', tabPsy: 'Psicología', tabPhi: 'Filosofía', tabCur: 'Curiosidades',
      textLang: 'Texto', prev: 'Anterior', next: 'Siguiente', toc: 'Índice',
      glossNote: 'Tocá las palabras subrayadas para ver su traducción.',
      quizIntro: '¿Qué tan bien leíste el capítulo? Elegí la respuesta correcta.', yourScore: 'Tu puntaje', retry: 'Reintentar',
      psyTitle: 'Una mirada a la mente de los personajes', phiTitle: 'La gran pregunta del capítulo', curTitle: '¿Sabías que…?',
      explore: 'Explorá el mundo de la novela', exChars: 'Rosa, Robert, Luis y todos los demás.', exRose: 'El símbolo de la novela existe de verdad: un cristal de arena.',
      exNecro: 'El paraíso subterráneo y su secreto oscuro.', exTest: 'Seis preguntas: ¿sos Rosa, Robert o Luis?', exGal: 'Las ilustraciones de Rosa.',
      quote: 'El amor no lo construye nadie. Solo esperás la lluvia. Y una noche, llueve en el desierto.', quoteBy: 'Rosa',
      blurb: 'Han pasado tres años desde la Gran Catástrofe. Robert recorre el silencio abrasador del desierto en su vieja moto del siglo XX, buscando gente con la que construir su utopía. Su camino se cruza con el de Rosa, la líder de los rebeldes. Juntos intentan levantar una fortaleza de muros turquesa; pero los salvajes, las catapultas y la traición desde adentro amenazan el sueño.',
      genre: 'Posapocalíptica · Aventura · Romance', by: 'Roberto Fader', langsNote: 'Turco · Español · Inglés',
      progress: 'Tu lectura', of: 'de', testIntro: 'Respondé seis preguntas y descubrí quién serías en Nuestra Utopía.', seeResult: 'Ver resultado',
      youAre: 'Sos…', again: 'Empezar de nuevo', answerAll: 'Respondé todas las preguntas.',
      roseFrom: 'El regalo de Rosa', footer: 'Una novela de Roberto Fader. Texto original en', footer2: 'Más personajes en Faderpedia',
      galCap: ['Con su rifle, frente a la fortaleza', 'Mirando el horizonte con prismáticos', 'A la luz del farol', 'Con Robert', 'Con su pañuelo turquesa', 'Escribiendo en su cuaderno', 'Junto al fuego', 'La rosa', 'Rosa sonríe', 'La portada'],
      theme: 'Tema', topics: 'Guía de lectura'
    },
    en: {
      title: 'The Desert Rose', alt: 'A post-apocalyptic love story', home: 'Home', read: 'Read', chapters: 'Chapters',
      characters: 'Characters', rose: 'The desert rose', necro: 'Necrology', test: 'Which character are you?', gallery: 'Gallery',
      start: 'Start reading', resume: 'Keep reading', chapter: 'Chapter', interview: 'Interview', ending: 'Ending',
      min: 'min', words: 'words', readDone: 'Read', quizScore: 'Quiz',
      tabRead: 'Read', tabQuiz: 'Questions', tabPsy: 'Psychology', tabPhi: 'Philosophy', tabCur: 'Curiosities',
      textLang: 'Text', prev: 'Previous', next: 'Next', toc: 'Contents',
      glossNote: 'Tap the underlined words to see their translation.',
      quizIntro: 'How well did you read the chapter? Pick the right answer.', yourScore: 'Your score', retry: 'Try again',
      psyTitle: 'A look inside the characters\' minds', phiTitle: 'The big question of the chapter', curTitle: 'Did you know…?',
      explore: 'Explore the world of the novel', exChars: 'Rosa, Robert, Luis and everyone else.', exRose: 'The novel\'s symbol really exists: a crystal made of sand.',
      exNecro: 'The underground paradise and its dark secret.', exTest: 'Six questions: are you Rosa, Robert or Luis?', exGal: 'The illustrations of Rosa.',
      quote: 'Nobody builds love. You just wait for the rain. And one night, it rains in the desert.', quoteBy: 'Rosa',
      blurb: 'Three years have passed since the Great Catastrophe. Robert tears through the scorching silence of the desert on his old twentieth-century motorbike, looking for people to build his utopia with. His path crosses that of Rosa, the leader of the rebels. Together they try to raise a fortress with turquoise walls; but savages, catapults and betrayal from within threaten the dream.',
      genre: 'Post-apocalyptic · Adventure · Romance', by: 'Roberto Fader', langsNote: 'Turkish · Spanish · English',
      progress: 'Your reading', of: 'of', testIntro: 'Answer six questions and find out who you would be in Our Utopia.', seeResult: 'See result',
      youAre: 'You are…', again: 'Start again', answerAll: 'Answer every question.',
      roseFrom: 'Rosa\'s gift', footer: 'A novel by Roberto Fader. Original text on', footer2: 'More characters on Faderpedia',
      galCap: ['With her rifle, before the fortress', 'Watching the horizon through binoculars', 'By lantern light', 'With Robert', 'With her turquoise scarf', 'Writing in her notebook', 'By the fire', 'The rose', 'Rosa smiles', 'The cover'],
      theme: 'Theme', topics: 'Reading guide'
    }
  };
  function t(k) { return (T[lang] && T[lang][k]) || T.es[k] || k; }

  // Per-chapter scene (sky) and illustration.
  var CH = [
    { sky: 'noon', img: 'rosa-2' }, { sky: 'dusk', img: 'rosa-8' }, { sky: 'dawn', img: 'cover-480' },
    { sky: 'rain', img: 'rosa-4' }, { sky: 'night', img: 'rosa-1' }, { sky: 'dusk', img: 'rosa-3' },
    { sky: 'night', img: 'rosa-9' }, { sky: 'dawn', img: 'rosa-6' }, { sky: 'dawn', img: 'rosa-7' },
    { sky: 'fire', img: null }, { sky: 'rain', img: 'rosa-5' }, { sky: 'dusk', img: null }
  ];
  // Gallery order matches T.galCap.
  var GAL = ['rosa-2', 'rosa-3', 'rosa-4', 'rosa-5', 'rosa-6', 'rosa-7', 'rosa-8', 'rosa-9', 'rosa-1', 'cover'];
  var COLORS = { rosa: '#b5532f', robert: '#7a3b2a', kennet: '#4f6b3a', sasha: '#c0602a', luis: '#138a87', anselmo: '#8a7a5c',
    tomas: '#5b4a6e', oxana: '#2d5f9a', martin: '#5a2a2a', jeni: '#333', samuel: '#6b4a2a', juan: '#8a6a1a' };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- SVG scenes ---------- */
  var PAL = {
    dawn: { sky: ['#5f6fa6', '#e9a07f', '#fde0b4'], sun: '#fff1cf', sunY: 270, sunR: 46, mtn: '#9a7f8c', city: '#7d6575', hill: '#c58f62', d: ['#e2ae79', '#d39463', '#bf7c4d'], f: ['#58c9c1', '#1f8f8a'], win: '#123c3d', stars: 0 },
    noon: { sky: ['#4f9fcf', '#a9d6e6', '#f6e3bf'], sun: '#fffbea', sunY: 90, sunR: 38, mtn: '#b49a86', city: '#9f8a7a', hill: '#d9a26c', d: ['#f0c48a', '#e2ae73', '#d0975c'], f: ['#6fd8cf', '#23a09a'], win: '#0f4442', stars: 0 },
    dusk: { sky: ['#2a1d47', '#b7473a', '#f4a259'], sun: '#ffcf7a', sunY: 300, sunR: 70, mtn: '#5a3247', city: '#47263a', hill: '#8a4a3a', d: ['#c7744a', '#a95a3a', '#86432c'], f: ['#3fb4ad', '#13706d'], win: '#ffd27a', stars: 18 },
    night: { sky: ['#050816', '#141b3d', '#33284a'], sun: '#f4f0dd', sunY: 95, sunR: 26, moon: 1, mtn: '#1d1a33', city: '#171429', hill: '#2a2236', d: ['#3a2d3e', '#2e2333', '#221a28'], f: ['#2a8f8a', '#11504e'], win: '#ffd27a', stars: 110 },
    rain: { sky: ['#232a36', '#3f4a5a', '#5f6672'], sun: null, mtn: '#353b47', city: '#2d323d', hill: '#4a4744', d: ['#5f574f', '#4e4741', '#3e3833'], f: ['#3a9a95', '#1d625f'], win: '#ffd27a', stars: 0, rain: 1 },
    fire: { sky: ['#0d0710', '#3b1418', '#b4452a'], sun: null, mtn: '#2a1218', city: '#200d12', hill: '#3a1a16', d: ['#4a2219', '#3a1912', '#2a110c'], f: ['#2f8a85', '#124a48'], win: '#ffb35a', stars: 30, fire: 1 }
  };
  var uid = 0;
  function rnd(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }

  function fortress(p) {
    var f = 'url(#fg' + uid + ')', o = [];
    o.push('<path d="M-320,100 Q-160,8 0,0 Q160,8 320,100Z" fill="' + p.hill + '"/>');
    [-82, 82].forEach(function (x) { o.push('<rect x="' + (x - 12) + '" y="-122" width="24" height="60" fill="' + f + '"/><path d="M' + (x - 15) + ',-122 L' + x + ',-150 L' + (x + 15) + ',-122Z" fill="' + p.f[1] + '"/>'); });
    o.push('<rect x="-88" y="-84" width="176" height="44" fill="' + f + '"/>');
    for (var c = -88; c < 88; c += 14) o.push('<rect x="' + c + '" y="-91" width="8" height="8" fill="' + p.f[0] + '"/>');
    o.push('<rect x="-17" y="-212" width="34" height="140" fill="' + f + '"/>');
    o.push('<rect x="-23" y="-219" width="46" height="9" fill="' + p.f[1] + '"/>');
    o.push('<path d="M-17,-219 Q-17,-252 0,-266 Q17,-252 17,-219Z" fill="' + p.f[0] + '"/><path d="M0,-266 V-292" stroke="' + p.f[1] + '" stroke-width="2.5"/><circle cx="0" cy="-294" r="3.5" fill="#e9c27a"/>');
    o.push('<rect x="-140" y="-44" width="280" height="52" fill="' + f + '"/>');
    for (c = -140; c < 140; c += 16) o.push('<rect x="' + c + '" y="-52" width="9" height="9" fill="' + p.f[0] + '"/>');
    [-150, -52, 52, 150].forEach(function (x, i) {
      var h = i % 3 === 0 ? 96 : 76, w = i % 3 === 0 ? 30 : 24;
      o.push('<rect x="' + (x - w / 2) + '" y="' + (8 - h) + '" width="' + w + '" height="' + h + '" fill="' + f + '"/>');
      if (i % 3 === 0) o.push('<path d="M' + (x - w / 2 - 4) + ',' + (8 - h) + ' L' + x + ',' + (8 - h - 34) + ' L' + (x + w / 2 + 4) + ',' + (8 - h) + 'Z" fill="' + p.f[1] + '"/>');
      else for (var k = 0; k < 3; k++) o.push('<rect x="' + (x - w / 2 + k * 9) + '" y="' + (8 - h - 7) + '" width="6" height="7" fill="' + p.f[0] + '"/>');
      o.push('<rect x="' + (x - 1.5) + '" y="' + (8 - h + 18) + '" width="3" height="11" rx="1.5" fill="' + p.win + '"/>');
    });
    o.push('<path d="M-15,8 V-18 Q0,-36 15,-18 V8Z" fill="#1a0f0b" opacity=".8"/>');
    [[-6, -190], [6, -165], [-6, -140], [6, -112], [-40, -68], [40, -68], [-100, -24], [100, -24], [-70, -20], [70, -20]].forEach(function (w) {
      o.push('<rect x="' + (w[0] - 1.5) + '" y="' + w[1] + '" width="3" height="10" rx="1.5" fill="' + p.win + '"/>');
      if (p.win[1] === 'f') o.push('<circle cx="' + w[0] + '" cy="' + (w[1] + 5) + '" r="7" fill="' + p.win + '" opacity=".18"/>');
    });
    return o.join('');
  }

  function scene(kind, opt) {
    opt = opt || {};
    var p = PAL[kind] || PAL.dusk; uid++;
    var r = rnd(7 + uid % 13), o = [];
    var fx = opt.fx || 840, fs = opt.fs || 0.95;
    o.push('<svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false"><defs>');
    o.push('<linearGradient id="sk' + uid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + p.sky[0] + '"/><stop offset=".62" stop-color="' + p.sky[1] + '"/><stop offset="1" stop-color="' + p.sky[2] + '"/></linearGradient>');
    o.push('<linearGradient id="fg' + uid + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="' + p.f[0] + '"/><stop offset=".55" stop-color="' + p.f[0] + '"/><stop offset=".56" stop-color="' + p.f[1] + '"/><stop offset="1" stop-color="' + p.f[1] + '"/></linearGradient>');
    o.push('<radialGradient id="gl' + uid + '"><stop offset="0" stop-color="' + (p.sun || '#ff8a3a') + '" stop-opacity=".75"/><stop offset="1" stop-color="' + (p.sun || '#ff8a3a') + '" stop-opacity="0"/></radialGradient>');
    o.push('</defs><rect width="1200" height="420" fill="url(#sk' + uid + ')"/>');
    for (var i = 0; i < p.stars; i++) {
      o.push('<circle class="' + (i % 4 === 0 ? 'twinkle' : '') + '" style="animation-delay:' + (r() * 3).toFixed(2) + 's" cx="' + (r() * 1200).toFixed(0) + '" cy="' + (r() * 230).toFixed(0) + '" r="' + (r() * 1.3 + .4).toFixed(2) + '" fill="#fff" opacity="' + (r() * .6 + .3).toFixed(2) + '"/>');
    }
    if (p.sun) {
      var sx = kind === 'noon' ? 300 : kind === 'night' ? 250 : 380;
      o.push('<circle cx="' + sx + '" cy="' + p.sunY + '" r="' + p.sunR * 3.2 + '" fill="url(#gl' + uid + ')"/>');
      o.push('<circle cx="' + sx + '" cy="' + p.sunY + '" r="' + p.sunR + '" fill="' + p.sun + '"/>');
      if (p.moon) o.push('<circle cx="' + (sx + 11) + '" cy="' + (p.sunY - 7) + '" r="' + (p.sunR - 2) + '" fill="' + p.sky[0] + '"/>');
    }
    if (kind === 'noon' || kind === 'dawn') {
      o.push('<g class="drift" opacity=".55" fill="#fff"><ellipse cx="900" cy="80" rx="90" ry="14"/><ellipse cx="960" cy="70" rx="50" ry="14"/><ellipse cx="1250" cy="120" rx="80" ry="10"/><ellipse cx="560" cy="50" rx="60" ry="9"/></g>');
    }
    o.push('<path d="M0,300 L80,252 L160,282 L260,214 L360,270 L470,232 L560,286 L680,242 L780,276 L900,226 L1010,272 L1100,240 L1200,262 V420 H0Z" fill="' + p.mtn + '" opacity=".75"/>');
    // ruined city on the left
    var cx = 30, city = [];
    [[46, 120, 1], [30, 80, 0], [38, 150, 1], [26, 60, 0], [44, 100, 1], [22, 70, 0]].forEach(function (b) {
      var top = 330 - b[1];
      city.push('<path d="M' + cx + ',330 V' + (top + 10) + ' l' + (b[0] * .3) + ',-10 l' + (b[0] * .25) + ',' + (b[2] ? 14 : 4) + ' l' + (b[0] * .45) + ',-6 V330Z" fill="' + p.city + '"/>');
      for (var y = top + 22; y < 320; y += 14) for (var x = cx + 6; x < cx + b[0] - 6; x += 9) if (r() > .55) city.push('<rect x="' + x + '" y="' + y + '" width="3" height="5" fill="' + (p.win[1] === 'f' && r() > .7 ? p.win : p.sky[0]) + '" opacity=".6"/>');
      cx += b[0] + 10;
    });
    o.push('<g opacity=".9">' + city.join('') + '</g>');
    o.push('<g transform="translate(' + fx + ',320) scale(' + fs + ')">' + fortress(p) + '</g>');
    o.push('<path d="M0,332 C150,302 300,322 450,307 C620,290 760,332 940,320 C1060,312 1140,302 1200,307 V420 H0Z" fill="' + p.d[0] + '"/>');
    o.push('<path d="M0,362 C200,332 380,372 560,352 C760,332 900,374 1200,347 V420 H0Z" fill="' + p.d[1] + '"/>');
    o.push('<path d="M0,397 C240,372 420,407 700,387 C900,374 1050,400 1200,390 V420 H0Z" fill="' + p.d[2] + '"/>');
    if (p.fire) {
      o.push('<ellipse cx="' + fx + '" cy="330" rx="420" ry="120" fill="#ff6a2a" opacity=".22"/>');
      for (i = 0; i < 9; i++) {
        var x0 = fx - 260 + i * 65 + r() * 20, h = 30 + r() * 40;
        o.push('<path class="flame" style="animation-delay:' + (r()).toFixed(2) + 's" d="M' + x0 + ',345 q-12,-' + h * .5 + ' 0,-' + h + ' q12,' + h * .5 + ' 0,' + h + 'Z" fill="' + (i % 2 ? '#ffb347' : '#ff6a2a') + '" opacity=".85"/>');
      }
      o.push('<g fill="#2a1a1a" opacity=".35"><ellipse cx="' + (fx - 120) + '" cy="150" rx="120" ry="30"/><ellipse cx="' + (fx + 60) + '" cy="110" rx="160" ry="34"/></g>');
    }
    if (p.rain) {
      o.push('<g class="rain-lines">');
      for (i = 0; i < 90; i++) {
        var lx = r() * 1300, ly = r() * 420 - 60;
        o.push('<line style="animation-delay:-' + (r() * .8).toFixed(2) + 's;animation-duration:' + (.6 + r() * .4).toFixed(2) + 's" x1="' + lx.toFixed(0) + '" y1="' + ly.toFixed(0) + '" x2="' + (lx - 9).toFixed(0) + '" y2="' + (ly + 34).toFixed(0) + '"/>');
      }
      o.push('</g>');
    }
    o.push('</svg>');
    return '<div class="scene">' + o.join('') + '</div>';
  }

  function roseSVG() {
    var o = ['<svg class="rose-svg" viewBox="-200 -200 400 400" role="img" aria-label="Desert rose"><defs>',
      '<linearGradient id="pet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8e2bd"/><stop offset=".6" stop-color="#e2b07c"/><stop offset="1" stop-color="#b9784a"/></linearGradient>',
      '<linearGradient id="pet2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0d6"/><stop offset="1" stop-color="#d79a63"/></linearGradient>',
      '<radialGradient id="rg"><stop offset="0" stop-color="#29a9a3" stop-opacity=".35"/><stop offset="1" stop-color="#29a9a3" stop-opacity="0"/></radialGradient></defs>',
      '<circle r="190" fill="url(#rg)"/>'];
    var rings = [[11, 150, 54, 0, 'url(#pet)'], [9, 118, 46, 17, 'url(#pet)'], [7, 84, 38, 9, 'url(#pet2)'], [5, 52, 28, 30, 'url(#pet2)']];
    rings.forEach(function (rg) {
      for (var i = 0; i < rg[0]; i++) {
        var a = i * 360 / rg[0] + rg[3], L = rg[1], w = rg[2];
        o.push('<g transform="rotate(' + a.toFixed(1) + ') skewX(-14)"><path d="M0,0 Q' + w + ',-' + (L * .55) + ' 0,-' + L + ' Q-' + w + ',-' + (L * .55) + ' 0,0Z" fill="' + rg[4] + '" stroke="#9b6a3c" stroke-width="1.2" stroke-opacity=".7"/><path d="M0,-6 L0,-' + (L - 8) + '" stroke="#fff6e6" stroke-width="1" opacity=".5"/></g>');
      }
    });
    o.push('<circle r="16" fill="#e9c27a" stroke="#9b6a3c"/></svg>');
    return o.join('');
  }

  function arch(src, cls) {
    return '<div class="arch ' + (cls || '') + '"><div class="arch-in"><div class="bgblur" style="background-image:url(' + src + ')"></div><img class="fg" src="' + src + '" alt="" loading="lazy"></div></div>';
  }
  function imgSrc(id) { return 'img/' + id + '.webp'; }

  /* ---------- state helpers ---------- */
  function readLang() { var r = store.get('readLang', null); return LANGS.indexOf(r) >= 0 ? r : lang; }
  function readSet() { return store.get('read', []); }
  function quizBest() { return store.get('quiz', {}); }
  function chLabel(i) { return i === 11 ? t('interview') : t('chapter') + ' ' + (i + 1); }
  function minutes(i, l) { return Math.max(1, Math.round(NOVEL[l][i].words / 200)); }

  /* ---------- shell ---------- */
  function renderShell(route) {
    document.documentElement.lang = lang;
    document.title = 'Çöl Gülü · ' + t('title');
    var items = [['#/', t('home'), ''], ['#/c/1', t('read'), 'c'], ['#/characters', t('characters'), 'characters'], ['#/rose', t('rose'), 'rose'],
      ['#/necrology', t('necro'), 'necrology'], ['#/test', t('test'), 'test'], ['#/gallery', t('gallery'), 'gallery']];
    var pos = store.get('pos', null);
    if (pos) items[1][0] = '#/c/' + (pos.n + 1);
    $('#nav').innerHTML = items.map(function (it) {
      return '<a href="' + it[0] + '" class="' + (route === it[2] ? 'on' : '') + '">' + esc(it[1]) + '</a>';
    }).join('');
    $('#langs').innerHTML = LANGS.map(function (l) {
      return '<button type="button" data-l="' + l + '" class="' + (l === lang ? 'on' : '') + '" aria-pressed="' + (l === lang) + '">' + l.toUpperCase() + '</button>';
    }).join('');
    var dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    $('#theme').textContent = dark ? '☀' : '☾';
    $('#theme').setAttribute('aria-label', t('theme'));
    $('#foot').innerHTML = '<p>' + esc(t('footer')) + ' <a href="' + LITMIR + '" target="_blank" rel="noopener">Litmir</a> · <a href="' + FADERPEDIA + '" target="_blank" rel="noopener">' + esc(t('footer2')) + '</a></p><p>© Roberto Fader</p>';
  }

  /* ---------- pages ---------- */
  function home() {
    var pos = store.get('pos', null), read = readSet(), qb = quizBest(), rl = readLang();
    var h = [];
    h.push('<section class="hero">' + scene('dusk', { fx: 1120, fs: .85 }) + '<div class="wrap hero-in"><div>');
    h.push('<div class="kicker">' + esc(t('by')) + ' · ' + esc(t('langsNote')) + '</div>');
    h.push('<h1>Çöl <em>Gülü</em></h1><p class="alt">' + esc(lang === 'tr' ? t('alt') : t('title') + ' — ' + t('alt')) + '</p>');
    h.push('<p class="blurb">' + esc(t('blurb')) + '</p>');
    h.push('<div class="meta-row"><span class="chip">' + esc(t('genre')) + '</span><span class="chip">12 ' + esc(t('chapters').toLowerCase()) + '</span><span class="chip">16+</span></div>');
    h.push('<div class="btns">' + (pos ? '<a class="btn" href="#/c/' + (pos.n + 1) + '">' + esc(t('resume')) + ' · ' + esc(chLabel(pos.n)) + '</a><a class="btn ghost" href="#/c/1">' + esc(t('start')) + '</a>' : '<a class="btn" href="#/c/1">' + esc(t('start')) + '</a>') + '<a class="btn ghost" href="#/test">' + esc(t('test')) + '</a></div>');
    h.push('</div>' + arch('img/cover.webp') + '</div></section>');

    h.push('<section class="sec"><div class="wrap">');
    if (read.length) {
      h.push('<div class="resume"><strong>' + esc(t('progress')) + '</strong><div class="meter"><i style="width:' + Math.round(read.length / 12 * 100) + '%"></i></div><span class="small">' + read.length + ' ' + esc(t('of')) + ' 12</span></div>');
    }
    h.push('<div class="sec-h"><span class="rose-mark"></span><h2>' + esc(t('chapters')) + '</h2><span class="rule"></span></div><div class="chgrid">');
    NOVEL[rl].forEach(function (c, i) {
      var meta = CH[i], q = qb[i];
      h.push('<a class="ch" href="#/c/' + (i + 1) + '">' + scene(meta.sky, { fx: 760, fs: .8 }) + (meta.img ? '<span class="thumb"><img src="' + imgSrc(meta.img) + '" alt="" loading="lazy"></span>' : '') +
        '<div class="ch-b"><div class="ch-n">' + esc(chLabel(i)) + '</div><h3>' + esc(NOVEL[lang][i].title) + '</h3><div class="ch-m"><span>' + minutes(i, rl) + ' ' + esc(t('min')) + '</span>' +
        (read.indexOf(i) >= 0 ? '<span class="badge ok">✓ ' + esc(t('readDone')) + '</span>' : '') + (q != null ? '<span class="badge">' + esc(t('quizScore')) + ' ' + q + '/3</span>' : '') + '</div></div></a>');
    });
    h.push('</div></div></section>');

    h.push('<section class="band">' + scene('night', { fx: 1030, fs: .85 }) + '<blockquote>“' + esc(t('quote')) + '”<cite>— ' + esc(t('quoteBy')) + '</cite></blockquote></section>');

    h.push('<section class="sec"><div class="wrap"><div class="sec-h"><span class="rose-mark"></span><h2>' + esc(t('explore')) + '</h2><span class="rule"></span></div><div class="explore">');
    [['characters', '👥', t('characters'), t('exChars')], ['rose', '🌹', t('rose'), t('exRose')], ['necrology', '⛓', t('necro'), t('exNecro')],
      ['test', '✦', t('test'), t('exTest')], ['gallery', '🖼', t('gallery'), t('exGal')]].forEach(function (e) {
      h.push('<a class="ex" href="#/' + e[0] + '"><span class="ico" aria-hidden="true">' + e[1] + '</span><h3>' + esc(e[2]) + '</h3><p>' + esc(e[3]) + '</p></a>');
    });
    h.push('</div></div></section>');
    return h.join('');
  }

  var TABS = [['', 'tabRead'], ['quiz', 'tabQuiz'], ['psy', 'tabPsy'], ['phi', 'tabPhi'], ['cur', 'tabCur']];

  function chapter(i, tab) {
    var rl = readLang(), c = NOVEL[rl][i], meta = CH[i], x = EX[lang].chapters[i], h = [];
    h.push('<section class="ch-head">' + scene(meta.sky, { fx: 640, fs: 1 }) + '<div class="wrap ch-head-in"><div><div class="kicker">' + esc(chLabel(i)) + ' · ' + minutes(i, rl) + ' ' + esc(t('min')) + '</div><h1>' + esc(NOVEL[lang][i].title) + '</h1>' +
      (rl !== lang ? '<p class="alt" style="font:italic 500 1.3rem var(--display);margin:0;color:#f6dfb6">' + esc(c.title) + '</p>' : '') + '</div>' + (meta.img ? arch(imgSrc(meta.img)) : '') + '</div></section>');
    h.push('<div class="readbar"><div class="wrap readbar-in"><nav class="tabs" aria-label="' + esc(t('topics')) + '">' + TABS.map(function (tb) {
      return '<a href="#/c/' + (i + 1) + (tb[0] ? '/' + tb[0] : '') + '" class="' + (tab === tb[0] ? 'on' : '') + '">' + esc(t(tb[1])) + '</a>';
    }).join('') + '</nav><span class="sp"></span>');
    if (!tab) {
      h.push('<span class="small">' + esc(t('textLang')) + '</span><div class="seg" id="rlang">' + LANGS.map(function (l) {
        return '<button type="button" data-rl="' + l + '" class="' + (l === rl ? 'on' : '') + '">' + l.toUpperCase() + '</button>';
      }).join('') + '</div><div class="seg" id="fsz"><button type="button" data-f="-1" aria-label="A-">A−</button><button type="button" data-f="1" aria-label="A+">A+</button></div>');
    }
    h.push('</div></div>');

    if (!tab) {
      if (rl === 'tr') h.push('<p class="glossnote" style="padding-top:24px">✦ ' + esc(t('glossNote')) + '</p>');
      var body = c.html.replace(/<figure class="art"><img src="([^"]+)"[^>]*><\/figure>/g, function (m, src) { return '<figure class="art">' + arch(src) + '</figure>'; });
      h.push('<article class="prose" id="prose" style="--reader:' + store.get('font', 1.14) + 'rem">' + body + (i === 10 ? '' : '') + '</article>');
    } else if (tab === 'quiz') {
      h.push('<div class="panel"><h2>' + esc(t('tabQuiz')) + '</h2><p class="small">' + esc(t('quizIntro')) + '</p><div class="quiz" id="quiz">' + quizHTML(x.q) + '</div></div>');
    } else if (tab === 'psy') {
      h.push('<div class="panel"><div class="kicker" style="color:var(--gold)">' + esc(t('tabPsy')) + '</div><h2>' + esc(t('psyTitle')) + '</h2><div class="essay">' + x.psy + '</div></div>');
    } else if (tab === 'phi') {
      h.push('<div class="panel"><div class="kicker" style="color:var(--gold)">' + esc(t('tabPhi')) + '</div><h2>' + esc(t('phiTitle')) + '</h2><div class="essay">' + x.phi + '</div></div>');
    } else if (tab === 'cur') {
      h.push('<div class="panel"><div class="kicker" style="color:var(--gold)">' + esc(t('tabCur')) + '</div><h2>' + esc(t('curTitle')) + '</h2><ul class="cur">' + x.cur.map(function (s) { return '<li><span>' + s + '</span></li>'; }).join('') + '</ul></div>');
    }
    h.push('<nav class="pager">' + (i > 0 ? '<a href="#/c/' + i + '"><small>← ' + esc(t('prev')) + '</small><span>' + esc(NOVEL[lang][i - 1].title) + '</span></a>' : '<span></span>') +
      (i < 11 ? '<a class="next" href="#/c/' + (i + 2) + '"><small>' + esc(t('next')) + ' →</small><span>' + esc(NOVEL[lang][i + 1].title) + '</span></a>' : '<span></span>') + '</nav>');
    return h.join('');
  }

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), k = a[i]; a[i] = a[j]; a[j] = k; } return a; }

  function quizHTML(qs) {
    return qs.map(function (q, qi) {
      var order = shuffle(q.o.map(function (_, k) { return k; }));
      return '<div class="qcard" data-q="' + qi + '"><h3><span>' + (qi + 1) + '.</span>' + esc(q.q) + '</h3><div class="opts">' + order.map(function (k) {
        return '<button type="button" class="opt" data-k="' + k + '">' + esc(q.o[k]) + '</button>';
      }).join('') + '</div></div>';
    }).join('') + '<div id="qscore"></div>';
  }

  function bindQuiz(i) {
    var box = $('#quiz'); if (!box) return;
    var qs = EX[lang].chapters[i].q, got = {};
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.opt'); if (!b) return;
      var card = b.closest('.qcard'), qi = +card.dataset.q, q = qs[qi];
      if (qi in got) return;
      var k = +b.dataset.k; got[qi] = k === q.a;
      $$('.opt', card).forEach(function (o) { o.disabled = true; if (+o.dataset.k === q.a) o.classList.add('right'); });
      if (k !== q.a) b.classList.add('wrong');
      card.insertAdjacentHTML('beforeend', '<div class="explain">' + (k === q.a ? '✓ ' : '✗ ') + esc(q.e) + '</div>');
      if (Object.keys(got).length === qs.length) {
        var s = 0; for (var g in got) if (got[g]) s++;
        var best = quizBest(); if (best[i] == null || s > best[i]) { best[i] = s; store.set('quiz', best); }
        $('#qscore').innerHTML = '<div class="score"><strong>' + s + '/' + qs.length + '</strong><span>' + esc(t('yourScore')) + '</span><span class="sp" style="flex:1"></span><button class="btn line" type="button" id="qretry">' + esc(t('retry')) + '</button></div>';
        $('#qretry').onclick = function () { route(); };
      }
    });
  }

  function characters() {
    var cs = EX[lang].characters, h = ['<section class="sec"><div class="wrap"><div class="sec-h"><span class="rose-mark"></span><h2>' + esc(t('characters')) + '</h2><span class="rule"></span></div><div class="cgrid">'];
    cs.forEach(function (c, k) {
      if (k === 0) h.push('<div class="card feat" id="ch-rosa">' + arch('img/rosa-6.webp') + '<div><div class="role">' + esc(c.role) + '</div><h3>' + esc(c.name) + '</h3><p style="font-size:1.05rem">' + esc(c.text) + '</p></div></div>');
      else h.push('<div class="card" id="ch-' + c.id + '"><div class="mono" style="background:' + COLORS[c.id] + '">' + esc(c.name[0]) + '</div><div class="role">' + esc(c.role) + '</div><h3>' + esc(c.name) + '</h3><p>' + esc(c.text) + '</p></div>');
    });
    h.push('</div></div></section>');
    return h.join('');
  }

  function rosePage() {
    var r = EX[lang].rose, h = ['<section class="sec"><div class="wrap"><div class="rose-hero"><div><div class="kicker" style="color:var(--gold)">' + esc(t('roseFrom')) + '</div><h1 style="font-size:clamp(2.6rem,6vw,4.2rem)">' + esc(r.title) + '</h1><p class="lead">' + esc(r.lead) + '</p>'];
    h.push('<div class="facts">' + r.facts.map(function (f) { return '<div class="fact"><small>' + esc(f[0]) + '</small><span>' + esc(f[1]) + '</span></div>'; }).join('') + '</div></div>' + roseSVG() + '</div>');
    h.push('<div class="longtext" style="margin-top:20px">' + r.paras.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>');
    h.push('<p style="margin-top:28px"><a class="btn" href="#/c/7">' + esc(chLabel(6)) + ': ' + esc(NOVEL[lang][6].title) + ' →</a></p></div></section>');
    return h.join('');
  }

  function necroPage() {
    var n = EX[lang].necro, h = ['<section class="ch-head">' + scene('fire', { fx: 600, fs: 1 }) + '<div class="wrap ch-head-in"><div><div class="kicker">⛓</div><h1>' + esc(n.title) + '</h1></div></div></section>'];
    h.push('<section class="sec"><div class="wrap longtext">');
    h.push('<svg viewBox="0 0 120 140" width="110" style="float:right;margin:0 0 16px 20px" aria-hidden="true"><path d="M60 4 L114 22 V74 C114 106 90 126 60 136 C30 126 6 106 6 74 V22Z" fill="#141014" stroke="#e0b25e" stroke-width="3"/><path d="M38 108 V62 Q38 40 60 36 Q82 40 82 62 V108Z" fill="none" stroke="#e0b25e" stroke-width="5"/><path d="M60 38 V108 M38 76 H82" stroke="#e0b25e" stroke-width="2.5"/><circle cx="55" cy="80" r="2.5" fill="#e0b25e"/><circle cx="65" cy="80" r="2.5" fill="#e0b25e"/></svg>');
    h.push(n.paras.map(function (p) { return '<p>' + p + '</p>'; }).join(''));
    h.push('<p style="clear:both;margin-top:28px"><a class="btn" href="#/c/2">' + esc(chLabel(1)) + ': ' + esc(NOVEL[lang][1].title) + ' →</a></p></div></section>');
    return h.join('');
  }

  function testPage() {
    var qs = EX[lang].test, h = ['<section class="sec"><div class="wrap test"><div class="sec-h"><span class="rose-mark"></span><h2>' + esc(t('test')) + '</h2><span class="rule"></span></div><p class="lead">' + esc(t('testIntro')) + '</p><form id="test">'];
    qs.forEach(function (q, qi) {
      h.push('<div class="qcard"><h3><span>' + (qi + 1) + '.</span>' + esc(q.q) + '</h3><div class="opts">' + q.o.map(function (o, k) {
        return '<button type="button" class="opt" data-q="' + qi + '" data-c="' + o[1] + '">' + esc(o[0]) + '</button>';
      }).join('') + '</div></div>');
    });
    h.push('<button class="btn" type="submit">' + esc(t('seeResult')) + '</button> <span class="small" id="tmsg"></span></form><div id="tres"></div></div></section>');
    return h.join('');
  }

  function bindTest() {
    var f = $('#test'); if (!f) return;
    var picks = {};
    f.addEventListener('click', function (e) {
      var b = e.target.closest('.opt'); if (!b) return;
      picks[b.dataset.q] = b.dataset.c;
      $$('.opt[data-q="' + b.dataset.q + '"]', f).forEach(function (o) { o.classList.toggle('right', o === b); });
    });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = EX[lang].test.length;
      if (Object.keys(picks).length < n) { $('#tmsg').textContent = t('answerAll'); return; }
      var count = {}; for (var k in picks) count[picks[k]] = (count[picks[k]] || 0) + 1;
      var ids = Object.keys(count).sort(function (a, b) { return count[b] - count[a]; });
      var c = EX[lang].characters.filter(function (x) { return x.id === ids[0]; })[0];
      $('#tres').innerHTML = '<div class="result"><div class="small">' + esc(t('youAre')) + '</div>' + (c.id === 'rosa' ? '<div style="width:150px;margin:12px auto 16px">' + arch('img/rosa-9.webp') + '</div>' : '<div class="mono" style="background:' + COLORS[c.id] + '">' + esc(c.name[0]) + '</div>') +
        '<h2 style="font-size:2.6rem;margin:0">' + esc(c.name) + '</h2><div class="role" style="color:var(--gold);letter-spacing:.14em;text-transform:uppercase;font-size:.8rem">' + esc(c.role) + '</div><p style="max-width:48ch;margin:12px auto 0">' + esc(c.text) + '</p><div class="bars">' +
        ids.map(function (id) { var cc = EX[lang].characters.filter(function (x) { return x.id === id; })[0]; return '<div class="bar"><span>' + esc(cc.name) + '</span><i style="width:' + (count[id] / n * 100) + '%"></i><span>' + count[id] + '</span></div>'; }).join('') +
        '</div><p style="margin-top:18px"><a class="btn line" href="#/characters">' + esc(t('characters')) + '</a></p></div>';
      $('#tres').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function gallery() {
    var caps = t('galCap'), h = ['<section class="sec"><div class="wrap"><div class="sec-h"><span class="rose-mark"></span><h2>' + esc(t('gallery')) + '</h2><span class="rule"></span></div><div class="gal">'];
    GAL.forEach(function (id, k) {
      var src = imgSrc(id === 'cover' ? 'cover' : id);
      h.push('<button type="button" data-src="' + src + '" data-cap="' + esc(caps[k]) + '"><img src="' + (id === 'cover' ? 'img/cover-480.webp' : src) + '" alt="' + esc(caps[k]) + '" loading="lazy"><span>' + esc(caps[k]) + '</span></button>');
    });
    h.push('</div></div></section>');
    return h.join('');
  }

  /* ---------- reader behaviour ---------- */
  var scrollHandler = null;
  function bindReader(i) {
    var prose = $('#prose');
    $$('#rlang button').forEach(function (b) { b.onclick = function () { store.set('readLang', b.dataset.rl); route(); }; });
    $$('#fsz button').forEach(function (b) {
      b.onclick = function () {
        var f = Math.min(1.5, Math.max(.95, store.get('font', 1.14) + (+b.dataset.f) * .06));
        store.set('font', +f.toFixed(2)); if (prose) prose.style.setProperty('--reader', f + 'rem');
      };
    });
    if (!prose) return;
    var pos = store.get('pos', null);
    if (pos && pos.n === i && pos.r > .03 && pos.r < .97) {
      requestAnimationFrame(function () { window.scrollTo(0, prose.offsetTop + pos.r * prose.offsetHeight - 120); });
    }
    var tick = 0;
    scrollHandler = function () {
      var top = prose.offsetTop, hgt = prose.offsetHeight - innerHeight + 120;
      var r = Math.min(1, Math.max(0, (scrollY - top + 120) / Math.max(1, hgt)));
      $('#progress').style.width = (r * 100) + '%';
      var now = Date.now(); if (now - tick < 400) return; tick = now;
      store.set('pos', { n: i, r: +r.toFixed(3) });
      if (r > .92) { var rd = readSet(); if (rd.indexOf(i) < 0) { rd.push(i); store.set('read', rd); } }
    };
    addEventListener('scroll', scrollHandler, { passive: true });
    scrollHandler();
  }

  var tip = $('#tip');
  function showTip(el) {
    var es = el.dataset.es, en = el.dataset.en;
    tip.innerHTML = lang === 'es' ? esc(es) : lang === 'en' ? esc(en) : '<b>ES</b>' + esc(es) + '<br><b>EN</b>' + esc(en);
    tip.hidden = false;
    var r = el.getBoundingClientRect(), tw = tip.offsetWidth;
    tip.style.left = Math.max(8, Math.min(innerWidth - tw - 8, r.left + r.width / 2 - tw / 2)) + scrollX + 'px';
    tip.style.top = r.top + scrollY - tip.offsetHeight - 8 + 'px';
    $$('.g.on').forEach(function (g) { g.classList.remove('on'); }); el.classList.add('on');
  }
  function hideTip() { tip.hidden = true; $$('.g.on').forEach(function (g) { g.classList.remove('on'); }); }
  document.addEventListener('mouseover', function (e) { var g = e.target.closest && e.target.closest('.g'); if (g) showTip(g); });
  document.addEventListener('mouseout', function (e) { if (e.target.closest && e.target.closest('.g')) hideTip(); });
  document.addEventListener('focusin', function (e) { if (e.target.classList && e.target.classList.contains('g')) showTip(e.target); });
  document.addEventListener('click', function (e) {
    var g = e.target.closest('.g');
    if (g) { showTip(g); return; }
    hideTip();
    var gb = e.target.closest('.gal button');
    if (gb) { var lb = $('#lightbox'); $('img', lb).src = gb.dataset.src; $('img', lb).alt = gb.dataset.cap; $('p', lb).textContent = gb.dataset.cap; lb.hidden = false; }
  });
  $('#lightbox').addEventListener('click', function (e) { if (e.target.tagName !== 'IMG') this.hidden = true; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { $('#lightbox').hidden = true; hideTip(); } });

  /* ---------- router ---------- */
  function route() {
    if (scrollHandler) { removeEventListener('scroll', scrollHandler); scrollHandler = null; }
    $('#progress').style.width = 0; hideTip();
    var parts = location.hash.replace(/^#\/?/, '').split('/'), app = $('#app'), key = parts[0] || '';
    var html, after;
    if (key === 'c') {
      var i = Math.min(12, Math.max(1, parseInt(parts[1], 10) || 1)) - 1, tab = parts[2] || '';
      if (['', 'quiz', 'psy', 'phi', 'cur'].indexOf(tab) < 0) tab = '';
      html = chapter(i, tab); after = function () { bindReader(i); bindQuiz(i); };
      document.title = NOVEL[lang][i].title + ' · Çöl Gülü';
    } else if (key === 'characters') html = characters();
    else if (key === 'rose') html = rosePage();
    else if (key === 'necrology') html = necroPage();
    else if (key === 'test') { html = testPage(); after = bindTest; }
    else if (key === 'gallery') html = gallery();
    else { key = ''; html = home(); }
    renderShell(key);
    if (key === 'c') document.title = NOVEL[lang][Math.min(12, Math.max(1, parseInt(parts[1], 10) || 1)) - 1].title + ' · Çöl Gülü';
    app.innerHTML = html;
    if (after) after();
    $('#nav').classList.remove('open'); $('#menu').setAttribute('aria-expanded', 'false');
  }

  addEventListener('hashchange', function () { route(); window.scrollTo(0, 0); });
  $('#langs').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    lang = b.dataset.l; store.set('lang', lang);
    var y = scrollY; route(); if (!/^#\/c\//.test(location.hash)) window.scrollTo(0, y);
  });
  $('#theme').addEventListener('click', function () {
    var cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var nx = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nx;
    try { localStorage.setItem('lr-theme', nx); } catch (e) {}
    renderShell((location.hash.replace(/^#\/?/, '').split('/')[0]) || '');
  });
  $('#menu').addEventListener('click', function () {
    var o = $('#nav').classList.toggle('open'); this.setAttribute('aria-expanded', String(o));
  });

  route();
})();
