import { useEffect, useRef, useState } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";
import demoImage from "/assets/itachi2.jpg";
import Dustbin from "./dustbin";

const CustomImage = ({ imageUrl, id, deleteSticker }) => {
  const [image] = useImage(imageUrl ? imageUrl : demoImage);
  const imgRef = useRef(null);
  const trRef = useRef();
  const [isSelected, setIsSelected] = useState(false);

  const deleteSomething = () => {
    deleteSticker(id);
  };

  const getPositionForDusbin = () => {
    const imgNode = imgRef.current;
    const pos = {
      x: imgNode.x() + imgNode.width() - 30,
      y: imgNode.y() - 40,
    };
    return pos;
  };

  useEffect(() => {
    // function handleOutsideClick(e) {
    //   console.log("eTarget",e.target)
    //   if (e.target !== imgRef.current) {
    //       setIsSelected(false);
    //   }
    // }
    // setTimeout(() => {
    //   window.addEventListener("click", handleOutsideClick);
    // });

    if (isSelected) {
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer().batchDraw();
    }

    // return () => {
    //   window.removeEventListener("click", handleOutsideClick);
    // };
  }, [isSelected]);

  return (
    <>
      <Image
        ref={imgRef}
        image={image}
        width={100}
        height={100}
        draggable={isSelected ? false : true}
        onClick={() => setIsSelected((prevValue) => !prevValue)}
      />
      {isSelected && (
        <>
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
          <Dustbin
            pos={getPositionForDusbin()}
            deleteSomething={deleteSomething}
          />
        </>
      )}
    </>
  );
};

export default CustomImage;
