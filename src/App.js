import React, { Component } from "react";

import FocusedShapeInputsForm from "./FocusedShapeInputsForm";
import ShapeList from "./ShapeList";
import StageView from "./StageView";
import JSONSidbar from "./JSONSidebar";
import defaultTemplate, {
  rectJSON,
  circleJSON,
  textJSON,
  imageJSON,
  lineJSON,
} from "./templates";

import "./App.css";

class App extends Component {
  stage = null;

  constructor(props) {
    super(props);
    this.state = {
      stage: JSON.stringify(defaultTemplate()),
      focus: 0,
      screenSize: "400,300",
      zoom: 100,
      backgroundId: 0,
    };
  }

  handleScreenSizeChange = (e) => {
    this.setState(() => {
      const stageJSON = this.getStageJSON();
      stageJSON.attrs.width = parseInt(e.target.value.split(",")[0]);
      stageJSON.attrs.height = parseInt(e.target.value.split(",")[1]);
      stageJSON.children[0].children[
        stageJSON.children[0].children.length - 1
      ].attrs.width = parseInt(e.target.value.split(",")[0]);
      stageJSON.children[0].children[
        stageJSON.children[0].children.length - 1
      ].attrs.height = parseInt(e.target.value.split(",")[1]);
      return {
        stage: JSON.stringify(stageJSON),
        screenSize: e.target.value,
        zoom: 100,
      };
    });
  };

  handleTextareaChange = (e) => {
    const stageJSON = JSON.parse(e.target.value);
    this.setState({
      stage: e.target.value,
      screenSize: parseInt(
        `${stageJSON.attrs.width},${stageJSON.attrs.height}`
      ),
    });
  };

  pasteJSONIntoTextarea = () => {
    navigator.clipboard.readText().then((json) => {
      this.setState({ stage: json });
    });
  };

  getStageJSON = () => JSON.parse(this.state.stage);
  getShapesArr = () => this.getStageJSON().children[0].children;
  getShape = (id) =>
    this.getShapesArr().find((shape) => {
      return shape.id === id;
    }).attrs;

  handleFocus = (e) => {
    this.setState({ focus: parseInt(e.target.dataset.id) });
  };

  handleZoom = (e) => {
    const change = e.target.dataset.change;
    if (change === "in" && this.state.zoom < 200) {
      this.setState({ zoom: this.state.zoom + 10 });
    } else if (change === "out" && this.state.zoom > 10) {
      this.setState({ zoom: this.state.zoom - 10 });
    }
  };

  handleShapeCreation = (e) => {
    const x = parseInt(this.state.screenSize.split(",")[0]) / 2;
    const y = parseInt(this.state.screenSize.split(",")[1]) / 2;
    const shapeClass = e.target.dataset.class;
    const json = this.getStageJSON();
    const shapes = this.getShapesArr().map((shape) => {
      shape.id++;
      return shape;
    });
    let shape = null;

    switch (shapeClass) {
      case "rect":
        {
          shape = rectJSON(x, y);
        }
        break;
      case "circle":
        {
          shape = circleJSON(x, y);
        }
        break;
      case "text":
        {
          shape = textJSON(x, y);
        }
        break;
      case "line":
        {
          shape = lineJSON(x, y);
        }
        break;
      case "image":
        {
          shape = imageJSON();
        }
        break;
      default:
        {
          shape = null;
        }
    }

    shapes.unshift(shape);
    json.children[0].children = shapes;
    this.setState(
      {
        stage: JSON.stringify(json),
        backgroundId: this.state.backgroundId + 1,
      },
      () => this.setState({ focus: 0 })
    );
  };

  handleShapeInput = (e) => {
    const id = parseInt(e.target.dataset.id);
    const index = this.getShapesArr().findIndex((shape) => shape.id === id);
    const json = this.getStageJSON();
    const shape = this.getShape(id);
    shape[e.target.name] =
      e.target.name === "fill" ||
      e.target.name === "stroke" ||
      e.target.name === "text" ||
      e.target.name === "image" ||
      e.target.name === "fontFamily" ||
      e.target.name === "scaleY" ||
      e.target.name === "scaleX"
        ? e.target.value
        : parseInt(e.target.value);
    json.children[0].children[index].attrs = shape;
    this.setState({ stage: JSON.stringify(json) });
  };

  handleDelete = (e) => {
    const id = parseInt(e.target.dataset.id);
    const index = this.getShapesArr().findIndex((shape) => shape.id === id);
    const nextFocus = this.getShapesArr()[index + 1].id;
    const json = this.getStageJSON();
    const shapes = this.getShapesArr();
    shapes.splice(index, 1);
    json.children[0].children = shapes;
    this.setState({ stage: JSON.stringify(json) }, () => {
      this.setState({ focus: nextFocus });
    });
  };

  handleRLDDChange = (newShapeList) => {
    const json = JSON.parse(this.state.stage);
    const shouldOrder =
      newShapeList[newShapeList.length - 1].id === this.state.backgroundId;
    if (shouldOrder) {
      json.children[0].children = newShapeList;
      this.setState({ stage: JSON.stringify(json) });
    }
  };

  render() {
    return (
      <div className="container-fluid h-100 bg-light d-flex flex-column justify-content-between py-4 border">
        <div className="d-flex w-100 h-100 bg-light">
          <div className="col-3 border py-3 shadow">
            <ShapeList
              stage={this.state.stage}
              focus={this.state.focus}
              getShape={this.getShape}
              handleFocus={this.handleFocus}
              handleShapeInput={this.handleShapeInput}
              handleOrder={this.handleOrder}
              handleDelete={this.handleDelete}
              handleRLDDChange={this.handleRLDDChange}
            />

            <FocusedShapeInputsForm
              shape={
                this.getShapesArr().find(
                  (shape) => shape.id === this.state.focus
                )
                  ? this.getShapesArr().find(
                      (shape) => shape.id === this.state.focus
                    )
                  : this.getShapesArr()[0]
              }
              shapes={this.getShapesArr()}
              handleShapeInput={this.handleShapeInput}
            />
          </div>

          <StageView
            stage={this.state.stage}
            handleShapeCreation={this.handleShapeCreation}
            screenSize={this.screenSize}
            handleScreenSizeChange={this.handleScreenSizeChange}
            zoom={this.state.zoom}
            handleZoom={this.handleZoom}
          />

          <JSONSidbar
            stage={this.state.stage}
            pasteJSONIntoTextarea={this.pasteJSONIntoTextarea}
          />
        </div>
      </div>
    );
  }
}

export default App;
