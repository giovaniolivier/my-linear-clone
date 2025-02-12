// Sidebar.tsx
import React from 'react';
import { ChevronDown, PanelLeft, Clock, LayoutGrid, Filter, Menu, Plus, Users } from 'lucide-react';
import NavButton from './NavButton';
import SectionHeader from './SectionHeader';
import UserDropdown from './UserDropdown';

interface SidebarProps {
    isSidebarOpen: boolean;
    username: string;
    initials: string;
    openSections: {
      workspace: boolean;
      teams: boolean;
      try: boolean;
      userDropdown: boolean;
    };
    toggleSection: (section: 'workspace' | 'teams' | 'try' | 'userDropdown') => void;
    handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  username,
  initials,
  openSections,
  toggleSection,
  handleLogout
}) => {
  return (
    <div className={`sidebar w-64 p-4 flex flex-col fixed md:static top-0 left-0 h-full bg-[#090909] transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40`}>
      {/* User section */}
      <div className="relative">
        <div
          className="flex items-center gap-2 mb-4 cursor-pointer"
          onClick={() => toggleSection('userDropdown')}
        >
          <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
            <span className="text-xs text-white">{initials}</span>
          </div>
          <span className="text-sm">{username}</span>
          <ChevronDown 
            className={`w-4 h-4 ml-2 transition-transform ${
              openSections.userDropdown ? 'rotate-180' : 'rotate-0'
            }`} 
          />
        </div>
        <UserDropdown 
          isOpen={openSections.userDropdown} 
          onLogout={handleLogout} 
        />
      </div>

      {/* Navigation principale */}
      <nav className="text-sm space-y-1">
        <NavButton icon={PanelLeft}>Inbox</NavButton>
        <NavButton icon={Clock}>My Issues</NavButton>
      </nav>

      {/* Section Workspace */}
      <div className="text-sm mt-6">
        <SectionHeader>
          <div 
            className="flex items-center justify-between cursor-pointer" 
            onClick={() => toggleSection('workspace')}
          >
            <span>Workspace</span>
            <ChevronDown 
              className={`w-4 h-4 ml-2 transition-transform ${
                openSections.workspace ? "rotate-180" : "rotate-0"
              }`} 
            />
          </div>
        </SectionHeader>
        {openSections.workspace && (
          <nav className="space-y-1">
            <NavButton icon={LayoutGrid}>Projects</NavButton>
            <NavButton icon={Filter}>Views</NavButton>
            <NavButton icon={Menu}>More</NavButton>
          </nav>
        )}
      </div>

      {/* Section Teams */}
      <div className="text-sm mt-6">
        <SectionHeader>
          <div 
            className="flex items-center justify-between cursor-pointer" 
            onClick={() => toggleSection('teams')}
          >
            <span>Your teams</span>
            <ChevronDown 
              className={`w-4 h-4 ml-2 transition-transform ${
                openSections.teams ? "rotate-180" : "rotate-0"
              }`} 
            />
          </div>
        </SectionHeader>
        {openSections.teams && (
          <div className="flex items-center gap-2 p-2 rounded bg-[#17181b]">
            <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-xs text-white">{initials}</span>
            </div>
            <span>{username}</span>
            <ChevronDown className="w-4 h-4 ml-auto" />
          </div>
        )}
      </div>

      {/* Section Try */}
      <div className="text-sm mt-6">
        <SectionHeader>
          <div 
            className="flex items-center justify-between cursor-pointer" 
            onClick={() => toggleSection('try')}
          >
            <span>Try</span>
            <ChevronDown 
              className={`w-4 h-4 ml-2 transition-transform ${
                openSections.try ? "rotate-180" : "rotate-0"
              }`} 
            />
          </div>
        </SectionHeader>
        {openSections.try && (
          <nav className="space-y-1">
            <NavButton icon={Plus}>Import Issues</NavButton>
            <NavButton icon={Users}>Invite people</NavButton>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Sidebar;