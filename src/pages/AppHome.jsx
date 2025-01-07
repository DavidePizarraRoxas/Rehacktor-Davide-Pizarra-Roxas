import { useContext, useEffect, useState } from "react"
import { useAsyncList } from 'react-stately'
import { useInView } from "react-intersection-observer";
import GameUI from "../components/NavbarUI/GameUI/GameUI";
import ProgressBar from "../components/NavbarUI/Progress/ProgressBar";
import DropdownMain from "../components/NavbarUI/DropDown/DropDownMain";
import SessionContext from "../context/SessionContext";
import { Card, CardFooter, Image, Button, CardHeader, Spinner } from "@nextui-org/react";

export default function AppHome() {

      const [loading, setLoading] = useState(false);
      const session = useContext(SessionContext);


      let games = useAsyncList({
            async load({ signal, cursor }) {
                  setLoading(true)
                  let res = await fetch(cursor || `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2010-09-01,2023-09-30&page=1`, {
                        signal
                  });
                  setLoading(false)
                  let json = await res.json();
                  return {
                        items: json.results,
                        cursor: json.next
                  };
            }
      });
      const { ref, inView } = useInView({
            threshold: 0,
      });

      useEffect(() => {
            if (games.items.length && inView && !games.isLoading) {
                  games.loadMore();
            }
      }, [games])


      return (
            <div className="">
                  <header className="flex justify-center mt-5 fadeInHeader ">
                        <Card isFooterBlurred className="relative w-full sm:w-[1700px] h-[800px] rounded-xl shadow-xl overflow-hidden card">

                              {/* Overlay con sfocatura dinamica e colore */}
                              <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>

                              {/* Immagine di sfondo con sfocatura e effetto zoom */}
                              <div className="absolute inset-0 z-0 transition-transform transform hover:scale-110">
                                    <Image
                                          alt="Image header"
                                          className="w-full h-full object-cover filter blur-[1px] transition-all duration-300"
                                          src="/YIZTm.jpg"
                                    />
                              </div>

                              {/* Titolo centrato sopra l'immagine con animazione di fade-in */}
                              <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <h1 className="text-gray-200 text-6xl sm:text-8xl font-extrabold text-center drop-shadow-2xl opacity-100 animate-fadeIn">
                                          Welcome to Rehacktor
                                    </h1>
                              </div>
                        </Card>
                  </header>

                  <div className="flex justify-evenly ">
                        <div className="w-[5%] sticky top-0 z-10 h-screen ">
                              <DropdownMain />
                        </div>
                        <div className="w-[85%] p-5">
                              <h1 className="text-5xl font-bold text-center mt-5 mb-10 me-32">New Games and Trend</h1>
                              <div className=" flex justify-center mt-5 mb-5">
                                    {loading && <ProgressBar />}

                              </div>
                              <div>

                                    <div className=" grid  md:grid-cols-4 sm:grid-cols-2 gap-4 ms-10 ">
                                          {games.items.map((game) => (
                                                <GameUI key={game.id} game={game} />
                                          ))}
                                    </div>
                              </div>
                              {session &&
                                    <div className=" flex justify-center pt-2  ">
                                          <Spinner color="primary" ref={ref} />
                                    </div>
                              }
                        </div>
                  </div>


            </div>


      )
}