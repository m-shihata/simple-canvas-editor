import React from 'react';
import useImage from 'use-image';
import { Image, } from "react-konva";


export const URLImage = (props) => {
    const [image] = useImage(props.image);
    return (
        <Image 
            image={image}
            x={props.x}
            y={props.y}
            scale={props.scale}
        />
    );
};



