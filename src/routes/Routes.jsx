import { createBrowserRouter, createRoutesFromElements, Route, } from "react-router";
import AppLayout from "../layout/Applayout";
import AppHome from "../pages/AppHome";
import { preLoadedFilters } from "../lib/fetch";

const router = createBrowserRouter(
      createRoutesFromElements(
            <Route path="/" element={<AppLayout />}>
                  <Route path="/" element={<AppHome/>} loader={preLoadedFilters}/>
            </Route>
      )
);

export default router;