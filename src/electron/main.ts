import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
    } else {
        mainWindow.loadFile(path.join(__dirname, '../../dist-react/index.html'));
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});