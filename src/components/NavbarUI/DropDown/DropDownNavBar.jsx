import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User, Button } from "@nextui-org/react";
import supabase from "../../../supabase/client";
import { Link } from "react-router";

export default function DropDownNavBar() {
      const signOut = async () => {
            const { error } = await supabase.auth.signOut()
            if (error) {
                  alert(error)
            }
      }
      return (
            <Dropdown backdrop="blur" placement="bottom-start" className=" bg-zinc-800">
                  <DropdownTrigger>
                        <User
                              as="button"
                              avatarProps={{
                                    isBordered: true,
                                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                              }}
                              className="transition-transform"
                              name="Tony Reichert"
                        />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat" className="text-white">
                        <DropdownItem className=" data-[hover=true]:bg-zinc-500 " color="white"><span >Profile</span></DropdownItem>
                        <DropdownItem className=" data-[hover=true]:bg-zinc-500 "><span >Update</span></DropdownItem>
                        <DropdownItem color="danger" onPress={signOut}>
                              <span >Log out</span>
                        </DropdownItem>
                  </DropdownMenu>
            </Dropdown>

      )
}