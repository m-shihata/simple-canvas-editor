import useImage from 'use-image';
import { Image } from "react-konva";

const URLImage = (props) => {
    const [image] = useImage(props.image);
    return (
        <Image 
            image={image}
            x={props.x}
            y={props.y}
        />
    );
};

export default URLImage