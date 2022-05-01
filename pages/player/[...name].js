import { useRouter } from "next/router"
import convertCountryISO from "../../utils/convertCountryISO"
import data from "./../../public/player.json"
import "./../../node_modules/flag-icons-svg/css/flag-icons.css"

import RadarChart from "react-svg-radar-chart"
import "react-svg-radar-chart/build/css/index.css"

export default function Player() {
  const router = useRouter()
  const { name } = router.query

  const {
    attributes,
    country,
    id,
    info,
    position,
    age,
    name: fullname,
    rating,
    team,
  } = data.filter(
    (e) => e.id == 735216
    //document.location.pathname.replace("/player/", "").split("-")[0] * 1
  )[0]

  const chartData = [
    {
      data: {
        defending: attributes.technical.tackling / 20,
        physical: 0.83,
        speed: 0.8,
        vision: attributes.mental.vision / 20,
        attacking: attributes.technical.finishing / 20,
        technical: attributes.technical.firsttouch / 20,
        aerial: attributes.technical.heading / 20,
        mental: attributes.mental.determination / 20,
      },
      meta: { color: "red" },
    },
  ]

  const captions = {
    defending: "Defending",
    physical: "Physical",
    speed: "speed",
    vision: "vision",
    attacking: "attacking",
    technical: "technical",
    aerial: "aerial",
    mental: "mental",
  }

  console.log(attributes)

  return (
    <>
      <main className="flex gap-10">
        <aside className="shadow-xl rounded min-w-[320px] p-5">
          <header className="flex flex-col">
            <h1 className="text-3xl font-bold">{fullname.split("-")[0]}</h1>

            <span>{team}</span>

            <div>
              <span
                className={`flag-icon flag-icon-${convertCountryISO(
                  country
                ).toLowerCase()} text-xl rounded mr-2`}
              ></span>

              <span>{country}</span>
            </div>
          </header>

          <section className="mt-5 text-sm">
            <h2 className="font-bold uppercase bg-gray-200 p-2 mb-2 rounded">
              Player Info
            </h2>

            <ul className="leading-9 pl-2">
              <li className="flex justify-between">
                <strong>Name</strong>
                <span className="w-3/5">{fullname.split("-")[0]}</span>
              </li>
              <li className="flex justify-between">
                <strong>Age</strong>
                <span className="w-3/5">{info.age}</span>
              </li>
              <li className="flex justify-between">
                <strong>Position</strong>
                <span className="w-3/5">{info.position}</span>
              </li>
              <li className="flex justify-between">
                <strong>Foot</strong>
                <span className="w-3/5">{info.foot}</span>
              </li>
              <li className="flex justify-between">
                <strong>Height</strong>
                <span className="w-3/5">{info.height}</span>
              </li>
              <li className="flex justify-between">
                <strong>Weight</strong>
                <span className="w-3/5">{info.weight}</span>
              </li>
              <li className="flex justify-between">
                <strong>Unique ID</strong>
                <span className="w-3/5">{id}</span>
              </li>
            </ul>
          </section>
        </aside>

        <div className="flex flex-col gap-10 w-full">
          <section className="shadow-xl rounded p-5">
            <h2 className="text-2xl font-bold p-2 mb-2">Attributes</h2>

            <div className="flex gap-5">
              <div className="w-1/3">
                <h3 className="font-bold uppercase bg-gray-200 p-2 mb-2 rounded">
                  Technical
                </h3>

                <ul className="leading-8">
                  {Object.keys(attributes.technical).map((e, i) => (
                    <li className="flex justify-between" key={i}>
                      <abbr
                        className="capitalize decoration-gray-400 underline-offset-1"
                        title={e}
                      >
                        {e}
                      </abbr>
                      <span>{attributes.technical[e]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-1/3">
                <h3 className="font-bold uppercase bg-gray-200 p-2 mb-2 rounded">
                  Mental
                </h3>

                <ul className="leading-8">
                  {Object.keys(attributes.mental).map((e, i) => (
                    <li className="flex justify-between" key={i}>
                      <abbr
                        className="capitalize decoration-gray-400 underline-offset-1"
                        title={e}
                      >
                        {e}
                      </abbr>
                      <span>{attributes.mental[e]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-1/3">
                <h3 className="font-bold uppercase bg-gray-200 p-2 mb-2 rounded">
                  Physical
                </h3>

                <ul className="leading-8">
                  {Object.keys(attributes.physical).map((e, i) => (
                    <li className="flex justify-between" key={i}>
                      <abbr
                        className="capitalize decoration-gray-400 underline-offset-1"
                        title={e}
                      >
                        {e}
                      </abbr>
                      <span>{attributes.physical[e]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <RadarChart captions={captions} data={chartData} size={450} />
          </section>
        </div>
      </main>
    </>
  )
}
