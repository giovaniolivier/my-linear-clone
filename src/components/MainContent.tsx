// MainContent.tsx
import React from 'react';
import { Menu as MenuIcon, X, Bell, Filter, Plus, ChevronDown } from 'lucide-react';
import TodoItem from './TodoItem';

interface MainContentProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  FILTER_OPTIONS: string[];
  TASKS: Array<{ id: number; title: string; }>;
}

const MainContent: React.FC<MainContentProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedFilter,
  setSelectedFilter,
  FILTER_OPTIONS,
  TASKS
}) => {
  return (
    <div className="main-content flex-1 border rounded-[5px] border-[#23252a] text-sm m-2 bg-[#101012] flex flex-col">
      {/* Header */}
      <div className="header-actions border-b border-[#23252a] p-2 pl-4 flex items-center gap-4 bg-[#101012]">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden z-50"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X className="hidden w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
          </button>
          <div className="hidden md:flex items-center gap-2">
            {FILTER_OPTIONS.map((item) => (
              <div
                key={item}
                onClick={() => setSelectedFilter(item)}
                className={`text-gray-500 border rounded-[5px] border-[#23252a] hover:bg-[#17181b] px-3 py-1.5 flex items-center gap-2 cursor-pointer ${
                  selectedFilter === item ? "bg-[#17181b] text-white" : ""
                }`}
              >
                <span className="text-sm">{item}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center ml-auto gap-4">
          <button 
            className="text-gray-500 hover:text-gray-300"
            aria-label="Filter view"
          >
            <Filter className="w-4 h-4" />
          </button>
          <button 
            className="text-gray-500 hover:text-gray-300"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Barre de filtres */}
      <div className="flex items-center justify-between p-2 pl-4 border-b border-[#23252a]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">Filter</span>
        </div>
        <div className="flex items-center gap-2 mr-4">
          <span className="text-sm text-gray-500">Todo</span>
          <span className="text-xs bg-[#17181b] px-1.5 py-0.5 rounded-full text-gray-500">9</span>
          <Plus className="w-4 h-4 text-gray-500 ml-2" />
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4 flex-1 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center pl-6 gap-2 cursor-pointer">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </div>
          <div className="flex items-center pr-4 gap-2 cursor-pointer">
            <span>Display</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2 pl-3">
          {TASKS.map((task) => (
            <TodoItem 
              key={task.id} 
              number={task.id} 
              title={task.title} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;