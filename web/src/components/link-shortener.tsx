import { LinkShortenerForm } from "./link-shortener-form";
import { MyLinks } from "./my-links";
import { motion } from "motion/react";

export function LinkShortener() {
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
          className="w-[55%] h-fit bg-gray-100 rounded-3xl max-md:w-full"
        >
          <MyLinks />
        </motion.div>
      </div>
    </div>
  );
}
