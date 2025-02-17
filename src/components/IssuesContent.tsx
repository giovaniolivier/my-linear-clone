import React from 'react';
import { Menu as MenuIcon, X, Bell, Filter, Plus, ChevronDown } from 'lucide-react';
import { Dialog } from "@headlessui/react";
import { useState } from 'react';


interface MainContentProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  FILTER_OPTIONS: string[];
}

const IssuesContent: React.FC<MainContentProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedFilter,
  setSelectedFilter,
  FILTER_OPTIONS
}) => {
  
  const [isOpen, setIsOpen] = useState(false);
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
          <span>Display</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <div className="h-screen flex flex-col items-center justify-center text-white">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
            </svg>
          </div>
          <p className="text-gray-400">No issues created by you</p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            Create new issue
          </button>
        </div>

        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center">
          <div className="bg-[#1c1d1f] p-4 border border-zinc-700 rounded-lg w-[800px] shadow-lg relative">
            <div className="flex justify-between items-center p-2 border-zinc-700">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span className="text-purple-400">GIO</span>
                <span>•</span>
                <span>New issue</span>
              </div>
              <div className="flex gap-2">
                <button className="text-zinc-400 hover:bg-zinc-800 px-2 py-1 rounded">
                  Save as draft
                </button>
                <button className="text-zinc-400 hover:bg-zinc-800 p-1 rounded">↗</button>
                <button
                  aria-label="Ouvrir la fenêtre"
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:bg-zinc-800 p-1 rounded"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <input
              type="text"
              placeholder="Issue title"
              className="mt-3 w-full p-2 bg-[#1c1d1f] focus:outline-none rounded-md text-white"
            />
            <textarea
              placeholder="Add description..."
              className="mt-3 w-full p-2 bg-[#1c1d1f] focus:outline-none rounded-md text-white"
            />
            <div className="flex py-2 border-b border-zinc-700 items-center mt-2 gap-2">
              <button className="px-3 py-1 bg-gray-700 rounded-md text-gray-300">Backlog</button>
              <button className="px-3 py-1 bg-gray-700 rounded-md text-gray-300">Priority</button>
              <button className="px-3 py-1 bg-gray-700 rounded-md text-gray-300">@oliviergiovani00</button>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="createMore" className="form-checkbox text-indigo-600" />
                <label htmlFor="createMore" className="text-sm text-gray-300">Create more</label>
              </div>
              <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm text-white hover:bg-indigo-500">Create issue</button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default IssuesContent;
