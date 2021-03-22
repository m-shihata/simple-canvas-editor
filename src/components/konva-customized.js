import React from 'react';
import useImage from 'use-image';
import { Stage, Image } from "react-konva";


export const StageWithRef = React.forwardRef((props, ref) => (
    <Stage ref={ref} {...props.attrs}>
      {props.children}
    </Stage>
));


export const URLImage = (props) => {
    const [image] = useImage(props.image);
    return (
        <Image 
            image={image}
            x={props.x}
            y={props.y}
        />
    );
};



