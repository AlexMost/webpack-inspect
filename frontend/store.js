import React from 'react';

export const StoreContext = React.createContext(
  {
    modules: [],
    clusterMap: {},
    moduleId: null,
    selectedModuleId: null,
    onModuleChange: () => {},
    onSelectModule: () => {},
    onDrawStart: () => {},
    onDrawEnd: () => {},
    isDrawing: false,
  }
);
