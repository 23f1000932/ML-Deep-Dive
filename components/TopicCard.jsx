"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function QAItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-text-primary hover:bg-surface-2 transition-colors"
      >
        <span>{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-text-tertiary text-xs shrink-0"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 text-sm text-text-secondary leading-relaxed border-t border-border bg-surface/50">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContentRenderer({ text }) {
  // Simple markdown-like rendering
  const lines = text.split("\n");
  const elements = [];
  let inList = false;
  let listItems = [];
  let isOrderedList = false;

  const processInline = (line) => {
    // Bold
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Inline code
    line = line.replace(/`([^`]+)`/g, '<code>$1</code>');
    return line;
  };

  const flushList = () => {
    if (listItems.length > 0) {
      const Tag = isOrderedList ? "ol" : "ul";
      elements.push(
        <Tag key={`list-${elements.length}`} className={`${isOrderedList ? "list-decimal" : "list-disc"} pl-5 mb-3 space-y-1`}>
          {listItems.map((item, i) => (
            <li key={i} className="text-sm text-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: processInline(item) }} />
          ))}
        </Tag>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      flushList();
      const content = trimmed.slice(2);
      elements.push(
        <blockquote key={idx} className="border-l-3 border-purple bg-purple-glow/40 px-4 py-3 rounded-r-lg my-3">
          <p className="text-sm text-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: processInline(content) }} />
        </blockquote>
      );
      return;
    }

    // Warning (⚠️)
    if (trimmed.startsWith("⚠️")) {
      flushList();
      elements.push(
        <div key={idx} className="border-l-3 border-coral bg-coral-glow/40 px-4 py-3 rounded-r-lg my-3">
          <p className="text-sm text-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: processInline(trimmed) }} />
        </div>
      );
      return;
    }

    // Unordered list item
    if (trimmed.startsWith("- ")) {
      if (!inList || isOrderedList) {
        flushList();
        inList = true;
        isOrderedList = false;
      }
      listItems.push(trimmed.slice(2));
      return;
    }

    // Ordered list item
    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)/);
    if (orderedMatch) {
      if (!inList || !isOrderedList) {
        flushList();
        inList = true;
        isOrderedList = true;
      }
      listItems.push(orderedMatch[1]);
      return;
    }

    // Table (simple markdown table)
    if (trimmed.startsWith("|")) {
      flushList();
      // Collect all table lines
      const tableLines = [trimmed];
      for (let j = idx + 1; j < lines.length; j++) {
        if (lines[j].trim().startsWith("|")) {
          tableLines.push(lines[j].trim());
        } else break;
      }
      // Skip if already rendered
      if (elements.find(e => e.key === `table-${idx}`)) return;

      const headers = tableLines[0].split("|").filter(Boolean).map(s => s.trim());
      const rows = tableLines.slice(2).map(row => row.split("|").filter(Boolean).map(s => s.trim()));

      elements.push(
        <div key={`table-${idx}`} className="overflow-x-auto my-3 rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-3">
                {headers.map((h, i) => (
                  <th key={i} className="text-left px-4 py-2.5 text-text-primary font-medium border-b border-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-2 text-text-secondary ${ci === 0 ? "font-mono text-purple text-xs" : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      return;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={idx} className="text-sm text-text-secondary leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: processInline(trimmed) }} />
    );
  });

  flushList();
  return <div className="topic-content">{elements}</div>;
}

function HyperparamTable({ params }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-3">
            <th className="text-left px-4 py-2.5 text-text-primary font-medium border-b border-border w-40">Parameter</th>
            <th className="text-left px-4 py-2.5 text-text-primary font-medium border-b border-border w-24">Default</th>
            <th className="text-left px-4 py-2.5 text-text-primary font-medium border-b border-border">Effect</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-surface-2/50 transition-colors">
              <td className="px-4 py-2.5 font-mono text-purple text-xs whitespace-nowrap">{p.name}</td>
              <td className="px-4 py-2.5 text-amber text-xs">{p.default}</td>
              <td className="px-4 py-2.5 text-text-secondary">{p.effect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InterviewModePanel({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* How to answer */}
      <div className="rounded-xl bg-purple-glow/30 border border-purple/20 p-4">
        <h4 className="text-sm font-semibold text-purple mb-2 flex items-center gap-2">
          <span>🎯</span> How to Answer This in an Interview
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed">{data.howToAnswer}</p>
      </div>

      {/* Follow-up questions */}
      <div className="rounded-xl bg-amber-glow/30 border border-amber/20 p-4">
        <h4 className="text-sm font-semibold text-amber mb-3 flex items-center gap-2">
          <span>⚡</span> Follow-up Questions They Will Ask
        </h4>
        <ul className="space-y-2">
          {data.followUps.map((fq, i) => (
            <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
              <span className="text-amber/60 mt-0.5 shrink-0">→</span>
              {fq}
            </li>
          ))}
        </ul>
      </div>

      {/* Deep dive traps */}
      <div className="rounded-xl bg-coral-glow/30 border border-coral/20 p-4">
        <h4 className="text-sm font-semibold text-coral mb-3 flex items-center gap-2">
          <span>🚨</span> Deep-Dive Traps to Avoid
        </h4>
        <ul className="space-y-2">
          {data.traps.map((trap, i) => (
            <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
              <span className="text-coral/60 mt-0.5 shrink-0">✕</span>
              {trap}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function TopicCard({ topic, index }) {
  const [expanded, setExpanded] = useState(false);
  const [interviewMode, setInterviewMode] = useState(false);
  const [openSections, setOpenSections] = useState(new Set([0]));

  const colorMap = {
    purple: { badge: "bg-purple-glow text-purple", glow: "glow-purple", border: "border-purple/20" },
    amber: { badge: "bg-amber-glow text-amber", glow: "glow-amber", border: "border-amber/20" },
    coral: { badge: "bg-coral-glow text-coral", glow: "glow-coral", border: "border-coral/20" },
  };
  const colors = colorMap[topic.color] || colorMap.purple;

  const toggleSection = (idx) => {
    const next = new Set(openSections);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setOpenSections(next);
  };

  return (
    <motion.div
      id={topic.id}
      className="scroll-mt-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3) }}
    >
      <div className={`glass rounded-2xl overflow-hidden transition-all duration-500 ${expanded ? colors.glow : ""}`}>
        {/* Card header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-surface-2/50 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${colors.badge}`}>
                Phase {topic.phaseNum} · {topic.phase}
              </span>
              {topic.star && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-coral-glow text-coral font-medium">⭐ Must Master</span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-text-primary">{topic.title}</h3>
            <p className="text-sm text-text-tertiary italic">{topic.tagline}</p>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-text-tertiary text-lg shrink-0"
          >
            ▼
          </motion.span>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-border">
                {/* Interview mode toggle */}
                <div className="flex items-center justify-end py-4">
                  <button
                    onClick={() => setInterviewMode(!interviewMode)}
                    className={`group inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                      interviewMode
                        ? "bg-coral/20 text-coral border border-coral/30 shadow-[0_0_20px_rgba(251,113,133,0.1)]"
                        : "glass text-text-secondary hover:text-coral hover:border-coral/20"
                    }`}
                  >
                    🔥 {interviewMode ? "Exit Interview Mode" : "Switch to Interview Mode"}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {interviewMode ? (
                    <InterviewModePanel key="interview" data={topic.interviewMode} />
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      {/* Content sections */}
                      {topic.sections.map((section, si) => (
                        <div key={si} className="border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleSection(si)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left bg-surface-2/50 hover:bg-surface-3/50 transition-colors"
                          >
                            <span className="text-base">{section.icon}</span>
                            <span className="text-sm font-medium text-text-primary flex-1">{section.title}</span>
                            <motion.span
                              animate={{ rotate: openSections.has(si) ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-text-tertiary text-[10px]"
                            >
                              ▼
                            </motion.span>
                          </button>
                          <AnimatePresence>
                            {openSections.has(si) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 py-4 bg-surface/30 border-t border-border">
                                  <ContentRenderer text={section.content} />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}

                      {/* Hyperparameters */}
                      {topic.hyperparameters && (
                        <div className="border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleSection("hp")}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left bg-surface-2/50 hover:bg-surface-3/50 transition-colors"
                          >
                            <span className="text-base">🎛️</span>
                            <span className="text-sm font-medium text-text-primary flex-1">Hyperparameters</span>
                            <motion.span
                              animate={{ rotate: openSections.has("hp") ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-text-tertiary text-[10px]"
                            >
                              ▼
                            </motion.span>
                          </button>
                          <AnimatePresence>
                            {openSections.has("hp") && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 py-4 bg-surface/30 border-t border-border">
                                  <HyperparamTable params={topic.hyperparameters} />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {/* Interview Q&A */}
                      {topic.interviewQA && (
                        <div className="border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleSection("qa")}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left bg-surface-2/50 hover:bg-surface-3/50 transition-colors"
                          >
                            <span className="text-base">❓</span>
                            <span className="text-sm font-medium text-text-primary flex-1">Interview Q&A</span>
                            <motion.span
                              animate={{ rotate: openSections.has("qa") ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-text-tertiary text-[10px]"
                            >
                              ▼
                            </motion.span>
                          </button>
                          <AnimatePresence>
                            {openSections.has("qa") && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 py-4 bg-surface/30 border-t border-border space-y-3">
                                  {topic.interviewQA.map((qa, qi) => (
                                    <QAItem key={qi} q={qa.q} a={qa.a} />
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
