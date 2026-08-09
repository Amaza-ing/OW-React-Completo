const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("taskflowDesktop", {
  platform: process.platform,
});
