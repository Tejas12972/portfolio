export type SkillGroup = { name: string; skills: string[] }

// Skill names must match the `skills` arrays in projects.ts for hover
// highlighting to find them.
export const skillGroups: SkillGroup[] = [
  {
    name: "Hardware & embedded",
    skills: [
      "ESP32",
      "Arduino",
      "Raspberry Pi",
      "CircuitPython",
      "Breadboarding & soldering",
      "Oscilloscope",
      "Multimeter",
      "Function generator",
      "Bench power supply",
      "UART/I²C/SPI",
      "GPIO/PWM",
      "BLE",
    ],
  },
  {
    name: "Languages",
    skills: ["C", "C++", "Python", "Java", "MATLAB", "SQL", "TypeScript", "JavaScript", "HTML/CSS"],
  },
  {
    name: "CAD & fabrication",
    skills: ["SolidWorks", "3D printing", "Laser cutting", "LTspice", "MATLAB/Simulink", "KiCad"],
  },
  {
    name: "Frameworks & libraries",
    skills: [
      "React",
      "React Native",
      "Next.js",
      "Node.js",
      "Electron",
      "FastAPI",
      "Flask",
      "Streamlit",
      "Pandas",
      "NumPy",
      "SciPy",
      "TensorFlow",
    ],
  },
  {
    name: "Tools & platforms",
    skills: [
      "Git",
      "GitHub Actions",
      "pytest",
      "Playwright",
      "Docker",
      "Firebase",
      "MongoDB",
      "SQLite",
      "AWS",
      "Linux CLI",
      "MCP",
      "OpenAI API",
      "Chrome extensions",
    ],
  },
]
