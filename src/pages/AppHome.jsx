import { useContext, useEffect, useState } from "react"
import { useAsyncList } from 'react-stately'
import { useInView } from "react-intersection-observer";
import { Spinner } from "@nextui-org/react";
import GameUI from "../components/NavbarUI/GameUI/GameUI";
import ProgressBar from "../components/NavbarUI/Progress/ProgressBar";
import DropdownMain from "../components/NavbarUI/DropDown/DropDownMain";

export default function AppHome() {

      const [loading, setLoading] = useState(false)




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
                  console.log(games.items);

                  games.loadMore();
            }
      }, [games])


      return (
            <div className=" ">
                  <div className="flex justify-evenly ">
                        <div className="w-[5%] ">
                              <DropdownMain />

                        </div>
                        <div className="w-[85%] p-5">
                              <h1 className="text-5xl font-bold text-center mt-5 mb-10">New Games and Trend</h1>
                              <div className=" flex justify-center mt-5 mb-5">
                                    {loading && <ProgressBar />}

                              </div>
                              <div className=" grid grid-cols-4 gap-4 ms-10 ">
                                    {games.items.map((game) => (
                                          <GameUI key={game.id} game={game} />
                                    ))}
                              </div>
                              <div className=" flex justify-center pt-2  ">
                                    <Spinner color="primary" ref={ref} />
                              </div>
                        </div>
                  </div>


            </div>


      )
}