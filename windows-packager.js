const electronInstaller = require('electron-winstaller');

const runInstaller = async () => {
    try {
        await electronInstaller.createWindowsInstaller({
                appDirectory: 'release/windows/app',
                outputDirectory: 'release/windows/build',
                authors: "Tobi",
                exe: 'noku.exe',
                owners: "Tobi",
                description: "Worlds worst social app",
                version: "0.0.3",
                title: "noku",
                name: "noku",
                setupIcon: "dump/logo.ico",
                setupExe: "noku-setup.exe",
                setupMsi: "noku.msi",
                loadingGif: "dump/loading.gif",
            },
        );
        console.log('It worked!');
    } catch (e) {
        console.log(`No dice: ${e.message}`);
    };
};

runInstaller();
