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
      <footer className="py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-text-tertiary text-sm mb-2">
            ML DeepDive — Built for Interview Mastery
          </p>
          <p className="text-text-tertiary/50 text-xs">
            Think. Explain. Build.
          </p>
        </motion.div>
      </footer>
    </main>
  );
}
