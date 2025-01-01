import { useEffect, useState } from "react";
import { useParams } from "react-router"
import GameUI from "../components/NavbarUI/GameUI/GameUI";
import ProgressBar from "../components/NavbarUI/Progress/ProgressBar";

export default function AppPlatform() {


      const { platform_slug } = useParams();
      const [platformsGames, setPlatformsGames] = useState([]);
      const [loading, setLoading] = useState(false);

      useEffect(() => {
            async function fetchPlatformId() {
                  setLoading(true);

                  const platformResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}platforms?key=${import.meta.env.VITE_API_KEY}&slug=${platform_slug}`);
                  const platformJson = await platformResponse.json();

                  if (platformJson.results && platformJson.results.length > 0) {
                        const platform_id = platformJson.results[0].id;
                        fetchPlatformsGames(platform_id);
                  } else {
                        console.error('Piattaforma non trovata');
                        setLoading(false);
                  }
            }

            async function fetchPlatformsGames(platform_id) {
                  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&platforms=${platform_id}`);
                  const json = await response.json();
                  setPlatformsGames(json.results);
                  setLoading(false);
            }

            fetchPlatformId();

      }, [platform_slug]);

      console.log(platformsGames);


      return (
            <div className="flex justify-evenly">

                  {/* <div className="w-[5%] ">
                        <DropdownMain />

                  </div> */}

                  <div className="w-[85%] p-5">
                        <h1 className="text-5xl font-bold text-center mt-5 mb-10">Genres {platform_slug} </h1>
                        <div className=" flex justify-center mt-5 mb-5">
                              {loading && <ProgressBar />}

                        </div>
                        <div className=" grid grid-cols-4 gap-4 ms-10 ">
                              {platformsGames.map((game) => (
                                    <GameUI key={game.id} game={game} />
                              ))}
                        </div>
                  </div>
            </div>
      )
}