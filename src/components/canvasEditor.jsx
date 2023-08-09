import { useCallback, useEffect, useRef, useState } from "react";
import mountEverest from "/assets/mt.jpg";
import ImgUpload from "./imgUpload";
import DownloadToImage from "./download";

class Sticker {
  constructor(imageUrl) {
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.imageUrl = imageUrl;
    this.isSelected = false;
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }

  setIsSelected(value) {
    this.isSelected = value;
  }
}

const CanvasEditor = () => {
  const editorContainer = useRef(null);
  const imgRef = useRef();
  const stickerRef = useRef();
  const [stickers, setStickers] = useState([]);
  const requestRef = useRef();
  const [refresh, setRefresh] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const addNewSticker = (imgUrl) => {
    const st = new Sticker(imgUrl);
    setStickers((prevArr) => [...prevArr, st]);
  };

  // const draw = useCallback(() => {
  //   var ctx = canvas.current.getContext("2d");
  //   const img = imgRef.current;
  //   ctx.drawImage(img, 0, 0, 500, 500);

  //   if (sticker) {
  //     sticker.update(sticker.x + 0.1, sticker.y + 0.1);
  //     const st = stickerRef.current;
  //     console.log({ st });
  //     ctx.drawImage(st, sticker.x, sticker.y, sticker.width, sticker.height);
  //     console.log("sticker drawn");
  //   }

  //   requestAnimationFrame(draw);
  // }, [sticker]);

  const dragItem = useCallback(
    (e) => {
      if (stickers.length > 0) {
        console.log("adsadasd");
        console.log(
          stickers.find((st) => st.isSelected),
          "is anything selcted"
        );
        if (stickers.find((st) => st.isSelected)) {
          console.log("drag event", e);
          let x = e.pageX - e.currentTarget.offsetLeft - 50;
          let y = e.pageY - e.currentTarget.offsetTop - 50;
          if (x > 400) x = 400;
          if (x < 0) x = 0;
          if (y > 400) y = 400;
          if (y < 0) y = 0;

          console.log({ x, y });
          refreshData();
          stickers[0].update(x, y);
          console.log("sticker", stickers[0]);
        }
      }
    },
    [stickers]
  );

  const refreshData = () => {
    setRefresh((prevValue) => !prevValue);
  };

  useEffect(() => {
    const editorComp = editorContainer.current;

    editorComp.style.backgroundImage = `url('${mountEverest}')`;
    editorComp.style.backgroundRepeat = "no-repeat";
    editorComp.style.backgroundSize = "cover";

    const mouseMove = (e) => {
      console.log("Mouse event", e);
      if (isDragging) dragItem(e);
    };

    const setDragTrue = (e) => {
      setIsDragging(true);
    };

    const setDragFalse = (e) => {
      stickers.forEach(st=>st.isSelected=false)
      setIsDragging(false);
    };

    editorComp.addEventListener("mousemove", mouseMove);

    editorComp.addEventListener("mousedown", setDragTrue);

    editorComp.addEventListener("mouseup", setDragFalse);

    return () => {
      editorComp.removeEventListener("mousedown",setDragTrue);
      editorComp.removeEventListener("mousemove",mouseMove);
      editorComp.removeEventListener("mouseup",setDragFalse);
    };
  }, [dragItem, isDragging]);

  return (
    <div>
      <div
        ref={editorContainer}
        className="w-[500px] h-[500px] mx-auto relative"
      >
        {/* <canvas
        ref={canvas}
        width="500"
        height="500"
        className="mx-auto border-3 border-gray-600"
      ></canvas> */}
        <img ref={imgRef} src={mountEverest} hidden></img>
        {/* {sticker && (
        <img
          ref={stickerRef}
          src={sticker.imageUrl}
          className="z-10"
          hidden
        ></img>
      )} */}
        {stickers.length > 0 &&
          stickers.map((st, id) => (
            <img
              key={id}
              src={st.imageUrl}
              className={`absolute selectDisabe ${st.isSelected ? 'border-4 border-blue-400' : ''}`}
              onClick={() => {
                console.log("selected");
                st.setIsSelected(true);
                refreshData();
              }}
              style={{
                left: `${st.x}px`,
                top: `${st.y}px`,
                width: `${st.width}px`,
                height: `${st.height}px`,
              }}
            />
          ))}
      </div>
      <ImgUpload setSticker={addNewSticker} />
      <DownloadToImage node={editorContainer}/>

    </div>
  );
};

export default CanvasEditor;
