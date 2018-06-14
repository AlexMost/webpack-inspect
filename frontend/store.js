import React from 'react';

export const StoreContext = React.createContext(
  {
    statsData: {},
    moduleId: null,
    selectedAsset: null,
    onModuleChange: () => {},
    onAssetSelect: () => {}
  }
);
