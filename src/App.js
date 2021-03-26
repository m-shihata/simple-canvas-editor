import React, { Component } from "react";
import Konva from "konva";

import { exportPNG, exportBMP, exportJSON, titleCase, arrayManualSort } from "./helpers/helpers";
// import { Stage, Layer, Rect, Text, Circle, Line, Image, } from "react-konva";
// import { StageWithRef, URLImage, } from "./components/konva-customized";
// import Jimp from "jimp/es";
import "./App.css";

// const STR = "{\"attrs\":{\"width\":400,\"height\":400},\"className\":\"Stage\",\"children\":[{\"attrs\":{},\"className\":\"Layer\",\"children\":[{\"attrs\":{\"text\":\"Some text on canvas\",\"fontSize\":15,\"fill\":\"black\"},\"className\":\"Text\"},{\"attrs\":{\"width\":500,\"height\":500,\"fill\":\"white\",\"stroke\":\"back\",\"strokeWidth\":0.1},\"className\":\"Rect\"},{\"attrs\":{\"x\":20,\"y\":50,\"width\":100,\"height\":100,\"fill\":\"red\"},\"className\":\"Rect\"},{\"attrs\":{\"x\":200,\"y\":100,\"radius\":50,\"fill\":\"white\",\"stroke\":\"red\",\"strokeWidth\":5},\"className\":\"Circle\"},{\"attrs\":{\"x\":20,\"y\":200,\"points\":[0,0,100,0,100,100],\"closed\":true,\"stroke\":\"black\",\"fill\":\"red\"},\"className\":\"Line\"}]}]}"
const blank400 = {
    "attrs": {
      "width": 400,
      "height": 300
    },
    "className": "Stage",
    "children": [
      {
        "attrs": {},
        "className": "Layer",
        "children": [
          {
            "attrs": {
              "x": 0,
              "y": 0,
              "width": 400,
              "height": 300,
              "fill": "white"
            },
            "className": "Rect"
          }
        ]
      },
      {
        "attrs": {},
        "className": "Layer",
        "children": [
          {
            "attrs": {
              "x": 400,
              "y": 300,
              "radius": 100,
              "fill": "",
              "stroke": "red",
              "strokeWidth": 4
            },
            "className": "Circle"
          },
          {
            "attrs": {
              "x": 400,
              "y": 300,
              "radius": 50,
              "fill": "",
              "stroke": "red",
              "strokeWidth": 10
            },
            "className": "Circle"
          },
          {
            "attrs": {
              "x": 85,
              "y": 130,
              "text": "€9.99",
              "fontSize": 100,
              "fontFamily": "Calibri",
              "fill": "black"
            },
            "className": "Text"
          },
          {
            "attrs": {
              "x": 0,
              "y": 10,
              "width": 400,
              "height": 62,
              "fill": "red",
              "stroke": "black",
              "strokeWidth": 3
            },
            "className": "Rect"
          },
          {
            "attrs": {
              "x": 150,
              "y": 20,
              "text": "%3%",
              "fontSize": 46,
              "fontFamily": "Calibri",
              "fill": "black"
            },
            "className": "Text"
          }
        ]
      }
    ]
  }

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: undefined,
            stage: JSON.stringify(blank400),
            form: {
                screenSize: "400,300",
            },
        };
    }

    componentDidMount() {
        this.updateStage(this.state.stage);
    }

    componentDidUpdate() {
        this.updateStage();
    }

    updateStage = () => {
        this.stage = Konva.Node.create(this.state.stage, "stageCont");
    };

    handleScreenSizeChange = (e) => {
        this.setState(() => {
            const stageJSON = this.getStageJSON();
            stageJSON.attrs.width = parseInt(e.target.value.split(",")[0]);
            stageJSON.attrs.height = parseInt(e.target.value.split(",")[1]);
            stageJSON.children[0].children[0].attrs.width = parseInt(
                e.target.value.split(",")[0]
            );
            stageJSON.children[0].children[0].attrs.height = parseInt(
                e.target.value.split(",")[1]
            );
            return {
                stage: JSON.stringify(stageJSON),
                form: {
                    screenSize: e.target.value,
                },
            };
        });
    };

    handleTextareaChange = (e) => {
        const stageJSON = JSON.parse(e.target.value);
        this.setState({
            stage: e.target.value,
            form: {
                screenSize: parseInt(`${stageJSON.attrs.width},${stageJSON.attrs.height}`),
            },
        });
    };

    pasteJSONIntoTextarea = () => {
        navigator.clipboard
            .readText()
            .then((json) => this.setState({ stage: json }));
    };

    getStageJSON = () => JSON.parse(this.state.stage)
    getShapesArr = () => this.getStageJSON().children[1].children
    getShape = (index) => this.getShapesArr()[index].attrs;
    
    
    handleShapeInput = (e) => {
        const index = parseInt(e.target.dataset.index);
        const json = this.getStageJSON();
        const shape = this.getShape(index);
        shape[e.target.name] = e.target.name === "fill" || e.target.name === "stroke" || e.target.name === "text" || e.target.naem === "fontFamily"
                            ? e.target.value 
                            : parseInt(e.target.value);
        json.children[1].children[e.target.dataset.index].attrs = shape;
        this.setState({ stage: JSON.stringify(json) });
    };

    deleteShape = (e) => {
        console.log('cl')
        const index = parseInt(e.target.dataset.index);
        const json = this.getStageJSON();
        const shapes = this.getShapesArr();
        shapes.splice(index, 1);
        console.log(shapes)
        json.children[1].children = shapes;
        this.setState({ stage: JSON.stringify(json) });
    }

    order = (e) => {
        this.focus(e);
        const oldIndex = parseInt(e.target.dataset.index);
        const newIndex = e.target.dataset.send === "up" ? oldIndex + 1 : oldIndex - 1;
        const orderedArr = arrayManualSort(this.getShapesArr(), oldIndex, newIndex);
        const json = this.getStageJSON();
        json.children[1].children = orderedArr;
        this.setState({stage: JSON.stringify(json)});
    }

    focus = (e) => {
        if (e.target.dataset.send || this.state.focus === parseInt(e.target.dataset.index)) {
            this.setState({focus: undefined})
        } else {
            this.setState({focus: parseInt(e.target.dataset.index)})
        }
    }


    render() {
        return (
            <div className="container-fluid h-100 bg-light d-flex flex-column justify-content-between py-4 border">
                <div className="d-flex w-100 h-100 bg-light">
                    <div className="col-3 border py-3 shadow-sm">
                        <div className="form-group d-flex justify-content-end">
                            <button
                                className="btn btn-sm btn-secondary mr-2"
                                onClick={exportPNG}
                                title="Extra feature"
                            >
                                Save (.png)
                            </button>
                            <button
                                className="btn btn-sm btn-success"
                                onClick={exportBMP}
                                title="Save the image to broadcast it into screens..."
                            >
                                Save (.bmp)
                            </button>
                        </div>
                        <div className="form-group">
                            <label>Screen size:</label>
                            <select
                                className="custom-select"
                                value={this.state.form.screenSize}
                                onChange={this.handleScreenSizeChange}
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
                        <div className="h-75 overflow-auto ">
                            <div className="d-flex flex-column flex-column-reverse">
                                {JSON.parse(this.state.stage).children[1].children.map((shape, i) => (
                                <div className="d-flex flex-column card">
                                    <div className="card-header" data-index={i} onClick={this.focus}>
                                        <div className="d-flex justify-content-between" data-index={i} onClick={this.focus}>
                                            <div data-index={i} onClick={this.focus}>
                                                <div className="btn mr-2" data-index={i} onClick={this.focus}>
                                                    <span className="h4" data-index={i} onClick={this.focus}>{titleCase(shape.className)}</span>
                                                    <span data-index={i} onClick={this.focus}> {shape.className === "Text" && `(${shape.attrs.text})` }</span>
                                                </div>
                                            </div>
                                            <div data-index={i} onClick={this.focus}>
                                                <button className="btn btn-sm btn-outline-info mr-2" data-index={i} data-send="up" onClick={this.order}>/\</button>
                                                <button className="btn btn-sm btn-outline-info mr-2" data-index={i} data-send="down" onClick={this.order}>\/</button>
                                                <button className="btn btn-sm btn-outline-danger" data-index={i} onClick={this.deleteShape}>X</button>
                                            </div>
                                        </div>
                                        {/* <div>{shape.className === "Text" && `(${shape.attrs.text})` }</div>  */}
                                    </div>
                                    <div key={i} className={this.state.focus !== i ? "card-body collapse" : "card-body"}>
                                        
                                        {Object.keys(this.getShape(i)).map((key, j) => (
                                            <div key={j} className="form-group d-flex justify-content-between">
                                                <label className="mr-2">{titleCase(key)}</label>
                                                <div>
                                                    {key === "fill" || key === "stroke" || key === "text" || key === "fontFamily" ? (
                                                        <input
                                                            name={key}
                                                            className="form-control form-control-sm"
                                                            type="text"
                                                            value={this.getShape(i)[key]}
                                                            onChange={this.handleShapeInput}
                                                            data-index={i}
                                                        />
                                                    ) : (
                                                        <input
                                                            name={key}
                                                            className="form-control form-control-sm"
                                                            type="number"
                                                            value={this.getShape(i)[key]}
                                                            onChange={this.handleShapeInput}
                                                            data-index={i}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex w-100 h-100 bg-secondary border justify-content-center align-items-center overflow-auto">
                            <div id="stageCont" className="shadow"></div>
                        </div>
                    </div>
                    <div className="d-flex flex-column col-3 border py-3">
                        <div className="d-flex justify-content-between">
                            <div className="lead">Canvas (JSON)</div>
                            <div>
                                <button
                                    className="btn btn-sm btn-primary mr-2"
                                    onClick={this.pasteJSONIntoTextarea}
                                    title="Paste JSON you copied from file"
                                >
                                    Paste
                                </button>
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => exportJSON(this.state.stage)}
                                    title="Save the JSON as text file so you can import it later by copying the JSON and click on the past paste button"
                                >
                                    Save as (txt)
                                </button>
                            </div>
                        </div>
                        <textarea
                            className="mt-2 h-100 form-control"
                            value={JSON.stringify(
                                JSON.parse(this.state.stage),
                                null,
                                2
                            )}
                            onChange={this.handleTextareaChange}
                        ></textarea>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
