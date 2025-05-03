/* === src/components/ReconciliationTabs.tsx === */
import { useState } from "react";
import { FixedSizeList as List } from "react-window";

const tabs = [
  { key: "missingInA", label: "Missing in A" },
  { key: "missingInB", label: "Missing in B" },
  { key: "mismatched", label: "Mismatches" },
];

const ReconciliationTabs = ({ data }: { data: any }) => {
  console.log({ data });
  const [activeTab, setActiveTab] = useState("missingInA");
  const rows = data[activeTab] || [];

  const Row = ({ index, style }: any) => (
    <div style={style} className="grid grid-cols-4 px-4 py-2 text-sm border-b">
      <div>{rows[index].transactionId}</div>
      <div>{rows[index].amount}</div>
      <div>{rows[index].status}</div>
      <div>{rows[index].source}</div>
    </div>
  );

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded ${
              activeTab === tab.key ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 text-black bg-gray-100 font-semibold px-4 py-2">
        <div>Tx ID</div>
        <div>Amount</div>
        <div>Status</div>
        <div>Source</div>
      </div>

      <List
        height={500}
        itemCount={rows.length || 1}
        itemSize={40}
        width="100%"
      >
        {({ index, style }) =>
          rows.length > 0 ? (
            <Row index={index} style={style} />
          ) : (
            <div style={style} className="px-4 py-2 text-sm text-center">
              No discrepancies found
            </div>
          )
        }
      </List>
    </div>
  );
};

export default ReconciliationTabs;
