import React, { Component } from "react";
import ShapeCard from "./ShapeCard";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

export default class ShapeList extends Component {
  indexedShapes = () => JSON.parse(this.props.stage).children[0].children;
  render() {
    return (
      <div className="h-50 overflow-auto my-2 shadow-sm border">
        <RLDD
          items={this.indexedShapes()}
          itemRenderer={(shape) => {
            return (
              <ShapeCard
                key={shape.id}
                shape={shape}
                focus={this.props.focus}
                getShape={this.props.getShape}
                handleFocus={this.props.handleFocus}
                handleDelete={this.props.handleDelete}
              />
            );
          }}
          onChange={this.props.handleRLDDChange}
        />
      </div>
    );
  }
}
