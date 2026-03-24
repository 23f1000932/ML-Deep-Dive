"use client";
import { motion } from "framer-motion";

const roadmapNodes = [
  { id: "data", label: "Data", icon: "📦", x: 0, description: "Collection, Cleaning, EDA" },
  { id: "features", label: "Features", icon: "⚙️", x: 1, description: "Engineering, Encoding, Scaling" },
  { id: "models", label: "Models", icon: "🧠", x: 2, description: "Algorithms, Training, Tuning" },
  { id: "evaluation", label: "Evaluation", icon: "📊", x: 3, description: "Metrics, Validation, Testing" },
  { id: "pipeline", label: "Pipeline", icon: "🚀", x: 4, description: "End-to-End ML System" },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 sm:py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-text-primary mb-4">
            Your ML <span className="text-gradient">Learning Path</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Master each stage of the machine learning pipeline — from raw data to deployed models.
          </p>
        </motion.div>

        {/* Roadmap cards */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-2 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {roadmapNodes.map((node, i) => (
              <motion.a
                key={node.id}
                href={node.id === "pipeline" ? "#pipeline" : "#topics"}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="glass rounded-2xl p-6 text-center transition-all duration-500 hover:bg-surface-2/80 hover:border-purple/20 group-hover:shadow-[0_0_40px_rgba(167,139,250,0.1)] cursor-pointer">
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-surface-3 border border-border-2 flex items-center justify-center text-[10px] text-text-tertiary font-medium group-hover:border-purple/40 group-hover:text-purple transition-colors">
                    {i + 1}
                  </div>

                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {node.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1 group-hover:text-purple transition-colors">
                    {node.label}
                  </h3>
                  <p className="text-xs text-text-tertiary leading-relaxed">
                    {node.description}
                  </p>
                </div>

                {/* Arrow connector for desktop */}
                {i < roadmapNodes.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 -translate-y-1/2 text-text-tertiary z-10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:text-purple transition-colors">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </div>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
