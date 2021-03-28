import React, { Component } from "react";
import ZoomControls from "./ZoomControls";
import TheStage from "./TheStage"
import { getHeight } from "jimp";

export default class StageView extends Component {
  render() {
    return (
      <div className="col-6 mr-1 p-0 h-100" >
        <div className="overflow-auto bg-secondary w-100 h-100">
          <div className="d-table m-auto h-100">
          <div className="d-table-cell h-100"
            style={{
              transform: `scale(${this.props.zoom / 100})`,
            }}
          >  
          <div className="d-flex h-100 flex-column flex-grow-0 justify-content-center">
            <div className="bg-white m-5">
              <div className="shadow bg-ps-transparent">
                <TheStage stage={this.props.stage} />
              </div>
            </div>
            </div>
          </div>
          </div>
        
        </div>
        <div style={{ position: "absolute", bottom: "2rem", right: "2rem" }}>
          <ZoomControls
            zoom={this.props.zoom}
            handleZoom={this.props.handleZoom}
          />
        </div>
      </div>
    );
  }
}
