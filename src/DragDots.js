import React, { Component } from "react";

export default class DragDots extends Component {
  render() {
    return (
      <svg viewBox="0 0 32 32">
        <rect height="4" width="4" y="4" x="0" fill="grey" />
        <rect height="4" width="4" y="12" x="0"fill="grey" />
        <rect height="4" width="4" y="20" x="0" fill="grey" />
        <rect height="4" width="4" y="28" x="0" fill="grey" />
        <rect height="4" width="4" y="4" x="8" fill="grey" />
        <rect height="4" width="4" y="12" x="8" fill="grey" />
        <rect height="4" width="4" y="20" x="8" fill="grey" />
        <rect height="4" width="4" y="28" x="8" fill="grey" />
      </svg>
    );
  }
}
