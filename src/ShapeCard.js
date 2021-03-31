import React, { Component } from "react";
import { titleCase } from "./helpers/helpers";
import DragDots from "./DragDots";

export default class ShapeCard extends Component {
  render() {
    return (
      <div
        className={`d-flex card ${
          this.props.focus === this.props.shape.id &&
          "bg-light border border-primary border-top-0 border-right-0 shadow-sm"
        }`}
      >
        <div data-id={this.props.shape.id} onClick={this.props.handleFocus}>
          <div
            className="d-flex"
            data-id={this.props.shape.id}
            onClick={this.props.handleFocus}
          >
            {!this.props.background && <div style={{ width: "15px", cursor:"move" }} className="d-flex align-items-center ml-2">
              <DragDots />
            </div>}
            <div data-id={this.props.shape.id} onClick={this.props.handleFocus}>
              <div
                className="btn mr-2"
                data-id={this.props.shape.id}
                onClick={this.props.handleFocus}
              >
                <span
                  className="Lead"
                  style={{ fontSize: "1rem" }}
                  data-id={this.props.shape.id}
                  onClick={this.props.handleFocus}
                >
                  {!this.props.background ? titleCase(this.props.shape.className) : "background"}
                </span>
                <span
                  data-id={this.props.shape.id}
                  onClick={this.props.handleFocus}
                >
                  {" "}
                  {this.props.shape.className === "Text" &&
                    `(${this.props.shape.attrs.text})`}
                </span>
              </div>
            </div>
            {!this.props.background && <div className="d-flex mr-3 ml-auto">
              <button
                className="btn btn-sm btn-outline-danger m-auto"
                data-id={this.props.shape.id}
                onClick={this.props.handleDelete}
              ></button>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}
