import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev, ipcHandle } from './util.js';
import { pollResources, getStaticData } from './resourceManager.js';
import { getPreloadPath } from './pathResolver.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: getPreloadPath()
        }
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
    } else {
        mainWindow.loadFile(path.join(__dirname, '../../dist-react/index.html'));
    }

    pollResources(mainWindow);

    ipcHandle('getStaticData', () => {
        return getStaticData();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});