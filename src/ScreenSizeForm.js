import React, { Component } from "react";

export default class ScreenSizeForm extends Component {
  render() {
    return (
      <div className="form-group">
        <label>Screen size:</label>
        <select
          className="custom-select"
          value={this.props.screenSize}
          onChange={this.props.handleScreenSizeChange}
          title="Select screen size"
        >
          <option value="200,200">Screen 1 -- (200X200)</option>
          <option value="264,176">Screen 2 -- (264X176)</option>
          <option value="296,128">Screen 3 -- (296X128)</option>
          <option value="400,300">Screen 4 -- (400X300)</option>
          <option value="800,480">Screen 5 -- (800X480)</option>
          <option value="1872,1404">Screen 6 -- (1872X1404)</option>
        </select>
      </div>
    );
  }
}
