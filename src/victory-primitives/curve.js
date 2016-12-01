import React, { PropTypes } from "react";
import { assign } from "lodash";
import Equality from "../victory-util/equality";
import * as d3Shape from "d3-shape";

export default class Curve extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    events: PropTypes.object,
    index: PropTypes.number,
    interpolation: PropTypes.string,
    role: PropTypes.string,
    scale: PropTypes.object,
    shapeRendering: PropTypes.string,
    style: PropTypes.object
  };

  toNewName(interpolation) {
    // d3 shape changed the naming scheme for interpolators from "basis" -> "curveBasis" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `curve${capitalize(interpolation)}`;
  }

  // Overridden in victory-core-native
  renderLine(path, style, events) {
    const { role, shapeRendering } = this.props;
    return (
      <path
        style={style}
        shapeRendering={shapeRendering || "auto"}
        d={path}
        role={role || "presentation"}
        {...events}
        vectorEffect="non-scaling-stroke"
      />
    );
  }

  getLinePath(props) {
    const { data, interpolation, scale } = props;
    const xScale = scale.x;
    const yScale = scale.y;
    const lineFunction = d3Shape.line()
      .curve(d3Shape[this.toNewName(interpolation)])
      .x((d) => xScale(d.x1 || d.x))
      .y((d) => yScale(d.y1 || d.y));
    return lineFunction(data);
  }

  shouldComponentUpdate(nextProps) {
    const simpleProps = ["interpolation", "shapeRendering", "role"];
    if (!Equality.isShallowEqual(this.props, nextProps, simpleProps)) {
      return true;
    } else if (!Equality.isShallowEqual(this.props.style, nextProps.style)) {
      return true;
    } else if (this.getLinePath(this.props) !== this.getLinePath(nextProps)) {
      return true;
    }
    return false;
  }

  render() {
    const { style, events } = this.props;
    const lineStyle = assign({fill: "none", stroke: "black"}, style);
    return this.renderLine(this.getLinePath(this.props), lineStyle, events);
  }
}
