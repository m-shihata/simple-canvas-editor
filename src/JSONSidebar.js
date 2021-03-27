import React, { Component } from "react";
import { exportJSON } from "./helpers/helpers";

export default class JSONSidbar extends Component {
  render() {
    return (
      <div className="d-flex flex-column col-3 border shadow py-3">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-sm btn-primary mr-2"
              onClick={this.props.pasteJSONIntoTextarea}
              title="Copy JSON from template file then click here."
            >
              Load a template
            </button>
            <button
              className="btn btn-sm btn-success"
              onClick={() => exportJSON(this.props.stage)}
              title="Save the JSON to load later"
            >
              Save template (.json)
            </button>
          </div>
        </div>
        <textarea
          readOnly
          className="mt-4 h-100 form-control"
          value={JSON.stringify(JSON.parse(this.props.stage), null, 4)}
          onChange={this.handleTextareaChange}
        ></textarea>
      </div>
    );
  }
}
