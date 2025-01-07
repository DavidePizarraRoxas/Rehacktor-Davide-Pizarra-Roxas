import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Spinner } from "@nextui-org/react";
import GameUI from "../components/NavbarUI/GameUI/GameUI";
import ProgressBar from "../components/NavbarUI/Progress/ProgressBar";
import { useAsyncList } from '@react-stately/data';
import { useInView } from 'react-intersection-observer';
import SessionContext from "../context/SessionContext";

export default function AppPlatform() {
      const { platform_id } = useParams();
      const [platformName, setPlatformName] = useState("");
      const [loading, setLoading] = useState(false);
      const [hasMore, setHasMore] = useState(true);
      const session = useContext(SessionContext);


      let games = useAsyncList({
            async load({ signal, cursor }) {
                  if (loading || !hasMore) return {};

                  setLoading(true);
                  let res = await fetch(cursor || `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&platforms=${platform_id}&dates=2010-09-01,2023-09-30&page=1`, {
                        signal
                  });
                  let json = await res.json();
                  setLoading(false);


                  setHasMore(json.next !== null);

                  return {
                        items: json.results,
                        cursor: json.next
                  };
            }
      });

      const { ref, inView } = useInView({
            threshold: 0
      });


      useEffect(() => {
            if (inView && !loading && hasMore && session) {
                  games.loadMore();
            }
      }, [inView, loading, games.cursor, hasMore, session]);


      useEffect(() => {
            async function fetchPlatform() {
                  const platformResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}platforms/${platform_id}?key=${import.meta.env.VITE_API_KEY}`);
                  const platformJson = await platformResponse.json();
                  setPlatformName(platformJson.name);
            }

            fetchPlatform();
      }, [platform_id]);

      return (
            <div className="flex justify-evenly">
                  <div className="w-[85%] p-5">
                        <h1 className="text-5xl font-bold text-center mt-5 mb-10"> Genres {platformName}</h1>
                        <div className="flex justify-center mt-5 mb-5">


                              {loading && <ProgressBar />}
                        </div>
                        <div className="grid grid-cols-4 gap-4 ms-10">
                              {/* Mostra i giochi */}
                              {games.items.map((game) => (
                                    <GameUI key={game.id} game={game} />
                              ))}
                        </div>



                        {hasMore && session && (
                              <div ref={ref} className="flex justify-center pt-2">

                                    {loading && <Spinner color="primary" />}
                              </div>
                        )}
                  </div>
            </div>
      );
}
