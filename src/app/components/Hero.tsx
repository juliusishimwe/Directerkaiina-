import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import logoImage from "../../imports/dddd.jpg-2.jpeg";

export function Hero() {
  // Preload logo image
  useEffect(() => {
    const img = new Image();
    img.src = logoImage;
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black" />

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform, opacity" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform, opacity" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 sm:mb-12 flex justify-center"
        >
          <svg
            viewBox="0 0 220 340"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="KAIINA Director Logo"
            className="w-40 sm:w-52 lg:w-64 h-auto"
            style={{
              filter: "drop-shadow(0 0 32px rgba(168, 85, 247, 0.45)) drop-shadow(0 0 64px rgba(59, 130, 246, 0.3))",
              transform: "rotate(90deg)"
            }}
          >
            <defs>
              {/* Outer rim metallic gradient */}
              <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#d0d0d8" />
                <stop offset="18%"  stopColor="#f4f4f8" />
                <stop offset="35%"  stopColor="#8a8a96" />
                <stop offset="50%"  stopColor="#c8c8d4" />
                <stop offset="68%"  stopColor="#f0f0f5" />
                <stop offset="82%"  stopColor="#7a7a86" />
                <stop offset="100%" stopColor="#b0b0bc" />
              </linearGradient>
              {/* Inner dark fill */}
              <linearGradient id="innerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#1a1a1e" />
                <stop offset="50%"  stopColor="#0d0d10" />
                <stop offset="100%" stopColor="#111116" />
              </linearGradient>
              {/* Text metallic gradient */}
              <linearGradient id="textGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#c8c8d4" />
                <stop offset="25%"  stopColor="#f0f0f5" />
                <stop offset="50%"  stopColor="#9090a0" />
                <stop offset="75%"  stopColor="#e0e0ea" />
                <stop offset="100%" stopColor="#a0a0b0" />
              </linearGradient>
              {/* Inner rim highlight */}
              <linearGradient id="innerRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#3a3a46" />
                <stop offset="40%"  stopColor="#5a5a68" />
                <stop offset="100%" stopColor="#2a2a34" />
              </linearGradient>
            </defs>

            {/* Outer metallic rim */}
            <ellipse cx="110" cy="170" rx="96" ry="158" fill="url(#rimGrad)" />

            {/* Inner dark inset ring */}
            <ellipse cx="110" cy="170" rx="88" ry="150" fill="url(#innerRimGrad)" />

            {/* Dark interior */}
            <ellipse cx="110" cy="170" rx="82" ry="144" fill="url(#innerGrad)" />

            {/* KAIINA text — vertical, centered */}
            <text
              x="110"
              y="176"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="url(#textGrad)"
              fontFamily="'Arial Black', 'Arial', sans-serif"
              fontWeight="900"
              fontSize="52"
              letterSpacing="6"
              transform="rotate(-90, 110, 170)"
              style={{ fontStretch: "condensed" }}
            >
              KAIINA
            </text>

            {/* ® mark */}
            <text
              x="150"
              y="32"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#9090a0"
              fontFamily="Arial, sans-serif"
              fontSize="13"
              fontWeight="400"
            >
              ®
            </text>
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base sm:text-lg lg:text-xl text-gray-300 tracking-widest mb-8 sm:mb-12 px-4"
        >
          CINEMATIC STORYTELLER / VISUAL ARTIST
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full tracking-wider transition-all duration-300 text-sm sm:text-base"
          onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
        >
          VIEW MY WORK
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white/50" />
      </motion.div>
    </section>
  );
}
