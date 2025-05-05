import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/SideBar";
import UploadForm from "./components/UploadForm";
import ResultSummary from "./components/ResultSummary";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="w-full border p-6 bg-[#e4e4e4]">
          <Routes>
            <Route path="/" element={<Navigate to="/upload" replace />} />
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/summary" element={<ResultSummary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
