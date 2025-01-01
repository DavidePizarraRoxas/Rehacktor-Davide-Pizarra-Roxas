import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, } from "react-router";
import AppLayout from "../layout/Applayout";
import AppHome from "../pages/AppHome";
import { fetchGame,  preLoadedFilters } from "../lib/fetch";
import AppGenre from "../pages/AppGenre";
import AppPlatform from "../pages/Appplatform";
import AppGame from "../pages/AppGame";
import AppSingIn from "../pages/AppSingIn";
import AppSingUp from "../pages/AppSingUp";
import AppProfile from "../pages/AppProfile";
import AppAccount from "../pages/AppAccount";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";



export function ProtectedRoutes() {
      const session = useContext(SessionContext);
      if (!session) {
            return <Navigate to={`/`} />
      }

      return <Outlet />
}

const router = createBrowserRouter(
      createRoutesFromElements(
            <Route path="/" element={<AppLayout />}>
                  <Route path="/" element={<AppHome />} loader={preLoadedFilters}  />
                  <Route path="/genre/:genre_slug" element={<AppGenre />} />
                  <Route path="/platform/:platform_slug" element={<AppPlatform />} />
                  <Route path="/game/:id" element={<AppGame />} loader={fetchGame} />
                  <Route path="/singin" element={<AppSingIn />} />
                  <Route path="/singup" element={<AppSingUp />} />
                  <Route element={<ProtectedRoutes/>}>
                        <Route path="/profile" element={<AppProfile />} />
                        <Route path="/account" element={<AppAccount />} />
                  </Route>

            </Route>
      )
);

export default router;