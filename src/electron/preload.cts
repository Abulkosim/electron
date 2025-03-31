import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback: (statistics: any) => void) => {
    ipcRenderer.on('statistics', (_: IpcRendererEvent, stats: any) => callback(stats));
  }, 
  getStaticData: () => ipcRenderer.invoke('getStaticData'),
} satisfies Window['electron']);
