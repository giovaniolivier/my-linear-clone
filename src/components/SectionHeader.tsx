import React from 'react';
import { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface SectionHeaderProps {
  children: ReactNode;
}

const SectionHeader = ({ children }: SectionHeaderProps) => (
  <div className="text-gray-500 flex items-center gap-2 mb-2">
    <span className="text-sm font-medium">{children}</span>
  </div>
);

export default SectionHeader;
