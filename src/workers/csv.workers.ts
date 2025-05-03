// src/workers/csvWorker.ts
import Papa from "papaparse";

self.onmessage = function (e) {
  const file = e.data;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      // Send parsed data back to main thread
      self.postMessage(results.data);
    },
    error: function (err) {
      self.postMessage({ error: err.message });
    },
  });
};
