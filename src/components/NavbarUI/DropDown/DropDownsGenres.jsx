import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useLoaderData } from "react-router";

export default function DropDownsGenres() {
      const { genres } = useLoaderData();
      return (
            <Dropdown backdrop="blur" className=" bg-zinc-800 dropdown">
                  <DropdownTrigger>
                        <Button variant="bordered">Choose Genres</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" variant="faded" className="max-h-[50vh] overflow-y-auto">
                        {genres.map((genre)=> (
                              <DropdownItem key={genre.id} className=" data-[hover=true]:bg-zinc-500 "><span className="text-white">{genre.name}</span></DropdownItem>
                        ))}

                  </DropdownMenu>
            </Dropdown>
      );
}