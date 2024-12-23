import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar } from "@nextui-org/react";
import { Link, useLoaderData } from "react-router";

export default function DropDownsGenres() {
      const { genres } = useLoaderData();
      return (
            <Dropdown backdrop="blur" className=" bg-zinc-800 dropdown bg-none dropdown border-none">
                  <DropdownTrigger>
                        <Button variant="bordered">Choose Genres</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" variant="faded" className="max-h-[50vh] overflow-y-auto border-none">
                        {genres.map((genre) => (
                              <DropdownItem key={genre.id} className=" data-[hover=true]:bg-zinc-500 ">
                                    <Link to={`/genre/${genre.slug}`}>
                                          <div className="flex gap-4">
                                                <Avatar
                                                      isBordered
                                                      color="primary"
                                                      src={genre.image_background}

                                                />
                                                <span className="text-white mt-2">{genre.name}</span>
                                          </div>

                                    </Link>
                              </DropdownItem>
                        ))}
                  </DropdownMenu>
            </Dropdown>
      );
}