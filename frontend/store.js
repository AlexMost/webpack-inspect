import React from 'react';

export const StoreContext = React.createContext(
  {
    statsData: {},
    clusterMap: {},
    moduleId: null,
    selectedModuleId: null,
    selectedAsset: null,
    onModuleChange: () => {},
    onAssetSelect: () => {},
    onSelectModule: () => {},
  }
);
