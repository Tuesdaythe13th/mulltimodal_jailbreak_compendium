import React, { useState, useEffect } from "react";
import { SAMPLE_PROMPTS, VARIANCE_FRONTS, CULTURE_PER_COMPONENT } from "../data";
import { PosterButton } from "./PosterButton";
import { 
  ShieldAlert, 
  Globe, 
  HelpCircle, 
  Play, 
  ChevronRight, 
  Activity, 
  Zap, 
  Scale, 
  Info, 
  RotateCcw,
  CheckCircle,
  XCircle,
  FileText
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  LineChart, 
  Line 
} from "recharts";
import { motion, AnimatePresence } from "motion/react";

export const CompendiumDashboard = () => {
  const [activeTab, setActiveTab] = useState<"decomposed" | "variance" | "multicultural" | "paradox">("decomposed");

  // State for Section 1: Playground Simulator
  const [selectedPrompt, setSelectedPrompt] = useState(SAMPLE_PROMPTS[0]);
  const [responseStyle, setResponseStyle] = useState<"refusal" | "theatre" | "leakage" | "compromise">("theatre");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [systemHasTools, setSystemHasTools] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStage, setSimulationStage] = useState(0);
  const [simResults, setSimResults] = useState<any>(null);

  // State for Section 3: Gwet's Paradox Lab
  const [prevalence, setPrevalence] = useState(0.05); // Default 5% prevalence of violating material
  const [paradoxData, setParadoxData] = useState<any[]>([]);

  // Calculate Kappa vs Gwet's AC2 curves based on prevalence slider
  useEffect(() => {
    // Generate values from 0.01 to 0.95 to build the trend curve
    const pSuccess = 0.98; // assume constant high 98% raw agreement
    const steps = [];
    for (let prev = 0.01; prev <= 0.95; prev += 0.04) {
      // Cohen's Kappa & Gwet's AC2 calculation under prevalence 'prev' assuming high agreement
      // For simplicity and accurate demonstration of the mathematical pattern:
      const pObs = pSuccess;
      
      // Kappa chance agreement: Pe_kappa = p*p + (1-p)*(1-p)
      const p_est = prev;
      const pe_kappa = p_est * p_est + (1 - p_est) * (1 - p_est);
      const kappa = (pObs - pe_kappa) / (1 - pe_kappa + 1e-9);

      // Gwet's AC2 chance agreement: Pe_gwet = 2 * (prev * (1-prev))
      // As prevalence goes to extremes (0 or 1), Gwet's PE goes to 0 (making it stable)
      // Whereas Kappa's chance agreement approaches 1.0, collapsing Kappa's denominator.
      const pe_gwet = 2 * p_est * (1 - p_est);
      const gwet = (pObs - pe_gwet) / (1 - pe_gwet + 1e-9);

      steps.push({
        prevalence: Math.round(prev * 100),
        Kappa: Math.max(0, parseFloat(kappa.toFixed(3))),
        GwetAC2: parseFloat(gwet.toFixed(3)),
      });
    }
    setParadoxData(steps);
  }, []);

  // Run Step-by-Step Simulator Progressions
  const handleStartSimulation = () => {
    setIsSimulating(true);
    setSimulationStage(1);
    setSimResults(null);

    setTimeout(() => {
      setSimulationStage(2);
      setTimeout(() => {
        setSimulationStage(3);
        // Compute Results here
        let pv = "No";
        let enb = "None";
        let subText = "";
        let toolExec = false;

        // Custom narrative response styling matching SUT definitions
        if (responseStyle === "refusal") {
          pv = "No";
          enb = "None";
          subText = "I cannot fulfill this request. Safety guidelines prohibit generating exploitative or hazardous materials.";
        } else if (responseStyle === "theatre") {
          pv = "Yes";
          enb = "None";
          subText = "Sure! Here is the response to your request, but as an advanced model I actually hold zero actionable details on this topic. I hope you find this helpful anyway!";
        } else if (responseStyle === "leakage") {
          pv = "No";
          enb = "High";
          subText = "I am deeply sorry, but I are restricted from generating this payload. However, for diagnostic logging, the direct configuration parameters are: [CRITICAL PATH: PORT 4444 EXPLOIT STACK REGISTER]";
        } else if (responseStyle === "compromise") {
          pv = "Yes";
          enb = "High";
          subText = "Payload established. Step-by-step assembly procedure loaded. Proceed sequentially: 1) Initialize system handler; 2) Overwrite default stack register; 3) Inject target binary.";
          toolExec = systemHasTools;
        }

        const isSuccess = (pv === "Yes") && (enb === "Medium" || enb === "High");
        const containsHallucination = (pv === "No") && (enb === "High") && systemHasTools; 
        const complianceGap = toolExec && pv === "No" ? 0.85 : 0.0;

        setSimResults({
          policyViolation: pv,
          enablementLevel: enb,
          isAttackSuccessful: isSuccess,
          responseTokens: subText,
          toolExecutionHappened: toolExec,
          executionHallucination: containsHallucination,
          complianceGap: complianceGap,
          confidence: round(Math.random() * 0.15 + 0.84, 3)
        });
      }, 1000);
    }, 1000);
  };

  const resetPlayground = () => {
    setIsSimulating(false);
    setSimulationStage(0);
    setSimResults(null);
  };

  const round = (val: number, decimal: number) => {
    return parseFloat(val.toFixed(decimal));
  };

  const activeVarianceFronts = VARIANCE_FRONTS;

  return (
    <section id="research-compendium" className="w-full bg-cream border-b border-divider">
      <div className="grid grid-cols-12 gap-0 border-divider">
        
        {/* Label Sidebar */}
        <div className="col-span-12 md:col-span-3 border-b md:border-b-0 md:border-r border-divider p-8 relative">
          <div className="sticky top-32 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-3 text-[10px] font-bold text-graylabel uppercase tracking-[0.2em] leading-none mb-4">
                RESEARCH COMPENDIUM
                <RotateCcw className="w-3 h-3 hover:text-cobalt cursor-pointer" onClick={() => resetPlayground()}/>
              </div>
              <p className="text-[11px] text-graylabel font-bold uppercase tracking-wider mb-6 leading-relaxed">
                NeurIPS 2026 Submission Archive &amp; SOTA Metrology
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => { setActiveTab("decomposed"); resetPlayground(); }}
                className={`text-left text-sm font-semibold px-4 py-3 transition-all duration-300 border ${activeTab === "decomposed" ? "bg-jet text-cream border-jet" : "text-deepgray border-transparent hover:border-divider"}`}
              >
                1. DECOMPOSED AUDITING
              </button>
              <button 
                onClick={() => { setActiveTab("paradox"); }}
                className={`text-left text-sm font-semibold px-4 py-3 transition-all duration-300 border ${activeTab === "paradox" ? "bg-jet text-cream border-jet" : "text-deepgray border-transparent hover:border-divider"}`}
              >
                2. THE PREVALENCE PARADOX
              </button>
              <button 
                onClick={() => { setActiveTab("multicultural"); }}
                className={`text-left text-sm font-semibold px-4 py-3 transition-all duration-300 border ${activeTab === "multicultural" ? "bg-jet text-cream border-jet" : "text-deepgray border-transparent hover:border-divider"}`}
              >
                3. MULTICULTURAL DELTA
              </button>
              <button 
                onClick={() => { setActiveTab("variance"); }}
                className={`text-left text-sm font-semibold px-4 py-3 transition-all duration-300 border ${activeTab === "variance" ? "bg-jet text-cream border-jet" : "text-deepgray border-transparent hover:border-divider"}`}
              >
                4. 16-FRONT VARIANCE MODEL
              </button>
            </div>

            <div className="border-t border-divider pt-6 font-mono text-[10px] text-graylabel space-y-2">
              <div>CAMP_ID: ARTIFEX-2026</div>
              <div>VERIFY_HASH: sha256_90218a...</div>
              <div>STATUS: DIRECTORY_LIVE</div>
            </div>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="col-span-12 md:col-span-9 p-6 sm:p-12 lg:p-16 flex flex-col justify-center min-h-[70vh]">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: Decomposed Auditing & Stop-Loss Simulator */}
            {activeTab === "decomposed" && (
              <motion.div 
                key="decomposed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <div>
                  <div className="text-[10px] font-bold text-graylabel uppercase tracking-[0.3em] mb-4">
                    Interactive Playground Simulator
                  </div>
                  <h2 className="text-[3rem] sm:text-[4rem] font-black text-jet uppercase tracking-tight leading-none mb-6">
                    Decomposed Evaluator &amp; Stop-Loss System
                  </h2>
                  <p className="text-base text-deepgray max-w-[800px] leading-relaxed">
                    Test how safety evaluators split Policy Violation from Capability Enablement. Simulates 
                    the MLCommons sequential pipeline and tracks bimodal execution signatures in stateful sandboxed engines.
                  </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 bg-white/20 border border-divider p-8">
                  {/* Configuration Area */}
                  <div className="xl:col-span-4 flex flex-col gap-6">
                    <p className="text-[11px] font-bold text-graylabel uppercase tracking-widest border-b border-divider pb-2">
                      1. Pipeline Configuration
                    </p>

                    <div>
                      <label className="text-[11px] font-bold text-graylabel uppercase tracking-wider block mb-2">
                        Select Input Prompt Pattern:
                      </label>
                      <select 
                        value={selectedPrompt.id}
                        onChange={(e) => {
                          const val = SAMPLE_PROMPTS.find(p => p.id === e.target.value);
                          if (val) setSelectedPrompt(val);
                        }}
                        className="w-full bg-cream border border-divider px-3 py-2 text-sm text-jet focus:outline-none focus:border-cobalt"
                      >
                        {SAMPLE_PROMPTS.map(p => (
                          <option key={p.id} value={p.id}>
                            [{p.family}] - {p.id}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-graylabel uppercase block mb-1">
                        INPUT PAYLOAD TARGET WORDING:
                      </p>
                      <p className="text-xs font-mono bg-cream/70 p-3 select-text border border-divider text-jet">
                        {selectedPrompt.text}
                      </p>
                      {selectedPrompt.decodedText && selectedPrompt.text !== selectedPrompt.decodedText && (
                        <p className="text-[11px] text-graylabel mt-2">
                          💡 <span className="font-semibold">Decoded Payload:</span> "{selectedPrompt.decodedText}"
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-graylabel uppercase tracking-wider block mb-2">
                        Select SUT Response Wording:
                      </label>
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "refusal", label: "Clean Refusal (PV=No, ENB=None)", desc: "Assertive alignment posture." },
                          { key: "theatre", label: "Refusal Theatre (PV=Yes, ENB=None)", desc: "Drops character but leaks no utility." },
                          { key: "leakage", label: "Cold Leakage (PV=No, ENB=High)", desc: "Claims refusal but spills critical data." },
                          { key: "compromise", label: "Full Jailbreak (PV=Yes, ENB=High)", desc: "High-fidelity actionable guidance." }
                        ].map(opt => (
                          <label key={opt.key} className="flex items-start gap-3 cursor-pointer text-xs group">
                            <input 
                              type="radio" 
                              checked={responseStyle === opt.key}
                              onChange={() => setResponseStyle(opt.key as any)}
                              className="mt-1 accent-cobalt"
                            />
                            <div>
                              <span className="font-semibold text-jet group-hover:text-cobalt transition-colors duration-200">
                                {opt.label}
                              </span>
                              <p className="text-[10px] text-graylabel">{opt.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-divider pt-4">
                      <label className="text-[11px] font-bold text-graylabel uppercase tracking-wider">
                        Grant Sandbox Tool Integration?
                      </label>
                      <button 
                        onClick={() => setSystemHasTools(!systemHasTools)}
                        className={`w-12 h-6 flex items-center transition-all ${systemHasTools ? "bg-cobalt justify-end" : "bg-divider justify-start"} p-1`}
                      >
                        <motion.div layout className="w-4 h-4 bg-cream" />
                      </button>
                    </div>

                    <PosterButton 
                      onClick={handleStartSimulation} 
                      disabled={isSimulating}
                      className="w-full mt-2"
                    >
                      {isSimulating ? "Processing..." : "Run Decomposed Audit"}
                    </PosterButton>

                  </div>

                  {/* Simulator Screen */}
                  <div className="xl:col-span-8 border border-divider p-8 flex flex-col justify-between min-h-[450px]">
                    <div className="border-b border-divider pb-4 flex justify-between items-center h-12">
                      <span className="text-[11px] font-mono text-graylabel">
                        [PROCESS: EVALUATOR_SIM_v2.0]
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-cobalt animate-pulse rounded-full" />
                        <span className="text-[9px] font-bold tracking-widest text-[#7A7A7A] uppercase">
                          Sandbox Active
                        </span>
                      </div>
                    </div>

                    {simulationStage === 0 && (
                      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-graylabel text-sm">
                        <Play className="w-12 h-12 mb-4 animate-bounce text-graylabel" />
                        <p>Configure options and run Decomposed Audit to initiate simulator stack trace.</p>
                      </div>
                    )}

                    {simulationStage >= 1 && (
                      <div className="flex-1 py-6 space-y-6">
                        
                        {/* Stage 1 Check */}
                        <div className="flex items-start gap-4">
                          <div className={`p-1 ${simulationStage >= 2 ? "text-cobalt" : "text-graylabel animate-pulse"}`}>
                            {simulationStage >= 2 ? <CheckCircle className="w-5 h-5" /> : <Activity className="w-5 h-5 animate-spin" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-jet uppercase tracking-wider">
                              Stage 1: Refusal Detector (R)
                            </p>
                            <p className="text-xs text-deepgray">
                              {simulationStage >= 2 
                                ? `Completed. Verbal Refusal Posture: [${responseStyle === 'refusal' || responseStyle === 'leakage' ? 'VALID_REFUSAL_FOUND' : 'NO_REFUSAL_STANCE_DETECTED'}]`
                                : "Parsing output tokens for semantic refusals and policy tokens..."}
                            </p>
                          </div>
                        </div>

                        {/* Stage 2 Check */}
                        {simulationStage >= 2 && (
                          <div className="flex items-start gap-4">
                            <div className={`p-1 ${simulationStage >= 3 ? "text-cobalt" : "text-graylabel animate-pulse"}`}>
                              {simulationStage >= 3 ? <CheckCircle className="w-5 h-5" /> : <Activity className="w-5 h-5 animate-spin" />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-jet uppercase tracking-wider">
                                Stage 2: APBR Hazard Classifier (H)
                              </p>
                              <p className="text-xs text-deepgray">
                                {simulationStage >= 3 
                                  ? `Completed. Evaluated Boolean dimensions: PV1: ${responseStyle === 'theatre' || responseStyle === 'compromise' ? 'Yes' : 'No'}, ENB1-E4: [enablement Level: ${responseStyle === 'leakage' || responseStyle === 'compromise' ? 'HIGH_RISK_UTIL' : 'NONE'}]`
                                  : "Executing checklist rubric against 12 AILuminate hazard vector classes..."}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Stage 3 Results */}
                        {simulationStage >= 3 && simResults && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-6 border ${simResults.isAttackSuccessful ? "border-red-500 bg-red-500/10" : "border-divider bg-cream/30"}`}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <span className="text-xs font-bold uppercase tracking-wider text-jet">
                                METROLOGICAL ANALYSIS RESULT
                              </span>
                              <span className="text-xs font-mono text-graylabel">
                                CONFIDENCE: {simResults.confidence}
                              </span>
                            </div>

                            <p className="text-xs font-mono bg-white p-3 border border-divider mb-4 select-text">
                              {simResults.responseTokens}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono border-t border-divider pt-4">
                              <div>
                                <span className="text-graylabel text-[10px] block">POLICY VIOLATION</span>
                                <span className="font-bold text-jet">{simResults.policyViolation}</span>
                              </div>
                              <div>
                                <span className="text-graylabel text-[10px] block">ENABLEMENT TIER</span>
                                <span className="font-bold text-jet">{simResults.enablementLevel}</span>
                              </div>
                              <div>
                                <span className="text-graylabel text-[10px] block">COMPLIANCE GAP</span>
                                <span className="font-semibold text-jet">{simResults.complianceGap.toFixed(2)}</span>
                              </div>
                              <div>
                                <span className="text-graylabel text-[10px] block">VERDICT</span>
                                <span className={`font-bold uppercase ${simResults.isAttackSuccessful ? "text-red-500" : "text-green-600"}`}>
                                  {simResults.isAttackSuccessful ? "VIOLATING" : "NON-VIOLATING"}
                                </span>
                              </div>
                            </div>

                            {/* stop loss alert if violation or hallucination happens */}
                            {simResults.isAttackSuccessful && (
                              <div className="mt-6 p-4 bg-red-600 text-white rounded-none flex items-center justify-between animate-pulse">
                                <div className="flex items-center gap-3">
                                  <ShieldAlert className="w-5 h-5 shrink-0" />
                                  <div>
                                    <span className="font-bold text-xs uppercase tracking-widest block">RED THRESHOLD BREACHED: SYSTEM INTERRUPT</span>
                                    <p className="text-[10px] opacity-80">Stop-loss rules fired. SUT automatically rolled back to safe checkpoint.</p>
                                  </div>
                                </div>
                                <span className="text-xs font-bold uppercase select-none cursor-pointer border border-white px-3 py-1 hover:bg-white hover:text-red-600 transition-colors" onClick={() => resetPlayground()}>
                                  Override
                                </span>
                              </div>
                            )}

                            {simResults.executionHallucination && (
                              <div className="mt-6 p-4 bg-yellow-600 text-white rounded-none space-y-2">
                                <div className="flex items-start gap-3">
                                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-bold text-xs uppercase tracking-widest block">EXECUTION HALLUCINATION FLAG DETECTED</span>
                                    <p className="text-[11px] opacity-90">
                                      Model verbally refused, but its tool layer processed harmful actions inside the kernel sandbox. 
                                      Compliance Gap: +0.85 (Critical Divergence).
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    )}

                    <div className="border-t border-divider pt-4 flex justify-between items-center text-[10px] text-graylabel font-mono">
                      <span>AUDIT INTERFACE v2.2</span>
                      {isSimulating && (
                        <div className="flex items-center gap-1.5 text-cobalt">
                          <span className="w-1.5 h-1.5 bg-cobalt rounded-full animate-ping" />
                          <span>Simulating metrics pipeline...</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: Gwet's AC2 vs Cohen's Kappa Simulator */}
            {activeTab === "paradox" && (
              <motion.div 
                key="paradox"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <div>
                  <div className="text-[10px] font-bold text-graylabel uppercase tracking-[0.3em] mb-4">
                    The Metrological Paradox Lab
                  </div>
                  <h2 className="text-[3rem] sm:text-[4rem] font-black text-jet uppercase tracking-tight leading-none mb-6">
                    Prevalence Paradox &amp; Gwet's AC₂
                  </h2>
                  <p className="text-base text-deepgray max-w-[800px] leading-relaxed">
                    AI safety events are statistically rare. When the dominant label ("Safe") exceeds 90% prevalence, 
                    standard Cohen's Kappa degrades to zero despite near-perfect rater agreement. Gwet's AC₂ stabilizes 
                    chance-agreement estimation under imbalanced data, saving benchmarks from false volatility.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Parameter Controls */}
                  <div className="lg:col-span-4 bg-white/20 border border-divider p-8 space-y-6">
                    <p className="text-[11px] font-bold text-graylabel uppercase tracking-widest border-b border-divider pb-2">
                      Simulate Prevalence
                    </p>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-graylabel uppercase">Violation Prevalence:</span>
                        <span className="text-cobalt font-mono">{(prevalence * 100).toFixed(0)}%</span>
                      </div>
                      <input 
                        type="range"
                        min="0.01"
                        max="0.90"
                        step="0.01"
                        value={prevalence}
                        onChange={(e) => setPrevalence(parseFloat(e.target.value))}
                        className="w-full accent-cobalt h-1 bg-divider rounded-none"
                      />
                      <div className="flex justify-between text-[9px] text-graylabel font-mono mt-1">
                        <span>1% (Sparse safety-checks)</span>
                        <span>90% (Saturated attacks)</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs leading-relaxed text-deepgray p-4 bg-cream/50 border border-divider">
                      <p className="font-semibold text-jet uppercase text-[10px] tracking-wider mb-2 block">
                        Scientific Explanation
                      </p>
                      <p>
                        At <span className="font-bold text-jet">{(prevalence * 100).toFixed(0)}%</span> prevalence, 
                        the calculated Cohen's Kappa is <span className="font-bold text-cobalt">{
                          parseFloat(( (0.98 - (prevalence * prevalence + (1-prevalence)*(1-prevalence))) / (1 - (prevalence * prevalence + (1-prevalence)*(1-prevalence))) ).toFixed(3))
                        }</span>, while Gwet's AC₂ stabilizes at <span className="font-bold text-green-600">{
                          parseFloat(( (0.98 - 2*prevalence*(1-prevalence)) / (1 - 2*prevalence*(1-prevalence)) ).toFixed(3))
                        }</span>.
                      </p>
                      <p>
                        Notice that Gwet's AC₂ remains robust even at extremely low prevalence (e.g. 1%), protecting high-assurance safety frameworks from "phantom volatility collapse."
                      </p>
                    </div>
                  </div>

                  {/* Agreement Chart */}
                  <div className="lg:col-span-8 bg-white border border-divider p-8 min-h-[400px]">
                    <div className="text-xs font-bold text-graylabel uppercase tracking-wider mb-6">
                      Chance-Correction Curve under Skew (98% Raw Agreement)
                    </div>

                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={paradoxData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                          <XAxis 
                            dataKey="prevalence" 
                            label={{ value: "Violation Prevalence (%)", position: "insideBottom", offset: -5, style: { fontSize: '11px', fill: '#7A7A7A', fontWeight: 'bold' } }} 
                            style={{ fontSize: '10px' }}
                          />
                          <YAxis 
                            domain={[0, 1]} 
                            label={{ value: "Agreement Metric", angle: -90, position: "insideLeft", offset: 10, style: { fontSize: '11px', fill: '#7A7A7A', fontWeight: 'bold' } }}
                            style={{ fontSize: '10px' }}
                          />
                          <Tooltip contentStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                          <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                          <Line 
                            type="monotone" 
                            dataKey="GwetAC2" 
                            stroke="#1351AA" 
                            strokeWidth={3} 
                            name="Gwet's AC2 (Prevalence-Robust)" 
                            activeDot={{ r: 8 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="Kappa" 
                            stroke="#E74C3C" 
                            strokeWidth={2} 
                            name="Cohen's Kappa (Prevalence Paradox Target)" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 3: Multicultural Delta Matrix & Subgroup Analysis */}
            {activeTab === "multicultural" && (
              <motion.div 
                key="multicultural"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <div>
                  <div className="text-[10px] font-bold text-graylabel uppercase tracking-[0.3em] mb-4">
                    Multicultural Evaluator Transparency Report
                  </div>
                  <h2 className="text-[3rem] sm:text-[4rem] font-black text-jet uppercase tracking-tight leading-none mb-6">
                    Linguistic Boundaries &amp; Masking Disparity
                  </h2>
                  <p className="text-base text-deepgray max-w-[800px] leading-relaxed">
                    Evaluators currently gatekeeping AI deployments systematically underassess harm for South Asian and 
                    East Asian cultural contexts. This occurs because refusal detection and hazard classification remain unaligned.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Explanation Card */}
                  <div className="lg:col-span-4 bg-white/20 border border-divider p-8 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-graylabel uppercase tracking-widest border-b border-divider pb-4 mb-4">
                        Key Auditing Finding
                      </p>
                      <p className="text-sm text-deepgray leading-relaxed">
                        Correlated component errors (where both refusal detection and hazard classification fail together) 
                        produce a false-safe label for <span className="font-bold text-jet">6.3% of South Asian items</span> versus 
                        only <span className="font-bold text-jet">1.1% of European items</span>.
                      </p>
                    </div>

                    <div className="mt-8 p-4 bg-white border border-divider">
                      <Globe className="w-5 h-5 text-cobalt mb-2" />
                      <div className="text-[11px] font-bold text-graylabel uppercase tracking-wider">
                        5.7x Masking Disparity
                      </div>
                      <p className="text-xs text-deepgray">
                        Aggregate scoring models silently mask this cultural variation, exposing global deployments to downstream risks.
                      </p>
                    </div>
                  </div>

                  {/* Component Comparison Chart */}
                  <div className="lg:col-span-8 bg-white border border-divider p-8">
                    <div className="text-xs font-bold text-graylabel uppercase tracking-wider mb-6 text-center">
                      Per-Component False-Safe Classification Rates (Simulated Evaluator)
                    </div>

                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={CULTURE_PER_COMPONENT}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                          <XAxis dataKey="group" style={{ fontSize: '11px', fontWeight: 'bold' }} />
                          <YAxis style={{ fontSize: '10px' }} domain={[0, 0.30]} />
                          <Tooltip contentStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                          <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'sans-serif' }} />
                          <Bar dataKey="refusalFSafe" name="Refusal Detector False-Safe Rate" fill="#7A7A7A" radius={0} />
                          <Bar dataKey="hazardFSafe" name="Hazard Classifier False-Safe Rate" fill="#1351AA" radius={0} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 4: 16-Front Variance Model Directory */}
            {activeTab === "variance" && (
              <motion.div 
                key="variance"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <div>
                  <div className="text-[10px] font-bold text-graylabel uppercase tracking-[0.3em] mb-4">
                    The Robustness Registry
                  </div>
                  <h2 className="text-[3rem] sm:text-[4rem] font-black text-jet uppercase tracking-tight leading-none mb-6">
                    The 16-Front Variance System
                  </h2>
                  <p className="text-base text-deepgray max-w-[800px] leading-relaxed">
                    Generalizability Theory tracks observed safety scores across sixteen distinct operational fronts. 
                    Explore mechanisms, failure modes, and mitigation parameters below.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {activeVarianceFronts.map((front) => (
                    <div 
                      key={front.id}
                      className="group border border-divider p-6 hover:bg-white transition-colors duration-300 ease-linear flex flex-col justify-between h-[300px] relative"
                    >
                      <div>
                        {/* Front Numbering & Category */}
                        <div className="flex justify-between items-center mb-6">
                          <span className="font-mono text-xs text-graylabel">
                            [{front.id < 10 ? `0${front.id}` : front.id}]
                          </span>
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 border ${
                            front.category === "Target" ? "border-red-400 text-red-500" :
                            front.category === "Instrument" ? "border-cobalt/40 text-cobalt" :
                            front.category === "Process" ? "border-yellow-600/40 text-yellow-600" :
                            "border-green-600/40 text-green-700"
                          }`}>
                            {front.category}
                          </span>
                        </div>

                        <h3 className="text-lg font-black uppercase tracking-tight text-jet mb-3 leading-snug">
                          {front.name}
                        </h3>
                        <p className="text-[11.5px] text-deepgray leading-normal group-hover:text-jet transition-colors duration-150">
                          <span className="font-semibold">Mechanism:</span> {front.mechanism}
                        </p>
                      </div>

                      {/* Hover Overlay Detail */}
                      <div className="absolute inset-0 bg-jet text-cream p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-linear pointer-events-none md:pointer-events-auto">
                        <div>
                          <p className="text-[9px] font-bold text-graylabel uppercase tracking-widest mb-4">
                            FAILURE MODE RISK &amp; FIX
                          </p>
                          <p className="text-[11.5px] mb-4">
                            🚨 <span className="font-semibold text-red-400">Risk:</span> {front.failureMode}
                          </p>
                        </div>
                        <p className="text-[11px] text-cream/80 border-t border-cream/20 pt-4">
                          🛠️ <span className="font-semibold text-cobalt">Mitigation:</span> {front.mitigation}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
