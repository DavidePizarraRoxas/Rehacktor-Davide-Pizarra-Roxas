import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User, Button } from "@nextui-org/react";
import supabase from "../../../supabase/client";
import { Link, } from "react-router";
import { UseProfile } from "../../../hooks/UseProfile";
import { getAvatarUrl } from "../../../utils/getAvatarUrl";


export default function DropDownNavBar() {

      const { username, avatar_url } = UseProfile();

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
                                    src: avatar_url && getAvatarUrl(avatar_url)
                              }}
                              className="transition-transform"
                              name={`Hello ${username}`}
                        />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat" className="text-white">


                        <DropdownItem className=" data-[hover=true]:bg-zinc-500 " color="white" >
                              <Link to={`/profile`} className="block w-full">
                                    Profile
                              </Link>
                        </DropdownItem>
                        <DropdownItem className=" data-[hover=true]:bg-zinc-500" color="white" >
                              <Link to={`/account`} className="block w-full" >
                                    Account
                              </Link>
                        </DropdownItem>

                        <DropdownItem color="danger" onPress={signOut}>
                              <span >Log out</span>
                        </DropdownItem>


                  </DropdownMenu>
            </Dropdown>

      )
}