# WETO 2026 charts, rebuilt as an interactive page

The figures of IRENA's *World Energy Transition Outlook 2026: 1.5°C Pathway* (October 2026), redrawn in Apache ECharts on the design tokens of the DashDist shell. Charts only, in report order and chapter by chapter.

Live: https://electrifysimon.github.io/weto-charts/

## What is here

- `index.html` - the page. Hero, four headline numbers, a chapter nav, and 44 chart cards sorted into report order.
- `data.js` - figures 1.1 to 1.10.
- `data2.js` - everything after that, including the ten tiles of figure 2.1 and the three panels of 2.3.
- `vendor/echarts.min.js` - Apache ECharts 6.1.0 (Apache-2.0), copied from DashDist.
- `vendor/fonts/` - Figtree webfonts (SIL OFL).

## Where the numbers come from

Every figure in the report is a vector drawing. Both the printed labels and the geometry live in the PDF, so nothing here is measured by eye:

- printed labels and column totals come from the text layer, and they win wherever they exist;
- bar heights and line markers come from the vector layer, mapped through the printed axis ticks;
- inside a stacked bar, segments are scaled so the column matches its printed total;
- multi-panel figures get one axis fit per panel, since each panel carries its own scale.

Each card states which of those produced its numbers. Where a read is uncertain, the card says so.

## Coverage

31 figures and 44 cards, across chapters 1 to 3.

Figure 2.1 is drawn the way the report draws it: nine regional tiles with 2025, 2035 and 2050 stacked by technology, Global last, plus a donut of cumulative investment. The nine regional investment figures sum to 41.7 USD trillion, which is the printed Global.

Known limits, printed on the cards that carry them:

- 2023 transport bars in figure 2.3 sit under 1 percent, so only four of eight regions register.
- Three 2050 readings in figure 2.3 land above the last printed tick. They are measured, not printed.
- The nine 2050 regional totals sum to 36,869 GW against a printed global 38,232 GW, because the global tile also covers regions not drawn.

Not rebuilt: figures 2.4, 2.5, 3.3, 3.15 and 3.19 to 3.21. They are infographics or diagrams with no data series to extract.

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

The extraction process, its gates and its self-test live in the `chart-data-digitisation` skill (`references/geometry-process.md`).
