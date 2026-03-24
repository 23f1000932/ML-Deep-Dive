"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pipelineSteps } from "@/data/pipeline";

function PipelineStep({ step, index, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="relative"
    >
      {/* Connector line */}
      {index < pipelineSteps.length - 1 && (
        <div className="absolute left-5 top-12 w-px h-full bg-gradient-to-b from-border-2 to-transparent" />
      )}

      <button
        onClick={onClick}
        className={`w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-300 group ${
          isActive
            ? "bg-purple-glow/30 border border-purple/20 shadow-[0_0_30px_rgba(167,139,250,0.08)]"
            : "hover:bg-surface-2/50"
        }`}
      >
        {/* Step number circle */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 text-lg ${
          isActive ? "bg-purple/20 shadow-[0_0_15px_rgba(167,139,250,0.2)]" : "bg-surface-3"
        }`}>
          {step.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono ${isActive ? "text-purple" : "text-text-tertiary"}`}>
              0{step.id}
            </span>
            <h3 className={`text-sm font-semibold transition-colors ${isActive ? "text-purple" : "text-text-primary group-hover:text-text-primary"}`}>
              {step.title}
            </h3>
          </div>
          <p className="text-xs text-text-tertiary mt-0.5 line-clamp-1">{step.description}</p>
        </div>

        <motion.span
          animate={{ rotate: isActive ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-text-tertiary text-xs mt-3 shrink-0"
        >
          →
        </motion.span>
      </button>
    </motion.div>
  );
}

export default function PipelineFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const step = pipelineSteps[activeStep];

  return (
    <section id="pipeline" className="py-24 sm:py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 text-sm text-text-secondary">
            <span className="text-base">🧩</span>
            End-to-End System Design
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-text-primary mb-4">
            How to Build an <span className="text-gradient">ML System</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            The complete pipeline, structured as an interview answer. Click each step to explore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Steps list */}
          <div className="lg:col-span-2 space-y-1">
            {pipelineSteps.map((s, i) => (
              <PipelineStep
                key={s.id}
                step={s}
                index={i}
                isActive={i === activeStep}
                onClick={() => setActiveStep(i)}
              />
            ))}
          </div>

          {/* Active step detail */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl p-6 space-y-5 sticky top-8"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{step.icon}</span>
                  <div>
                    <span className="text-xs font-mono text-purple">Step {step.id} of {pipelineSteps.length}</span>
                    <h3 className="text-xl font-semibold text-text-primary">{step.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>

                {/* Interview answer */}
                <div className="rounded-xl bg-purple-glow/30 border border-purple/20 p-4">
                  <h4 className="text-sm font-semibold text-purple mb-2 flex items-center gap-2">
                    <span>💬</span> How to Explain in Interview
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.interviewAnswer}</p>
                </div>

                {/* Common mistakes */}
                <div className="rounded-xl bg-coral-glow/30 border border-coral/20 p-4">
                  <h4 className="text-sm font-semibold text-coral mb-3 flex items-center gap-2">
                    <span>⚠️</span> Real-World Mistakes
                  </h4>
                  <ul className="space-y-2">
                    {step.mistakes.map((m, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="text-coral/60 mt-0.5 shrink-0">✕</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tradeoffs */}
                <div className="rounded-xl bg-amber-glow/30 border border-amber/20 p-4">
                  <h4 className="text-sm font-semibold text-amber mb-2 flex items-center gap-2">
                    <span>⚖️</span> Trade-offs
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.tradeoffs}</p>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="text-sm text-text-tertiary hover:text-text-secondary disabled:opacity-30 transition-colors"
                  >
                    ← Previous
                  </button>
                  <span className="text-xs text-text-tertiary">
                    {activeStep + 1} / {pipelineSteps.length}
                  </span>
                  <button
                    onClick={() => setActiveStep(Math.min(pipelineSteps.length - 1, activeStep + 1))}
                    disabled={activeStep === pipelineSteps.length - 1}
                    className="text-sm text-purple hover:text-purple/80 disabled:opacity-30 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
