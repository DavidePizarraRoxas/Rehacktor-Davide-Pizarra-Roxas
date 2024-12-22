import { Outlet } from "react-router";
import Navabar from "../components/NavbarUI/NavabarUI/Navbar";



export default function AppLayout() {
      return (
            <>
                  <Navabar />
                  <Outlet />
            </>
      )
}