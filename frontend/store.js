import React from 'react';

export const StoreContext = React.createContext(
  {
    statsData: {},
    clusterMap: {},
    moduleId: null,
    selectedAsset: null,
    onModuleChange: () => {},
    onAssetSelect: () => {}
  }
);
