import { motion } from "motion/react";
import { Mail, Instagram, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { useContent } from "../context/ContentContext";

export function Contact() {
  const { socialLinks, contactInfo } = useContent();

  const socialIcons: Record<string, any> = {
    Instagram,
    LinkedIn: Linkedin,
    Twitter,
    WhatsApp: MessageCircle,
  };

  const enabledSocials = socialLinks.filter(link => link.enabled);

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl mb-6 tracking-tight">{contactInfo.heading}</h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-12 sm:mb-16 px-4">
            {contactInfo.description}
          </p>

          <motion.a
            href={`mailto:${contactInfo.email}`}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full tracking-wider transition-all duration-300 text-base sm:text-lg mb-12 sm:mb-16"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            {contactInfo.email}
          </motion.a>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
            {enabledSocials.map((social, index) => {
              const Icon = socialIcons[social.platform];
              return (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              );
            })}
          </div>

          <div className="text-xs sm:text-sm text-gray-500 tracking-wider">
            © 2026 KAIINA. All rights reserved.
          </div>
        </motion.div>
      </div>
    </section>
  );
}