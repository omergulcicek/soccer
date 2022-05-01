import Link from "next/link"
import Image from "next/image"
import friendlyUrl from "friendly-url"
import convertCountryISO from "../../utils/convertCountryISO"
import data from "./../../public/player.json"
import "./../../node_modules/flag-icons-svg/css/flag-icons.css"

export default function List() {
  return (
    <>
      <section>
        <table className="w-full leading-10">
          <thead>
            <tr className="text-left border-b-2 bg-slate-100">
              <th className="pl-2">Rat</th>
              <th className="pl-2">Pot</th>
              <th className="pl-2">Name</th>
              <th className="pl-2">Age</th>
              <th className="pl-2">Team</th>
              <th className="pl-2">Country</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(0, 10)
              .sort((a, b) => b.rating.ability - a.rating.ability)
              .map(
                (
                  {
                    rating: { ability, potential },
                    name,
                    info: { age, position },
                    team,
                    country,
                  },
                  i
                ) => (
                  <tr
                    key={i}
                    className="transition duration-75 even:bg-slate-100"
                  >
                    <td className="pl-2 tex">
                      <div
                        className={`bg-blue-600 h-10 w-10 text-center text-white rounded `}
                      >
                        {ability}
                      </div>
                    </td>
                    <td className="pl-2">
                      <div
                        className={`bg-green-600 h-10 w-10 text-center text-white rounded`}
                      >
                        {potential}
                      </div>
                    </td>
                    <td className="pl-2">
                      <Link href={`/player/${friendlyUrl(name)}`}>
                        <a className="text-lg transition hover:text-blue-500">
                          {name}
                        </a>
                      </Link>
                      <p className="text-sm leading-none text-gray-400 mb-3">
                        {position}
                      </p>
                    </td>
                    <td className="pl-2">{age}</td>
                    <td className="pl-2">
                      <Link href={`/club/${friendlyUrl(team)}`}>
                        <a className="transition hover:text-blue-500">{team}</a>
                      </Link>
                    </td>
                    <td className="pl-2">
                      <Link href={`/country/${friendlyUrl(country)}`}>
                        <a className="transition hover:text-blue-500 flex items-center">
                          <span
                            className={`flag-icon flag-icon-${convertCountryISO(
                              country
                            ).toLowerCase()} text-xl rounded mr-2`}
                          ></span>
                          <span>{country}</span>
                        </a>
                      </Link>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </section>
    </>
  )
}
