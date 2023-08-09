import { Stage, Layer, Image } from "react-konva";
import { useRef, useState } from "react";
import useImage from "use-image";
import CustomText from "./customText";
import AddSticker from "./addSticker";
import CustomImage from "./customImage";
import DownloadToImage from "./download";
import digCam from "/assets/digCam.jpg";
import CONFIG from "../const/config.const";

const DigitalCam = ({ width, height }) => {
  const [image] = useImage(digCam);

  return <Image image={image} width={width} height={height} />;
};

const CanvasEditorUsingKonva = () => {
  const stageRef = useRef();
  const [textFields, setTextFields] = useState([]);
  const [stickers, setStickers] = useState([]);

  const addNewText = () => {
    setTextFields((prevArr) => [...prevArr, prevArr.length + 1]);
  };

  const addNewSticker = (stickerUrl) => {
    setStickers((prevArr) => [...prevArr, { stickerUrl }]);
  };

  const deleteText = (id) => {
    const newArr = [...textFields];
    newArr[newArr.indexOf(id)] = null;
    setTextFields(newArr);
  };

  const deleteSticker = (id) => {
    const newArr = [...stickers];
    newArr[newArr.indexOf(id)] = null;
    setStickers(newArr);
  };

  return (
    <div className="w-full md:w-max mx-auto">
      <Stage
        ref={stageRef}
        width={CONFIG.EDITOR_WIDTH}
        height={CONFIG.EDITOR_HEIGHT}
        className="bg-gray-200 mx-auto w-full md:w-max"
      >
        <Layer>
          <DigitalCam width={500} height={500} />

          {textFields.length > 0 &&
            textFields.map((tf, i) => {
              if (tf) {
                return (
                  <CustomText
                    id={tf}
                    key={i}
                    stageRef={stageRef}
                    deleteText={deleteText}
                  />
                );
              } else {
                return null;
              }
            })}

          {stickers.length > 0 &&
            stickers.map((sticker, i) => {
              if (sticker) {
                return (
                  <CustomImage
                    id={sticker}
                    key={i}
                    imageUrl={sticker.stickerUrl}
                    deleteSticker={deleteSticker}
                  />
                );
              } else {
                return null;
              }
            })}
        </Layer>
      </Stage>

      <div className="w-[500px] mx-auto mt-5 flex gap-3">
        <div className="p-2 rounded-lg bg-blue-300">
          <button onClick={addNewText}>Add text</button>
        </div>
        <div className="p-2 rounded-lg bg-yellow-300">
          <AddSticker addNewSticker={addNewSticker} />
        </div>
        <div className=" bg-green-300">
          <DownloadToImage node={stageRef} />
        </div>
      </div>
    </div>
  );
};

export default CanvasEditorUsingKonva;
