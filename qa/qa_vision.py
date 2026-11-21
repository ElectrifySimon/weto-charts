#!/usr/bin/env python3
"""Render QA gate: check screenshots for the defects a data check cannot see.

Usage:
    qa_vision.py shot1.png [shot2.png ...] [--model minimax-m3]

A geometry gate proves the numbers; this proves the chart is readable: legend not over
the plot, labels not clipped, no empty canvas. Exits 1 if any image fails, so it can sit
at the end of a build script.
"""
import subprocess
import sys
from pathlib import Path

SEE = Path.home() / ".hermes/skills/mlops/vision/scripts/see.py"
Q = ("Look at this chart card. Answer strictly YES or NO, then one short sentence. "
     "YES if any legend text, axis label or annotation overlaps bars, lines, the title "
     "or another label, or if the plot area is blank. NO if the chart is clean.")


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    model = "minimax-m3"
    if "--model" in sys.argv:
        model = sys.argv[sys.argv.index("--model") + 1]
        args = [a for a in args if a != model]
    if not args:
        print("usage: qa_vision.py shot.png [more.png] [--model minimax-m3]")
        return 2

    failed = 0
    for img in args:
        if not Path(img).exists():
            print("MISSING", img)
            failed += 1
            continue
        try:
            out = subprocess.run([sys.executable, str(SEE), img, Q, "--model", model],
                                 capture_output=True, text=True, timeout=180).stdout.strip()
        except subprocess.TimeoutExpired:
            print("TIMEOUT", img)
            failed += 1
            continue
        verdict = out.split()[0].rstrip(".,").upper() if out else "EMPTY"
        ok = verdict == "NO"
        if not ok:
            failed += 1
        print("%s %-9s %s | %s" % ("PASS" if ok else "FAIL", verdict, Path(img).name, out[:160]))

    print("\n%d of %d passed" % (len(args) - failed, len(args)))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
