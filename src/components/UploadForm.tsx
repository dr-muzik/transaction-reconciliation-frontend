import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
// @ts-ignore
import CsvWorker from "../workers/csvWorker.ts?worker";

const UploadForm: React.FC = () => {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [_parsedA, setParsedA] = useState<any[] | null>(null);
  const [_parsedB, setParsedB] = useState<any[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const parseWithWorker = (file: File, onComplete: (data: any[]) => void) => {
    const worker = new CsvWorker();

    worker.onmessage = (e: MessageEvent) => {
      console.log("data from worker", e);
      if (e.isTrusted) {
        toast.success(`${file.name} parsed`);
        onComplete(e.data);
      } else {
        toast.error(`Error parsing ${file.name}`);
      }
      worker.terminate();
    };

    worker.postMessage(file);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    console.log("e", e);

    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "text/csv"
    );

    if (files.length !== 2) {
      toast.error("Please drop exactly two CSV files.");
      return;
    }

    const [first, second] = files;
    setFileA(first);
    setFileB(second);
    parseWithWorker(first, setParsedA);
    parseWithWorker(second, setParsedB);
  }, []);

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

      {/* <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded p-6 text-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <p className="mb-2">Drag and drop two CSV files here</p>
        <p className="text-sm text-gray-500">or select manually below</p>
      </div> */}

      <div
        className={`w-full border-2 border-dashed rounded-lg p-6 transition-all text-center ${
          isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {fileA && fileB ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">{fileA.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">{fileB.name}</span>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-500">
              Drag and drop <strong>two</strong> CSV files here
            </p>
            <p className="text-sm text-gray-500">or select manually below</p>
          </>
        )}
      </div>

      <div className="flex gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setFileA(file);
            if (file) parseWithWorker(file, setParsedA);
          }}
        />
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setFileB(file);
            if (file) parseWithWorker(file, setParsedB);
          }}
        />
      </div>

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
