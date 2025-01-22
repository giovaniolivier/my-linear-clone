import React from 'react';
import NavButton from './NavButton';
import SectionHeader from './SectionHeader';
import TodoItem from './TodoItem';
import { ChevronDown, Bell, Settings, LayoutGrid, Filter, Plus, Menu, PanelLeft, Clock, Users } from 'lucide-react';

const LinearClone = () => {
  return (
    <div className="flex h-screen bg-black text-gray-300">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 p-4 flex flex-col">
        {/* User section */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
            <span className="text-xs text-white">GI</span>
          </div>
          <span className="text-sm">giovani</span>
          <ChevronDown className="w-4 h-4 ml-auto" />
        </div>

        {/* Main navigation */}
        <nav className="space-y-1">
          <NavButton icon={PanelLeft}>Inbox</NavButton>
          <NavButton icon={Clock}>My Issues</NavButton>
        </nav>

        {/* Workspace section */}
        <div className="mt-6">
          <SectionHeader>Workspace</SectionHeader>
          <nav className="space-y-1">
            <NavButton icon={LayoutGrid}>Projects</NavButton>
            <NavButton icon={Filter}>Views</NavButton>
            <NavButton icon={Menu}>More</NavButton>
          </nav>
        </div>

        {/* Teams section */}
        <div className="mt-6">
          <SectionHeader>Your teams</SectionHeader>
          <div className="flex items-center gap-2 p-2 rounded bg-gray-800">
            <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-xs text-white">GI</span>
            </div>
            <span>Giovani</span>
            <ChevronDown className="w-4 h-4 ml-auto" />
          </div>
        </div>

        {/* Try section */}
        <div className="mt-auto">
          <SectionHeader>Try</SectionHeader>
          <nav className="space-y-1">
            <NavButton icon={Plus}>Import Issues</NavButton>
            <NavButton icon={Users}>Invite people</NavButton>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {['All issues', 'Active', 'Backlog'].map((item, index) => (
              <div key={item} className="flex items-center gap-2 cursor-pointer">
                <span>{item}</span>
                {index < 2 && <ChevronDown className="w-4 h-4" />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 cursor-pointer" />
            <Settings className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <span>Display</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Todo list */}
          <div className="space-y-2">
            {[...Array(9)].map((_, index) => (
              <TodoItem 
                key={index + 1} 
                number={index + 1} 
                title={index === 0 ? "Welcome to Linear 👋" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinearClone;
