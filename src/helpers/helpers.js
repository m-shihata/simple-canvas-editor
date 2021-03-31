import CanvasToBMP from "./canvas-to-bmp";

export const saveAs = (url, filename, ext) => {
  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", `${filename}.${ext}`);
  a.click();
};

export function exportJSON(json) {
  const uri = URL.createObjectURL(
    new Blob([JSON.stringify(JSON.parse(json), null, 2)], {
      type: "text/plain",
    })
  );
  const a = document.createElement("a");
  a.href = uri;
  a.setAttribute("download", "template.json");
  a.click();
  return false;
}

export function exportPNG() {
  // Every layer is a canvas in Konva
  var canvas = document.querySelectorAll("canvas");
  canvas[0].toBlob(function (blob) {
    var url = URL.createObjectURL(blob);
    saveAs(url, "screen", "png");
  });
}

export function exportBMP() {
  // Every layer is a canvas in Konva
  var canvas = document.querySelectorAll("canvas");
  var uri = CanvasToBMP.toDataURL(canvas[0]);
  saveAs(uri, "screen", "bmp");
}

export function titleCase(text) {
  let result = text.replace(/([A-Z])/g, " $1");
  let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}

export function arrayManualSort(arr, oldIndex, newIndex) {
  if (newIndex >= arr.length || newIndex < 0) return arr;
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
}

export function points(dist, angle) {
  let x = 0,
    y = 0;
  if (angle === 0 || angle === 360) {
    x = dist;
  } else if (angle === 90) {
    y = dist;
  } else if (angle === 180) {
    x = -1 * dist;
  } else if (angle === 279) {
    y = -1 * dist;
  } else {
    x = parseInt(dist * Math.cos((Math.PI / 180) * angle));
    y = parseInt(dist * Math.sin((Math.PI / 180) * angle));
  }
  return [0, 0, x, y];
}

export function fonts() {
  return [
    "Arial",
    "Arial Black",
    "Bahnschrift",
    "Calibri",
    "Cambria",
    "Cambria Math",
    "Candara",
    "Comic Sans MS",
    "Consolas",
    "Constantia",
    "Corbel",
    "Courier New",
    "Ebrima",
    "Franklin Gothic Medium",
    "Gabriola",
    "Gadugi",
    "Georgia",
    "HoloLens MDL2 Assets",
    "Impact",
    "Ink Free",
    "Javanese Text",
    "Leelawadee UI",
    "Lucida Console",
    "Lucida Sans Unicode",
    "Malgun Gothic",
    "Marlett",
    "Microsoft Himalaya",
    "Microsoft JhengHei",
    "Microsoft New Tai Lue",
    "Microsoft PhagsPa",
    "Microsoft Sans Serif",
    "Microsoft Tai Le",
    "Microsoft YaHei",
    "Microsoft Yi Baiti",
    "MingLiU-ExtB",
    "Mongolian Baiti",
    "MS Gothic",
    "MV Boli",
    "Myanmar Text",
    "Nirmala UI",
    "Palatino Linotype",
    "Segoe MDL2 Assets",
    "Segoe Print",
    "Segoe Script",
    "Segoe UI",
    "Segoe UI Historic",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "SimSun",
    "Sitka",
    "Sylfaen",
    "Symbol",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
    "Webdings",
    "Wingdings",
    "Yu Gothic",
  ];
}

export function colors() {
    return [
        "Black",
        "Red",
        "White"
    ]
}
