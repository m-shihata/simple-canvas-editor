import React, { useReducer, useState, } from "react";
import Konva from "konva";

import { exportPNG, exportBMP } from "./helpers/helpers"
// import { Stage, Layer, Rect, Text, Circle, Line, Image, } from "react-konva";
// import { StageWithRef, URLImage, } from "./components/konva-customized";
// import Jimp from "jimp/es";
import "./App.css";



function App() {
    const stageRef = React.createRef(null);

    var [json, setJson] = useState("{\"attrs\":{\"width\":400,\"height\":400},\"className\":\"Stage\",\"children\":[{\"attrs\":{},\"className\":\"Layer\",\"children\":[{\"attrs\":{\"text\":\"Some text on canvas\",\"fontSize\":15,\"fill\":\"black\"},\"className\":\"Text\"},{\"attrs\":{\"width\":500,\"height\":500,\"fill\":\"white\",\"stroke\":\"back\",\"strokeWidth\":0.1},\"className\":\"Rect\"},{\"attrs\":{\"x\":20,\"y\":50,\"width\":100,\"height\":100,\"fill\":\"red\"},\"className\":\"Rect\"},{\"attrs\":{\"x\":200,\"y\":100,\"radius\":50,\"fill\":\"white\",\"stroke\":\"red\",\"strokeWidth\":5},\"className\":\"Circle\"},{\"attrs\":{\"x\":20,\"y\":200,\"points\":[0,0,100,0,100,100],\"closed\":true,\"stroke\":\"black\",\"fill\":\"red\"},\"className\":\"Line\"}]}]}")

    var [stage, createStage] = useReducer((stage, newStage) =>
        Konva.Node.create(newStage, 'container', stageRef)
    , null);

    var [template, setTemplate] = useReducer((template, newTemplate) => {
        createStage(newTemplate)
        return newTemplate;
    }, null);


    return (
        
        <div className="d-flex flex-column align-items-center mt-4">
            <div className="my-4 w-75 d-flex flex-column">

                <textarea rows={5} value={json} onChange={(e) => setJson(e.target.value)} ></textarea>
                <div className="d-flex mt-2">
                    {/* <button
                        className="btn btn-sm btn-secondary mr-2"
                        onClick={exportTemplateAsJSON}
                    >
                        Export Template(.json)
                    </button> */}
                    <button
                        className="btn btn-sm btn-secondary mr-2"
                        onClick={() => setTemplate(json)}
                    >
                        Load Template
                    </button>
                
                    <button
                        className="btn btn-sm btn-primary mr-2"
                        onClick={exportPNG}
                    >
                        Export(PNG)
                    </button>
                    <button
                        className="btm btm-sm btn-primary mr-2"
                        onClick={exportBMP}
                    >
                        Export (BMP)
                    </button>
                </div>
            </div>
            <div id="container" className="shadow-sm"></div>
        </div>
    );
}

export default App;
