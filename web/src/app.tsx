import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import * as Toast from "@radix-ui/react-toast";

export function App() {
	return (
		<Toast.Provider swipeDirection="up">
			<main className="h-dvh flex flex-col items-center justify-center">
				<RouterProvider router={router} />

				<Toast.Viewport className="fixed top-0 right-0 m-4 w-auto max-w-sm z-50 outline-none" />
			</main>
		</Toast.Provider>
	);
}
