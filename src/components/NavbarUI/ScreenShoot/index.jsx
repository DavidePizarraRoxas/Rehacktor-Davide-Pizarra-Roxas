import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";



export default function ScreenShoot({ game }) {
      const [screenshoot, setScreenshoot] = useState([]);
      const [loading, setLoading] = useState();
      console.log(setScreenshoot);

      useEffect(() => {
            async function fetchScreenshoot() {
                  setLoading(true)
                  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games/${game.id}/screenshots?key=${import.meta.env.VITE_API_KEY}`)
                  const json = await response.json();
                  setScreenshoot(json.results)
                  setLoading(false)


            }
            fetchScreenshoot();
      }, [game.id])
      return (
            <div className=" container rounded-lg ">
                  <div className=" grid grid-cols-3 gap-3 card">
                        {screenshoot.map((screenshot) => (
                                    <Image
                                          key={screenshot.id}
                                          alt='Screenshot Image'
                                          src={screenshot.image}
                                          width={300}
                                          height={150}
                                    />
                        ))}
                  </div>


            </div>
      )
}