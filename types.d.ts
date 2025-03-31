export type Statistics = {
  cpu: number;
  ram: number;
  disk: {
    total: number;
    used: number;
  };
}

export type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemory: number;
}

export type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
}

declare global {
  interface Window {
    electron: {
      subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
      getStaticData: () => Promise<StaticData>;
    }
  }
}