import { motion } from "framer-motion";

const PulsingCircle = ({ x, y }: { x: number; y: number }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-blue-400/50"
      style={{
        left: x,
        top: y,
        width: 40,
        height: 40,
      }}
      animate={{
        scale: [1, 2, 1],
        opacity: [0.7, 0.2, 0.7],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default PulsingCircle;