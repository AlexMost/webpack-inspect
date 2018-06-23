import React from "react";
import { StoreContext } from "../store";
import Typography from '@material-ui/core/Typography';

const SidebarComponent = (props) => {
    const module = props.modules.find((m) => m.id === props.selectedModuleId);
    if (!module) return null;
    return (
        <React.Fragment>
            <Typography align="left" variant="title">{module.name}</Typography>
            <Typography align="left" variant="subheading">
                {module.reasons.length} Reasons:
            </Typography>
            <ul>
                {module.reasons.map((reason) => {
                    return <li key={reason.module}><Typography align="left">{reason.module}</Typography></li>
                })}
            </ul>
        </React.Fragment>
    )
};

const Sidebar = () => {
    return (
        <StoreContext.Consumer>
            {
                ctx => (
                    <SidebarComponent
                        modules={ctx.modules || []}
                        selectedModuleId={ctx.selectedModuleId}
                    />
                )
            }
        </StoreContext.Consumer>
    )
}

export default Sidebar;
