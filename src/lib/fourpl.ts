// Plate 1 of the public sleep-fragmentation IL-6 dataset, from
// Tejas12972/elisa-analysis-pipeline data/processed/sleep_fragmentation_il6.
// OD values are raw. The two fits subtract different blanks: the study used
// wells H9/H10, the pipeline uses the zero standard (H1/H2). Both curves are
// returned in raw OD so they share one axis with the points.

export const STUDY_BLANK = (0.068 + 0.073) / 2
export const ZERO_STANDARD = (0.088 + 0.081) / 2

export const plate1Standards: { conc: number; od: [number, number] }[] = [
  { conc: 7.8, od: [0.108, 0.102] },
  { conc: 15.6, od: [0.136, 0.129] },
  { conc: 31.3, od: [0.192, 0.188] },
  { conc: 62.5, od: [0.3, 0.301] },
  { conc: 125, od: [0.524, 0.536] },
  { conc: 250, od: [0.886, 0.92] },
  { conc: 500, od: [1.547, 1.563] },
]

/** The study's own straight line, conc = (OD - blank - a) / b. */
export const studyLinear = { a: 0.0032, b: 0.003 }

/** The pipeline's weighted 4PL fit for plate 1 on zero-standard-subtracted OD (notebook 01, cell 7). */
export const plate1FourPL = { a: -0.001087, b: 1.1, c: 862.571, d: 4.113 }

/** Raw OD the study's line predicts at a concentration. */
export function linearOd(conc: number) {
  return STUDY_BLANK + studyLinear.a + studyLinear.b * conc
}

/** Raw OD the pipeline's 4PL predicts at a concentration. */
export function fourPlOd(conc: number, p = plate1FourPL) {
  return ZERO_STANDARD + p.d + (p.a - p.d) / (1 + Math.pow(conc / p.c, p.b))
}

/** Back-calculated recovery (% of nominal) on plate 1, from notebook 01, cell 9. */
export const plate1Recovery = [
  { conc: 7.8, fourPl: 94, linear: 134 },
  { conc: 15.6, fourPl: 100, linear: 126 },
  { conc: 31.3, fourPl: 102, linear: 124 },
  { conc: 62.5, fourPl: 100, linear: 121 },
  { conc: 125, fourPl: 102, linear: 122 },
  { conc: 250, fourPl: 97, linear: 111 },
  { conc: 500, fourPl: 101, linear: 99 },
]
