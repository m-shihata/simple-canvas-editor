import React, { Component } from "react";
import { Stage, Layer, Rect, Text, Circle, Line, } from "react-konva";
import { URLImage } from "./components/konva-customized";
import {points} from "./helpers/helpers";

export default class TheStage extends Component {
  handleShapes = (s) => {
    const stage = JSON.parse(s);
    const shapes = [];
    stage.children[0].children.reverse().forEach((shape) => {
      shape.className === "Rect"
        ? shapes.push(
            <Rect
              key={shape.id}
              x={shape.attrs.x}
              y={shape.attrs.y}
              width={shape.attrs.width}
              height={shape.attrs.height}
              fill={shape.attrs.fill}
              stroke={shape.attrs.stroke}
              strokeWidth={shape.attrs.strokeWidth}
            />
          )
        : shape.className === "Circle"
        ? shapes.push(
            <Circle
              key={shape.id}
              x={shape.attrs.x}
              y={shape.attrs.y}
              radius={shape.attrs.radius}
              fill={shape.attrs.fill}
              stroke={shape.attrs.stroke}
              strokeWidth={shape.attrs.strokeWidth}
            />
          )
        : shape.className === "Text"
        ? shapes.push(
            <Text
              key={shape.id}
              x={shape.attrs.x}
              y={shape.attrs.y}
              text={shape.attrs.text}
              fontSize={shape.attrs.fontSize}
              fontFamily={shape.attrs.fontFamily}
              fill={shape.attrs.fill}
            />
          )
        : shape.className === "Line"
        ? shapes.push(
            <Line
              key={shape.id}
              x={shape.attrs.x}
              y={shape.attrs.y}
              points={points(parseInt(shape.attrs.length), parseInt(shape.attrs.angle)) || [0,0,100,0]}
              tension={0}
              closed
              stroke={shape.attrs.stroke}
              strokeWidth={shape.attrs.strokeWidth}
            />
          )
        : shape.className === "Image"
        && shapes.push(
            <URLImage
              key={shape.id}
              x={shape.attrs.x}
              y={shape.attrs.y}
              width = {shape.attrs.width}
              height = {shape.attrs.height}
              image={window.location.origin + "/" + shape.attrs.image}
            />
          )
    });
    return shapes;
  };

  render() {
    return (
      <Stage
        width={JSON.parse(this.props.stage).attrs.width}
        height={JSON.parse(this.props.stage).attrs.height}
      >
        <Layer>{this.handleShapes(this.props.stage)}</Layer>
      </Stage>
    );
  }
}
