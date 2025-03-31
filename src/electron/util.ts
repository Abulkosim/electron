import { ipcMain, webContents } from 'electron';
import { EventPayloadMapping } from '../../types.js';

export const isDev = process.env.NODE_ENV === 'development';

export function ipcHandle<Key extends keyof EventPayloadMapping>(key: Key, handler: () => EventPayloadMapping[Key]) {
  ipcMain.handle(key, () => handler());
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(key: Key, payload: EventPayloadMapping[Key]) {
  webContents.getAllWebContents().forEach(contents => {
    contents.send(key, payload);
  });
}