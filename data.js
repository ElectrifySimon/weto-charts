/* WETO 2026 chart data, digitised from the published PDF.
   Source: IRENA (2026), World Energy Transition Outlook 2026: 1.5C Pathway, October 2026.
   Method per chart is in the `method` field and shown on the page. */
window.WETO = {
  meta: {
    title: "WETO 2026, ten charts rebuilt",
    report: "IRENA (2026), World Energy Transition Outlook 2026: 1.5°C Pathway",
    published: "October 2026",
    pdf: "https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2026/Oct/IRENA_OUT_World_energy_transition_outlook_2026.pdf",
    landing: "https://www.irena.org/Publications/2026/Oct/World-Energy-Transitions-Outlook-2026",
    built: "2026-11-21"
  },
  charts: [
    {
      id: "f11", fig: "1.1", wide: true,
      title: "Total primary energy supply by source",
      sub: "EJ per year, PES and 1.5°C Scenario",
      type: "stacked_bar", unit: "EJ",
      categories: ["2023", "PES 2030", "PES 2035", "PES 2050", "1.5°C 2030", "1.5°C 2035", "1.5°C 2050"],
      series: [
        { name: "Renewables", values: [91, 130, 159, 262, 190, 285, 508], color: "#1075a6" },
        { name: "Nuclear", values: [30, 37, 43, 60, 39, 46, 58], color: "#cd7482" },
        { name: "Fossil fuels", values: [514, 513, 493, 431, 406, 304, 102], color: "#4d5456" }
      ],
      method: "Segment heights read from the PDF vector layer and scaled so each column matches the printed total (635, 680, 695, 753, 635, 635, 668 EJ)."
    },
    {
      id: "f12", fig: "1.2",
      title: "Structural efficiency of electrification",
      sub: "Relative energy use, conventional technology = 100",
      type: "grouped_bar", unit: "index",
      categories: ["Thermal power plant", "Transport", "Heating"],
      series: [
        { name: "Conventional", values: [100, 100, 100], color: "#6e675d" },
        { name: "Electric alternative", values: [35, 35, 33], color: "#1476a7" }
      ],
      method: "Printed data labels from the PDF text layer."
    },
    {
      id: "f13", fig: "1.3", wide: true,
      title: "Total final energy consumption by carrier",
      sub: "EJ per year (left axis) and electrification rate in % (right axis)",
      type: "stacked_bar_line", unit: "EJ",
      categories: ["2023", "PES 2030", "PES 2035", "PES 2050", "1.5°C 2030", "1.5°C 2035", "1.5°C 2050"],
      series: [
        { name: "District heating", values: [16.2, 16.9, 18.0, 19.1, 16.2, 17.9, 16.8], color: "#da4f37" },
        { name: "Hydrogen and derivatives", values: [0, 0, 0, 7.9, 0, 11.1, 28.3], color: "#b0ca0a" },
        { name: "Other renewables", values: [0, 0, 0, 0, 4.0, 14.7, 15.0], color: "#1576a7" },
        { name: "Electricity", values: [91.3, 117.0, 133.0, 185.2, 124.9, 154.2, 231.1], color: "#fdc428" },
        { name: "Bioenergy", values: [39.9, 44.3, 46.5, 55.4, 45.4, 56.2, 66.9], color: "#7e922d" },
        { name: "Natural gas", values: [63.6, 79.5, 81.5, 83.4, 66.2, 49.0, 29.0], color: "#c0beac" },
        { name: "Oil", values: [143.5, 168.1, 163.3, 148.8, 148.0, 105.9, 29.0], color: "#5a6163" },
        { name: "Coal", values: [47.5, 52.2, 48.7, 40.3, 45.4, 26.1, 7.9], color: "#2f3536" }
      ],
      line: { name: "Electrification rate, %", values: [22.7, 23.7, 26.7, 33.6, 27.6, 34.5, 53.1], color: "#f39035" },
      method: "Segments read from the vector layer and scaled to the printed column totals (402, 478, 491, 540, 450, 435, 424 EJ). The line is the printed marker positions on the right axis."
    },
    {
      id: "f14", fig: "1.4", wide: true,
      title: "Electrification by end-use sector, 1.5°C Scenario",
      sub: "% of sector energy use, 2023, 2035 and 2050",
      type: "line", unit: "%",
      categories: ["2023", "2035", "2050"],
      series: [
        { name: "Buildings", values: [36, 57, 77], color: "#a9683b" },
        { name: "Industry", values: [27, 34, 42], color: "#afca0b" },
        { name: "Transport", values: [1, 15, 47], color: "#f39035" },
        { name: "Total final energy consumption", values: [23, 35, 54], color: "#1476a7" }
      ],
      method: "Printed point labels from the PDF text layer."
    },
    {
      id: "f15", fig: "1.5", wide: true,
      title: "Modern bioenergy use and renewable share of final energy",
      sub: "EJ for bioenergy bars, % for the two share lines",
      type: "combo", unit: "EJ and %",
      categories: ["2023", "PES 2030", "PES 2035", "PES 2050", "DES 2030", "DES 2035", "DES 2050", "1.5°C 2030", "1.5°C 2035", "1.5°C 2050"],
      series: [
        { name: "Modern use of bioenergy", values: [28.8, 32.8, 36.7, 51.6, 39.7, 48.6, 61.5, 39.7, 53.6, 66.5], color: "#fec91d" }
      ],
      lines: [
        { name: "Direct renewable share, %", values: [6.7, 6.7, 7.7, 9.8, 9.8, 11.7, 16.7, 9.8, 15.7, 18.7], color: "#f39035" },
        { name: "Total renewable share, %", values: [13.7, 18.7, 22.7, 35.6, 27.6, 38.5, 71.3, 28.6, 44.5, 76.2], color: "#1f8f8f" }
      ],
      method: "Bars read from the vector layer on the printed 0-80 axis; both share lines from the printed marker positions."
    },
    {
      id: "f16", fig: "1.6", wide: true,
      title: "Installed renewable power capacity, 2020-2025",
      sub: "GW by technology, with 2025 additions in the note",
      type: "stacked_bar", unit: "GW",
      categories: ["2020", "2021", "2022", "2023", "2024", "2025"],
      series: [
        { name: "Solar", values: [711, 852, 1042, 1405, 1863, 2370], color: "#fbc25e" },
        { name: "Hydropower", values: [1201, 1229, 1250, 1261, 1268, 1285], color: "#518196" },
        { name: "Wind", values: [729, 817, 898, 1011, 1123, 1282], color: "#6cabdd" },
        { name: "Other renewables", values: [148, 159, 166, 169, 176, 180], color: "#bec4ce" }
      ],
      note: "Capacity added in 2025 from the figure's inset: solar 513 GW, wind 158 GW, hydropower 18 GW, other renewables 4 GW.",
      method: "Segments read from the vector layer against the printed 0-6,000 GW axis; inset labels read from the text layer."
    },
    {
      id: "f17", fig: "1.7", wide: true,
      title: "Installed power capacity and generation",
      sub: "TW of capacity (left plot) and PWh of generation (right plot), by scenario",
      type: "grouped_scenarios", unit: "TW and PWh",
      categories: ["2025", "2030", "2035", "2050"],
      series: [
        { name: "Historical", values: [9.3, null, null, null], color: "#bec4ce" },
        { name: "PES", values: [null, 12.3, 15.3, 25.1], color: "#fec91d" },
        { name: "DES", values: [null, 14.0, 19.8, 38.8], color: "#6bbcab" },
        { name: "1.5°C", values: [null, 14.2, 21.0, 40.1], color: "#1476a7" }
      ],
      second: {
        title: "Generation", unit: "PWh",
        series: [
          { name: "Historical", values: [28.2, null, null, null], color: "#bec4ce" },
          { name: "PES", values: [null, 35.1, 41.4, 61.3], color: "#fec91d" },
          { name: "DES", values: [null, 39.4, 49.6, 92.2], color: "#6bbcab" },
          { name: "1.5°C", values: [null, 39.5, 51.8, 92.2], color: "#1476a7" }
        ]
      },
      method: "Column totals read from the vector layer on both printed axes. The technology split inside each bar is not digitised in this rebuild."
    },
    {
      id: "f18", fig: "1.8", wide: true,
      title: "Annual energy intensity improvement by period",
      sub: "% per year, 2025 to 2050",
      type: "grouped_bar", unit: "% per year",
      categories: ["2025", "2026-2030", "2031-2035", "2036-2050", "2026-2050 average"],
      series: [
        { name: "Historical", values: [1.7, null, null, null, null], color: "#bec4ce" },
        { name: "PES", values: [null, 3.0, 2.3, 1.7, 2.1], color: "#fec91d" },
        { name: "DES", values: [null, 4.2, 2.5, 1.9, 2.5], color: "#6bbcab" },
        { name: "1.5°C", values: [null, 4.4, 2.7, 1.9, 2.0], color: "#1476a7" }
      ],
      method: "Printed data labels from the PDF text layer."
    },
    {
      id: "f19", fig: "1.9",
      title: "Clean hydrogen production by scenario",
      sub: "Mt per year",
      type: "grouped_bar", unit: "Mt",
      categories: ["2025", "2030", "2035", "2050"],
      series: [
        { name: "PES", values: [1.0, 11.5, 39.7, 150.3], color: "#fec91d" },
        { name: "DES", values: [null, 27.9, 112.9, 458.2], color: "#6bbcab" },
        { name: "1.5°C", values: [null, 27.9, 135.6, null], color: "#1476a7" }
      ],
      note: "The 1.5°C 2050 bar could not be recovered from the vector layer. The 2025 value follows the report text: around 1 Mt.",
      method: "Bars read from the vector layer on the printed 0-500 Mt axis."
    },
    {
      id: "f110", fig: "1.10",
      title: "Fossil CO2 emissions by scenario",
      sub: "GtCO2 per year",
      type: "grouped_bar", unit: "GtCO2",
      categories: ["2023", "2030", "2035", "2050"],
      series: [
        { name: "Historical", values: [37.8, null, null, null], color: "#bec4ce" },
        { name: "PES", values: [null, 37.1, 34.7, 28.2], color: "#fec91d" },
        { name: "DES", values: [null, 31.0, 22.2, 4.3], color: "#6bbcab" },
        { name: "1.5°C", values: [null, 29.2, 18.8, 0.6], color: "#1476a7" }
      ],
      method: "Bars read from the vector layer on the printed 0-40 Gt axis. The emissions-captured line in the original is not rebuilt here."
    }
  ]
};
