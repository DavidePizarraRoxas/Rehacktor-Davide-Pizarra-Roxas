import { useEffect, useState } from "react";
import { useParams } from "react-router"
import GameUI from "../components/NavbarUI/GameUI/GameUI";
import ProgressBar from "../components/NavbarUI/Progress/ProgressBar";


export default function AppGenre() {

      const { genre_slug } = useParams();
      const [genreGames, setGenreGames] = useState([]);
      const [loading, setLoading] = useState(false);

      


      useEffect(()=>{
            async function fetchGenreGames() {
                  setLoading(true)
                  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre_slug}`)
                  const json = await response.json();
                  setGenreGames(json.results)
                  setLoading(false)
            }
            fetchGenreGames();
      },[])

      return (
            <div className="flex justify-evenly">

                  {/* <div className="w-[5%] ">
                        <DropdownMain />

                  </div> */}

                  <div className="w-[85%] p-5">
                        <h1 className="text-5xl font-bold text-center mt-5 mb-10">Genres { genre_slug }</h1>
                        <div className=" flex justify-center mt-5 mb-5">
                              {loading && <ProgressBar/>}

                        </div>
                        <div className=" grid grid-cols-4 gap-4 ms-10 ">
                              {genreGames.map((game) => (
                                    <GameUI  key={game.id} game={game}/>
                              ))}
                        </div>
                  </div>
            </div>
      )
}