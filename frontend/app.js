import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "./appBar";

function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar title="Deps inspector"/>
      {/* The rest of your application */}
    </React.Fragment>
  );
}

export default MyApp