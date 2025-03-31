type Statistics = {
  cpu: number;
  ram: number;
  disk: number;
}

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemory: number;
}

interface Window {
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
    getStaticData: () => Promise<StaticData>;
  }
}