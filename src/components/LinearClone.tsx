import React, { useState } from 'react';
import NavButton from './NavButton';
import SectionHeader from './SectionHeader';
import TodoItem from './TodoItem';
import { ChevronDown, Bell, Settings, LayoutGrid, Filter, Plus, Menu, PanelLeft, Clock, Users } from 'lucide-react';

const tasks = [
  { id: 1, title: "Welcome to Linear 👋" },
  { id: 2, title: "Plan your first project" },
  { id: 3, title: "Invite your team" },
];

const LinearClone: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All issues");
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState<boolean>(true);
  const [isTeamsOpen, setIsTeamsOpen] = useState<boolean>(true);
  const [isTryOpen, setIsTryOpen] = useState<boolean>(true);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-[#090909] text-gray-300">
      {/* Sidebar */}
      <div className="w-64 p-4 flex flex-col">
        {/* User section */}
        <div className="relative">
          <div
            className="flex items-center gap-2 mb-4 cursor-pointer"
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          >
            <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-xs text-white">GI</span>
            </div>
            <span className="text-sm">giovani</span>
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isUserDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
          </div>
          {isUserDropdownOpen && (
            <div className="absolute bg-[#101012] border rounded-[5px] border-[#23252a] p-2 text-sm text-gray-300 shadow-lg w-50 mt-0">
              <div className="p-2 hover:bg-[#17181b] rounded-[5px] cursor-pointer">Settings</div>
              <div className="p-2 hover:bg-[#17181b] rounded-[5px] cursor-pointer">Invite and manage members</div>
              <hr className=" border-[#23252a]"></hr>
              <div className="p-2 hover:bg-[#17181b] rounded-[5px] cursor-pointer">Download desktop app</div>
              <hr className=" border-[#23252a]"></hr>
              <div className="p-2 hover:bg-[#17181b] rounded-[5px] cursor-pointer">Switch workspace</div>
              <div className="p-2 hover:bg-[#17181b] rounded-[5px] cursor-pointer">Log out</div>
            </div>
          )}
        </div>

        {/* Main navigation */}
        <nav className="text-sm space-y-1">
          <NavButton icon={PanelLeft}>Inbox</NavButton>
          <NavButton icon={Clock}>My Issues</NavButton>
        </nav>

        {/* Workspace section with dropdown */}
        <div className="text-sm mt-6">
          <SectionHeader>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}>
              <span>Workspace</span>
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isWorkspaceOpen ? "rotate-180" : "rotate-0"}`} />
            </div>
          </SectionHeader>
          {isWorkspaceOpen && (
            <nav className="space-y-1">
              <NavButton icon={LayoutGrid}>Projects</NavButton>
              <NavButton icon={Filter}>Views</NavButton>
              <NavButton icon={Menu}>More</NavButton>
            </nav>
          )}
        </div>

        {/* Teams section with dropdown */}
        <div className="text-sm mt-6">
          <SectionHeader>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsTeamsOpen(!isTeamsOpen)}>
              <span>Your teams</span>
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isTeamsOpen ? "rotate-180" : "rotate-0"}`} />
            </div>
          </SectionHeader>
          {isTeamsOpen && (
            <div className="flex items-center gap-2 p-2 rounded bg-[#17181b]">
              <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                <span className="text-xs text-white">GI</span>
              </div>
              <span>Giovani</span>
              <ChevronDown className="w-4 h-4 ml-auto" />
            </div>
          )}
        </div>

        {/* Try section with dropdown */}
        <div className="text-sm mt-6">
          <SectionHeader>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsTryOpen(!isTryOpen)}>
              <span>Try</span>
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isTryOpen ? "rotate-180" : "rotate-0"}`} />
            </div>
          </SectionHeader>
          {isTryOpen && (
            <nav className="space-y-1">
              <NavButton icon={Plus}>Import Issues</NavButton>
              <NavButton icon={Users}>Invite people</NavButton>
            </nav>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="border rounded-[5px] border-[#23252a] text-sm m-2 bg-[#101012] flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-[#23252a] p-2 pl-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {["All issues", "Active", "Backlog"].map((item) => (
              <div
                key={item}
                onClick={() => setSelectedFilter(item)}
                className={`text-gray-500 border rounded-[5px] border-[#23252a] hover:bg-[#17181b] px-2 py-1 flex items-center gap-2 cursor-pointer ${
                  selectedFilter === item ? "bg-[#17181b] text-white" : ""
                }`}
              >
                <span>{item}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            ))}
          </div>
          <div className="flex items-center mr-6 gap-8">
            <Bell className="w-5 h-5 cursor-pointer" />
            <Settings className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Content */}
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

          {/* Todo list */}
          <div className="space-y-2 pl-3">
            {tasks.map((task) => (
              <TodoItem key={task.id} number={task.id} title={task.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinearClone;
