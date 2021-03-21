function dummyStage() {
    return (
        <Stage width={500} height={500} ref={stageRef}>
            <Layer>
                <Text text="Some text on canvas" fontSize={15} />
                <Rect
                    x={0}
                    y={0}
                    width={500}
                    height={500}
                    fill="white"
                    stroke="back"
                    strokeWidth={0.1}
                />
                <Rect x={20} y={50} width={100} height={100} fill="red" />
                <Circle
                    x={200}
                    y={100}
                    radius={50}
                    fill="black"
                    stroke="red"
                    strokeWidth={5}
                />
                <Line
                    x={20}
                    y={200}
                    points={[0, 0, 100, 0, 100, 100]}
                    tension={0}
                    closed
                    stroke="black"
                />
                {/* <URLImage x={200} y={200} image='https://konvajs.org/assets/lion.png' /> */}
            </Layer>
        </Stage>
    );
}
