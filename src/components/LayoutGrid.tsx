import React from 'react';
import { motion } from 'motion/react';

interface GridSidebarLabelProps {
  label: string;
  icon?: React.ReactNode;
}

export const GridSidebarLabel: React.FC<GridSidebarLabelProps> = ({ label, icon }) => {
  return (
    <div className="col-span-12 md:col-span-3 border-b md:border-b-0 md:border-r border-divider p-6 lg:p-8 relative">
      <div className="sticky top-32 flex items-center gap-3 text-[10px] font-bold text-graylabel uppercase tracking-[0.2em] leading-none">
        {label}
        {icon && <span className="text-jet">{icon}</span>}
      </div>
    </div>
  );
};

interface GridSectionProps {
  id?: string;
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const GridSection: React.FC<GridSectionProps> = ({ id, label, icon, children, className = "" }) => {
  return (
    <motion.section 
      id={id} 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, ease: "linear" }}
      className={`grid grid-cols-12 gap-0 border-b border-divider min-h-[50vh] ${className}`}
    >
      <GridSidebarLabel label={label} icon={icon} />
      <div className="col-span-12 md:col-span-9 p-6 sm:p-12 lg:p-24 flex flex-col justify-center">
        {children}
      </div>
    </motion.section>
  );
};
