import React from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { InteractivePrimer } from './components/InteractivePrimer';
import { ResearchManuscript } from './components/ResearchManuscript';
import { JailbreakAutoevaluatorGuide } from './components/JailbreakAutoevaluatorGuide';
import { CompendiumDashboard } from './components/CompendiumDashboard';
import { SystemGrid } from './components/SystemGrid';
import { ComparisonList } from './components/ComparisonList';
import { AccessSection } from './components/AccessSection';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "linear" }}
        className="w-full min-h-screen flex flex-col bg-cream"
      >
        <Navigation />
        <main className="flex-1 w-full mx-auto max-w-[2000px]">
          <HeroSection />
          <InteractivePrimer />
          <ResearchManuscript />
          <JailbreakAutoevaluatorGuide />
          <CompendiumDashboard />
          <SystemGrid />
          <ComparisonList />
          <AccessSection />
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
