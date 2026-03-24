"use client";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import Roadmap from "@/components/Roadmap";
import TopicCard from "@/components/TopicCard";
import HyperparameterExplainer from "@/components/HyperparameterExplainer";
import PipelineFlow from "@/components/PipelineFlow";
import { topics } from "@/data/topics";

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="h-px w-32 bg-gradient-to-r from-transparent via-border-2 to-transparent" />
    </div>
  );
}

export default function Home() {
  const fundamentals = topics.filter((t) => t.phaseNum === 2);
  const algorithms = topics.filter((t) => t.phaseNum === 3);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <HeroSection />

      {/* Roadmap */}
      <Roadmap />

      <SectionDivider />

      {/* Topics Section */}
      <section id="topics" className="py-16 sm:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Phase 2: Fundamentals */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-glow flex items-center justify-center text-purple text-sm font-semibold">
                2
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary">
                ML Fundamentals
              </h2>
            </div>
            <p className="text-text-secondary text-sm ml-11">
              Core concepts every ML engineer must master before algorithms.
            </p>
          </motion.div>

          <div className="space-y-4">
            {fundamentals.map((topic, i) => (
              <TopicCard key={topic.id} topic={topic} index={i} />
            ))}
          </div>

          <SectionDivider />

          {/* Phase 3: Algorithms */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-glow flex items-center justify-center text-amber text-sm font-semibold">
                3
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary">
                Algorithms
              </h2>
            </div>
            <p className="text-text-secondary text-sm ml-11">
              From decision trees to gradient boosting — understand every algorithm deeply.
            </p>
          </motion.div>

          <div className="space-y-4">
            {algorithms.map((topic, i) => (
              <TopicCard key={topic.id} topic={topic} index={i} />
            ))}
          </div>

          <SectionDivider />

          {/* Hyperparameter Explorer */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-teal-glow flex items-center justify-center text-teal text-sm font-semibold">
                ⚙
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary">
                Hyperparameter Explorer
              </h2>
            </div>
            <p className="text-text-secondary text-sm ml-11 mb-8">
              Drag the sliders to see how hyperparameters affect bias, variance, and overfitting.
            </p>
          </motion.div>

          <HyperparameterExplainer />
        </div>
      </section>

      <SectionDivider />

      {/* Pipeline */}
      <PipelineFlow />

      <SectionDivider />

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-text-secondary text-sm mb-1">
            ML DeepDive — Built for Interview Mastery
          </p>
          <p className="text-text-tertiary text-xs mb-6">
            Think. Explain. Build.
          </p>

          <div className="flex items-center justify-center gap-5 mb-6">
            <a href="https://github.com/23f1000932" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-xl glass flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-purple/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.1)]" aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/ayan-hussain-58752626b/" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-xl glass flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-blue-400/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(96,165,250,0.1)]" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.instagram.com/_._a.y.a.n_._/" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-xl glass flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-pink-400/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,114,182,0.1)]" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="mailto:ayanhussain4212@gmail.com" className="group w-10 h-10 rounded-xl glass flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-amber/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.1)]" aria-label="Email">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            </a>
          </div>

          <p className="text-text-tertiary/70 text-xs">
            Made with ❤️ By <span className="text-text-secondary font-medium">Ayan Hussain</span>
          </p>
        </motion.div>
      </footer>
    </main>
  );
}
