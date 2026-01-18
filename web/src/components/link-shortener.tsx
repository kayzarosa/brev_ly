import { useGetListLinks } from "@/store/links";
import { LinkShortenerForm } from "./link-shortener-form";
import { MyLinks } from "./my-links";
import { motion, AnimatePresence } from "motion/react";

export function LinkShortener() {
	const { isFetching: isLoading } = useGetListLinks();

	return (
		<div className="w-full max-w-[calc(100vw-1.66vw)] md:max-w-[calc(100vw-26.8vw)] h-full">
			<header className="flex mt-22 mb-8 max-md:justify-center max-md:mt-8">
				<img src="logo.svg" width="96.67px" height="24.29px" alt="Brev.ly" />
			</header>

			<div className="flex w-full flex-col gap-3 md:flex-row md:gap-5">
				<div className="w-[45%] h-fit bg-gray-100 rounded-3xl max-md:w-full">
					<LinkShortenerForm />
				</div>

				<motion.div
					className={`w-[55%] h-fit rounded-3xl max-md:w-full relative overflow-hidden bg-white 
            ${isLoading ? "p-0.5" : "p-0"}`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<AnimatePresence>
						{isLoading && (
							<motion.div
								className="absolute inset-0 z-0"
								style={{
									background: "var(--background-gradient)",
									backgroundSize: "200% 100%",
								}}
								animate={{
									backgroundPosition: ["0% 0%", "200% 0%"],
								}}
								transition={{
									duration: 8,
									repeat: Infinity,
									ease: "linear",
								}}
							/>
						)}
					</AnimatePresence>

					<div
						className={`relative z-10 ${isLoading ? "rounded-[22px]" : "rounded-0"} bg-gray-100`}
					>
						<MyLinks />
					</div>
				</motion.div>
			</div>
		</div>
	);
}
