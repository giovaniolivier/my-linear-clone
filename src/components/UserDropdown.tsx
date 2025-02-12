// UserDropdown.tsx
interface UserDropdownProps {
    isOpen: boolean;
    onLogout: () => void;
  }
  
  const UserDropdown: React.FC<UserDropdownProps> = ({ isOpen, onLogout }) => {
    if (!isOpen) return null;
    
    return (
      <div className="absolute z-10 bg-[#101012] border rounded-[5px] border-[#23252a] p-2 text-sm text-gray-300 shadow-lg w-64 mt-0">
        {/* ... contenu du dropdown ... */}
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
  
  export default UserDropdown;