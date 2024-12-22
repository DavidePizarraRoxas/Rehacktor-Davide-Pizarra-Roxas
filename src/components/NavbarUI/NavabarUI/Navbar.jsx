import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function Navabar() {
      return (
            <Navbar shouldHideOnScroll isBordered className="navbar">
                  <NavbarBrand>

                        <p className="font-bold text-inherit">ACME</p>
                  </NavbarBrand>
                  <NavbarContent className="hidden sm:flex gap-4" justify="center">

                  </NavbarContent>
                  <NavbarContent justify="end">
                        <NavbarItem className="hidden lg:flex">
                              <Link href="#">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                              <Button color="primary" href="#" variant="flat">
                                    Sign Up
                              </Button>
                        </NavbarItem>
                  </NavbarContent>
            </Navbar>
      )
}