import { motion } from "framer-motion";

export function TypewriterText({ text, delay = 0, speed = 0.03 }) {
  return (
    <span style={{ display: "inline-block" }}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: delay + index * speed,
            ease: "easeIn",
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
