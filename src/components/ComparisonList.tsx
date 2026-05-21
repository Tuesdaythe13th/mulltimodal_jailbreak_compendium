import React from 'react';
import { GridSection } from './LayoutGrid';
import { COMPARISON_ITEMS } from '../data';

export const ComparisonList = () => {
  return (
    <GridSection id="why-different" label="WHY DIFFERENT">
      <div className="w-full flex-1 flex flex-col">
        <h2 className="text-[4rem] lg:text-[6rem] font-black text-jet leading-[0.85] tracking-[-0.05em] uppercase mb-12 max-w-[800px]">
          Taxonomy of<br/>Failure Modes
        </h2>

        <div className="flex flex-col border-b border-divider">
          {COMPARISON_ITEMS.map((item) => (
            <div 
              key={item.id}
              className="group flex flex-col lg:flex-row lg:items-start p-6 lg:p-10 border-t border-divider cursor-pointer transition-colors duration-300 ease-linear hover:bg-white/20"
            >
              <span className="text-[9px] font-bold text-graylabel uppercase tracking-[0.3em] w-24 shrink-0 mt-2">
                [{item.id}]
              </span>
              <div className="flex-1">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-jet group-hover:text-cobalt transition-colors duration-300 ease-linear tracking-tight">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="mt-4 text-deepgray max-w-[600px] text-lg">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </GridSection>
  );
};
