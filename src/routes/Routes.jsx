import { createBrowserRouter, createRoutesFromElements, Route, } from "react-router";
import AppLayout from "../layout/Applayout";
import AppHome from "../pages/AppHome";
import { preLoadedFilters } from "../lib/fetch";
import AppGenre from "../pages/AppGenre";
import AppPlatform from "../pages/Appplatform";
import AppGame from "../pages/AppGame";

const router = createBrowserRouter(
      createRoutesFromElements(
            <Route path="/" element={<AppLayout />}>
                  <Route path="/" element={<AppHome/>} loader={preLoadedFilters}/>
                  <Route path="genre/:genre_slug" element={<AppGenre/>}/>
                  <Route path="platform/:platform_slug" element={<AppPlatform/>} />
                  <Route path="game/:id" element={<AppGame/>} />
            </Route>
      )
);

export default router;