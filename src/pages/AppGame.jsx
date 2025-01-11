import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router"
import { Image, Button, Form, Input, Card, CardHeader, CardBody, Divider, ScrollShadow } from "@nextui-org/react";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";
import { Toaster, toast } from 'sonner';
import ProgressBar from "../components/NavbarUI/Progress/ProgressBar";
import RealtimeChat from "../components/NavbarUI/RealtimeChatUI";
import CardRatings from "../components/NavbarUI/Ratings/CardRatings";
import ScreenShoot from "../components/NavbarUI/ScreenShoot";
import Achievements from "../components/Achievement";


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
      const [fav, setFav] = useState([]);
      console.log(game);


      async function readFav() {
            const { user } = session
            let { data: favourites, error } = await supabase
                  .from('favourites')
                  .select(`*`)
                  .eq('profile_id', session.user.id)
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
      async function handleMessageSubmit(event) {
            event.preventDefault();
            const inputMessage = event.currentTarget;
            const { message } = Object.fromEntries(new FormData(inputMessage));
            // Sanitize input
            if (typeof message === 'string' && message.trim().length !== 0) {

                  const { data, error } = await supabase
                        .from('Messages')
                        .insert([
                              {
                                    profile_id: session.user.id,
                                    profile_username: session.user.user_metadata.username,
                                    game_id: game.id,
                                    content: message,
                              },
                        ])
                        .select()
                  if (error) {
                        toast.error('Message Failed!!')
                  } else {
                        toast.success(' Message Sent')
                        inputMessage.reset();
                        console.log(data);

                  }
            }

      }

      useEffect(() => {
            readFav();
      }, [])


      return (
            <>
                  <header className="card flex justify-center p-6">

                        <Image
                              isBlurred
                              alt="background_image"
                              src={game.background_image}
                              width={1000}
                              height={550}
                        />
                  </header>
                  <div className=" flex justify-center items-center">
                        <h1 className="text-5xl font-bold text-center mt-5 mb-10"> {game.name} </h1>
                        {session &&
                              <div className=" ps-11 flex justify-center items-center pb-3">
                                    {fav.length == 0 ?
                                          <Button isIconOnly aria-label="Like" color="danger" startContent={<HeartIcon />} onPress={() => insertIntoFav(game)}>
                                          </Button> :
                                          <Button aria-label="Like-no" variant="bordered" startContent={<DeleteDocumentIcon />} onPress={() => removeFromFav(game)}>

                                          </Button>
                                    }
                              </div>
                        }
                        <Toaster richColors />

                  </div>
                  <div className="  flex justify-center card">
                        <div className=" flex justify-evenly mt-5 mb-5">
                              {loading && <ProgressBar />}
                        </div>
                        <div className="">
                              <div className=" grid grid-cols-2 ms-40 me-40 ">
                                    <div className=" grind grid-cols-1 mt-14">
                                          <div className="p-5">
                                                <Card className="  border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black h-[54vh]  "
                                                >
                                                      <CardHeader className=" flex justify-center">
                                                            <h3 className=" text-xl text-center p-3 font-bold">About </h3>
                                                      </CardHeader>
                                                      <Divider />
                                                      <CardBody className="max-h-[50vh] overflow-y-auto flex ">
                                                            <ScrollShadow hideScrollBar>
                                                                  <h3 className="p-5">{game.description_raw} </h3>
                                                            </ScrollShadow>
                                                      </CardBody>
                                                </Card>
                                          </div>
                                          {/* Reating section */}
                                          <div className="p-5">
                                                <Card className="">
                                                      <CardHeader className="flex justify-center">
                                                            <h3 className="  text-xl text-center p-3 font-bold">Reatings</h3>
                                                      </CardHeader>
                                                      <Divider />
                                                      <CardBody className=" grid grid-cols-4  p-4">
                                                            {game.ratings.map((rating) => (
                                                                  <CardRatings key={rating.id} rating={rating} />
                                                            ))}
                                                      </CardBody>
                                                </Card>
                                          </div>
                                    </div>
                                    <div className="ps-10 pt-10 pe-10">
                                          <div className="">
                                                <h3 className=" text-2xl text-center p-5 font-bold">Screenshoot</h3>
                                                <ScreenShoot game={game} />
                                          </div>

                                          {/* General Information */}
                                          <div className=" container mt-10" >
                                                <div className=" flex justify-center" >
                                                      <Card className="w-full  border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black  ">
                                                            <CardHeader className=" flex justify-center">
                                                                  <h3 className=" text-xl text-center p-3 font-bold">Genreal Information </h3>
                                                            </CardHeader>
                                                            <Divider />
                                                            <CardBody className=" grid grid-cols-2 gap-3">
                                                                  {/* genre */}
                                                                  <Card className="">
                                                                        <CardBody>
                                                                              <div className=" text-center">
                                                                                    <h4 className=" font-bold">Genre:</h4>
                                                                                    <div className="flex gap-1 justify-center">
                                                                                          {game.genres.map((genre) => (
                                                                                                <ul key={genre.id} className="">
                                                                                                      <li className="">
                                                                                                            <p className="">{genre.name}, </p>
                                                                                                      </li>
                                                                                                </ul>
                                                                                          ))}
                                                                                    </div>

                                                                              </div>
                                                                        </CardBody>
                                                                  </Card>
                                                                  {/* Developers */}
                                                                  <Card className="">
                                                                        <CardBody>
                                                                              <div className=" text-center">
                                                                                    <h4 className="font-bold">Developers:</h4>
                                                                                    <div className="flex gap-1 justify-center">
                                                                                          {game.developers.map((developer) => (
                                                                                                <ul key={developer.id}>
                                                                                                      <li className="">
                                                                                                            <p>{developer.name},</p>
                                                                                                      </li>
                                                                                                </ul>
                                                                                          ))}
                                                                                    </div>
                                                                              </div>
                                                                        </CardBody>
                                                                  </Card>
                                                                  {/* Publischer */}
                                                                  <Card className="">
                                                                        <CardBody>
                                                                              <div className=" text-center">
                                                                                    <h4 className="font-bold">Publishers:</h4>
                                                                                    <div className="flex gap-1 justify-center">
                                                                                          {game.publishers.map((publisher) => (
                                                                                                <ul key={publisher.id}>
                                                                                                      <li className="">
                                                                                                            <p>{publisher.name},</p>
                                                                                                      </li>
                                                                                                </ul>
                                                                                          ))}
                                                                                    </div>
                                                                              </div>
                                                                        </CardBody>
                                                                  </Card>
                                                                  {/* date relase */}
                                                                  <Card className="">
                                                                        <CardBody>
                                                                              <div className="text-center">
                                                                                    <h4 className=" font-bold">Release date:</h4>
                                                                                    <p>{game.released}</p>
                                                                              </div>
                                                                        </CardBody>
                                                                  </Card>
                                                            </CardBody>
                                                      </Card>
                                                </div>
                                          </div>
                                    </div>

                                    <div className="p-5">
                                          <Achievements game={game} />
                                    </div>
                                    <div className="ps-10  pe-10">
                                          {session &&
                                                <div className=" flex justify-center mt-5 ">
                                                      <div className="  w-[775px] h-[350px] ">
                                                            <RealtimeChat game={game} />
                                                      </div>
                                                </div>
                                          }
                                          {session &&
                                                <div className=" flex justify-center mt-7">
                                                      <div className="p-4 w-[675px]">
                                                            <Form className="" validationBehavior="native" onSubmit={handleMessageSubmit}>
                                                                  <div className="flex w-full gap-2 ">
                                                                        <Input
                                                                              label="Live chat with other gamers"
                                                                              labelPlacement="outside"
                                                                              name="message"
                                                                              placeholder="Chat..."
                                                                              type="text"
                                                                              aria-label="message"
                                                                        />
                                                                        <Button color="primary" type="submit" aria-label="Submit" className=" mt-6" >
                                                                              Send
                                                                        </Button>
                                                                        <Toaster richColors />
                                                                  </div>
                                                            </Form>
                                                      </div>
                                                </div>
                                          }
                                    </div>
                              </div>
                        </div>
                  </div>

            </>
      )
}