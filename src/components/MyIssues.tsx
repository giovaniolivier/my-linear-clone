// LinearClone.tsx (composant principal)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import IssuesContent from './IssuesContent';


const TASKS = [
  { id: 1, title: "Welcome to Linear 👋" },
  { id: 2, title: "Plan your first project" },
  { id: 3, title: "Invite your team" },
];

const FILTER_OPTIONS = ["All issues", "Active", "Backlog"];

const LinearClone: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  type SectionKey = 'workspace' | 'teams' | 'try' | 'userDropdown';

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

  const toggleSection = (section: SectionKey) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/my-issues/assigned");
    }
  }, [navigate]);

  return (
    <div className="linear-clone flex h-screen bg-[#090909] text-gray-300">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        username={username}
        initials={initials}
        openSections={openSections}
        toggleSection={toggleSection}
        handleLogout={handleLogout}
      />
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <IssuesContent
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        FILTER_OPTIONS={FILTER_OPTIONS}
      />
    </div>
  );
};

export default LinearClone;