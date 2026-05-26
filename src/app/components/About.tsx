import { motion } from "motion/react";
import { Film, Award, Users } from "lucide-react";

export function About() {
  const stats = [
    { icon: Film, value: "50+", label: "Projects Completed" },
    { icon: Award, value: "15+", label: "Awards Won" },
    { icon: Users, value: "100+", label: "Collaborations" },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 tracking-tight">ABOUT</h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mb-8" />

            <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
              KAIINA is a visionary film director specializing in creating immersive cinematic experiences
              that push the boundaries of visual storytelling. With a unique blend of technical precision
              and artistic vision, every project becomes a journey into uncharted creative territory.
            </p>

            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
              From feature films to commercial campaigns, the focus remains on crafting narratives that
              resonate emotionally while maintaining the highest production standards.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-500 hover:bg-purple-500/20 rounded-full tracking-wider transition-all duration-300 text-sm sm:text-base"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              GET IN TOUCH
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 sm:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10 rounded-lg p-6 sm:p-8 text-center hover:border-purple-500/50 transition-all duration-300"
              >
                <stat.icon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-purple-400" />
                <div className="text-3xl sm:text-4xl lg:text-5xl mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-400 tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
