// Sidebar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [activePage, setActivePage] = React.useState<string>("upload");
  const navigate = useNavigate();

  const setLinkActive = (link: string) => {
    setActivePage(link);
    toggleSidebar(); // Close sidebar on mobile
    navigate(
      link === "upload"
        ? "/upload"
        : link === "summary"
        ? "/summary"
        : "analysis"
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 min-h-screen shadow-2xl w-64 bg-[#071B06] text-white p-4 z-50 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 md:w-80`}
    >
      <h2 className="text-2xl my-6 font-bold border-b-2 pb-3.5 border-white">
        REPORT DISCREPANCIES
      </h2>

      <nav className="mt-20">
        <ul className="space-y-6">
          <li
            className="p-3 rounded-lg font-medium text-center cursor-pointer"
            style={{
              backgroundColor: activePage === "upload" ? "#C6FAC4" : "",
              color: activePage === "upload" ? "#071B06" : "#FFF",
              cursor: "pointer",
            }}
            onClick={() => setLinkActive("upload")}
          >
            Upload CSV
          </li>
          <li
            className="p-3 rounded-lg font-medium text-center cursor-pointer"
            style={{
              backgroundColor: activePage === "summary" ? "#C6FAC4" : "",
              color: activePage === "summary" ? "#071B06" : "#FFF",
              cursor: "pointer",
            }}
            onClick={() => setLinkActive("summary")}
          >
            Summary
          </li>
          <li
            className="p-3 rounded-lg font-medium text-center cursor-pointer"
            style={{
              backgroundColor: activePage === "analysis" ? "#C6FAC4" : "",
              color: activePage === "analysis" ? "#071B06" : "#FFF",
              cursor: "pointer",
            }}
            onClick={() => setLinkActive("analysis")}
          >
            Analysis
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
