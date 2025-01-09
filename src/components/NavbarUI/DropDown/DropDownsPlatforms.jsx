import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar } from "@nextui-org/react";
import { Link, useLoaderData } from "react-router";

export default function DropDownsPlatforms() {
      const { platforms } = useLoaderData();


      return (
            <Dropdown backdrop="blur" className=" bg-zinc-800 dropdown">
                  <DropdownTrigger>
                        <Button variant="bordered">Choose Platforms</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" variant="faded" className="max-h-[50vh] overflow-y-auto">
                        {platforms.map((platform) => (
                              <DropdownItem key={platform.id} className=" data-[hover=true]:bg-zinc-500" textValue="Dropdown platforms">
                                    <Link to={`/platform/${platform.id}`}>
                                          <div className="flex gap-4">
                                                <Avatar isBordered
                                                      color="primary"
                                                      src={platform.image_background}
                                                />
                                                <span className="text-white mt-2">{platform.name}</span>
                                          </div>
                                    </Link>

                              </DropdownItem>
                        ))}

                  </DropdownMenu>
            </Dropdown>
      );
}