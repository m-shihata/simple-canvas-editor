import React, { Component } from "react";
import { titleCase } from "./helpers/helpers";

export default class ShapeCard extends Component {
  render() {
    return (
      <div
        className={`d-flex flex-column card ${
          this.props.focus === this.props.shape.id && "bg-light border border-primary border-top-0 border-bottom-0 border-right-0 shadow-sm"
        }`}
      >
        <div data-id={this.props.shape.id} onClick={this.props.handleFocus}>
          <div
            className="d-flex justify-content-between"
            data-id={this.props.shape.id}
            onClick={this.props.handleFocus}
          >
            <div data-id={this.props.shape.id} onClick={this.props.handleFocus}>
              <div
                className="btn mr-2"
                data-id={this.props.shape.id}
                onClick={this.props.handleFocus}
              >
                <span
                  className="Lead .grippy"
                  style={{ fontSize: "1rem" }}
                  data-id={this.props.shape.id}
                  onClick={this.props.handleFocus}
                >
                  {titleCase(this.props.shape.className)}
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
            <div className="d-flex mr-3">
            <button
              className="btn btn-sm btn-outline-danger m-auto"
              data-id={this.props.shape.id}
              onClick={this.props.handleDelete}
            ></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
