const { app, BrowserWindow, dialog, ipcMain, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const runServer = require("./server");
const cp = require("child_process");
const electron = require("electron");


(async function () {
  await runServer();
  function createWindow() {
    const mainWindow = new BrowserWindow({
      width: 1370,
      height: 800,
      // titleBarStyle: "hidden",
      webPreferences: {
        preload: path.join(__dirname, "../preload.js"),
        nodeIntegration: true,
        contextIsolation: true,
        sandbox: true,
        devTools: isDev,
        // transparent: true,
        // autoHideMenuBar: true,
        // backgroundColor: "#16161A",
      },
    });
    const startUrl = "http://127.0.0.1:9000";
    mainWindow.loadURL(startUrl);
    mainWindow.show();
    mainWindow.webContents.openDevTools();
  }
  app.whenReady().then(() => {
    createWindow();
  });
})();
