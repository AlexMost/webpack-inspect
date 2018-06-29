import React from "react";
import StoreContext from "../../Store";
import SidebarComponent from "./component";

const Sidebar = () => (
  <StoreContext.Consumer>
    {ctx => (
      <SidebarComponent
        modules={ctx.modules || []}
        selectedModuleId={ctx.selectedModuleId}
        onReasonSelect={ctx.onReasonSelect}
      />
    )}
  </StoreContext.Consumer>
);

export default Sidebar;
