import React, { Component } from "react";

export default class ZoomControls extends Component {
  render() {
    return (
      <>
        <span className="mr-2"> 
        {this.props.zoom}%
        </span>
        <span>
          <button className="btn btn-sm btn-light mr-1" data-change="out" onClick={this.props.handleZoom}>
            -
          </button>
          <button className="btn btn-sm btn-light" data-change="in" onClick={this.props.handleZoom}>
            +
          </button>
        </span>
      </>
    );
  }
}
