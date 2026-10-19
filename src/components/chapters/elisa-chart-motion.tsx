"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"

import { Chart, FOURPL_PROPS, LINEAR_PROPS, type RecoveryDotProps } from "./elisa-chart"

// Motion-only pieces of the ELISA chart. Loaded on demand, so phones and
// reduced-motion visitors get the static chart without this code.

function Linear({ t }: { t: MotionValue<number> }) {
  const opacity = useTransform(t, [0, 1], [1, 0.3])
  const { d, fill, stroke, strokeWidth, strokeDasharray } = LINEAR_PROPS
  return <motion.path {...{ d, fill, stroke, strokeWidth, strokeDasharray }} style={{ opacity }} />
}

function FourPl({ t }: { t: MotionValue<number> }) {
  const pathLength = useTransform(t, [0.15, 1], [0, 1])
  const { d, fill, stroke, strokeWidth } = FOURPL_PROPS
  return <motion.path {...{ d, fill, stroke, strokeWidth }} style={{ pathLength }} />
}

function Dot({ t, cx, from, to, label }: RecoveryDotProps & { t: MotionValue<number> }) {
  const y = useTransform(t, [0, 1], [0, to - from])
  return <motion.circle cx={cx} cy={from} r={4.5} fill="var(--signal)" style={{ y }} aria-label={label} />
}

export function ScrollChart() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: t } = useScroll({ target: ref, offset: ["start 85%", "center 45%"] })
  return (
    <div ref={ref}>
      <Chart
        slots={{
          linear: () => <Linear t={t} />,
          fourPl: () => <FourPl t={t} />,
          dot: (props) => <Dot key={props.cx} t={t} {...props} />,
        }}
      />
    </div>
  )
}
