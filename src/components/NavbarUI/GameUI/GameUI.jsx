import { Card, CardFooter, Button } from "@nextui-org/react"
import GameImage from "./components/GameImage"
import { Link } from "react-router"
export default function GameUI({ game }) {

      const { background_image: image } = game
      return (
            <Card isFooterBlurred className=" h-[300px] card ">
                  <GameImage image={image} />
                  <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">

                              <div className="flex flex-col">

                                    <p className="text-medium ">{game.name}</p>
                              </div>
                        </div>

                        <Link to={`/game/${game.id}`}>
                              <Button radius="full" size="sm" color="primary">
                                    Details
                              </Button>
                        </Link>
                  </CardFooter>
            </Card>
      )
}