import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages/home";
import { NotFound } from "@/pages/not-found";
import { Redirecting } from "@/pages/redirecting";
import { validateLinkMiddleware } from "@/middleware/validate-link";
import { LoadingPage } from "@/pages/loading-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:urlShortened",
    element: <Redirecting />,
    hydrateFallbackElement: <LoadingPage />,
    loader: async ({ params }) => {
      const { urlShortened } = params;

      return validateLinkMiddleware(urlShortened);
    },
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
