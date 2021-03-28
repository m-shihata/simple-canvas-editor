import React, { Component } from "react";
import { Stage, Layer, Rect, Text, Circle, Line, } from "react-konva";
import { URLImage } from "./components/konva-customized";

export default class TheStage extends Component {
  handleShapes = (s) => {
    const stage = JSON.parse(s);
    const shapes = [];
    stage.children[0].children.forEach((shape, i) => {
      shape.className === "Rect"
        ? shapes.push(
            <Rect
              key={i}
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
              key={i}
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
              key={i}
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
              x={shape.attrs.x}
              y={shape.attrs.y}
              points={shape.attrs.points.split(",") || [0,0,100,0]}
              tension={0}
              closed
              stroke={shape.attrs.stroke}
              strokeWidth={shape.attrs.strokeWidth}
            />
          )
        : shape.className === "Image"
        ? shapes.push(
            <URLImage
              key={i}
              x={shape.attrs.x}
              y={shape.attrs.y}
              scaleX = {parseFloat(shape.attrs.scaleX)}
              scaleY = {parseFloat(shape.attrs.scaleY)}
              image={window.location.origin + "/" + shape.attrs.image}
            />
          )
        : shapes.push(<Rect />);
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
