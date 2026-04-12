import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Resume from "../pages/resume/page";
import ImpactStories from "../pages/impact-stories/page";
import ContactPage from "../pages/contact/page";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/resume", element: <Resume /> },
  { path: "/impact-stories", element: <ImpactStories /> },
  { path: "/contact", element: <ContactPage /> },
  {
    path: "/leadership",
    element: <Navigate to={{ pathname: "/", hash: "leadership" }} replace />,
  },
  /** Legacy nav path; testimonials page not yet published — send visitors home instead of 404. */
  { path: "/testimonials", element: <Navigate to="/" replace /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
