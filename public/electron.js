const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain,
  nativeImage,
} = require("electron");
app.commandLine.appendSwitch("disable-web-security");
const isDev = require("electron-is-dev");
const path = require("path");
const log = require("electron-log");
let tray = null;
let mainWindow;

//handle setupevents as quickly as possible
const setupEvents = require("../installers/setupEvents");
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    show: false,
    frame: true,
    alwaysOnTop: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
  });

  // Menu.setApplicationMenu(null);

  const startURL = isDev
    ? "http://localhost:8888"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  // mainWindow.setMenu(null);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // mainWindow.on("closed", () => {
  //   mainWindow = null;
  // });

  // mainWindow.on("minimize", function (event) {
  //   try {
  //     event.preventDefault();
  //     mainWindow.hide();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  mainWindow.on("close", function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.minimize();
      mainWindow.webContents.send("app-closing", {});
    }
    return false;
  });
  mainWindow.on("restore", function (event) {
    event.preventDefault();
    mainWindow.show();
    mainWindow.setSkipTaskbar(false);
  });
  // mainWindow.on("before-quit", (e) => {
  //   if (process.platform === "darwin") {
  //     app.quit();
  //   }
  // });
}
app.setAsDefaultProtocolClient("rlapp");

app
  .whenReady()
  .then(() => {
    const image = nativeImage.createFromPath(
      path.join(__dirname, "./icon.png")
    );
    tray = new Tray(image.resize({ width: 16, height: 16 }));
    var contextMenu = Menu.buildFromTemplate([
      {
        label: "Dashboard",
        click: function () {
          mainWindow.show();
          mainWindow.webContents.send("asynchronous-message-two", {
            SAVED: "File Saved",
          });
        },
      },
      {
        label: "Take a break",
        click: function () {
          mainWindow.show();
          mainWindow.webContents.send("asynchronous-message", {
            SAVED: "File Saved",
          });
        },
      },
      {
        label: "Quit",
        click: function () {
          app.isQuiting = true;
          app.quit();
        },
      },
    ]);
    tray.setToolTip("PAL");
    tray.setContextMenu(contextMenu);
  })
  .catch(console.log);

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    mainWindow.webContents.on("did-finish-load", function () {
      mainWindow.webContents.send("calendar-success");
    });
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.on("open-url", function (event, data) {
    mainWindow.webContents.on("did-finish-load", function () {
      mainWindow.webContents.send("calendar-success", { data });
    });
  });

  // Create myWindow, load the rest of the app, etc...
  app.on("ready", createWindow);

  // app.on("before-quit", (e) => {
  //   if (process.platform === "darwin") {
  //     app.quit();
  //   }
  // });
}
