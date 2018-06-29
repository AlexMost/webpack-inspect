import React from "react";
import PropTypes from "prop-types";
import renderGraph from "./visGraph";

function createMarkup() {
  return {
    __html: '<div id="graph-container" style="height:100%;flex-grow: 1"></div>',
  };
}

export default class ModulesGraphComponent extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.network = null;
  }

  componentDidMount() {
    this.renderGraph();
  }

  shouldComponentUpdate(nextProps) {
    const { moduleId: currentModuleId } = this.props;
    return nextProps.moduleId !== currentModuleId;
  }

  componentDidUpdate() {
    this.renderGraph();
  }

  renderGraph = () => {
    const container = this.container.current;
    const rect = container.getBoundingClientRect();
    this.network = renderGraph(this.props, {
      width: rect.width,
      height: rect.height,
    });
  };

  render() {
    return (
      <div
        ref={this.container}
        style={{ flexGrow: 1 }}
        dangerouslySetInnerHTML={createMarkup()} // eslint-disable-line
      />
    );
  }
}

ModulesGraphComponent.propTypes = {
  moduleId: PropTypes.number.isRequired,
};
