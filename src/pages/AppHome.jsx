import { useEffect, useState } from "react"
import GameUI from "../components/NavbarUI/GameUI/GameUI";
import ProgressBar from "../components/NavbarUI/Progress/ProgressBar";
import DropdownMain from "../components/NavbarUI/DropDown/DropDownMain";

export default function AppHome() {
      const [games, setGames] = useState([]);
      const [loading, setLoading] = useState(false)

      useEffect(() => {
            async function fetchGames() {
                  setLoading(true)
                  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
                  const json = await response.json();
                  setGames(json.results)
                  console.log(json.results);
                  setLoading(false)
            }
            fetchGames();
      }, [])


      return (
            <div className="flex justify-evenly">

                  <div className="w-[5%] ">
                        <DropdownMain />

                  </div>

                  <div className="w-[85%] p-5">
                        <h1 className="text-5xl font-bold text-center mt-5 mb-10">New Games and Trend</h1>
                        <div className=" flex justify-center mt-5 mb-5">
                              {loading && <ProgressBar />}

                        </div>
                        <div className=" grid grid-cols-4 gap-4 ms-10 ">
                              {games.map((game) => (
                                    <GameUI key={game.id} game={game} />
                              ))}
                        </div>
                  </div>
            </div>
      )
}