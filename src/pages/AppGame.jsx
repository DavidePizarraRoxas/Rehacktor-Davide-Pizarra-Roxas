import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router"
import ProgressBar from "../components/NavbarUI/Progress/ProgressBar";
import { Image, Button } from "@nextui-org/react";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/client";
import { Toaster, toast } from 'sonner';

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
export const DeleteDocumentIcon = (props) => {
      return (
            <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height="2em"
                  role="presentation"
                  viewBox="0 0 24 24"
                  width="2em"
                  {...props}
            >
                  <path
                        d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
                        fill="currentColor"
                  />
                  <path
                        d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
                        fill="currentColor"
                        opacity={0.399}
                  />
                  <path
                        clipRule="evenodd"
                        d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
                        fill="currentColor"
                        fillRule="evenodd"
                  />
            </svg>
      );
}

export default function AppGame() {


      const session = useContext(SessionContext);
      const game = useLoaderData()
      const [loading, setLoading] = useState();
      const [fav, setFav] = useState([])

      async function readFav() {
            const { user } = session
            let { data: favourites, error } = await supabase
                  .from('favourites')
                  .select(`*`)
                  .eq('profile_id', user.id)
                  .eq('game_id', game.id)
            if (error) {
                  console.log(error);
            }
            setFav(favourites)
      }
      async function insertIntoFav(game) {
            const { error } = await supabase
                  .from('favourites')
                  .insert([
                        { profile_id: session.user.id, game_id: game.id, game_name: game.name },
                  ])
                  .select();
            if (error) {
                  toast.error('Insert Failed!!')
            } else {
                  toast.success('Insert Success')
                  readFav()
            }

      }
      async function removeFromFav(game) {
            const { user } = session
            const { error } = await supabase
                  .from('favourites')
                  .delete()
                  .eq('profile_id', user.id)
                  .eq('game_id', game.id)
            if (error) {
                  toast.error('Remove game Failed!!')
            } else {
                  toast.success('Remove game Success')
                  readFav()
            }

      }

      useEffect(() => {
            readFav();
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
                                    {session &&
                                          <div className="flex gap-4 items-center justify-center mt-7 ">
                                                <div>
                                                      {fav.length == 0 ?
                                                            <Button aria-label="Like" color="danger" variant="bordered" startContent={<HeartIcon className=" text-danger-500" />} onPress={() => insertIntoFav(game)}>
                                                                  Add favourite
                                                            </Button> :
                                                            <Button aria-label="Like" variant="bordered" startContent={<DeleteDocumentIcon />} onPress={() => removeFromFav(game) }>
                                                                  Remove from favorites
                                                            </Button>
                                                      }
                                                </div>
                                                <Toaster richColors />
                                                <Button aria-label="Take a photo" color="warning" variant="faded">
                                                      <p>
                                                            Your reviews
                                                      </p>
                                                </Button>
                                          </div>}

                              </div>

                        </div>
                  </div>

            </>
      )
}