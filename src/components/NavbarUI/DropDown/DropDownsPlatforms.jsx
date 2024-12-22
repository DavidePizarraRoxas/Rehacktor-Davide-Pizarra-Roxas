import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useLoaderData } from "react-router";

export default function DropDownsPlatforms() {
      const {platforms} = useLoaderData();
      return (
            <Dropdown backdrop="blur">
                  <DropdownTrigger>
                        <Button variant="bordered">Choose Platforms</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" variant="faded">
                  {platforms.map((platform)=> (
                              <DropdownItem key={platform.id} className=" data-[hover=true]:bg-zinc-500 "><span className="text-white">{platform.name}</span></DropdownItem>
                        ))}

                  </DropdownMenu>
            </Dropdown>
      );
}