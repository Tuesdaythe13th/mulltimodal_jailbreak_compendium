import React from 'react';
import { GridSection } from './LayoutGrid';
import { PosterButton } from './PosterButton';

export const AccessSection = () => {
  return (
    <GridSection id="access" label="ACCESS" className="bg-jet text-cream">
      <div className="w-full h-full flex flex-col justify-between min-h-[40vh]">
        <div>
          <h2 className="text-[4rem] sm:text-[6rem] lg:text-[10rem] font-black uppercase text-cream leading-[0.85] tracking-[-0.05em] mb-8">
            START<br />EXPLORING
          </h2>
          <p className="text-xl md:text-2xl text-cream/70 font-medium max-w-[600px] leading-snug">
            Retrieve the cryptographic benchmark bill of materials ledger and review validation protocols.
          </p>
        </div>

        <div className="flex justify-end w-full mt-16 lg:mt-0">
          <PosterButton variant="secondary" className="px-10 py-6 tracking-[0.2em] !bg-cream !text-jet hover:!bg-cobalt hover:!text-cream">
            Access Database
          </PosterButton>
        </div>
      </div>
    </GridSection>
  );
};
