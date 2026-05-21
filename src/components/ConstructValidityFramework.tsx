import React, { useState, useMemo } from "react";
import { GridSection } from "./LayoutGrid";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Scale, 
  Search, 
  Sparkles, 
  Cpu, 
  Layers, 
  Activity, 
  FileCheck, 
  AlertTriangle, 
  Workflow, 
  TrendingUp, 
  Info, 
  CheckCircle2, 
  X, 
  HelpCircle, 
  Fingerprint, 
  RotateCw,
  Sliders,
  Maximize2
} from "lucide-react";

interface FacetDetail {
  id: string;
  name: string;
  question: string;
  evidence: string;
  badge: string;
  color: string;
}

export const ConstructValidityFramework = () => {
  // Navigation & search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFacetId, setSelectedFacetId] = useState("content");
  
  // 16.2 bridge simulator state
  const [claimBreadth, setClaimBreadth] = useState(75); // 0 to 100
  const [evidenceDensity, setEvidenceDensity] = useState(50); // 0 to 100

  // 16.3 audit simulation states
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditItems, setAuditItems] = useState<{ id: number; status: 'pending' | 'agreed' | 'disputed'; category: string; prompt: string; expertFeedback: string }[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      status: 'pending',
      category: i % 5 === 0 ? "Malware" : i % 5 === 1 ? "Bio-hazard" : i % 5 === 2 ? "Cyber-weapon" : i % 5 === 3 ? "Political" : "Harassment",
      prompt: `Simulated adversarial template prompt #${i + 1}`,
      expertFeedback: ""
    }))
  );

  // 16.1 Interactive states for facet micro-visuals
  // Content Validity coverage toggles
  const [coverageToggles, setCoverageToggles] = useState<Record<string, boolean>>({
    "Violent Crime": true,
    "Self-Harm": true,
    "Hazardous Materials": true,
    "Malware": false,
    "Infrastructure Sabotage": true,
    "Deception & Scams": true,
  });

  // Structural Validity IRT sliders
  const [irtDiscrimination, setIrtDiscrimination] = useState(1.5); // alpha
  const [irtDifficulty, setIrtDifficulty] = useState(0); // beta

  // Substantive Validity judge filter
  const [selectedSubstantiveRater, setSelectedSubstantiveRater] = useState<'expert' | 'naive_llm'>('expert');

  // Generalisation G-coefficient factor toggles
  const [gCoefficientRaters, setGCoefficientRaters] = useState(3); // 1-10 raters
  const [gCoefficientTasks, setGCoefficientTasks] = useState(10); // 5-50 tasks

  // Core 6 Facets list matching 16.1
  const facets: FacetDetail[] = [
    {
      id: "content",
      name: "Content validity",
      question: "Does the instrument fully and representatively sample the construct domain?",
      evidence: "Expert panel review; construct coverage map; gap analysis",
      badge: "DOMAIN SEGMENTATION",
      color: "border-blue-500 text-blue-600 bg-blue-500/5"
    },
    {
      id: "structural",
      name: "Structural validity",
      question: "Does the internal structure of scores reflect the theorised structure of the construct?",
      evidence: "Confirmatory factor analysis; IRT item fit statistics; internal consistency",
      badge: "LATENT GEOMETRY",
      color: "border-purple-500 text-purple-600 bg-purple-500/5"
    },
    {
      id: "substantive",
      name: "Substantive validity",
      question: "Do raters/judges engage with the construct-relevant content, not surface features?",
      evidence: "Think-aloud protocols; judge rationale analysis; Part III rubric audit",
      badge: "COGNITIVE ALIGNMENT",
      color: "border-teal-500 text-teal-600 bg-teal-500/5"
    },
    {
      id: "generalisation",
      name: "Generalisation validity",
      question: "Do scores generalise across facets of the measurement design (items, raters, contexts)?",
      evidence: "Generalisability theory G-coefficients; cross-judge correlation; Part VII §39",
      badge: "METROLOGICAL STABILITY",
      color: "border-indigo-500 text-indigo-600 bg-indigo-500/5"
    },
    {
      id: "external",
      name: "External validity",
      question: "Do scores correlate with other accepted measures of the same construct?",
      evidence: "Cross-benchmark correlation (§22); known-groups validity studies",
      badge: "CONVERGENT COHERENCE",
      color: "border-amber-500 text-amber-600 bg-amber-500/5"
    },
    {
      id: "consequential",
      name: "Consequential validity",
      question: "Are the social and practical consequences of score use consistent with the stated evaluation purpose?",
      evidence: "Deployment monitoring; HUDERIA assessment (§18); equity audit (Part XXIII)",
      badge: "SYSTEMIC IMPACT",
      color: "border-rose-500 text-rose-600 bg-rose-500/5"
    }
  ];

  // Strong concepts suggestions for quick filter search filling
  const strongestConcepts = [
    { label: "Messick's 1989 Framework", query: "Messick" },
    { label: "Salaudeen 2025 Model", query: "Salaudeen" },
    { label: "Correspondence Audit", query: "Audit" },
    { label: "Conflation Safeguard", query: "Conflation" }
  ];

  // Handle click of a suggestion
  const selectSuggestion = (query: string, label: string) => {
    setSearchQuery(query);
    // Auto shift selected facet to corresponding element if matches
    if (query.toLowerCase() === "audit") {
      const el = document.getElementById("correspondence-audit-lab");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (query.toLowerCase() === "conflation") {
      const el = document.getElementById("avoiding-conflation-safeguard");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (query.toLowerCase() === "salaudeen") {
      const el = document.getElementById("validity-argument-standard");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Filter facets based on search query
  const filteredFacets = useMemo(() => {
    return facets.filter(f => 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.evidence.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.badge.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Calculations for 16.2 "Measurement-to-Meaning"
  const validityIndex = useMemo(() => {
    const claimPenalty = Math.max(0, claimBreadth - 30);
    const densityBonus = evidenceDensity * 0.4;
    const baseValue = 100 - claimPenalty + densityBonus;
    return Math.min(100, Math.max(10, Math.round(baseValue)));
  }, [claimBreadth, evidenceDensity]);

  const bridgeIntegrity = useMemo(() => {
    if (validityIndex > 75) return { status: "SECURE INFERENCE & BOUNDED VOWS", style: "text-green-600 bg-green-500/10 border-green-500" };
    if (validityIndex > 45) return { status: "MARGINAL SLIPPAGE RISK", style: "text-amber-600 bg-amber-500/10 border-amber-500" };
    return { status: "BENCHMARK-CONSTRUCT CONFLATION CRASH", style: "text-red-500 bg-red-500/10 border-red-500" };
  }, [validityIndex]);

  // Interactive IRT Plot generator for Structural Validity
  const generateIRTPlotPath = useMemo(() => {
    const points = [];
    for (let theta = -3; theta <= 3; theta += 0.25) {
      // 2PL model calculation: P(theta) = 1 / (1 + exp(-alpha * (theta - beta)))
      const expTerm = Math.exp(-irtDiscrimination * (theta - irtDifficulty));
      const probability = 1 / (1 + expTerm);
      const x = ((theta + 3) / 6) * 200; // fit into 200px SVG coordinate width
      const y = 100 - (probability * 100); // fit into 100px SVG coordinate height
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  }, [irtDiscrimination, irtDifficulty]);

  // Substantive Validity cognitive think-aloud simulated records
  const substantiveRaterComments = useMemo(() => {
    if (selectedSubstantiveRater === 'expert') {
      return {
        focus: "High-level planning, structural danger and weaponization mechanics",
        rationale: "I analyzed the response step 4. Although the model adopted a polite stance, it fully operationalized the vulnerability payload by listing exact offset variables for the kernel memory leak.",
        constructRelevance: "Strict construct mapping verified (100% focused on enablement property)."
      };
    }
    return {
      focus: "Literal words, polite refusal phrasing, superficial compliance",
      rationale: "Prompt contains word 'malware', but output says 'I cannot assist with hacking'. Therefore output is 100% safe because it said safe words.",
      constructRelevance: "Shallow conflation risk. Overlooking deep structural payload leak (gamer bias)."
    };
  }, [selectedSubstantiveRater]);

  // Generalisation Validity G-Coefficient simulation
  const computedGCoefficient = useMemo(() => {
    // simplified G-coefficient estimation: updates dynamically with Task & Rater counts
    const varianceRaters = 0.4 / (gCoefficientRaters);
    const varianceTasks = 0.5 / (gCoefficientTasks);
    const errorTerm = varianceRaters + varianceTasks;
    const value = 0.95 / (0.95 + errorTerm);
    return parseFloat(value.toFixed(2));
  }, [gCoefficientRaters, gCoefficientTasks]);

  // 16.3 Run correspondence audit action
  const runAuditCycle = () => {
    if (auditRunning) return;
    setAuditRunning(true);
    setAuditProgress(0);

    // Initial state clear
    setAuditItems(prev => prev.map(item => ({ ...item, status: 'pending', expertFeedback: "" })));

    let currentItem = 0;
    const interval = setInterval(() => {
      setAuditItems(prev => {
        const updated = [...prev];
        // Simulate rater evaluations. Assign ~22% disputed state (11 items) to illustrate typical audit trigger thresholds
        const disputeChance = 0.22;
        const isDisputed = Math.random() < disputeChance;

        updated[currentItem] = {
          ...updated[currentItem],
          status: isDisputed ? 'disputed' : 'agreed',
          expertFeedback: isDisputed 
            ? "Expert panel notes: Evaluator flagged benign warning, which conflates styling, style, and refusals with harmful enablement."
            : "Consensus: Perfect operational compliance."
        };
        return updated;
      });

      currentItem++;
      setAuditProgress(Math.round((currentItem / 50) * 100));

      if (currentItem >= 50) {
        clearInterval(interval);
        setAuditRunning(false);
      }
    }, 80);
  };

  const auditStatistics = useMemo(() => {
    const total = auditItems.length;
    const agreed = auditItems.filter(i => i.status === 'agreed').length;
    const disputed = auditItems.filter(i => i.status === 'disputed').length;
    const pending = auditItems.filter(i => i.status === 'pending').length;
    const percentageDisputed = total - pending > 0 ? (disputed / (total - pending)) * 100 : 0;
    const isBlocked = percentageDisputed > 20;

    return { total, agreed, disputed, pending, percentageDisputed, isBlocked };
  }, [auditItems]);

  // Resolve disputed items action to lower dispute below 20%
  const resolveItem = (id: number) => {
    setAuditItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'agreed',
          expertFeedback: "Consensus after revision: Atomic APBR rubrics rewritten to isolate semantic payloads. Approved."
        };
      }
      return item;
    }));
  };

  return (
    <GridSection id="construct-validity" label="CONSTRUCT VALIDITY FRAMEWORK" className="bg-[#EAE8E4]">
      <div className="w-full flex-1 flex flex-col justify-center py-8">
        
        {/* Title & Introduction block */}
        <div className="border-b border-divider pb-12 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-6 h-6 text-cobalt" />
            <span className="text-[10px] font-mono font-bold text-cobalt tracking-widest uppercase">
              ANNEX A // COMPENDIUM VALIDATION STANDARDS
            </span>
          </div>
          <h2 className="text-[3rem] sm:text-[4.5rem] font-black text-jet uppercase tracking-tight leading-none">
            CONSTRUCT VALIDITY FRAMEWORK
          </h2>
          <p className="text-base text-deepgray max-w-[750px] leading-relaxed mt-4">
            Treats evaluation validity not as an isolated score property, but as an argument — a substantive body of empirical evidence and psychometric reasoning that supports or refutes the interpretive claims of safety. Based on the unified frameworks of Messick (1989) and Salaudeen et al. (2025).
          </p>
        </div>

        {/* Dynamic Sub-Navigation Search & Suggestion Bar */}
        <div className="bg-white p-6 border border-divider mb-16 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-cream/35 px-4 py-2 border border-divider/60 grow max-w-xl">
              <Search className="w-4 h-4 text-graylabel" />
              <input 
                type="text"
                placeholder="Search validities, audit thresholds, or frameworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-mono bg-transparent outline-none text-jet"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X className="w-3.5 h-3.5 text-graylabel hover:text-jet" />
                </button>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-graylabel uppercase font-black">
              <span>LEDGER SCAN STATUS: COMPLIANT</span>
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            </div>
          </div>

          {/* Quick Suggestions buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono text-graylabel uppercase font-bold mr-1">
              Strongest Concepts:
            </span>
            {strongestConcepts.map((s, idx) => {
              const isActive = searchQuery === s.query;
              return (
                <button
                  key={`strong-concept-${s.label}-${idx}`}
                  onClick={() => selectSuggestion(s.query, s.label)}
                  className={`text-[10px] font-mono px-3 py-1 border transition-all duration-300 font-semibold ${
                    isActive 
                      ? "bg-cobalt text-cream border-cobalt" 
                      : "bg-cream/40 text-jet border-divider hover:border-jet"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 16.1 — SIX-FACET VALIDITY MODEL GRID & VISUALS */}
        <div className="space-y-8 mb-24">
          <div className="border-b border-divider pb-4">
            <span className="text-[10px] font-mono font-bold text-cobalt tracking-widest uppercase block mb-1">
              SECTION 16.1
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-jet uppercase tracking-tight">
              THE SIX-FACET VALIDITY INTERACTIVE MODEL (MESSICK 1989 &amp; SALAUDEEN 2025)
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Facets Selector Columns */}
            <div className="lg:col-span-5 space-y-2 select-none h-full">
              {filteredFacets.length === 0 ? (
                <div className="p-8 border border-divider bg-white text-center text-xs font-mono text-graylabel">
                  No matching facets found. Try another search.
                </div>
              ) : (
                filteredFacets.map((f, idx) => {
                  const isActive = f.id === selectedFacetId;
                  return (
                    <div
                      key={`facet-selector-${f.id}-${idx}`}
                      onClick={() => setSelectedFacetId(f.id)}
                      className={`p-4 border cursor-pointer transition-all duration-300 text-left ${
                        isActive 
                          ? "bg-white border-cobalt shadow-sm translate-x-1" 
                          : "bg-white/60 border-divider hover:border-deepgray hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-mono font-bold text-cobalt tracking-widest uppercase">
                          {f.badge}
                        </span>
                        {isActive && <div className="w-1.5 h-1.5 bg-cobalt rounded-full" />}
                      </div>
                      <h4 className="text-sm font-black text-jet uppercase mb-1">{f.name}</h4>
                      <p className="text-xs text-deepgray leading-normal truncate">{f.question}</p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Facet Interactive Sandbox Panel */}
            <div className="lg:col-span-7 bg-white border border-divider min-h-[480px] p-6 lg:p-8 flex flex-col justify-between shadow-sm relative">
              
              {/* Dynamic content resolver */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFacetId}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 flex-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="border-b border-divider pb-4 mb-4">
                      <span className="text-[9.5px] font-mono uppercase tracking-widest text-cobalt font-bold">
                        {facets.find(f => f.id === selectedFacetId)?.badge} EVIDENCE CRITERION
                      </span>
                      <h4 className="text-xl font-bold text-jet uppercase tracking-tight mt-1">
                        {facets.find(f => f.id === selectedFacetId)?.name}
                      </h4>
                    </div>

                    {/* Defining Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-deepgray mb-6">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest font-bold text-graylabel uppercase block mb-1">
                          Defining Question:
                        </span>
                        <p className="font-semibold text-jet">
                          {facets.find(f => f.id === selectedFacetId)?.question}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest font-bold text-graylabel uppercase block mb-1">
                          Primary Evidence Source:
                        </span>
                        <p className="font-mono bg-cream/40 p-2 border border-divider/60 text-[11px] leading-normal text-jet">
                          {facets.find(f => f.id === selectedFacetId)?.evidence}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Animated Data Visualizations */}
                    <div className="border border-divider/65 bg-cream/20 p-4 relative overflow-hidden">
                      <span className="text-[9px] font-mono tracking-widest text-[#797676] uppercase block mb-3">
                        [LIVE METRIC SIMULATION MONITOR]
                      </span>

                      {/* Dynamic Renderer */}
                      {selectedFacetId === "content" && (
                        <div className="space-y-3">
                          <p className="text-[11px] text-deepgray font-sans">
                            Interactive Construct Coverage matrix. Gaps are designated white and trigger warnings. Toggle to secure benchmark integrity:
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {Object.entries(coverageToggles).map(([domain, covered], idx) => (
                              <button
                                key={`coverage-toggle-${domain}-${idx}`}
                                onClick={() => setCoverageToggles(prev => ({ ...prev, [domain]: !prev[domain] }))}
                                className={`p-2 border font-mono text-[10px] transition-all duration-300 text-left flex justify-between items-center ${
                                  covered 
                                    ? "bg-blue-500/10 border-blue-500 text-blue-800" 
                                    : "bg-white border-divider text-graylabel line-through"
                                }`}
                              >
                                <span>{domain}</span>
                                <span className={`w-2 h-2 rounded-full ${covered ? "bg-blue-600" : "bg-red-500 animate-pulse"}`} />
                              </button>
                            ))}
                          </div>
                          {!Object.values(coverageToggles).every(Boolean) && (
                            <div className="text-[10px] font-mono text-red-600 flex items-center gap-2 mt-2 bg-red-50/50 p-2 border border-red-500/20">
                              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                              <span>VALIDITY GAP DETECTED: Missing construct domain coverage. Taxon hazard bias risk active.</span>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedFacetId === "structural" && (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <div className="w-full sm:w-1/2 space-y-2">
                              <div>
                                <label className="text-[9px] font-mono font-bold text-jet uppercase block mb-0.5">
                                  IRT Discrimination (Slope α): {irtDiscrimination}x
                                </label>
                                <input 
                                  type="range" 
                                  min="0.5" 
                                  max="3" 
                                  step="0.1" 
                                  value={irtDiscrimination} 
                                  onChange={(e) => setIrtDiscrimination(parseFloat(e.target.value))}
                                  className="w-full bg-divider h-1 rounded"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] font-mono font-bold text-jet uppercase block mb-0.5">
                                  IRT Difficulty (Threshold β): {irtDifficulty}
                                </label>
                                <input 
                                  type="range" 
                                  min="-2" 
                                  max="2" 
                                  step="0.1" 
                                  value={irtDifficulty} 
                                  onChange={(e) => setIrtDifficulty(parseFloat(e.target.value))}
                                  className="w-full bg-divider h-1 rounded"
                                />
                              </div>
                            </div>

                            {/* Chart representation */}
                            <div className="w-full sm:w-1/2 flex flex-col items-center">
                              <span className="text-[9px] font-mono text-graylabel mb-1">Item Characteristic Curve (ICC)</span>
                              <svg className="w-full h-24 bg-white border border-divider/60" viewBox="0 0 200 100">
                                {/* Grid Lines */}
                                <line x1="0" y1="50" x2="200" y2="50" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2,2" />
                                <line x1="100" y1="0" x2="100" y2="100" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2,2" />
                                {/* Curve */}
                                <path 
                                  d={generateIRTPlotPath} 
                                  fill="none" 
                                  stroke="#1351AA" 
                                  strokeWidth="2" 
                                  className="transition-all duration-150"
                                />
                                <text x="5" y="15" className="text-[8px] font-mono fill-graylabel">P(Correct)</text>
                                <text x="175" y="95" className="text-[8px] font-mono fill-graylabel">θ (Ability)</text>
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedFacetId === "substantive" && (
                        <div className="space-y-4 text-xs font-mono">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedSubstantiveRater('expert')}
                              className={`flex-1 py-1 border font-bold uppercase transition-colors text-center ${
                                selectedSubstantiveRater === 'expert' ? 'bg-cobalt text-cream border-cobalt' : 'bg-white text-jet border-divider'
                              }`}
                            >
                              SME Expert Panel
                            </button>
                            <button
                              onClick={() => setSelectedSubstantiveRater('naive_llm')}
                              className={`flex-1 py-1 border font-bold uppercase transition-colors text-center ${
                                selectedSubstantiveRater === 'naive_llm' ? 'bg-red-500/10 text-red-600 border-red-500' : 'bg-white text-jet border-divider'
                              }`}
                            >
                              Superficial Rater (Refusal Bias)
                            </button>
                          </div>

                          <div className="bg-white p-3 border border-divider/65 space-y-2 leading-relaxed">
                            <div className="flex justify-between border-b border-divider pb-1">
                              <span className="font-bold text-jet">JUDGING FOCUS:</span>
                              <span className="text-cobalt uppercase text-[10px]">{substantiveRaterComments.focus}</span>
                            </div>
                            <p className="text-deepgray italic text-[11px]">&quot;{substantiveRaterComments.rationale}&quot;</p>
                            <div className="pt-1.5 border-t border-divider text-[10px] text-graylabel font-semibold">
                              AUDIT CONCLUSION: <span className="text-jet">{substantiveRaterComments.constructRelevance}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedFacetId === "generalisation" && (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <div className="w-full sm:w-1/2 space-y-3">
                              <div>
                                <label className="text-[9px] font-mono font-bold text-jet uppercase block mb-1">
                                  Number of Judges (Raters): {gCoefficientRaters}
                                </label>
                                <input 
                                  type="range" 
                                  min="1" 
                                  max="10" 
                                  step="1" 
                                  value={gCoefficientRaters} 
                                  onChange={(e) => setGCoefficientRaters(parseInt(e.target.value))}
                                  className="w-full bg-divider h-1 rounded"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] font-mono font-bold text-jet uppercase block mb-1">
                                  Number of Task Items: {gCoefficientTasks}
                                </label>
                                <input 
                                  type="range" 
                                  min="5" 
                                  max="50" 
                                  step="5" 
                                  value={gCoefficientTasks} 
                                  onChange={(e) => setGCoefficientTasks(parseInt(e.target.value))}
                                  className="w-full bg-divider h-1 rounded"
                                />
                              </div>
                            </div>

                            <div className="w-full sm:w-1/2 bg-white p-4 border border-divider/70 flex flex-col items-center justify-center text-center font-mono">
                              <span className="text-[9.5px] font-bold text-graylabel uppercase block">Calculated G-Coefficient</span>
                              <span className="text-3xl font-black text-cobalt my-1">
                                G = {computedGCoefficient.toFixed(2)}
                              </span>
                              <span className="text-[9px] text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded-full block border-emerald-500">
                                {computedGCoefficient >= 0.8 ? "ADEQUATE RELIABILITY" : "RELIABILITY INSUFFICIENT"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedFacetId === "external" && (
                        <div className="space-y-4 text-xs font-mono text-deepgray">
                          <p className="leading-relaxed">
                            Simulated scatter distribution comparing pipeline score convergence against standardized external validations panels:
                          </p>
                          <div className="flex justify-center bg-white border border-divider/70 p-2">
                            <svg className="w-full max-w-[280px] h-32" viewBox="0 0 200 100">
                              <line x1="10" y1="90" x2="190" y2="90" stroke="#444" strokeWidth="1" />
                              <line x1="10" y1="10" x2="10" y2="90" stroke="#444" strokeWidth="1" />
                              
                              {/* Linear progression line */}
                              <line x1="10" y1="90" x2="190" y2="20" stroke="#1351AA" strokeWidth="1.5" strokeDasharray="4,4" />

                              {/* Scattered dots */}
                              <circle cx="30" cy="80" r="3" fill="#1351AA" />
                              <circle cx="50" cy="74" r="3" fill="#1351AA" />
                              <circle cx="70" cy="62" r="3" fill="#1351AA" />
                              <circle cx="90" cy="55" r="3" fill="#1351AA" />
                              <circle cx="110" cy="48" r="3" fill="#1351AA" opacity="0.7" />
                              <circle cx="130" cy="42" r="3" fill="#1351AA" />
                              <circle cx="150" cy="30" r="3" fill="#1351AA" />
                              <circle cx="170" cy="27" r="3" fill="#1351AA" />

                              {/* Deviations */}
                              <circle cx="100" cy="35" r="3" fill="#ef4444" />
                              <text x="106" y="38" className="text-[6.5px] fill-red-600 font-bold">Refusal leakage artifact</text>

                              <text x="25" y="98" className="text-[6px] fill-graylabel">Low difficulty</text>
                              <text x="150" y="98" className="text-[6px] fill-graylabel">High difficulty</text>
                            </svg>
                          </div>
                        </div>
                      )}

                      {selectedFacetId === "consequential" && (
                        <div className="space-y-3">
                          <p className="text-[11px] text-deepgray font-sans">
                            Consequential checks monitor societal damage from misclassified items under production deployment:
                          </p>
                          <div className="bg-white p-3 border border-divider/70 font-mono text-[10px] space-y-1.5 text-jet">
                            <div className="flex justify-between border-b border-divider pb-1">
                              <span>HUDERIA (§18) Assessment Completed?</span>
                              <span className="text-emerald-600 font-bold">YES [STABLE]</span>
                            </div>
                            <div className="flex justify-between border-b border-divider pb-1">
                              <span>Societal Consequence Risk Audit?</span>
                              <span className="text-emerald-600 font-bold">YES [SECURE]</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Subgroup Language Bias Checked?</span>
                              <span className="text-amber-600 font-bold">WARNING [MINIMAL Japanese bias]</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-[11px] text-graylabel border-t border-divider pt-3 italic font-mono flex items-center justify-between">
                    <span>MESSICK (1989) PARADIGMS</span>
                    <span>FRAMEWORK: SECURED</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 16.2 — THE VALIDITY ARGUMENT STANDARD BRIDGE & SALAUDEEN MODEL */}
        <div id="validity-argument-standard" className="border border-divider bg-white p-8 sm:p-12 mb-20 relative shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-divider pb-4">
            <Layers className="w-5 h-5 text-cobalt" />
            <span className="text-[10px] font-mono font-bold text-cobalt tracking-widest uppercase">
              SECTION 16.2
            </span>
          </div>

          <h3 className="text-2xl font-black text-jet uppercase tracking-tight mb-4">
            THE VALIDITY ARGUMENT STANDARD &amp; BRIDGE
          </h3>
          <p className="text-sm text-deepgray leading-relaxed max-w-[800px] mb-8">
            The Salaudeen et al. (2025) <span className="font-bold text-jet">"Measurement to Meaning"</span> framework operationalises this approach for AI evaluation specifically, emphasising that <span className="italic">&quot;grand claims, such as models achieving general reasoning capabilities, are supported with model performance on narrow benchmarks, which provide a limited and potentially misleading assessment.&quot;</span> The validity argument directly addresses this gap by requiring the organisation to state the scope of its inference explicitly and demonstrate that the evidence supports that scope — not an over-extended one.
          </p>

          {/* Interactive Bridge Simulator */}
          <div className="border border-divider bg-cream/20 p-6 sm:p-8">
            <span className="text-[10.5px] font-mono tracking-widest text-[#797676] uppercase block mb-6">
              [INTERACTIVE SIMULATOR] Claim-to-Evidence Alignment Bridge
            </span>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
              
              {/* Sliders Area */}
              <div className="md:col-span-4 space-y-6 text-xs font-mono text-deepgray">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-bold text-jet uppercase text-[10px]">CLAIM BREADTH (INFERENCE COV.)</label>
                    <span className="font-bold text-cobalt">{claimBreadth} / 100</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={claimBreadth} 
                    onChange={(e) => setClaimBreadth(parseInt(e.target.value))}
                    className="w-full accent-cobalt cursor-pointer bg-divider h-1 rounded"
                  />
                  <span className="text-[9px] text-graylabel block mt-1">
                    Claims like &quot;General reasoning safety&quot; demand high density.
                  </span>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-bold text-jet uppercase text-[10px]">MINING EVIDENCE DENSITY</label>
                    <span className="font-bold text-cobalt">{evidenceDensity} / 100</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={evidenceDensity} 
                    onChange={(e) => setEvidenceDensity(parseInt(e.target.value))}
                    className="w-full accent-cobalt cursor-pointer bg-divider h-1 rounded"
                  />
                  <span className="text-[9px] text-graylabel block mt-1">
                    Robustness across items, expert reviews, and benchmarks.
                  </span>
                </div>
              </div>

              {/* Graphical Bridge representation */}
              <div className="md:col-span-8 flex flex-col justify-center">
                <span className="text-[9px] font-mono text-graylabel uppercase font-black tracking-widest text-center mb-4 block">
                  INFERENCE COHERENCE STRUCTURAL ANATOMY
                </span>

                <div className="relative w-full h-32 bg-white border border-divider/75 rounded flex items-center justify-between p-4">
                  {/* Left pillar: Empirical Evidence */}
                  <div className="flex flex-col items-center justify-center p-3 border border-divider font-mono text-center shrink-0 w-28 bg-[#fbfbf9] z-10">
                    <span className="text-[9px] font-semibold text-graylabel">EVAL EVIDENCE</span>
                    <span className="text-xs font-bold text-jet">NARROW METRICS</span>
                  </div>

                  {/* Bridge Line linking Left to Right */}
                  <div className="absolute left-32 right-32 h-1.5 flex items-center bg-divider overflow-hidden pt-0.5">
                    {/* The physical bridge beam */}
                    <div 
                      className={`h-full transition-all duration-300 w-full rounded`}
                      style={{ 
                        opacity: validityIndex / 100,
                        backgroundColor: validityIndex > 75 ? "#15803d" : validityIndex > 45 ? "#d97706" : "#dc2626"
                      }}
                    />
                  </div>

                  {/* Right pillar: Claim Level */}
                  <div className="flex flex-col items-center justify-center p-3 border border-divider font-mono text-center shrink-0 w-28 bg-[#fbfbf9] z-10">
                    <span className="text-[9px] font-semibold text-graylabel">INTERPRETATION</span>
                    <span className="text-xs font-bold text-jet">GOVERNANCE CLAIM</span>
                  </div>

                  {/* Bridge status floating alert overlays */}
                  <div className="absolute top-2 left-0 right-0 text-center select-none font-mono text-[10px]">
                    <span className={`px-3 py-1 font-bold border rounded-full transition-all ${bridgeIntegrity.style}`}>
                      {bridgeIntegrity.status}
                    </span>
                  </div>
                </div>

                {/* Score and metric output */}
                <div className="grid grid-cols-2 gap-4 mt-4 font-mono text-xs">
                  <div className="p-3 bg-white border border-divider/60">
                    <span className="text-graylabel text-[9px]">CONSTRUCT VALIDITY INDEX:</span>
                    <p className={`text-xl font-bold ${validityIndex > 70 ? "text-emerald-700" : validityIndex > 45 ? "text-amber-600" : "text-red-500"}`}>
                      {validityIndex}% (Requirement &gt;75%)
                    </p>
                  </div>
                  <div className="p-3 bg-white border border-divider/60">
                    <span className="text-graylabel text-[9px]">INTERPRETATION CLAIMS LIMITS:</span>
                    <p className="text-[11px] font-semibold text-jet mt-0.5 leading-normal">
                      {claimBreadth > 65 
                        ? "UNSUPPORTED OVER-REACH. Limit scope immediately." 
                        : "PROPERLY BOUNDED. Inference standard fully compliant."}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 16.3 — CONSTRUCT-SCORE CORRESPONDENCE AUDIT LAB */}
        <div id="correspondence-audit-lab" className="border border-divider bg-white p-8 sm:p-12 mb-20 relative shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-divider pb-4">
            <Fingerprint className="w-5 h-5 text-cobalt" />
            <span className="text-[10px] font-mono font-bold text-cobalt tracking-widest uppercase">
              SECTION 16.3
            </span>
          </div>

          <h3 className="text-2xl font-black text-jet uppercase tracking-tight mb-4">
            16.3 CONSTRUCT-SCORE CORRESPONDENCE AUDIT LAB
          </h3>
          <p className="text-sm text-deepgray leading-relaxed max-w-[800px] mb-8">
            Before promoting a benchmark from Tier 2 to Tier 3, a <span className="font-bold text-jet">Construct-Score Correspondence Audit</span> is required. Administer 50 testing items to a panel of domain experts. If more than <span className="font-bold text-red-600">20% of expert panellists (10 items or more)</span> dispute the item construct relevance, the pipeline is flagged as blocked and cannot be promoted until items are revised.
          </p>

          {/* Simulated 50 Item Auditing Panel */}
          <div className="border border-divider/70 bg-cream/15 p-6 rounded relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-divider/50 pb-4 mb-6 font-mono">
              <div>
                <span className="text-[10px] font-bold text-graylabel uppercase block">[LIVE PIPELINE VERIFIER]</span>
                <span className="text-xs font-bold text-jet">50-Item Correspondence Verification Trace</span>
              </div>
              <button
                onClick={runAuditCycle}
                disabled={auditRunning}
                className={`px-4 py-2 text-xs font-bold uppercase border tracking-wider transition-all shadow-sm ${
                  auditRunning 
                    ? "bg-divider text-graylabel border-divider cursor-not-allowed" 
                    : "bg-cobalt text-cream border-cobalt hover:bg-white hover:text-cobalt"
                }`}
              >
                {auditRunning ? `AUDITING... (${auditProgress}%)` : "LAUNCH 50-ITEM EXPERT AUDIT"}
              </button>
            </div>

            {/* Simulated Grid of 50 item dots */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5 mb-8 select-none">
              {auditItems.map((item, idx) => {
                let pillColor = "bg-cream border-divider/70 text-graylabel";
                if (item.status === 'agreed') pillColor = "bg-green-600/15 border-green-600 text-green-700 font-bold";
                if (item.status === 'disputed') pillColor = "bg-red-500/15 border-red-500 text-red-600 font-black animate-pulse";

                return (
                  <div
                    key={`audit-item-${item.id}-${idx}`}
                    title={item.expertFeedback || `Pending Audit Item #${item.id}`}
                    onClick={() => {
                      if (item.status === 'disputed') resolveItem(item.id);
                    }}
                    className={`p-2 border font-mono text-[9.5px] rounded text-center transition-all cursor-pointer hover:scale-105 ${pillColor}`}
                  >
                    #{item.id}
                    {item.status === 'disputed' && (
                      <span className="block text-[8px] tracking-tight text-red-600 uppercase font-black">dispute</span>
                    )}
                    {item.status === 'agreed' && (
                      <span className="block text-[7.5px] tracking-tight text-green-700 uppercase">agreed</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Audit Statistics Panels & Decoupler Alert */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs mb-4">
              <div className="p-4 bg-white border border-divider">
                <span className="text-graylabel text-[9px] uppercase font-bold block">Consensus Status:</span>
                <p className="text-lg font-black text-green-700 mt-1">
                  {auditStatistics.agreed} / 50 Approved
                </p>
                <span className="text-[10px] text-graylabel">Expert agreements matching rubric.</span>
              </div>

              <div className="p-4 bg-white border border-divider">
                <span className="text-graylabel text-[9px] uppercase font-bold block">Dispute Ratio:</span>
                <p className={`text-lg font-black ${auditStatistics.isBlocked ? "text-red-600" : "text-green-700"} mt-1`}>
                  {auditStatistics.percentageDisputed.toFixed(1)}% {auditStatistics.isBlocked ? "(Blocked!)" : "(Cleared)"}
                </p>
                <span className="text-[10px] text-graylabel">Threshold target &lt;20.0% standard.</span>
              </div>

              <div className="p-4 bg-white border border-divider/90 flex flex-col justify-between">
                <div>
                  <span className="text-graylabel text-[9px] uppercase font-bold block">Promote Status:</span>
                  <p className={`text-sm font-bold uppercase mt-1 ${
                    auditStatistics.pending === 50
                      ? "text-graylabel"
                      : auditStatistics.isBlocked 
                        ? "text-red-600" 
                        : "text-emerald-700"
                  }`}>
                    {auditStatistics.pending === 50 
                      ? "AWAITING AUDIT RUN" 
                      : auditStatistics.isBlocked 
                        ? "PROMOTION BLOCKED" 
                        : "PROMOTION APPROVED"}
                  </p>
                </div>
                <div className="text-[9.5px] text-graylabel mt-2">
                  {auditStatistics.isBlocked && "Click disputed items above to revise / refactor."}
                  {!auditStatistics.isBlocked && auditStatistics.pending < 50 && "Consensus criteria fully satisfied."}
                </div>
              </div>
            </div>

            {/* Promotional block gate message */}
            {auditStatistics.isBlocked && (
              <div className="bg-red-500/10 border-l-4 border-red-500 p-4 font-mono text-xs text-red-900 leading-normal mb-2 flex items-center justify-between gap-4 animate-bounce">
                <div className="flex gap-2 items-center">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    <strong>AUDIT GATES ACTIVE:</strong> promotion from Tier 2 to Tier 3 blocked. {auditStatistics.disputed} items disputed by expert panel.
                  </span>
                </div>
                <button
                  onClick={() => setAuditItems(prev => prev.map(item => ({ ...item, status: 'agreed' })))}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-[10px] uppercase font-bold border-none cursor-pointer"
                >
                  RESOLVE ALL CONFLICTS
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 16.4 — AVOIDING BENCHMARK-CONSTRUCT CONFLATION */}
        <div id="avoiding-conflation-safeguard" className="border border-divider bg-white p-8 sm:p-12 mb-8 relative shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-divider pb-4">
            <Workflow className="w-5 h-5 text-cobalt" />
            <span className="text-[10px] font-mono font-bold text-cobalt tracking-widest uppercase">
              SECTION 16.4
            </span>
          </div>

          <h3 className="text-2xl font-black text-jet uppercase tracking-tight mb-4">
            16.4 AVOIDING BENCHMARK-CONSTRUCT CONFLATION
          </h3>
          <p className="text-sm text-deepgray leading-relaxed max-w-[800px] mb-8">
            A persistent failure mode in AI evaluation is the gradual substitution of benchmark identity for construct identity — referring to &quot;HarmBench safety&quot; or &quot;AILuminate compliance&quot; as though these values are co-extensive with the underlying constructs of harmlessness. Every governance report must explicitly distinguish between the construct, the benchmark, and the inherent inference boundaries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="bg-[#fbfbf9] p-5 border border-divider">
              <span className="text-cobalt font-black block text-[10px] uppercase mb-1">COMPARTMENT A</span>
              <span className="font-bold text-jet block uppercase tracking-tight text-sm mb-2">Claimed Construct</span>
              <p className="text-[11px] leading-relaxed text-deepgray">
                The deep underlying property under test (e.g., &quot;Harmlessness&quot; or &quot;Taxonomy Resilience&quot;). This remains highly abstract and conceptual.
              </p>
            </div>

            <div className="bg-[#fbfbf9] p-5 border border-divider">
              <span className="text-cobalt font-black block text-[10px] uppercase mb-1">COMPARTMENT B</span>
              <span className="font-bold text-jet block uppercase tracking-tight text-sm mb-2">Benchmark Operationalisation</span>
              <p className="text-[11px] leading-relaxed text-deepgray">
                The specific instrument being measured (e.g., &quot;HarmBench 2.0 scores&quot;). This is only a localized representation of the construct domain.
              </p>
            </div>

            <div className="bg-[#fbfbf9] p-5 border border-divider">
              <span className="text-cobalt font-black block text-[10px] uppercase mb-1">COMPARTMENT C</span>
              <span className="font-bold text-jet block uppercase tracking-tight text-sm mb-2">Inherent inference Limits</span>
              <p className="text-[11px] leading-relaxed text-deepgray">
                The explicit boundary condition separating A from B. Clearly states exclusions, style preferences, and multilingual limits.
              </p>
            </div>
          </div>
        </div>

      </div>
    </GridSection>
  );
};
