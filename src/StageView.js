import React, { Component } from "react";

export default class StageView extends Component {
  render() {
    return (
      <div className="col-6 border mr-1">
        <div className="overflow-auto bg-secondary h-100">
        <div style={{ transform:`scale(${this.props.zoom})` }}>
          <div className="d-table">
            <div className="d-table-row">
              <div className="bg-white  m-5">
                <div id="stageCont" className="shadow bg-ps-transparent"></div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
