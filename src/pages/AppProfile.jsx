import { Card, CardBody, Image, CardHeader, Accordion, AccordionItem, Divider } from "@nextui-org/react";
import { UseProfile } from "../hooks/UseProfile";
import { getAvatarUrl } from "../utils/getAvatarUrl";
import supabase from "../supabase/client";
import { useContext, useEffect, useState } from "react";
import SessionContext from "../context/SessionContext";
import { div } from "framer-motion/client";



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

export default function AppProfile() {

      const { username, first_name, last_name, avatar_url } = UseProfile();
      const session = useContext(SessionContext);

      const [favs, setFav] = useState([])
      async function readFav() {
            const { user } = session
            let { data: favourites, error } = await supabase
                  .from('favourites')
                  .select(`*`)
                  .eq('profile_id', user.id)

            if (error) {
                  console.log(error);
            }
            setFav(favourites)
      }
      useEffect(() => {
            readFav();
      }, [])



      return (

            <div className=" flex justify-center mt-5 card">
                  <Card
                        isBlurred
                        className=" mt-14 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black  h-[650px] w-[65%]  "
                        shadow="sm"

                  >
                        <CardHeader className=" ps-8 pt-9  flex-col items-center mb-7">
                              <h1 className="font-bold text-5xl"> Welcome {username}</h1>
                        </CardHeader>
                        <CardBody>
                              <div className="grid grid-cols-2 md:grid-cols-12 items-center justify-center">
                                    <div className="relative col-span-6 md:col-span-4 p-4 ">
                                          <div className=" flex justify-center">
                                                <Image
                                                      alt="Image profile"
                                                      className="object-cover"
                                                      shadow="md"
                                                      src={avatar_url && getAvatarUrl(avatar_url)}
                                                      width="300px"
                                                      height='300px'

                                                />
                                          </div>
                                          <div className="mt-5 flex gap-2 justify-center">
                                                <h2 className=" font-bold mb-2 text-xl">{first_name}</h2>
                                                <h2 className=" font-bold text-xl">{last_name}</h2>
                                          </div>
                                    </div>

                                    <div className=" ms-10 col-span-7 ">

                                          <Accordion variant="splitted">
                                                <AccordionItem startContent={<HeartIcon className=" text-red-800 " />} aria-label="Accordion 1" title="Favourite games">
                                                      <div className="max-h-[20vh] overflow-y-auto p-5 text-white">
                                                            {favs.length ? (
                                                                  <ul>
                                                                        {favs.map(fav => (
                                                                              <div key={fav.id}>
                                                                                    <li>{fav.game_name}</li>
                                                                                    <Divider className="my-2" />
                                                                              </div>
                                                                        ))}
                                                                  </ul>
                                                            ) : (
                                                                  <p>There are no favorites at the moment</p>
                                                            )}

                                                      </div>

                                                </AccordionItem>
                                          </Accordion>
                                    </div>
                              </div>
                        </CardBody>
                  </Card>

            </div>
      )
}