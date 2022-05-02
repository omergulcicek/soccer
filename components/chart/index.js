import RadarChart from "react-svg-radar-chart"
import "react-svg-radar-chart/build/css/index.css"

export const sumValues = (attr, type) => {
  let sum = 0

  for (const key in attr) {
    sum += attr[key]
  }

  switch (type) {
    case "mental":
      return ((sum / 11.5) * 5) / 100
    case "physical":
      return ((sum / 8.2) * 5) / 100
  }
}

export function chartData({ data }) {
  return [
    {
      data: {
        defending: (data.technical.tackling + data.technical.marking) / 40,
        physical:
          (data.physical.balance +
            data.physical.stamina +
            data.physical.naturalfitness +
            data.physical.strength) /
          80,
        speed: (data.physical.acceleration + data.physical.pace) / 40,
        vision: data.mental.vision / 20,
        attacking: (data.technical.finishing + data.technical.firsttouch) / 40,
        technical: data.technical.technique / 20,
        aerial: (data.technical.heading + data.physical.jumping) / 40,
        mental: sumValues(data.mental, "mental"),
      },
      meta: { color: "red" },
    },
  ]
}

export const captions = {
  defending: "Defending",
  physical: "Physical",
  speed: "speed",
  vision: "vision",
  attacking: "attacking",
  technical: "technical",
  aerial: "aerial",
  mental: "mental",
}

export const defaultOptions = {
  size: 600,
  axes: true,
  scales: 5,
  captions: true,
  captionMargin: 24,
  zoomDistance: 1.45,
  captionProps: () => ({
    textAnchor: "middle",
    fontSize: 14,
    fontFamily: "Inter, sans-serif",
  }),
}

export default function Chart(attributes) {
  return (
    <>
      <RadarChart
        captions={captions}
        data={chartData(attributes)}
        size={450}
        options={defaultOptions}
      />
    </>
  )
}
