import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages/home";
import { NotFound } from "@/pages/not-found";
import { Redirecting } from "@/pages/redirecting";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:urlShortened",
    element: <Redirecting />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
