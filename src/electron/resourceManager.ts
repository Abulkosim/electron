import osUtils from 'os-utils';
import fs from 'fs';
import os from 'os';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from './util.js';
import { Statistics } from '../../types.js';
const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
    setInterval(async () => {
        const resourceUsage: Statistics = {
            cpu: await getCpuUsage() as number,
            ram: getRamUsage(),
            disk: getStorageData()
        };

        ipcWebContentsSend('statistics', resourceUsage);
    }, POLLING_INTERVAL);
}

export function getStaticData() {
    const totalStorage = getStorageData().total; 
    const cpuModel = os.cpus()[0].model;
    const totalMemory = Math.floor(osUtils.totalmem() / 1024);

    return {
        totalStorage,
        cpuModel,
        totalMemory
    }   
}

function getCpuUsage() {
    return new Promise((resolve, reject) => {
        osUtils.cpuUsage((usage) => {
            resolve(usage);
        });
    });
}

function getRamUsage() {
    return 1 - osUtils.freememPercentage();
}

function getStorageData() {
    const stats = fs.statSync('/');
    const total = stats.size;
    const used = total - stats.blocks * stats.blksize;
    return { total, used };
}