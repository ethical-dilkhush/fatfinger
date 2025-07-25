interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: {
      method: string;
      params?: any[];
    }) => Promise<any>;
    on: (event: string, callback: (accounts: string[]) => void) => void;
    removeListener: (event: string, callback: (accounts: string[]) => void) => void;
    selectedAddress: string | null;
    chainId: string;
    networkVersion: string;
  };
}

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: {
        method: string;
        params?: any[];
      }) => Promise<any>;
      on: (event: string, callback: (accounts: string[]) => void) => void;
      removeListener: (event: string, callback: (accounts: string[]) => void) => void;
      selectedAddress: string | null;
      chainId: string;
      networkVersion: string;
    };
  }
}

export {}; 