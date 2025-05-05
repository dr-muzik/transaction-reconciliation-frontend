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
    <div className="space-y-4 h-screen">
      <div className="flex justify-between flex-col md:flex-row">
        <h2 className="text-2xl font-bold mt-5 mb-10 text-[#071B06]">
          Upload CSV Files
        </h2>
        <div className="flex flex-col items-center">
          <p className="text-lg font-bold text-[#071B06]">
            Download CSV Sample
          </p>
          <div className="flex gap-4">
            <button className="border border-[#071B06] rounded px-4 py-2 hover:bg-[#C6FAC4] hover:text-white transition-all duration-500">
              <a href="/transactionA_m.csv" download className="text-[#071B06]">
                CSV 1
              </a>
            </button>
            <button className="border border-[#071B06] rounded px-4 py-2 hover:bg-[#C6FAC4] hover:text-white transition-all duration-500">
              <a href="/transactionB_m.csv" download className="text-[#071B06]">
                CSV 2
              </a>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`w-full max-w-[800px] m-auto h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg p-6 transition-all text-center ${
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
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-500">
              Drag and drop <strong>two</strong> CSV files here
            </p>
            <p className="text-sm text-gray-500">or select manually below</p>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row text-[#071B06] gap-7 justify-center my-10 ">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setFileA(file);
            if (file) parseWithWorker(file, setParsedA);
          }}
          className="cursor-pointer "
        />
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setFileB(file);
            if (file) parseWithWorker(file, setParsedB);
          }}
          className="cursor-pointer"
        />
      </div>

      <div className="">
        <button
          onClick={handleUpload}
          className="bg-[#071B06] text-[#C6FAC4] px-8 py-2 rounded hover:bg-[#366536] cursor-pointer hover:text-white transition-all duration-500"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
