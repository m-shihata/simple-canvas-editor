import React, { Component } from "react";

export default class ZoomControls extends Component {
  render() {
    return (
      <div className="d-flex align-items-center"  style={{ position: "absolute", bottom: "2rem", right: "2rem" }}>
         <span className="mr-2 lead"> 
        ({this.props.zoom}%)
        </span>
        <span>
          <button className="btn btn-sm btn-light mr-1 shadow" data-change="out" onClick={this.props.handleZoom}>
            -
          </button>
          <button className="btn btn-sm btn-light mr-2" data-change="in" onClick={this.props.handleZoom}>
            +
          </button>
        </span>
       
      </div>
    );
  }
}
