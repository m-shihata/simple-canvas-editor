export default function defaultTemplate() {
    return {
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
                    },
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
}
