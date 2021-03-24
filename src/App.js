import React, { Component } from "react";
import Konva from "konva";

import { exportPNG, exportBMP, exportJSON } from "./helpers/helpers";
// import { Stage, Layer, Rect, Text, Circle, Line, Image, } from "react-konva";
// import { StageWithRef, URLImage, } from "./components/konva-customized";
// import Jimp from "jimp/es";
import "./App.css";

// const STR = "{\"attrs\":{\"width\":400,\"height\":400},\"className\":\"Stage\",\"children\":[{\"attrs\":{},\"className\":\"Layer\",\"children\":[{\"attrs\":{\"text\":\"Some text on canvas\",\"fontSize\":15,\"fill\":\"black\"},\"className\":\"Text\"},{\"attrs\":{\"width\":500,\"height\":500,\"fill\":\"white\",\"stroke\":\"back\",\"strokeWidth\":0.1},\"className\":\"Rect\"},{\"attrs\":{\"x\":20,\"y\":50,\"width\":100,\"height\":100,\"fill\":\"red\"},\"className\":\"Rect\"},{\"attrs\":{\"x\":200,\"y\":100,\"radius\":50,\"fill\":\"white\",\"stroke\":\"red\",\"strokeWidth\":5},\"className\":\"Circle\"},{\"attrs\":{\"x\":20,\"y\":200,\"points\":[0,0,100,0,100,100],\"closed\":true,\"stroke\":\"black\",\"fill\":\"red\"},\"className\":\"Line\"}]}]}"
const blank400 = {
    attrs: {
        width: 400,
        height: 400,
    },
    className: "Stage",
    children: [
        {
            attrs: {},
            className: "Layer",
            children: [
                {
                    attrs: {
                        x: 0,
                        y: 0,
                        width: 400,
                        height: 400,
                        fill: "white",
                    },
                    className: "Rect",
                },
                {
                    attrs: {
                        x: 20,
                        y: 20,
                        width: 100,
                        height: 100,
                        fill: "red",
                        stroke: "black",
                        strokeWidth: 5,
                    },
                    className: "Rect",
                },
            ],
        },
    ],
};

class App extends Component {
    stage = null;

    constructor(props) {
        super(props);
        this.state = {
            stage: JSON.stringify(blank400),
            form: {
                screenSize: 400,
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
        this.setState((state) => {
            const stageJSON = JSON.parse(state.stage);
            stageJSON.attrs.width = parseInt(e.target.value);
            stageJSON.attrs.height = parseInt(e.target.value);
            stageJSON.children[0].children[0].attrs.width = parseInt(
                e.target.value
            );
            stageJSON.children[0].children[0].attrs.height = parseInt(
                e.target.value
            );
            return {
                stage: JSON.stringify(stageJSON),
                form: {
                    screenSize: parseInt(e.target.value),
                },
            };
        });
    };

    handleTextareaChange = (e) => {
        const stageJSON = JSON.parse(e.target.value);
        this.setState({
            stage: e.target.value,
            form: {
                screenSize: parseInt(stageJSON.attrs.width),
            },
        });
    };

    pasteJSONIntoTextarea = () => {
        console.log("clicked");
        navigator.clipboard
            .readText()
            .then((json) => this.setState({ stage: json }));
    };

    getRect = () => JSON.parse(this.state.stage).children[0].children[1].attrs;

    handleRectInput = (e) => {
        const json = JSON.parse(this.state.stage);
        const rect = this.getRect();
        rect[e.target.name] = e.target.value;
        json.children[0].children[1].attrs = rect;
        this.setState({ stage: JSON.stringify(json) });
    };

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
                                <option value="200">200X200</option>
                                <option value="300">300X300</option>
                                <option value="400">400X400</option>
                                <option value="500">500X500</option>
                            </select>
                        </div>
                        <div>
                            {Object.keys(this.getRect()).map((key, index) => (
                                <div className="form-group d-flex justify-content-between">
                                    <label className="mr-2">{key}</label>
                                    <div>
                                        {key === "fill" || key === "stroke" ? (
                                            <input
                                                name={key}
                                                className="form-control form-control-sm"
                                                type="text"
                                                value={this.getRect()[key]}
                                                onChange={this.handleRectInput}
                                            />
                                        ) : (
                                            <input
                                                name={key}
                                                className="form-control form-control-sm"
                                                type="number"
                                                value={this.getRect()[key]}
                                                onChange={this.handleRectInput}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex w-100 h-100 bg-secondary border justify-content-center align-items-center">
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
