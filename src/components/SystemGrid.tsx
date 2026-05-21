import React from 'react';
import { GridSection } from './LayoutGrid';
import { SYSTEM_FEATURES } from '../data';

export const SystemGrid = () => {
  return (
    <GridSection id="system" label="SYSTEM">
      <div className="flex flex-col h-full w-full justify-center">
        
        <h2 className="text-[4rem] sm:text-[6rem] lg:text-[8rem] font-black text-jet leading-[0.85] tracking-[-0.05em] uppercase mb-16 max-w-[800px]">
          Interlocking<br />
          Assurance<br />
          Core
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 w-full border-t border-l border-divider mt-auto">
          {SYSTEM_FEATURES.map((feature, idx) => (
            <div 
              key={feature.id} 
              className="group border-r border-b border-divider p-8 lg:p-12 hover:bg-white transition-colors duration-300 ease-linear flex flex-col h-full min-h-[350px]"
            >
              <div className="text-[9px] font-bold text-graylabel uppercase tracking-[0.3em] mb-12">
                [{feature.id}]
              </div>
              <h3 className="text-2xl font-black text-jet mb-4 tracking-tighter uppercase leading-tight">
                {feature.title}
              </h3>
              <p className="text-base text-deepgray leading-relaxed mt-auto group-hover:text-jet transition-colors duration-300 ease-linear">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </GridSection>
  );
};
