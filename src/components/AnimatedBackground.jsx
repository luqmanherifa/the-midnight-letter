import { motion } from "framer-motion";

export default function AnimatedBackground({ theme = "dark" }) {
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute rounded-full ${
            isDark ? "bg-stone-700/40" : "bg-stone-400/40"
          }`}
          style={{
            width: `${150 + i * 80}px`,
            height: `${150 + i * 80}px`,
            left: `${i * 25 - 10}%`,
            top: `${i * 25 + 10}%`,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.4, 0.7, 0.5, 0.4],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 50%, rgba(41, 37, 36, 0.4) 0%, transparent 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(214, 211, 209, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute rounded-full ${
            isDark ? "bg-stone-400/80" : "bg-stone-500/80"
          }`}
          style={{
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            left: `${(i * 5 + (i % 3) * 10) % 95}%`,
            top: `${100 + (i % 4) * 8}%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [-80, -900],
            x: [0, (i % 2 === 0 ? 40 : -40) + (i % 3) * 10],
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1.2, 1, 0.8],
          }}
          transition={{
            duration: 12 + (i % 6) * 2,
            repeat: Infinity,
            ease: "linear",
            delay: (i * 0.8) % 12,
          }}
        />
      ))}

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-small-${i}`}
          className={`absolute rounded-full ${
            isDark ? "bg-stone-300/70" : "bg-stone-600/70"
          }`}
          style={{
            width: "1.5px",
            height: "1.5px",
            left: `${(i * 7 + 15) % 90}%`,
            top: `${100 + (i % 3) * 12}%`,
            filter: "blur(0.3px)",
          }}
          animate={{
            y: [-60, -700],
            x: [0, i % 3 === 0 ? 20 : i % 3 === 1 ? -20 : 0],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 10 + (i % 4) * 2,
            repeat: Infinity,
            ease: "linear",
            delay: (i * 1.2) % 10,
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, transparent 30%, rgba(12, 10, 9, 0.6) 100%)"
            : "radial-gradient(ellipse at center, transparent 30%, rgba(245, 245, 244, 0.6) 100%)",
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
