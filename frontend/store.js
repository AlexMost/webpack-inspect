import React from 'react';

export const StoreContext = React.createContext(
  {
    statsData: {},
    moduleId: null,
    onModuleChange: () => {}
  }
);
