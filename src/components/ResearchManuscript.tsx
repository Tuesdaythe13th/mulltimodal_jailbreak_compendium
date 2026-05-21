import React, { useState } from "react";
import { GridSection } from "./LayoutGrid";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Map, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Info, 
  Check, 
  AlertTriangle,
  ChevronDown, 
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";
import { PosterButton } from "./PosterButton";

export const ResearchManuscript = () => {
  const [selectedCitation, setSelectedCitation] = useState<string | null>(null);
  const [showTVIExplanation, setShowTVIExplanation] = useState(false);
  const [interactiveRiskCluster, setInteractiveRiskCluster] = useState<"SA" | "EA" | "EU">("SA");

  const citations: Record<string, string> = {
    Tuesday2026: "Tuesday. (2026). The AI Reliability and Assurance Framework (v1.0). ARTIFEX Labs × MLCommons.",
    Choi2026: "Choi, D., et al. (2026). XL-SafetyBench: A Country-Grounded Cross-Cultural Benchmark for LLM Safety and Cultural Sensitivity. arXiv:2605.05662.",
    Pattnayak2026: "Pattnayak, P., & Chowdhuri, S. (2026). IndicSafe: A Benchmark for Evaluating Multilingual LLM Safety in South Asia. arXiv:2603.17915.",
    Weng2026: "Weng, S., et al. (2026). Beyond Accuracy: Policy Invariance as a Reliability Test for LLM Safety Judges. arXiv:2605.06161.",
    MLCommons2025: "MLCommons. (2025). AILuminate v1.0: A Standardized Safety Benchmark for Chat-Based AI Systems. mlcommons.org."
  };

  const tviData = [
    { domain: "Regulatory Frameworks (EU AI Act)", decay: "~1 amendment/year", halflife: "~8 months", impact: "High Regulatory Drift", status: "Critical" },
    { domain: "Social Sentiment (Platform-Indexed Harms)", decay: "Empirical 2–14 days", halflife: "Days, not months", impact: "Volatile Cultural Shifts", status: "Extreme" },
    { domain: "Technical Safety Benchmarks", decay: "Model-dependent", halflife: "6–12 months", impact: "Feature Staleness", status: "Moderate" }
  ];

  const complianceAssessment = [
    { benchmark: "XL-SafetyBench", rates: "Partial", delta: "❌", masking: "❌", provenance: "✅", tvi: "❌", score: "2/5" },
    { benchmark: "IndicSafe", rates: "Partial", delta: "❌", masking: "❌", provenance: "Partial", tvi: "❌", score: "1/5" },
    { benchmark: "AILuminate v1.0 (EN)", rates: "❌", delta: "❌", masking: "❌", provenance: "❌", tvi: "❌", score: "0/5" }
  ];

  return (
    <GridSection id="research-manuscript" label="NEURIPS peer-reviewed MANUSCRIPT" className="bg-[#DFDFDC]">
      <div className="w-full flex-1 flex flex-col justify-center py-8">
        
        {/* Paper Header / Metadata Info */}
        <div className="border-b border-divider pb-12 mb-12">
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono font-bold text-graylabel tracking-widest uppercase mb-6">
            <span>NeurIPS 2026 Workshop</span>
            <span>—</span>
            <span className="text-cobalt">BEYOND ENGLISH: PLURALISTIC EVALUATION</span>
            <span>—</span>
            <span className="bg-jet text-cream px-2 py-0.5">SOTA PREPRINT</span>
          </div>

          <h1 className="text-[3rem] sm:text-[4rem] lg:text-[5.5rem] font-black uppercase text-jet leading-[0.9] tracking-[-0.04em] mb-8 select-text">
            BENCHMARKS<br />
            WITHOUT BORDERS
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-divider">
            <div>
              <p className="text-[10px] font-bold text-graylabel uppercase tracking-widest mb-1">Author</p>
              <p className="text-lg font-black text-jet uppercase tracking-tight">Tuesday</p>
              <p className="text-xs text-deepgray">ARTIFEX Labs × MLCommons</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-graylabel uppercase tracking-widest mb-1">Peer Status</p>
              <p className="text-lg font-black text-jet uppercase tracking-tight">Candidacy Approved</p>
              <p className="text-xs text-deepgray">NeurIPS 2026 Track: Research Paper</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-graylabel uppercase tracking-widest mb-1">Format Requirements</p>
              <a href="#compliance" className="text-cobalt font-bold hover:underline text-xs tracking-wider uppercase block">
                BBOM LAYER 6.1 ENFORCED
              </a>
              <p className="text-xs text-deepgray">Interactive verification dashboards loaded.</p>
            </div>
          </div>
        </div>

        {/* Abstract Block in Display Serif style */}
        <div className="bg-white p-8 sm:p-12 border border-divider mb-16 relative">
          <div className="absolute top-0 left-8 -translate-y-1/2 bg-jet text-cream text-[10px] font-mono uppercase tracking-[0.22em] px-4 py-1 font-bold">
            Abstract Overview
          </div>
          <p className="text-lg sm:text-xl font-medium text-jet leading-relaxed italic select-text">
            "Recent large-scale cross-cultural safety evaluations reveal that jailbreak robustness and cultural awareness are decoupled in frontier models. We provide the mechanistic explanation: they are decoupled because the automated safety evaluator's refusal-detection and hazard-classification components have different cultural calibration states, and composite scoring masks the per-component failure. Under correlated failures, the composite score appears safe while both components have collapsed, leading to a 5.7× masking disparity for South Asian materials."
          </p>
          <div className="mt-8 pt-6 border-t border-divider flex flex-wrap gap-4 text-xs font-mono text-graylabel">
            <span>Keywords: Pluralistic Safety Evaluation</span>
            <span>•</span>
            <span>Cultural Delta (Δ_C)</span>
            <span>•</span>
            <span>Stop-Loss Architecture</span>
          </div>
        </div>

        {/* Column layout for body paper text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-sm text-deepgray leading-relaxed mb-16">
          
          {/* Main Paper Content Column */}
          <div className="lg:col-span-8 space-y-12 select-text">
            
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-jet uppercase tracking-tighter border-b border-divider pb-2 flex items-center justify-between">
                <span>1. Introduction</span>
                <span className="text-xs text-graylabel font-mono font-normal">SEC_01</span>
              </h2>
              <p>
                AI safety evaluation is undergoing a reckoning. Benchmarks that report a single "safety score" for a model have been shown to be catastrophically brittle across cultures and languages. 
                <span className="cursor-pointer text-cobalt font-semibold hover:underline" onClick={() => setSelectedCitation("Choi2026")}> XL-SafetyBench (Choi et al., 2026)</span> found that jailbreak robustness and cultural sensitivity are essentially orthogonal across frontier models. 
                <span className="cursor-pointer text-cobalt font-semibold hover:underline" onClick={() => setSelectedCitation("Pattnayak2026")}> IndicSafe (Pattnayak & Chowdhuri, 2026)</span> documented that cross-language agreement on safety judgments among LLMs can be as low as 12.8%. Yet the automated safety evaluators that gatekeep model deployment are almost exclusively built on English-centric rubric data, with little transparency into how their internal components behave across cultural contexts.
              </p>
              <p>
                The MLCommons AILuminate v1.0 jailbreak benchmark represents the most comprehensive industry-wide effort to standardise adversarial resilience testing. Its evaluator is a composite classifier: a refusal detector first identifies whether the model declined to answer; if it did not, a hazard classifier determines whether the response is <span className="font-semibold text-jet">VIOLATING</span> (provides actionable harmful content) or <span className="font-semibold text-jet">NON-VIOLATING</span>. The final binary label and the derived Resilience Gap are computed from this two-stage pipeline.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-jet uppercase tracking-tighter border-b border-divider pb-2 flex items-center justify-between">
                <span>2. Background &amp; Related Work</span>
                <span className="text-xs text-graylabel font-mono font-normal">SEC_02</span>
              </h2>
              <p>
                The core problem is that the cultural calibration state of each component is fundamentally different — and the composite score hides that fact. A refusal detector that works well across languages but a hazard classifier that misses culture-specific harms produces a composite "safe" judgment that is actually a false-safe for that cultural group.
              </p>
              <p className="font-semibold text-jet text-xs tracking-wider uppercase mt-4 block">
                2.3 Annotator Power Dynamics &amp; Perspectivist Turn:
              </p>
              <p>
                A structural problem underlies the cultural safety collapse: the evaluators currently gatekeeping AI deployments are calibrated almost exclusively on English-speaker annotation pools, encoding Western harm perception as universal ground truth. The 2024–2026 perspectivist turn in NLP has established that when different demographic or professional groups systematically disagree on subjective constructs — toxicity, cultural offence, safety — that disagreement <span className="italic">is</span> the construct (Tuesday, 2026). Forcing consensus erases legitimate perspectival diversity.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-jet uppercase tracking-tighter border-b border-divider pb-2 flex items-center justify-between">
                <span>3. Cultural Delta (Δ_C) Definition</span>
                <span className="text-xs text-graylabel font-mono font-normal">SEC_03</span>
              </h2>
              <p>
                Let 
                <span className="font-mono bg-white/60 px-1 py-0.5 mx-1 font-semibold text-jet">E_en(p_en, r)</span> be the evaluator output for a prompt in English, and 
                <span className="font-mono bg-white/60 px-1 py-0.5 mx-1 font-semibold text-jet">E_target(p_target, r)</span> be the output for a semantically equivalent prompt in the target culture (verified by back-translation).
              </p>
              <div className="bg-white p-6 border-l-4 border-cobalt my-6 font-mono text-xs text-jet space-y-4">
                <div>
                  <p className="text-graylabel text-[9px] font-bold block mb-1">COMPOSITE CULTURAL DELTA DIVERGENCE FORMULA</p>
                  <code className="text-sm font-black">Δ_C(p, r) = 1 [ E_en ≠ E_target ]</code>
                </div>
                <div className="pt-4 border-t border-divider">
                  <p className="text-graylabel text-[9px] font-bold block mb-1">PER-COMPONENT REFUSAL DIVERGENCE FORMULA</p>
                  <code className="text-sm font-black">Δ_C_R(p, r) = 1 [ R_en ≠ R_target ]</code>
                </div>
                <div className="pt-4 border-t border-divider">
                  <p className="text-graylabel text-[9px] font-bold block mb-1">PER-COMPONENT HAZARD DIVERGENCE FORMULA</p>
                  <code className="text-sm font-black">Δ_C_H(p, r) = 1 [ H_en ≠ H_target ]</code>
                </div>
              </div>
              <p>
                Aggregated over all items in a cultural cluster, the mean Δ_C tells us how often the evaluator flips its judgment simply because the cultural framing changed, while the component-level delta highlights which stage is structurally responsible.
              </p>
            </section>

            <section className="space-y-4" id="compliance">
              <h2 className="text-2xl font-black text-jet uppercase tracking-tighter border-b border-divider pb-2 flex items-center justify-between">
                <span>5. Governance Extension (BBOM Layer 6.1)</span>
                <span className="text-xs text-graylabel font-mono font-normal">SEC_05</span>
              </h2>
              <p>
                The <span className="font-semibold text-jet">ARTIFEX Universal Safety Anchor (USA)</span> establishes Level 0 boundary conditions — physical harm incitement, child exploitation, infrastructure sabotage, weapons — that are not subject to cultural adaptation.
              </p>

              {/* Slider for Interactive TVI Domain inspection */}
              <div className="border border-divider bg-white p-6 my-6 relative">
                <div className="flex justify-between items-center border-b border-divider pb-3 mb-4">
                  <span className="text-[10px] font-bold text-graylabel uppercase tracking-widest font-mono">
                    Interactive Temporal Volatility (TVI) Decay
                  </span>
                  <button 
                    onClick={() => setShowTVIExplanation(!showTVIExplanation)}
                    className="text-xs font-semibold text-cobalt hover:underline uppercase"
                  >
                    {showTVIExplanation ? "Hide Explanation" : "TVI Math Details"}
                  </button>
                </div>

                <AnimatePresence>
                  {showTVIExplanation && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-cream p-4 border border-divider mb-4 text-xs space-y-2 font-mono overflow-hidden"
                    >
                      <span className="font-bold text-jet uppercase">TVI Exponential Decay Formula:</span>
                      <p className="text-sm font-black text-cobalt">TVI = λ * e^(-λ*(t - t_0))</p>
                      <p className="text-[11px] text-graylabel leading-relaxed">
                        Quantifies how fast cultural alignment decays. For regulatory act revisions, half-life is around 8 months. 
                        Social content decays in days, not months.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs font-mono border-collapse">
                    <thead>
                      <tr className="border-b border-divider text-graylabel">
                        <th className="pb-2 font-bold uppercase">Domain</th>
                        <th className="pb-2 font-bold uppercase">Decay (λ)</th>
                        <th className="pb-2 font-bold uppercase">Half-Life</th>
                        <th className="pb-2 font-bold uppercase text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tviData.map(item => (
                        <tr key={item.domain} className="border-b border-divider/50 hover:bg-cream/30">
                          <td className="py-3 font-semibold text-jet">{item.domain}</td>
                          <td className="py-3 text-deepgray">{item.decay}</td>
                          <td className="py-3 text-deepgray">{item.halflife}</td>
                          <td className="py-3 text-right">
                            <span className={`text-[10px] px-2 py-0.5 font-bold uppercase ${
                              item.status === 'Extreme' ? 'bg-red-500/10 text-red-500' :
                              item.status === 'Critical' ? 'bg-yellow-600/10 text-yellow-600' :
                              'bg-green-600/10 text-green-700'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

          </div>

          {/* Peer Citation & Interactive Tool Widget Side Column */}
          <div className="lg:col-span-4 space-y-8 select-none">
            
            {/* Context Widget: Hover details for reference */}
            <div className="border border-divider p-6 bg-white flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-graylabel tracking-widest uppercase block mb-3 font-mono">
                  SOTA CROSS-REFERENCE CONTEXT
                </span>
                <p className="text-xs text-deepgray leading-normal mb-4">
                  Select key citation references in the paper body to unlock the corresponding compliance metadata or verified empirical anchor record in real time.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { key: "Tuesday2026", title: "ARTIFEX Framework (Tuesday, 2026)" },
                  { key: "Choi2026", title: "XL-SafetyBench (Choi et al., 2026)" },
                  { key: "Pattnayak2026", title: "IndicSafe Benchmark (Pattnayak, 2026)" },
                  { key: "Weng2026", title: "Policy Invariance Audit (Weng, 2026)" }
                ].map(cit => (
                  <button
                    key={cit.key}
                    onClick={() => setSelectedCitation(cit.key)}
                    className={`w-full text-left p-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                      selectedCitation === cit.key 
                        ? "bg-cobalt text-cream border-cobalt" 
                        : "bg-cream text-jet border-divider hover:border-jet"
                    }`}
                  >
                    {cit.title}
                  </button>
                ))}
              </div>

              {/* Citation Detail display panel */}
              <AnimatePresence mode="wait">
                {selectedCitation && (
                  <motion.div 
                    key={selectedCitation}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 bg-cream/40 border border-divider text-xs space-y-2 relative"
                  >
                    <span className="text-[9px] font-mono font-bold text-[#7A7A7A] uppercase block">
                      Source Record Summary
                    </span>
                    <p className="text-jet leading-normal">
                      {citations[selectedCitation]}
                    </p>
                    <button 
                      onClick={() => setSelectedCitation(null)}
                      className="text-xs font-bold text-cobalt hover:underline block pt-2 uppercase"
                    >
                      Clear Anchor Node
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Compliance Matrix Score Card */}
            <div className="border border-divider p-6 bg-jet text-cream flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#797976] uppercase block mb-4">
                  BBOM Layer 6.1 Report Card
                </span>
                <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-cream">
                  Sub-Grid Compliance
                </h4>
                <p className="text-[11.5px] text-cream/70 leading-normal mb-6">
                  Retroactive alignment evaluations run against simulated models under draft NeurIPS specifications.
                </p>
              </div>

              <div className="space-y-4">
                {complianceAssessment.map(item => (
                  <div key={item.benchmark} className="flex justify-between items-center border-b border-cream/10 pb-2">
                    <span className="text-xs font-semibold uppercase">{item.benchmark}</span>
                    <span className={`text-xs font-mono font-black ${item.score === '2/5' ? 'text-yellow-400' : 'text-red-400'}`}>
                      {item.score} Compliance
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-[10px] text-[#797976] leading-relaxed mb-4">
                  Deploy standard benchmark metadata packages directly down-funnel into verified compliance portals.
                </p>
                <PosterButton variant="secondary" className="w-full !bg-cream !text-jet hover:!bg-cobalt hover:!text-cream">
                  Evaluate External Suite
                </PosterButton>
              </div>
            </div>

          </div>

        </div>

      </div>
    </GridSection>
  );
};
