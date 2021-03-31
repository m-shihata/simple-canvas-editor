import React, { Component } from "react";
import ShapeCard from "./ShapeCard";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

export default class ShapeList extends Component {
  indexedShapes = () => {
    const arr = JSON.parse(this.props.stage).children[0].children
    return arr;
  }
  
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
                background = {this.indexedShapes()[this.indexedShapes().length-1].id === shape.id} 
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