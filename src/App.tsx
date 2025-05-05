// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/SideBar";
import UploadForm from "./components/UploadForm";
import ResultSummary from "./components/ResultSummary";
import AnalysisPage from "./components/AnalysisPage";

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <div className="  w-full overflow-hidden  bg-[#e4e4e4] min-h-screen lg:h-screen relative">
          {/* Hamburger menu (mobile only) */}
          <div className="md:hidden p-4">
            <button
              onClick={toggleSidebar}
              style={{ color: "black", fontSize: "2rem" }}
              className="text-2xl font-bold cursor-pointer"
            >
              ☰
            </button>
          </div>

          <div className="p-6">
            {/* Overlay when sidebar is open */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
                onClick={toggleSidebar}
              ></div>
            )}
            <Routes>
              <Route path="/" element={<Navigate to="/upload" replace />} />
              <Route path="/upload" element={<UploadForm />} />
              <Route path="/summary" element={<ResultSummary />} />
              <Route path="/analysis" element={<AnalysisPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
