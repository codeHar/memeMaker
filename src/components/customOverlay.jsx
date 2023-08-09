import { Rect } from "react-konva";
import CONFIG from "../const/config.const";
import rgbHex from "rgb-hex";
import { useState } from "react";
import Dustbin from "./dustbin";
import { Html } from "react-konva-utils";
import { SketchPicker } from "react-color";

const CustomOverlay = ({ id, deleteOverlay }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    "#" + rgbHex(39, 140, 245, 0.17)
  );

  console.log("overlay", rgbHex(39, 140, 245, 0.17));

  const deleteSomething = () => {
    deleteOverlay(id);
  };

  return (
    <>
      <Rect
        x={0}
        y={0}
        width={CONFIG.EDITOR_WIDTH}
        height={CONFIG.EDITOR_HEIGHT}
        fill={selectedColor}
        shadowBlur={10}
        onClick={() => {
          setIsSelected((prevValue) => !prevValue);
        }}
      />

      {isSelected && (
        <>
          <Dustbin deleteSomething={deleteSomething} />

          <Html
            divProps={{
              style: {
                userSelect: "none",
                zIndex: 0,
                top: "-400px",
              },
            }}
          >
            <SketchPicker
              color={selectedColor}
              onChange={(e) => {
                setSelectedColor(
                  "#" + rgbHex(e.rgb.r, e.rgb.g, e.rgb.b, e.rgb.a)
                );
              }}
              className="relative left-[500px] top-[400px]"
            />
          </Html>
        </>
      )}
    </>
  );
};

export default CustomOverlay;
