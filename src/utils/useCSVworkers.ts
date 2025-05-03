// src/utils/useCSVWorker.ts
export const createCSVWorker = () => {
  return new Worker(new URL("../workers/csvWorker.ts", import.meta.url), {
    type: "module",
  });
};
