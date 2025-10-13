import { motion } from "framer-motion";
import Lottie from "lottie-react";

import loadingAnimation from "@/../public/lotties/Loading.json";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white dark:bg-[#030f18] z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Lottie
        animationData={loadingAnimation}
        loop
        className="w-1/2 h-1/2 relative z-10 brightness-100 dark:brightness-70"
      />
    </motion.div>
  );
}
