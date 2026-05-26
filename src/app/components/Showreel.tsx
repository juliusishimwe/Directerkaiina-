import { motion } from "motion/react";
import { Play, Volume2 } from "lucide-react";
import { useContent } from "../context/ContentContext";

export function Showreel() {
  const { showreelData } = useContent();

  return (
    <section id="showreel" className="py-16 sm:py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl mb-4 tracking-tight">SHOWREEL</h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6" />
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            A curated selection of cinematic moments showcasing the art of visual storytelling
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video bg-gradient-to-br from-purple-900/40 via-black to-blue-900/40 rounded-lg overflow-hidden group cursor-pointer max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500" />

          {/* Play Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 border-2 border-white/30">
              <Play className="w-8 h-8 sm:w-12 sm:h-12 fill-white ml-1" />
            </div>
          </motion.div>

          {/* Volume Indicator */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Sound On</span>
          </div>

          {/* Duration */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-black/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm">
            {showreelData.duration}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl mb-2 tracking-wide">{showreelData.title}</h3>
            <p className="text-xs sm:text-sm text-gray-400">{showreelData.subtitle}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}