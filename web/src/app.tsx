import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";

export function App() {
   return (
    <main className="h-dvh flex flex-col items-center justify-center">
      <RouterProvider router={router} />
    </main>
  )
}
