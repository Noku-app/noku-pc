const electron = require("electron"), state = {}, package = require("./package.json");

if (require('electron-squirrel-startup')) {
    electron.app.quit();
};

const menu = () => {
    return [
        {
            label: "info",
            submenu: [
                {
                    label: "Go Home",
                    click: () => createWindow()
                },
                {
                    label: "github",
                    submenu: [
                        {
                            label: "home",
                            click: () => createWindow(package.homepage)
                        },
                        {
                            label: "issues",
                            click: () => createWindow(package.bugs.url)
                        },
                        {
                            label: "releases",
                            click: () => createWindow(package.releases)
                        }
                    ]
                },
                {
                    label: "version",
                    submenu: [
                        {
                            label: package.version
                        }
                    ]
                }
            ]
        }
    ]
}

const createWindow = async (url="https://noku.wtf/home") => {
    state.window = state.window ? state.window : new electron.BrowserWindow(
        {
            width: 1000,
            height: 800,
            resizable: true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                nativeWindowOpen: true
            },
            icon: "./dump/logo.png"
        }
    )
    state.window.loadURL(url)
}

electron.app.on(
    "ready",
    async () => {createWindow(); electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(menu()))}
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