import React, { Component } from "react";
import {titleCase,} from "./helpers/helpers"

export default class FocusedShapeInputsForm extends Component {
  render() {
    return (
      <div
        className="h-50 overflow-auto card-body border border-primary border-top-0 border-bottom-0 border-right-0 shadow" 
      >
        <span className="lead">{titleCase(this.props.shape.className)}</span>
        <hr></hr>
        {Object.keys(this.props.shape.attrs).map((key, i) => (
          <div key={i} className="form-group d-flex justify-content-between">
            <label className="mr-2">{titleCase(key)}</label>
            <div>
              {key === "fill" ||
              key === "stroke" ||
              key === "text" ||
              key === "points" ||
              key === "image" ||
              key === "fontFamily" ? (
                <input
                  name={key}
                  className="form-control form-control-sm"
                  type="text"
                  value={this.props.shape.attrs[key]}
                  onChange={this.props.handleShapeInput}
                  data-id={this.props.shape.id}
                />
              ) : (
                <input
                  name={key}
                  className="form-control form-control-sm"
                  type="number"
                  value={this.props.shape.attrs[key]}
                  onChange={this.props.handleShapeInput}
                  data-id={this.props.shape.id}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
