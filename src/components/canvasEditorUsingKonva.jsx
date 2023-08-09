import { Stage, Layer, Image } from "react-konva";
import { useRef, useState } from "react";
import useImage from "use-image";
import CustomText from "./customText";
import AddImage from "./addImage";
import CustomImage from "./customImage";
import DownloadToImage from "./download";
import digCam from "/assets/digCam.jpg";
import CONFIG from "../const/config.const";
import CustomOverlay from "./customOverlay";

const CanvasEditorUsingKonva = () => {
  const stageRef = useRef();
  const [textFields, setTextFields] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [items, setItems] = useState([]);
  const [backgroundImgUrl, setBackgroundImgUrl] = useState(digCam);
  const [image] = useImage(backgroundImgUrl);
  const backgroundImg = (
    <Image
      image={image}
      width={CONFIG.EDITOR_WIDTH}
      height={CONFIG.EDITOR_HEIGHT}
    />
  );

  console.log("Items", items);

  const addNewText = () => {
    setItems((prevArr) => [
      ...prevArr,
      { id: prevArr.length + 1, type: "text" },
    ]);
  };

  const addNewSticker = (stickerUrl) => {
    setItems((prevArr) => [
      ...prevArr,
      { id: prevArr.length + 1, stickerUrl, type: "sticker" },
    ]);
  };

  const addNewOverlay = () => {
    setItems((prevArr) => [
      ...prevArr,
      { id: prevArr.length + 1, type: "overlay" },
    ]);
  };

  const deleteItem = (id) => {
    console.log("id", id);
    const newArr = [...items];
    const item = newArr.find((item) => item?.id === id);
    if (item) {
      newArr[newArr.indexOf(item)] = null;
      setItems(newArr);
    }
  };

  const changeBackground = (stickerUrl) => {
    if (stickerUrl) {
      setBackgroundImgUrl(stickerUrl);
    }
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
          {backgroundImg}

          {items.length > 0 &&
            items.map((item, i) => {
              if (!item) return null;
              if (item.type === "text") {
                return (
                  <CustomText
                    id={item.id}
                    key={i}
                    stageRef={stageRef}
                    deleteText={deleteItem}
                  />
                );
              } else if (item.type === "sticker") {
                return (
                  <CustomImage
                    id={item.id}
                    key={i}
                    imageUrl={item.stickerUrl}
                    deleteSticker={deleteItem}
                  />
                );
              } else if (item.type === "overlay") {
                return (
                  <CustomOverlay
                    id={item.id}
                    key={i}
                    deleteOverlay={deleteItem}
                  />
                );
              }
            })}

          {/* {textFields.length > 0 &&
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
            })} */}
        </Layer>
      </Stage>

      <div className="w-[500px] mx-auto mt-5 flex flex-wrap gap-3">
        <div className="p-2 rounded-lg bg-blue-300">
          <button onClick={addNewText}>Add text</button>
        </div>
        <div className="p-2 rounded-lg bg-yellow-300">
          <AddImage addImage={addNewSticker} btnTitle="Add Sticker" />
        </div>
        <div className="p-2 rounded-lg bg-red-300">
          <button onClick={addNewOverlay}>Add Overlay</button>
        </div>
        <div className="p-2 rounded-lg bg-green-300">
          <AddImage addImage={changeBackground} btnTitle="Change Background" />
        </div>
        <div className=" bg-orange-300">
          <DownloadToImage node={stageRef} />
        </div>
      </div>
    </div>
  );
};

export default CanvasEditorUsingKonva;
