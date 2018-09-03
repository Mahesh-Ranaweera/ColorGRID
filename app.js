const {app, BrowserWindow} = require('electron');

let mainWindow;

function createWindow() {
    //define the app window settings
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'ColorGRID',
        resizable: false,
        //frame: false,
        backgroundColor: "#111",
        //icon: __dirname + '/icon.ico'
    });

    //remove app menu
    mainWindow.setMenuBarVisibility(false);

    //open the dev tools for debug
    mainWindow.webContents.openDevTools();

    //load the app page
    mainWindow.loadFile('app.html');

    //trigger when window is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

//create the window when ready
app.on('ready', createWindow);

//quit
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('active', () => {
    if(mainWindow === null){
        createWindow();
    }
});

