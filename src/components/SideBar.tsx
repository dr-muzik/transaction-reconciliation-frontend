import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">ReconcileApp</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="/upload" className="block hover:text-blue-400">
              Upload
            </a>
          </li>
          <li>
            <a href="/summary" className="block hover:text-blue-400">
              Summary
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
