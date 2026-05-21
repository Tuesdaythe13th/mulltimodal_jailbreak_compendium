import React from 'react';

export const Navigation = () => {
  return (
    <header className="sticky top-0 z-50 h-[80px] w-full border-b border-divider bg-cream/95 backdrop-blur-md">
      <div className="grid grid-cols-12 h-full">
        {/* Logo/Brand */}
        <div className="col-span-4 md:col-span-3 h-full flex items-center px-6 lg:px-8 border-r border-divider">
          <div className="font-black tracking-tighter uppercase text-2xl leading-none">
            ARTIFEX LABS
          </div>
        </div>

        {/* Status Area */}
        <div className="hidden md:flex col-span-5 md:col-span-6 h-full items-center px-6 lg:px-8">
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-cobalt animate-pulse rounded-full" />
             <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-graylabel italic">Sys_Status: Validated</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="col-span-8 md:col-span-3 h-full flex items-center justify-end px-6 lg:px-8">
          <nav className="flex gap-6 text-[11px] font-bold uppercase tracking-wider text-right">
            <a href="#interactive-primer" className="text-jet hover:text-cobalt transition-colors duration-300 ease-linear">PRIMER</a>
            <a href="#research-manuscript" className="text-jet hover:text-cobalt transition-colors duration-300 ease-linear">MANUSCRIPT</a>
            <a href="#jailbreak-evaluation-guide" className="text-jet hover:text-cobalt transition-colors duration-300 ease-linear">EVAL GUIDE</a>
            <a href="#construct-validity" className="text-jet hover:text-cobalt transition-colors duration-300 ease-linear">VALIDITY</a>
            <a href="#research-compendium" className="text-jet hover:text-cobalt transition-colors duration-300 ease-linear">COMPENDIUM</a>
            <a href="#system" className="text-jet hover:text-cobalt transition-colors duration-300 ease-linear">SYSTEM</a>
            <a href="#why-different" className="text-jet hover:text-cobalt transition-colors duration-300 ease-linear">AUDIT</a>
            <a href="#access" className="text-jet hover:text-cobalt transition-colors duration-300 ease-linear">ACCESS</a>
          </nav>
        </div>
      </div>
    </header>
  );
};
