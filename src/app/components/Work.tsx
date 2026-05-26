import { motion } from "motion/react";
import { Play } from "lucide-react";
import { useContent } from "../context/ContentContext";

export function Work() {
  const { projects } = useContent();

  return (
    <section id="work" className="py-16 sm:py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl mb-4 tracking-tight">SELECTED WORK</h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className={`relative aspect-video bg-gradient-to-br ${project.gradient} rounded-lg overflow-hidden`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white" />
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 text-xs sm:text-sm text-gray-300">
                    <span className="tracking-wider">{project.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl mb-2 tracking-wide">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-md">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}