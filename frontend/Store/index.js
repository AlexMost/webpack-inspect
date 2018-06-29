import React from "react";

const StoreContext = React.createContext({
  modules: [],
  clusterMap: {},
  moduleId: null,
  selectedModuleId: null,
  onModuleChange: () => {},
  onSelectModule: () => {},
  onDrawStart: () => {},
  onDrawEnd: () => {},
  onReasonSelect: () => {},
  onStatsDataLoaded: () => {},
  onStatsLoadStart: () => {},
  isDrawing: false,
  isUploading: false,
});

export default StoreContext;
