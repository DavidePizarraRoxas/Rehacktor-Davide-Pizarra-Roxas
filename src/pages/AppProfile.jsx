import { Card, CardBody, Image, CardHeader, Accordion, AccordionItem } from "@nextui-org/react";
import { UseProfile } from "../hooks/UseProfile";
import { getAvatarUrl } from "../utils/getAvatarUrl";


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

      return (

            <div className=" flex justify-center mt-5">
                  <Card
                        isBlurred
                        className="border-none mt-14 bg-background/60 dark:bg-default-100/50 h-[650px] w-[65%] "
                        shadow="sm"

                  >
                        <CardHeader className=" ps-8 pt-9  flex-col items-center mb-7">
                              <h1 className="font-bold text-5xl"> Welcome {username}</h1>
                        </CardHeader>
                        <CardBody>
                              <div className="grid grid-cols-2 md:grid-cols-12 items-center justify-center">
                                    <div className="relative col-span-6 md:col-span-4 p-4">
                                          <Image
                                                alt="Image profile"
                                                className="object-cover"
                                                shadow="md"
                                                src={ avatar_url && getAvatarUrl(avatar_url)}
                                                width="300px"
                                                height='300px'

                                          />
                                          <div className="mt-5 flex gap-2 justify-center">
                                                <h2 className=" font-bold mb-2 text-xl">{first_name}</h2>
                                                <h2 className=" font-bold text-xl">{last_name}</h2>
                                          </div>
                                    </div>

                                    <div className=" ms-10 col-span-7 ">

                                          <Accordion variant="splitted">
                                                <AccordionItem startContent={<HeartIcon className=" text-red-800" />} aria-label="Accordion 1" title="Favourite games">

                                                </AccordionItem>
                                                <AccordionItem key="2" aria-label="Accordion 2" title="Your review">

                                                </AccordionItem>

                                          </Accordion>



                                    </div>
                              </div>
                        </CardBody>
                  </Card>

            </div>
      )
}