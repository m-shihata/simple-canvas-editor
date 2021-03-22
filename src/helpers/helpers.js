import CanvasToBMP from "./canvas-to-bmp";


export const saveAs = (url, filename, ext) => {
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", `${filename}.${ext}`);
    a.click();
}

export function exportTJSON() {
    // stage.toJSON()
    // const json = stageRef.current.toJSON();

    // const json = stage.current.toJSON();
    // const uri = URL.createObjectURL(
    //     new Blob([JSON.stringify(json, null, 2)], {type: "text/plain",})
    // );
    // console.log(uri);
    // const a = document.createElement("a");
    // a.href = uri;
    // a.setAttribute("download", "template.json");
    // a.click();
    return false;
}

export function exportPNG() {
    var canvas = document.querySelector('canvas');
    canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        saveAs(url, 'screen', 'png') 
    });
}

export function exportBMP() {
    var canvas = document.querySelector('canvas');
    var uri = CanvasToBMP.toDataURL(canvas)
    saveAs(uri, 'screen', 'bmp');
}