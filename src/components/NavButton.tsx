import React from 'react';
import { ReactNode } from 'react';

interface NavButtonProps {
  icon: React.ElementType; // Type du composant d'icône
  children: ReactNode;
}

const NavButton = ({ icon: Icon, children }: NavButtonProps) => (
  <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer">
    <Icon className="w-4 h-4" />
    <span>{children}</span>
  </div>
);

export default NavButton;
