#!/usr/bin/env python3
"""Compare a rebuilt chart against the report figure it came from.

Usage:
    qa_compare.py REF.png CARD.png [REF2 CARD2 ...] [--outdir DIR]

Left panel is the report crop, right panel is the rebuilt card, stacked into one image
so a vision model sees both at once and can be asked a comparison question. A data gate
can be green while the chart is nonsense: wrong categories, a squashed axis, one series
where the report has three. This is the gate that catches that.

Prints MATCH or MISMATCH per pair and exits 1 if any pair mismatches.
"""
import subprocess
import sys
from pathlib import Path

from PIL import Image

SEE = Path.home() / ".hermes/skills/mlops/vision/scripts/see.py"
Q = ("Left panel is the original figure from the report. Right panel is a rebuilt chart "
     "of the same figure. Answer MATCH or MISMATCH on the first line, then up to three "
     "short bullets naming concrete differences: categories, series count, axis range, "
     "values or ordering. Judge structure first, exact pixel style last.")


def pair(ref: Path, card: Path, out: Path, h: int = 760) -> Path:
    a, b = Image.open(ref).convert("RGB"), Image.open(card).convert("RGB")
    a = a.resize((int(a.width * h / a.height), h))
    b = b.resize((int(b.width * h / b.height), h))
    canvas = Image.new("RGB", (a.width + b.width + 12, h), "white")
    canvas.paste(a, (0, 0))
    canvas.paste(b, (a.width + 12, 0))
    canvas.save(out)
    return out


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    outdir = Path("qa_pairs")
    if "--outdir" in sys.argv:
        outdir = Path(sys.argv[sys.argv.index("--outdir") + 1])
        args = [a for a in args if a != str(outdir)]
    if len(args) < 2 or len(args) % 2:
        print("usage: qa_compare.py REF.png CARD.png [REF2 CARD2 ...]")
        return 2
    outdir.mkdir(parents=True, exist_ok=True)

    failed = 0
    for ref, card in zip(args[::2], args[1::2]):
        name = Path(card).stem.replace("card_", "")
        p = pair(Path(ref), Path(card), outdir / (name + "_pair.png"))
        try:
            out = subprocess.run([sys.executable, str(SEE), str(p), Q, "--model", "minimax-m3"],
                                 capture_output=True, text=True, timeout=240).stdout.strip()
        except subprocess.TimeoutExpired:
            print("TIMEOUT", name)
            failed += 1
            continue
        head = out.split()[0].rstrip(".,").upper() if out else "EMPTY"
        ok = head.startswith("MATCH")
        if not ok:
            failed += 1
        print("%s %-9s %s\n   %s\n" % ("PASS" if ok else "FAIL", head, name, out[:400].replace("\n", " ")))

    print("%d of %d matched" % (len(args) // 2 - failed, len(args) // 2))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
