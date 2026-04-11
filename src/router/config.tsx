import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Resume from "../pages/resume/page";
import ImpactStories from "../pages/impact-stories/page";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/resume", element: <Resume /> },
  { path: "/impact-stories", element: <ImpactStories /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
