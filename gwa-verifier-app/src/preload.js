const { contextBridge, ipcRenderer } = require("electron");
const { platform } = require("os");
contextBridge.exposeInMainWorld("app", {
  parseCSV: (text) => ipcRenderer.invoke("app:parse-csv", text),
});
