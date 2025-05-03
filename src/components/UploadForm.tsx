import React, { useState } from "react";
import toast from "react-hot-toast";

const UploadForm: React.FC = () => {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!fileA || !fileB) {
      toast.error("Please select both CSV files.");
      return;
    }

    const formData = new FormData();
    formData.append("fileA", fileA);
    formData.append("fileB", fileB);

    try {
      const res = await fetch("http://localhost:3000/reconcile", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      console.log({ data });
      localStorage.setItem("reconciliation", JSON.stringify(data));
      toast.success("Reconciliation complete!");
    } catch (err) {
      toast.error("Error uploading files.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Upload CSV Files</h2>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFileA(e.target.files?.[0] || null)}
      />
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFileB(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload and Reconcile
      </button>
    </div>
  );
};

export default UploadForm;
