import React from "react";
import { renderGraph } from "./visGraph";

function createMarkup() {
  return {
    __html: '<div id="graph-container" style="height:100%;flex-grow: 1"></div>'
  };
}

export default class ModulesGraphComponent extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }
  componentDidMount() {
    const container = this.container.current;
    const rect = container.getBoundingClientRect();
    renderGraph(this.props, { width: rect.width, height: rect.height });
  }
  componentDidUpdate() {
    const container = this.container.current;
    const rect = container.getBoundingClientRect();
    renderGraph(this.props, { width: rect.width, height: rect.height });
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.moduleId !== this.props.moduleId;
  }
  render() {
    return (
      <div
        ref={this.container}
        style={{ flexGrow: 1 }}
        dangerouslySetInnerHTML={createMarkup()}
      />
    );
  }
}
