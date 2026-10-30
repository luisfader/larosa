# Çöl Gülü · La rosa del desierto · The Desert Rose

Web de la novela de Roberto Fader en turco, español e inglés: lectura completa con ilustraciones, glosas en el texto turco y, para cada capítulo, preguntas, psicología, filosofía y curiosidades. Además: personajes, la rosa del desierto real, Necrología, un test de personaje y una galería.

- `content/{tr,es,en}/NN.md` — texto de los capítulos (el turco usa la sintaxis de glosas `**palabra**{es|en}`).
- `data/extras-{tr,es,en}.js` — preguntas, ensayos, curiosidades, personajes, test.
- `python3 tools/build.py` — regenera `data/novel.js` a partir de `content/`.

Sitio estático, sin dependencias: se publica con GitHub Pages desde la rama principal.
