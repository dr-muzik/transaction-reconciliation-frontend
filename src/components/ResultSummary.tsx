import React, { useEffect, useState } from "react";
import ReconciliationTabs from "./ReconciliationTabs";

interface FormattedData {
  missingInA: {
    transactionId: string;
    amount: string;
    status: string;
    source: string;
  }[];
  missingInB: {
    transactionId: string;
    amount: string;
    status: string;
    source: string;
  }[];
  mismatched: {
    transactionId: string;
    amount: string;
    status: string;
    source: string;
  }[];
}
const ResultSummary: React.FC = () => {
  const [data, setData] = useState<any>(null);

  const [formattedData, setFormattedData] = useState<FormattedData | null>(
    null
  );

  useEffect(() => {
    const stored = localStorage.getItem("reconciliation");
    console.log({ stored });
    if (stored) setData(JSON.parse(stored));

    const { details } = stored ? JSON.parse(stored) : {};
    const mappedData = {
      missingInA: details.missingInA.map((id: string) => ({
        transactionId: id,
        amount: "-",
        status: "-",
        source: "B", // present in B but not in A
      })),
      missingInB: details.missingInB.map((id: string) => ({
        transactionId: id,
        amount: "-",
        status: "-",
        source: "A", // present in A but not in B
      })),
      mismatched: [
        ...details.amountMismatches.map((id: string) => ({
          transactionId: id,
          amount: "Mismatch",
          status: "-",
          source: "Both",
        })),
        ...details.statusMismatches.map((id: string) => ({
          transactionId: id,
          amount: "-",
          status: "Mismatch",
          source: "Both",
        })),
      ].sort((a: any, b: any) => {
        const numA = parseInt(a.transactionId.replace("tx", ""));
        const numB = parseInt(b.transactionId.replace("tx", ""));
        return numA - numB;
      }),
    };
    try {
      setFormattedData(mappedData);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    }

    // fetchResults();
  }, []);

  if (!formattedData) return <p className="p-4">Loading summary...</p>;

  if (!data) return <p>No data found. Please upload files first.</p>;

  return (
    <div className="">
      <h2 className="text-2xl mt-5 mb-10  text-black font-bold">
        Report Summary
      </h2>
      <ReconciliationTabs data={formattedData} />
    </div>
  );
};

export default ResultSummary;
