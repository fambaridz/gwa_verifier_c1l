import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
const { app, BrowserWindow, globalShortcut } = require("electron");
const isDev = require("electron-is-dev");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  if (!isDev) {
    // Prevent user from opening dev tools in production: https://stackoverflow.com/questions/40304833/how-to-make-the-dev-tools-not-show-up-on-screen-by-default-in-electron
    // Register a shortcut listener for Ctrl + Shift + I
    globalShortcut.register("Control+Shift+I", () => {
      // When the user presses Ctrl + Shift + I, this function will get called
      // You can modify this function to do other things, but if you just want
      // to disable the shortcut, you can just return false
      return false;
    });
  }
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    icon: __dirname + '/assets/appLogo.ico',
    // Uncomment webPreferences to disable devtools (for presenting/demo)
    // webPreferences: {
    //   devTools: false
    // }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.on("did-frame-finish-load", () => {
    isDev && mainWindow.webContents.openDevTools();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
