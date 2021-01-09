const { app, BrowserWindow, Tray, Menu } = require("electron");
app.commandLine.appendSwitch('disable-web-security');
const isDev = require("electron-is-dev");
const path = require("path");
let tray = null
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    alwaysOnTop: true,
   webPreferences: {
     enableRemoteModule: true,
     nodeIntegration: false,
     preload: __dirname + '/preload.js'
   }
  });

  const startURL = isDev? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
  });

  mainWindow.on("closed", () => {mainWindow = null;});

  mainWindow.on('minimize',function(event){
    try{
      event.preventDefault();
      mainWindow.hide();
    }
    catch(err)
    {
        console.log(err)
    }
  })

  mainWindow.on('close', function (event) {
    if(!app.isQuiting){
        event.preventDefault();
        mainWindow.hide();
    }
    return false;
  });


    mainWindow.on('restore', function (event) {
        event.preventDefault();
        mainWindow.show();
        mainWindow.setSkipTaskbar(false);
    });

}




app.whenReady().then(() => {
  tray = new Tray(`${path.join(__dirname, "./icon.png")}`)
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Dashboard', click:  function(){
        mainWindow.show();
    } },
    { label: 'Quit', click:  function(){
        app.isQuiting = true;
        app.quit();
    } }
]); 
  tray.setToolTip('PAL')
  tray.setContextMenu(contextMenu)
}).catch(console.log)




app.on("ready", createWindow);