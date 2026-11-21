# WETO 2026, ten charts rebuilt

A test page that takes the first ten figures of IRENA's *World Energy Transition Outlook 2026: 1.5°C Pathway* (October 2026) and re-draws them in Apache ECharts, using the layout and design tokens of the DashDist shell.

Live: https://electrifysimon.github.io/weto-charts/

## What is here

- `index.html` - the page. Hero, four headline numbers, ten chart cards, method notes.
- `data.js` - every series as plain numbers, one object per figure, each with the method used.
- `vendor/echarts.min.js` - Apache ECharts 6.1.0 (Apache-2.0), copied from DashDist.
- `vendor/fonts/` - Figtree webfonts (SIL OFL).

## Where the numbers come from

The report's figures are vector drawings. Both the printed labels and the drawing geometry live in the PDF, so the data was read from the PDF layer rather than estimated by eye:

- printed data labels and column totals come from the text layer;
- bar heights and line markers come from the vector layer, mapped through the printed axis ticks;
- inside a stacked bar, segments are scaled so each column matches the printed total.

Each card on the page states which of these produced its numbers. Two limits are called out on the page: the technology split inside Figure 1.7 is not digitised, and the 1.5°C 2050 hydrogen bar in Figure 1.9 could not be recovered.

## Source

IRENA (2026), *World Energy Transition Outlook 2026: 1.5°C Pathway*, International Renewable Energy Agency, Abu Dhabi. ISBN 978-92-9260-755-5.

- Landing page: https://www.irena.org/Publications/2026/Oct/World-Energy-Transitions-Outlook-2026
- PDF: https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2026/Oct/IRENA_OUT_World_energy_transition_outlook_2026.pdf

Figures are IRENA's. This rebuild is unofficial and exists to test chart rendering and data extraction, not to restate the report's findings.

## Run locally

```
python3 -m http.server 8765
# http://localhost:8765/
```

## Coverage as of the last build

30 charts rebuilt across figures 1.1 to 3.18. Every card states the method used:
printed data labels, vector geometry with a stated axis residual, or a printed total.

Not rebuilt, with the reason:

- **2.1** regional treemap. No axis to fit; the labels sit inside nested tiles and
  overlap, so neither the axis gate nor the label pairing can be satisfied.
- **2.3** sectoral electrification. Three panels share one caption and the per-panel
  tick column fails the 2 percent axis-fit gate, so no panel has a trustworthy scale.

Infographics (2.5, 3.15, 3.19, 3.20, 3.21) are out of scope: they carry no data series.

The extraction process, its gates and its self-test live in the
`chart-data-digitisation` skill (`references/geometry-process.md`).
