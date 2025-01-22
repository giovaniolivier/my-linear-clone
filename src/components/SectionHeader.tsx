import React from 'react';
import { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface SectionHeaderProps {
  children: ReactNode;
}

const SectionHeader = ({ children }: SectionHeaderProps) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="text-sm font-medium">{children}</span>
    <ChevronDown className="w-4 h-4 ml-auto" />
  </div>
);

export default SectionHeader;
