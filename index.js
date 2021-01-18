const { stat } = require("fs");

const electron = require("electron"), state = {};

if (require('electron-squirrel-startup')) {
    electron.app.quit();
};


const createWindow = async () => {
    state.window = new electron.BrowserWindow(
        {
            width: 1000,
            height: 800,
            resizable: true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                nativeWindowOpen: true
            }
        }
    )
    electron.Menu.setApplicationMenu(null)
    state.window.loadURL("https://noku.wtf/home")
}

electron.app.on(
    "ready",
    async () => createWindow()
)

electron.app.on(
    'window-all-closed', 
    () => {
        if (process.platform !== 'darwin') {
            electron.app.quit();
        };
    },
);

electron.app.on(
    'activate', 
    () => {
        if (electron.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        };
    },
);