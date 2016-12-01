import React, { PropTypes } from "react";
import { assign } from "lodash";
import Equality from "../victory-util/equality";


export default class Line extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    datum: PropTypes.any,
    data: PropTypes.array,
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
    style: PropTypes.object,
    events: PropTypes.object,
    role: PropTypes.string,
    shapeRendering: PropTypes.string
  };

  // Overridden in victory-core-native
  renderAxisLine(props, style, events) {
    const { role, shapeRendering } = this.props;
    return (
      <line
        {...props}
        style={style}
        role={role}
        shapeRendering={shapeRendering || "auto"}
        vectorEffect="non-scaling-stroke"
        {...events}
      />
    );
  }

  shouldComponentUpdate(nextProps) {
    const simpleProps = ["shapeRendering", "role", "x1", "y1", "x2", "y2"];
    if (!Equality.isShallowEqual(this.props, nextProps, simpleProps)) {
      return true;
    } else if (!Equality.isShallowEqual(this.props.style, nextProps.style)) {
      return true;
    }
    return false;
  }

  render() {
    const { x1, x2, y1, y2, events} = this.props;
    const style = assign({stroke: "black"}, this.props.style);
    return this.renderAxisLine({x1, x2, y1, y2}, style, events);
  }
}
