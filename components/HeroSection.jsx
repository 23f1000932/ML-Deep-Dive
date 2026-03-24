"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-radial grid-bg">
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/8 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-coral/6 rounded-full blur-[80px] animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-purple animate-pulse-glow" />
            Interactive ML Interview System
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="text-gradient">Master</span>{" "}
          <span className="text-text-primary">Machine</span>
          <br />
          <span className="text-text-primary">Learning for</span>{" "}
          <span className="text-gradient-warm">Interviews</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Think. Explain. Build.
          <br />
          <span className="text-text-tertiary">From intuition to math to implementation — train yourself to answer like a top ML candidate.</span>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <a
            href="#roadmap"
            className="px-8 py-3.5 rounded-xl bg-purple-dim hover:bg-purple text-white font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(167,139,250,0.3)] text-sm"
          >
            Start Learning →
          </a>
          <a
            href="#topics"
            className="px-8 py-3.5 rounded-xl glass text-text-secondary hover:text-text-primary font-medium transition-all duration-300 text-sm"
          >
            Browse Topics
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex items-center justify-center gap-8 sm:gap-12 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          {[
            { num: "14", label: "Topics" },
            { num: "50+", label: "Interview Q&As" },
            { num: "9", label: "Pipeline Steps" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-text-primary">{stat.num}</div>
              <div className="text-xs text-text-tertiary mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-border-2 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-1 h-2.5 rounded-full bg-text-tertiary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
