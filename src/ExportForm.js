import React, {Component} from 'react';
import {
    exportPNG,
    exportBMP,
  } from "./helpers/helpers";

export default class ExportForm extends Component {
    render() {
        return(
          <div className="d-flex align-items-center"  style={{ position: "absolute", top: "1.2rem", right: "2rem" }}>
            <div className="form-group d-flex justify-content-end">
              <button
                className="btn btn-sm btn-info mr-2"
                onClick={exportPNG}
                title="Extra feature"
              >
                Save screen (.png)
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={exportBMP}
                title="Save the image to broadcast it into screens..."
              >
                Save screen (.bmp)
              </button>
            </div>
          </div>
        )
    }
}