import { motion } from "motion/react";
import { Menu, X, Settings } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Showreel", href: "#showreel" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl sm:text-2xl tracking-wider cursor-pointer"
          >
            KAIINA
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.1 }}
                className="text-sm lg:text-base tracking-wide hover:text-purple-400 transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="/admin"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.1 }}
              className="text-sm lg:text-base tracking-wide hover:text-purple-400 transition-colors opacity-50 hover:opacity-100"
              title="Admin Panel"
            >
              <Settings size={18} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-base tracking-wide hover:text-purple-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 py-3 text-base tracking-wide hover:text-purple-400 transition-colors opacity-50"
            >
              <Settings size={18} />
              Admin
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}