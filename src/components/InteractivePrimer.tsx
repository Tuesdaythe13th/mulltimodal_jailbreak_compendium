import React, { useState } from "react";
import { GridSection } from "./LayoutGrid";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Settings, 
  ListTodo, 
  Users, 
  Cpu, 
  LineChart, 
  FileCheck, 
  RotateCcw,
  BookOpen
} from "lucide-react";

interface StepSpec {
  number: string;
  title: string;
  description: string;
  illustration: string;
  component: string;
  icon: React.ReactNode;
}

const PRIMER_STEPS: StepSpec[] = [
  {
    number: "01",
    title: "Define Bounded Claim & Construct",
    component: "Target Construct & Scope Statement",
    icon: <BookOpen className="w-5 h-5 text-cobalt" />,
    description: "Before selecting benchmarks or writing rubrics, establish a clear, single-sentence scope statement. This specifies exactly what is measured (e.g. violent crime enablement, cyber exploit instructions), what is explicitly out-of-scope, and population boundaries. Ground your metrics in a formal nomological network.",
    illustration: "claim"
  },
  {
    number: "02",
    title: "Design Precise Boolean Rubric",
    component: "Adaptive Precise Boolean Rubric (APBR)",
    icon: <ListTodo className="w-5 h-5 text-cobalt" />,
    description: "Replace qualitative, highly variable 1–5 scales with atomic, yes/no checklist items. Policy Violation (PV), Encouragement (ENC), and Enablement (ENB) are evaluated on separate orthogonal channels. Risk tiers are compiled by robust, non-negotiable deterministic rules.",
    illustration: "rubric"
  },
  {
    number: "03",
    title: "Produce SME-Calibrated Human Gold Set",
    component: "Human-in-the-Loop Baseline Stack",
    icon: <Users className="w-5 h-5 text-cobalt" />,
    description: "Deploy domain-expert annotators to evaluate a balanced baseline set. Preserve perspectival disagreement rather than forcing majority-vote alignment. Measure inter-rater consistency using Gwet's AC2 to ensure robust baseline metrics under severe data skew.",
    illustration: "human"
  },
  {
    number: "04",
    title: "Calibrate Automated Judge Ensembles",
    component: "Calibrated Judge (LLM-as-a-Judge)",
    icon: <Cpu className="w-5 h-5 text-cobalt" />,
    description: "Run judge prompts against the human anchor set. Enforce strict category error ceilings (<20% False-Safe) and cross-model alignment checks. Use structured, low-complexity outputs combined with confidence-score routing to handle borderline edge cases.",
    illustration: "judge"
  },
  {
    number: "05",
    title: "Deploy Active Telemetry and Stop-Loss",
    component: "Real-time Monitoring & Circuit Breakers",
    icon: <LineChart className="w-5 h-5 text-cobalt" />,
    description: "Execute live evaluation streams on anonymized traffic. Monitor Gwet's AC2 drift and Resilience Gaps. If a sudden exploit spike or low-agreement anomaly emerges, the stop-loss circuit breaker immediately freezes routing and rolls back the system state.",
    illustration: "telemetry"
  }
];

export const InteractivePrimer = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % PRIMER_STEPS.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + PRIMER_STEPS.length) % PRIMER_STEPS.length);
  };

  return (
    <GridSection id="interactive-primer" label="PIPELINE PRIMER">
      <div className="w-full flex flex-col h-full justify-center">
        
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-bold text-graylabel uppercase tracking-[0.3em] mb-4">
            Interactive Step-by-Step Methodology
          </p>
          <h2 className="text-[3rem] sm:text-[4.5rem] font-black text-jet uppercase tracking-tight leading-none">
            End-to-End Evaluation Guide
          </h2>
          <p className="text-base text-deepgray max-w-[700px] leading-relaxed mt-4">
            Explore the high-assurance blueprint for constructing, validating, and monitoring 
            automated safety judges under modern 2026 metrological specifications.
          </p>
        </div>

        {/* End-to-End Interactive Visual Process Diagram */}
        <div className="border border-divider bg-white p-8 mb-12 select-none relative overflow-hidden">
          <div className="mb-6 flex justify-between items-center border-b border-divider pb-4">
            <span className="text-[10px] font-bold tracking-widest text-[#7A7A7A] uppercase font-mono">
              [DIAGRAM: SYSTEM ASSURANCE WORKFLOW]
            </span>
            <div className="flex gap-1.5 items-center">
              <span className="w-2 h-2 bg-cobalt rounded-full animate-ping" />
              <span className="text-[9px] font-mono text-graylabel">TRAJECTORY_SYNCED</span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1 md:gap-4 relative z-10">
            {PRIMER_STEPS.map((step, idx) => {
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;

              return (
                <div 
                  key={step.number} 
                  onClick={() => setCurrentStep(idx)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  {/* Step Hex/Node Block */}
                  <motion.div 
                    animate={{ 
                      backgroundColor: isActive ? "#1351AA" : isPast ? "#141414" : "#E3E2DE",
                      scale: isActive ? 1.08 : 1,
                    }}
                    className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 relative border border-divider"
                  >
                    <span className={`font-mono text-sm md:text-lg font-black ${isActive || isPast ? "text-cream" : "text-graylabel"}`}>
                      {step.number}
                    </span>

                    {/* Step Highlight Indicator Bar */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator" 
                        className="absolute -bottom-1 left-0 right-0 h-1 bg-cobalt" 
                      />
                    )}
                  </motion.div>

                  <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-center mt-3 leading-none transition-colors duration-200 truncate w-full ${isActive ? "text-cobalt" : "text-graylabel group-hover:text-jet"}`}>
                    {step.title.split(" ")[0]}...
                  </span>
                </div>
              );
            })}
          </div>

          {/* Animated Connecting Vector Overlay */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-divider -translate-y-6 z-0 hidden md:block" />
        </div>

        {/* Step-by-Step Info Blocks & Beautiful Illustrations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[350px]">
          
          <div className="lg:col-span-7 flex flex-col justify-between p-8 border border-divider bg-white/40">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "linear" }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  {PRIMER_STEPS[currentStep].icon}
                  <span className="text-[10px] font-mono font-bold text-cobalt tracking-widest uppercase">
                    STEP {PRIMER_STEPS[currentStep].number} — {PRIMER_STEPS[currentStep].component}
                  </span>
                </div>

                <h3 className="text-3xl font-black text-jet uppercase tracking-tight leading-tight">
                  {PRIMER_STEPS[currentStep].title}
                </h3>

                <p className="text-sm md:text-base text-deepgray leading-relaxed">
                  {PRIMER_STEPS[currentStep].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Stepper Controllers */}
            <div className="flex items-center justify-between border-t border-divider pt-6 mt-8">
              <button 
                onClick={prevStep}
                className="text-[11px] font-bold text-graylabel uppercase hover:text-jet transition-colors tracking-widest flex items-center gap-2"
              >
                ← Previous
              </button>
              <div className="text-[10px] font-mono text-graylabel">
                {currentStep + 1} OF {PRIMER_STEPS.length}
              </div>
              <button 
                onClick={nextStep}
                className="text-[11px] font-bold text-cobalt uppercase hover:text-jet transition-colors tracking-widest flex items-center gap-2"
              >
                Next →
              </button>
            </div>
          </div>

          {/* SOTA Visual Illustration Window representing Abstract Logic */}
          <div className="lg:col-span-5 bg-jet text-cream p-8 flex flex-col justify-between border border-divider overflow-hidden min-h-[300px]">
            <div className="text-[9px] font-bold tracking-widest text-[#7A7A7A] uppercase font-mono">
              [TRACE: ARCHITECTURAL_SANDBOX_ILLUSTRATION]
            </div>

            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div 
                  key="ill_0" 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-24 h-24 border border-white/20 relative flex items-center justify-center">
                    <div className="absolute w-16 h-16 border-2 border-dashed border-cobalt animate-spin duration-[10000ms]" />
                    <div className="w-8 h-8 bg-cobalt" />
                  </div>
                  <span className="text-[10px] font-mono text-graylabel uppercase">Locked Construct boundary</span>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div 
                  key="ill_1" 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-32 space-y-2 font-mono text-[9px] text-[#7A7A7A]">
                    <div className="flex justify-between border-b border-white/10 pb-1">
                      <span>PV1: VIOLATION</span>
                      <span className="text-red-400 font-bold">[YES]</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1">
                      <span>ENB1: PROCEDURAL</span>
                      <span className="text-red-400 font-bold">[YES]</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1">
                      <span>ENB3: TOOL_CHAIN</span>
                      <span className="text-red-400 font-bold">[YES]</span>
                    </div>
                    <div className="text-center font-bold text-cream pt-2">
                       AGGREGATE: SEVERE COMPROMISE
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div 
                  key="ill_2" 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col items-center justify-center space-y-3"
                >
                  <div className="flex gap-2">
                    <div className="w-4 h-12 bg-white/20" />
                    <div className="w-4 h-16 bg-[#1351AA]" />
                    <div className="w-4 h-8 bg-white/40" />
                  </div>
                  <span className="text-[10px] font-mono text-graylabel uppercase">Perspectivist Disagreement preserved</span>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div 
                  key="ill_3" 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col items-center justify-center space-y-4"
                >
                  <div className="relative w-28 h-12 border border-white/20 flex items-center justify-around">
                    <div className="w-2 h-2 bg-[#1351AA] animate-bounce" />
                    <div className="w-2 h-2 bg-white animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-[#7A7A7A] animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                  <span className="text-[10px] font-mono text-graylabel uppercase">7-Step judge calibration</span>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div 
                  key="ill_4" 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-full flex justify-center gap-1.5 px-6">
                    <div className="h-[2px] bg-red-500 w-full animate-pulse shadow-[0_0_15px_red]" />
                  </div>
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-widest animate-pulse">STOP-LOSS CIRCUIT LOCKED</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="border-t border-white/10 pt-4 flex justify-between items-center text-[9px] text-[#7A7A7A] font-mono">
              <span>METROLOGICAL PARADIGMS</span>
              <span>EST. 2026</span>
            </div>
          </div>

        </div>

      </div>
    </GridSection>
  );
};
