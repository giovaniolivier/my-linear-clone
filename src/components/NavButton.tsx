import React from 'react';
import { ReactNode } from 'react';

interface NavButtonProps {
  icon: React.ElementType;
  children: ReactNode;
}

const NavButton = ({ icon: Icon, children }: NavButtonProps) => (
  <div className="flex items-center gap-2 p-2 rounded hover:bg-[#17181b] cursor-pointer">
    <Icon className="w-4 h-4" />
    <span>{children}</span>
  </div>
);

export default NavButton;
