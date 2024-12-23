import { useEffect, useState } from "react";
import { useParams } from "react-router"
import ProgressBar from "../components/NavbarUI/Progress/ProgressBar";
import { Image, Button } from "@nextui-org/react";

export const HeartIcon = ({ fill = "currentColor", filled, size, height, width, ...props }) => {
      return (
            <svg
                  fill={filled ? fill : "none"}
                  height={size || height || 24}
                  viewBox="0 0 24 24"
                  width={size || width || 24}
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}
            >
                  <path
                        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                        stroke={fill}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                  />
            </svg>
      );
};

export default function AppGame() {

      const { id } = useParams();
      const [game, setGame] = useState({});
      const [loading, setLoading] = useState();

      useEffect(() => {
            async function fetchGame() {
                  setLoading(true);
                  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}games/${id}?key=${import.meta.env.VITE_API_KEY}`);
                  const json = await response.json();
                  setGame(json);
                  console.log(json);

                  setLoading(false)
            }
            fetchGame();
      }, [])




      return (
            <>
                  <h1 className="text-5xl font-bold text-center mt-5 mb-10"> {game.name}</h1>
                  <div className=" container mx-auto flex justify-center card">

                        <div className=" flex justify-evenly mt-5 mb-5">
                              {loading && <ProgressBar />}
                        </div>
                        <div className=" grid grid-cols-2 ms-40">


                              <div className=" flex items-center">





                                    <h3>{game.description_raw}</h3>

                              </div>


                              <div className="  ">
                                    <div className=" flex justify-center">
                                          <Image
                                                alt="NextUI hero Image"
                                                src={game.background_image}
                                                width={600}
                                                height={330}
                                          />

                                    </div>

                                    <div className="flex gap-4 items-center justify-center mt-7 ">
                                          <Button isIconOnly aria-label="Like" color="danger">
                                                <HeartIcon />
                                          </Button>
                                          <Button  aria-label="Take a photo" color="warning" variant="faded">
                                                <p>
                                                      Your reviews
                                                </p>
                                          </Button>
                                    </div>
                              </div>

                        </div>
                  </div>

            </>
      )
}