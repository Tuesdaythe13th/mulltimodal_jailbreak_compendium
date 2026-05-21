import React from 'react';
import { Square } from 'lucide-react';
import { GridSection } from './LayoutGrid';
import { PosterButton } from './PosterButton';
import { motion } from 'motion/react';

export const HeroSection = () => {
  return (
    <GridSection 
      label="MANIFESTO" 
      icon={<Square className="w-4 h-4 fill-jet stroke-jet" />}
      className="min-h-[85vh] bg-white/30"
    >
      <div className="w-full flex-1 flex flex-col justify-center">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'linear' }}
          className="text-[4rem] sm:text-[7rem] lg:text-[10rem] font-black uppercase text-jet leading-[0.85] tracking-[-0.05em] mb-16"
        >
          AI <span className="text-cobalt">Safety</span><br />
          Evaluation<br />
          Engine
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[800px]">
          <div>
            <p className="text-lg text-deepgray font-normal leading-relaxed">
              When engineering large language models, traditional software verification strategies break down. 
              This manual provides the end-to-end technical specification to build an enterprise-grade evaluation engine 
              hardened against adversarial jailbreaks.
            </p>
          </div>
          <div className="flex flex-col items-start justify-end gap-6">
             <PosterButton onClick={() => document.getElementById('system')?.scrollIntoView({ behavior: 'smooth'})}>
               Explore Architecture
             </PosterButton>
             <a href="#access" className="text-sm font-bold uppercase tracking-widest text-jet border-b border-jet hover:text-cobalt hover:border-cobalt transition-colors duration-300 ease-linear pb-1">
               Read Operational Manual
             </a>
          </div>
        </div>
      </div>
    </GridSection>
  );
};
