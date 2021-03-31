import React, { Component } from "react";
import { titleCase, fonts, colors } from "./helpers/helpers";

export default class FocusedShapeInputsForm extends Component {
  render() {
    const background = this.props.shapes[this.props.shapes.length - 1].id === this.props.shape.id;
    return (
      <div className="h-50 overflow-auto card-body border border-primary border-top-0 border-right-0 shadow">
        <span className="lead"> {!background ? titleCase(this.props.shape.className) : "Background" }</span>
        <hr></hr>
        <div>
          {Object.keys(this.props.shape.attrs).map((key, i) => (
            <div key={i} className="form-group d-flex justify-content-between">
              {((background && key  === "fill" ) || !background )&& 
                <label className="mr-2 text-nowrap">{titleCase(key)}</label>
              }
             
                <div>
                  {key === "fill" || key === "stroke"? (
                    <select
                      name={key}
                      className="form-control form-control-sm"
                      type="text"
                      value={this.props.shape.attrs[key]}
                      onChange={this.props.handleShapeInput}
                      data-id={this.props.shape.id}
                    >
                      {colors().map((color,i) => (
                        <option key={i} value={color}>{color}</option>
                      ))}
                    </select>
                  ) : key === "text" || key === "image" ? (
                    <input
                      name={key}
                      className="form-control form-control-sm"
                      type="text"
                      value={this.props.shape.attrs[key]}
                      onChange={this.props.handleShapeInput}
                      data-id={this.props.shape.id}
                    />
                  ) : key === "fontFamily" ? (
                    <select
                      name={key}
                      className="form-control form-control-sm"
                      type="text"
                      value={this.props.shape.attrs[key]}
                      onChange={this.props.handleShapeInput}
                      data-id={this.props.shape.id}
                    >
                      {fonts().map((font,i) => (
                        <option key={i} value={font}>{font}</option>
                      ))}
                    </select>
                  ) : !background && (
                    <input
                      name={key}
                      className="form-control form-control-sm"
                      type="number"
                      value={this.props.shape.attrs[key]}
                      onChange={this.props.handleShapeInput}
                      data-id={this.props.shape.id}
                      min="0"
                      max={key === "angle" && "360"}
                    />
                  )}
                </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
