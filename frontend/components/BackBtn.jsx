import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBack from "@material-ui/icons/ArrowBack";
import StoreContext from "../Store";

const BackButton = () => (
  <StoreContext.Consumer>
    {(ctx) =>
      ctx.modules.length && ctx.moduleId ? (
        <Tooltip title="Upload file from the computer">
          <IconButton
            onClick={() => ctx.onModuleChange(null)}
            style={{ marginRight: "10px" }}
          >
            <ArrowBack style={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      ) : null
    }
  </StoreContext.Consumer>
);

export default BackButton;
