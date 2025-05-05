import React from "react";

const Sidebar: React.FC = () => {
  const [activePage, setActivePage] = React.useState<string>("upload");

  const setLinkActive = (link: string) => {
    console.log("link", link);
    setActivePage(link);
  };
  return (
    <aside className="w-80 bg-[#071B06]  text-white min-h-screen p-4">
      <h2 className="text-3xl my-7 font-bold mb-14">REPORT DISCREPANCIES</h2>
      <nav>
        <ul className="space-y-2">
          <li
            className=" p-3 rounded-lg flex gap-2 font-medium"
            style={{
              backgroundColor: activePage === "upload" ? "#C6FAC4" : "",
              color: activePage === "upload" ? "#071B06" : "#FFF",
              cursor: "pointer",
            }}
            onClick={() => setLinkActive("upload")}
          >
            <a href="/upload" className="block">
              Upload
            </a>
          </li>
          <li
            className=" p-3 rounded-lg flex gap-2 font-medium"
            style={{
              backgroundColor: activePage === "summary" ? "#C6FAC4" : "",
              color: activePage === "summary" ? "#071B06" : "#FFF",
              cursor: "pointer",
            }}
            onClick={() => setLinkActive("summary")}
          >
            <a href="/summary" className="block">
              Summary
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
