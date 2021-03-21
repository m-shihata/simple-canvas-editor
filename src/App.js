import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { render } from 'react-dom';
import Konva from "konva";
import { Stage, Layer, Rect, Text, Circle, Line, Image } from "react-konva";

import URLImage from "./components/url-image";
import CanvasToBMP from "./vanilla/canvas-to-bmp";
import Jimp from "jimp/es";

import "./App.css";

// https://konvajs.org/
// https://konvajs.org/docs/react/Intro.html

// https://www.npmjs.com/package/jimp

// ctx.drawImage(img, 0, 0);
// var imgData = ctx.getImageData(x, y, width, height).data;
// returns array of RGBA

// Method 2: Failed
// uri = stageRef.current.toDataURL()
// Jimp.read(uri, 'base64')
// .then(image => {
//     uri = image.write('screen.bmp');
//     console.log(uri)
// })
// .catch(err => {
//     console.log(err)
// });

// Mehod 1 : Failed

// var ctx = canvas.getContext('2d');
// var imgData = ctx.getImageData(20, 20, 100, 100).data;
// uri = CanvasToBMP.toDataURL(canvas);

////////

// YOU HAVE TO CREATE LAYER TO BE YOUR TEMPLATE AND ADD TO THE STAGE SO WE DON'T LOSE REF

////////

function App() {
    const stageRef = React.useRef(null);

    var [canvas, setCanvas] = useState({
        groups: [],
        shapes: [{ shape: "rect", x: 0 }],
    });

    function exportScreenAs(extention, filename) {
        const stage = stageRef.current;
        let uri = null;
        if (extention === "png") {
            uri = stage.toDataURL();
            filename += ".png";
        } else if (extention === "bmp") {
            var canvas = document.createElement("canvas");
            uri = CanvasToBMP.toDataURL(canvas);
            console.log(uri);
            filename += ".bmp";
        }
        var a = document.createElement("a");
        a.href = uri;
        a.setAttribute("download", filename);
        a.click();
    }

    function exportTemplateAsJSON() {
        const stage = stageRef.current;
        const json = stage.toJSON();
        const uri = URL.createObjectURL(
            new Blob([JSON.stringify(json, null, 2)], {
                type: "text/plain",
            })
        );
        console.log(uri);
        const filename = "template.json";
        var a = document.createElement("a");
        a.href = uri;
        a.setAttribute("download", filename);
        a.click();
    }

    function importTemplate() {
        var json = "{\"attrs\":{\"width\":500,\"height\":500},\"className\":\"Stage\",\"children\":[{\"attrs\":{},\"className\":\"Layer\",\"children\":[{\"attrs\":{\"text\":\"Some text on canvas\",\"fontSize\":15,\"fill\":\"black\"},\"className\":\"Text\"},{\"attrs\":{\"width\":500,\"height\":500,\"fill\":\"white\",\"stroke\":\"back\",\"strokeWidth\":0.1},\"className\":\"Rect\"},{\"attrs\":{\"x\":20,\"y\":50,\"width\":100,\"height\":100,\"fill\":\"red\"},\"className\":\"Rect\"},{\"attrs\":{\"x\":200,\"y\":100,\"radius\":50,\"fill\":\"black\",\"stroke\":\"red\",\"strokeWidth\":5},\"className\":\"Circle\"},{\"attrs\":{\"x\":20,\"y\":200,\"points\":[0,0,100,0,100,100],\"closed\":true,\"stroke\":\"black\",\"fill\":\"red\"},\"className\":\"Line\"}]}]}"
        var layer = Konva.Node.create(json, 'container');
        newStage = AddExtraProps(Stage, {ref:stageRef})
        
    }

    return (
        
        <div className="d-flex flex-column align-items-center mt-4">
            <div className="my-4 d-flex flex-column">
                <div className="d-flex">
                    <button
                        className="btn btn-sm btn-secondary mr-2"
                        onClick={() => exportTemplateAsJSON()}
                    >
                        Export Template(.json)
                    </button>
                    <button
                        className="btn btn-sm btn-secondary mr-2"
                        onClick={() => importTemplate()}
                    >
                        Import Template
                    </button>
                </div>
                <div className="mt-4">
                    <button
                        className="btn btn-sm btn-primary mr-2"
                        onClick={() => exportScreenAs("png", "screen")}
                    >
                        Export(PNG)
                    </button>
                    <button
                        className="btm btm-sm btn-primary mr-2"
                        onClick={() => exportScreenAs("bmp", "screen")}
                    >
                        Export (BMP)
                    </button>
                </div>
            </div>
            <div id="container"></div>
        </div>
    );
}

export default App;
