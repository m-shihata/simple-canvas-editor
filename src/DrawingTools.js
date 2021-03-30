import React, { Component } from "react";
import { titleCase } from "./helpers/helpers";

export default class DrawingTools extends Component {
  render() {
    return (
      <div
        className="bg-light shodow rounded-right border border-primary border-left-0"
        style={{
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "translate(0, -50%)",
        }}
      >
        {" "}
        <div className="d-flex flex-column">
          {["line", "rect", "circle", "text", "image"].map((shape, i) => (
            <button
              key={i}
              className="btn btn-sm btn-light mt-1 shadow"
              data-class={shape}
              onClick={this.props.handleShapeCreation}
            >
              {titleCase(shape)}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
