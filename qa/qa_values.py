#!/usr/bin/env python3
"""Deterministic QA: every number and label on a card must exist in the report figure.

Usage:
    qa_values.py CHARTS.json SPANS.json [--figs 1.1 2.2 ...]

CHARTS.json is the page's data file (window.WETO shape: {"charts":[...]}). SPANS.json
maps a figure id to the text spans on its page: {"1.3": {"spans": [{"t": "402"},...]}}.

Two checks, both against the figure's own text layer:
  - categories: every word of a card label must appear as printed text in the figure;
  - values: every plotted number must appear as a printed number in the figure.
Cards whose numbers come from geometry rather than printed labels (method mentions
geometry, segment or share) are exempt from the value check, but not the label check.

Exit 1 when any card fails.
"""
import json
import re
import sys

NUM = re.compile(r"^-?\d+(?:\.\d+)?$")


def num_set(spans):
    vals = set()
    for s in spans:
        t = str(s.get("t", "")).strip().replace("%", "").replace(",", "")
        if NUM.match(t):
            try:
                vals.add(round(float(t), 2))
            except ValueError:
                pass
    return vals


def text_set(spans):
    return " ".join(str(s.get("t", "")) for s in spans).lower()


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    charts = json.load(open(sys.argv[1]))["charts"]
    spans = json.load(open(sys.argv[2]))
    only = None
    if "--figs" in sys.argv:
        only = set(sys.argv[sys.argv.index("--figs") + 1:])

    fails = checked = 0
    for c in charts:
        fig = str(c.get("fig", "")).split(" ")[0]
        if only and fig not in only:
            continue
        src = spans.get(fig) or spans.get(fig.rstrip("bc"))
        if not src:
            print("SKIP  no spans for figure", fig)
            continue
        checked += 1
        sp = src["spans"]
        nums, txt = num_set(sp), text_set(sp)
        problems = []

        for cat in (c.get("categories") or []):
            label = str(cat).strip()
            if not label or NUM.match(label):
                continue
            # a card may join words the report prints apart (Central America + Caribbean)
            tokens = [t for t in re.split(r"[^A-Za-z0-9]+", label.lower()) if len(t) > 2]
            if [t for t in tokens if t not in txt]:
                problems.append("label not printed: %r" % label)

        derived = any(k in str(c.get("method", "")).lower()
                      for k in ("geometry", "segment", "share"))
        if not derived:
            vals = []
            for s in c.get("series") or []:
                vals += [v for v in (s.get("values") or []) if v is not None]
            for p in c.get("points") or []:
                vals += [p.get("x"), p.get("y")]
            missing = [v for v in vals
                       if round(float(v), 2) not in nums
                       and round(float(v), 1) not in nums
                       and round(float(v)) not in nums]
            if missing:
                problems.append("%d values not printed, e.g. %s" % (len(missing), missing[:5]))

        if problems:
            fails += 1
            print("FAIL  %-10s %s" % (fig, "; ".join(problems)[:220]))
        else:
            print("PASS  %-10s" % fig)

    print("\n%d of %d cards passed" % (checked - fails, checked))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
