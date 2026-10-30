#!/usr/bin/env python3
"""Build data/novel.js from content/{tr,es,en}/NN.md.

Markdown subset: paragraphs, **bold**, *italic*, scene breaks (* * * / ***),
images ![](path) and the Turkish gloss syntax **word**{es|en}.
Run: python3 tools/build.py
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LANGS = ["tr", "es", "en"]

TITLES = {
    "tr": ["Kum ve Kan", "Asilerin Kampı", "Turkuaz Duvarlar", "Yağmur Gecesi",
           "Kalede Bir Yabancı", "Mancınıklar", "Çöl Gülü", "Düello", "Darbe",
           "Aşkın Gücü", "Kendiliğinden Açan",
           "Rosa ile Röportaj: Yağmuru Bekleyen Kalp"],
    "es": ["Arena y sangre", "El campamento de los rebeldes", "Muros turquesa",
           "La noche de lluvia", "Una extraña en la fortaleza", "Las catapultas",
           "La rosa del desierto", "El duelo", "El golpe", "La fuerza del amor",
           "Lo que florece solo",
           "Entrevista con Rosa: el corazón que espera la lluvia"],
    "en": ["Sand and Blood", "The Rebels' Camp", "Turquoise Walls",
           "The Night of Rain", "A Stranger in the Fortress", "The Catapults",
           "The Desert Rose", "The Duel", "The Coup", "The Power of Love",
           "What Blooms on Its Own",
           "Interview with Rosa: The Heart That Waits for Rain"],
}

GLOSS = re.compile(r"\*\*([^*]+?)\*\*\{([^|}]*)\|([^}]*)\}")
BOLD = re.compile(r"\*\*(.+?)\*\*")
ITAL = re.compile(r"\*(.+?)\*")
IMG = re.compile(r"^!\[([^\]]*)\]\(([^)]+)\)$")


def img_path(p):
    m = re.search(r"rosa-(\d+)", p)
    return f"img/rosa-{m.group(1)}.webp" if m else p


def inline(text):
    text = html.escape(text, quote=False)

    def gloss(m):
        es, en = html.escape(m.group(2), True), html.escape(m.group(3), True)
        return f'<span class="g" tabindex="0" data-es="{es}" data-en="{en}">{m.group(1)}</span>'

    text = GLOSS.sub(gloss, text)
    text = BOLD.sub(r"<strong>\1</strong>", text)
    text = ITAL.sub(r"<em>\1</em>", text)
    return text


def render(md):
    out, words = [], 0
    for block in re.split(r"\n\s*\n", md.strip()):
        block = block.strip()
        if not block:
            continue
        if re.fullmatch(r"(\*\s*){3}", block):
            out.append('<hr class="scene">')
            continue
        m = IMG.match(block)
        if m:
            out.append(f'<figure class="art"><img src="{img_path(m.group(2))}" alt="Rosa" loading="lazy"></figure>')
            continue
        words += len(GLOSS.sub(r"\1", block).split())
        # Lines inside one block (e.g. the coup radio message) stay one paragraph.
        out.append("<p>" + "<br>".join(inline(l) for l in block.split("\n")) + "</p>")
    return "\n".join(out), words


def main():
    novel = {lang: [] for lang in LANGS}
    for lang in LANGS:
        for i in range(12):
            md = (ROOT / "content" / lang / f"{i + 1:02d}.md").read_text(encoding="utf-8")
            body, words = render(md)
            novel[lang].append({"title": TITLES[lang][i], "html": body, "words": words})
    out = ROOT / "data" / "novel.js"
    out.parent.mkdir(exist_ok=True)
    out.write_text("window.NOVEL=" + json.dumps(novel, ensure_ascii=False) + ";\n", encoding="utf-8")
    total = {l: sum(c["words"] for c in novel[l]) for l in LANGS}
    print(f"wrote {out.relative_to(ROOT)} words={total}")


if __name__ == "__main__":
    main()
