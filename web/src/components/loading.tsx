import { motion } from "motion/react";
import { LoaderPinwheel } from "lucide-react";

type LoadingProps = {
  text: string;
}

export function Loading({ text }: LoadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="inset-0 z-50 flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <LoaderPinwheel className="w-10 h-10 text-blue-base" />
      </motion.div>
      <motion.span
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-4 text-gray-500 text-center text-xs uppercase"
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
