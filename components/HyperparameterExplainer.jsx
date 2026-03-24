"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const params = [
  {
    name: "learning_rate",
    label: "Learning Rate (η)",
    min: 0.001,
    max: 1.0,
    default: 0.3,
    step: 0.001,
    biasEffect: (v) => Math.max(0, 1 - v * 1.2),
    varianceEffect: (v) => Math.min(1, v * 1.5),
    description: "Controls how much each tree contributes. Lower = slower but better generalization."
  },
  {
    name: "max_depth",
    label: "Max Depth",
    min: 1,
    max: 15,
    default: 6,
    step: 1,
    biasEffect: (v) => Math.max(0, 1 - v / 12),
    varianceEffect: (v) => Math.min(1, v / 10),
    description: "Maximum depth of each tree. Controls model complexity."
  },
  {
    name: "n_estimators",
    label: "Number of Trees",
    min: 10,
    max: 1000,
    default: 100,
    step: 10,
    biasEffect: (v) => Math.max(0, 1 - v / 800),
    varianceEffect: (v) => Math.min(1, v / 1200),
    description: "Number of boosting rounds. More trees = lower bias but slower training."
  },
  {
    name: "subsample",
    label: "Subsample Ratio",
    min: 0.1,
    max: 1.0,
    default: 1.0,
    step: 0.05,
    biasEffect: (v) => Math.max(0, 0.3 * (1 - v)),
    varianceEffect: (v) => Math.max(0, 1 - (1 - v) * 2),
    description: "Fraction of training data used per tree. Lower adds randomness."
  }
];

function BarChart({ label, value, color, colorClass }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-text-tertiary w-16 text-right shrink-0">{label}</span>
      <div className="flex-1 h-2.5 bg-surface-3 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(5, value * 100)}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs text-text-tertiary w-10 shrink-0">{(value * 100).toFixed(0)}%</span>
    </div>
  );
}

export default function HyperparameterExplainer() {
  const [values, setValues] = useState(
    Object.fromEntries(params.map(p => [p.name, p.default]))
  );

  const updateValue = (name, val) => {
    setValues(prev => ({ ...prev, [name]: parseFloat(val) }));
  };

  // Calculate aggregate effects
  const avgBias = params.reduce((sum, p) => sum + p.biasEffect(values[p.name]), 0) / params.length;
  const avgVariance = params.reduce((sum, p) => sum + p.varianceEffect(values[p.name]), 0) / params.length;
  const overfitting = avgVariance > 0.6;
  const underfitting = avgBias > 0.5;
  const balanced = !overfitting && !underfitting;

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <span>🎛️</span> Interactive Hyperparameter Explorer
        </h3>
        <button
          onClick={() => setValues(Object.fromEntries(params.map(p => [p.name, p.default])))}
          className="text-xs text-text-tertiary hover:text-text-secondary transition-colors px-3 py-1 rounded-lg glass"
        >
          Reset
        </button>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {params.map((p) => (
          <div key={p.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">{p.label}</label>
              <span className="text-sm font-mono text-purple">{
                Number.isInteger(p.step) || p.step >= 1
                  ? Math.round(values[p.name])
                  : values[p.name].toFixed(3)
              }</span>
            </div>
            <input
              type="range"
              min={p.min}
              max={p.max}
              step={p.step}
              value={values[p.name]}
              onChange={(e) => updateValue(p.name, e.target.value)}
              className="w-full h-1.5 bg-surface-3 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(167,139,250,0.4)]
                [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:hover:shadow-[0_0_20px_rgba(167,139,250,0.6)]"
            />
            <p className="text-xs text-text-tertiary">{p.description}</p>
          </div>
        ))}
      </div>

      {/* Effect visualization */}
      <div className="border-t border-border pt-5 space-y-4">
        <h4 className="text-sm font-semibold text-text-primary">Effect on Model</h4>

        <div className="space-y-3">
          <BarChart label="Bias" value={avgBias} color="amber" colorClass="bg-amber" />
          <BarChart label="Variance" value={avgVariance} color="purple" colorClass="bg-purple" />
        </div>

        {/* Status indicator */}
        <div className={`rounded-xl p-4 flex items-center gap-3 ${
          overfitting ? "bg-coral-glow/30 border border-coral/20" :
          underfitting ? "bg-amber-glow/30 border border-amber/20" :
          "bg-teal-glow/30 border border-teal/20"
        }`}>
          <span className="text-2xl">
            {overfitting ? "📈" : underfitting ? "📉" : "✅"}
          </span>
          <div>
            <p className={`text-sm font-semibold ${
              overfitting ? "text-coral" : underfitting ? "text-amber" : "text-teal"
            }`}>
              {overfitting ? "Overfitting Risk" : underfitting ? "Underfitting Risk" : "Good Balance"}
            </p>
            <p className="text-xs text-text-tertiary">
              {overfitting
                ? "Model is too complex. Reduce max_depth, increase subsample, or lower learning_rate."
                : underfitting
                ? "Model is too simple. Increase max_depth, add more trees, or increase learning_rate."
                : "Model complexity is well-balanced between bias and variance."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
