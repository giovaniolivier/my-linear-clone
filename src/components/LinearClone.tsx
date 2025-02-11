import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavButton from './NavButton';
import SectionHeader from './SectionHeader';
import TodoItem from './TodoItem';
import { ChevronDown, Bell, Settings, LayoutGrid, Filter, Plus, Menu, PanelLeft, Clock, Users } from 'lucide-react';

const TASKS = [
  { id: 1, title: "Welcome to Linear 👋" },
  { id: 2, title: "Plan your first project" },
  { id: 3, title: "Invite your team" },
];

const FILTER_OPTIONS = ["All issues", "Active", "Backlog"];

interface UserDropdownProps {
  isOpen: boolean;
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ isOpen, onLogout }) => {
  if (!isOpen) return null;
  
  return (
    <div className="absolute z-10 bg-[#101012] border rounded-[5px] border-[#23252a] p-2 text-sm text-gray-300 shadow-lg w-64 mt-0">
      <div className="p-2 hover:bg-[#17181b] rounded-[5px] cursor-pointer">Settings</div>
      <div className="p-2 hover:bg-[#17181b] rounded-[5px] cursor-pointer">Invite and manage members</div>
      <hr className="border-[#23252a]" />
      <div className="p-2 hover:bg-[#17181b] rounded-[5px] cursor-pointer">Download desktop app</div>
      <hr className="border-[#23252a]" />
      <div className="p-2 hover:bg-[#17181b] rounded-[5px] cursor-pointer">Switch workspace</div>
      <div
        className="p-2 hover:bg-[#17181b] rounded-[5px] cursor-pointer text-red-500"
        onClick={onLogout}
      >
        Log out
      </div>
    </div>
  );
};

const LinearClone: React.FC = () => {
  const [user, setUser] = useState<any>(null); 
  const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS[0]);
  const [openSections, setOpenSections] = useState({
    workspace: true,
    teams: true,
    try: true,
    userDropdown: false
  });

  const getInitials = (name: string) => {
    if (!name) return "U";
    
    const words = name.split(" ");
    const initials = words
      .map(word => word[0])
      .join("")
      .toUpperCase();
  
    return initials.slice(0, 2);
  };

  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Utilisateur";
  const initials = getInitials(username);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogout = () => {
    console.log("Utilisateur déconnecté");
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="linear-clone flex h-screen bg-[#090909] text-gray-300">
      {/* Sidebar */}
      <div className={`sidebar w-64 p-4 flex flex-col fixed md:static top-0 left-0 h-full bg-[#090909] transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40`}>        {/* User section */}
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

      {/* Fond sombre pour mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Contenu principal */}
      <div className="main-content flex-1 border rounded-[5px] border-[#23252a] text-sm m-2 bg-[#101012] flex flex-col">
        {/* Header */}
        <div className="header-actions border-b border-[#23252a] p-2 pl-4 flex items-center gap-4 bg-[#101012]">
          {/* Menu burger et actions - groupés à gauche en mobile */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden z-50"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? <X className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
            </button>
            {/* Filtres - cachés en mobile */}
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
          {/* Icônes droites - toujours visibles */}
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
        {/* Nouvelle barre de filtres */}
        <div className="flex items-center justify-between p-2 pl-4 border-b border-[#23252a]">
          {/* Côté gauche - Filtre */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Filter</span>
          </div>
          {/* Côté droit - Todo counter */}
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

          {/* Liste des tâches */}
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
    </div>
  );
};

export default LinearClone;