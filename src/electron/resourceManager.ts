import osUtils from 'os-utils';
import fs from 'fs';
import os from 'os';

const POLLING_INTERVAL = 500;

export function pollResources() {
    setInterval(async () => {
        const resourceUsage = {
            cpu: await getCpuUsage(),
            ram: getRamUsage(),
            disk: getStorageData()
        };

        console.log('Resource Usage:', resourceUsage);
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