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
    <div
      style={style}
      className="grid grid-cols-4 px-4 py-2 text-sm bg-white p-4  text-black border-b"
    >
      <div>{rows[index].transactionId}</div>
      <div>{rows[index].amount}</div>
      <div>{rows[index].status}</div>
      <div>{rows[index].source}</div>
    </div>
  );

  return (
    <div className="flex flex-col  lg:flex-row gap-9">
      <div className=" text-[#071B06] border-b bg-white font-semibold h-max p-7 w-max grid grid-cols-[auto_min-content] gap-4">
        <p>Total No. Missing in A:</p>
        <p className="text-lg font-bold">{data[tabs[0].key].length}</p>
        <p>Total No. Missing in B:</p>
        <p className="text-lg font-bold">{data[tabs[1].key].length}</p>
        <p>Total No. Mismatches:</p>
        <p className="text-lg font-bold">{data[tabs[2].key].length}</p>
      </div>

      <div className="w-full max-w-[450px]">
        <div className="flex  space-x-4 mb-4 justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 rounded ${
                activeTab === tab.key
                  ? "bg-[#071B06] text-white font-semibold"
                  : " text-[#071B06]"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4  text-black bg-gray-100 font-semibold px-4 py-2">
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
              <div
                style={style}
                className="px-4 py-2 text-lg text-black text-center"
              >
                No discrepancies found
              </div>
            )
          }
        </List>
      </div>
    </div>
  );
};

export default ReconciliationTabs;
