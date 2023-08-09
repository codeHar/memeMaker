import { useEffect, useRef, useState } from "react";
import { Text, Transformer } from "react-konva";
import Dustbin from "./dustbin";
import { SketchPicker } from "react-color";
import { Html } from "react-konva-utils";

const CustomText = ({ stageRef, id, deleteText }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#fff");
  const textTrRef = useRef();
  const textRef = useRef();
  const textAreaRef = useRef();

  const handleText = (e) => {
    let stage = stageRef.current;
    let textNode = e.target;
    let textPosition = textNode.absolutePosition();
    textNode.hide();

    let areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y,
    };

    // create textarea and style it
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textAreaRef.current = textarea;

    textarea.value = textNode.text();
    textarea.style.position = "absolute";
    textarea.style.top = areaPosition.y + "px";
    textarea.style.left = areaPosition.x + "px";
    textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
    textarea.style.height =
      textNode.height() - textNode.padding() * 2 + 5 + "px";
    textarea.style.fontSize = textNode.fontSize() + "px";
    textarea.style.border = "none";
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.overflow = "hidden";
    textarea.style.background = "none";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = "left top";
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    let rotation = textNode.rotation();
    var transform = "";
    if (rotation) {
      transform += "rotateZ(" + rotation + "deg)";
    }

    var px = 0;
    // also we need to slightly move textarea on firefox
    // because it jumps a bit
    var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize() / 20);
    }
    transform += "translateY(-" + px + "px)";

    textarea.style.transform = transform;

    // reset height
    textarea.style.height = "auto";
    // after browsers resized it we can set actual value
    textarea.style.height = textarea.scrollHeight + 3 + "px";

    textarea.focus();

    function removeTextarea() {
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener("click", handleOutsideClick);
      textNode.show();
      // textTrRef.current.show();
      // textTrRef.current.forceUpdate();
    }

    function setTextareaWidth(newWidth) {
      if (!newWidth) {
        // set width for placeholder
        newWidth = textNode.placeholder.length * textNode.fontSize();
      }
      // some extra fixes on different browsers
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth);
      }

      var isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
      if (isEdge) {
        newWidth += 1;
      }
      textarea.style.width = newWidth + "px";
    }

    textarea.addEventListener("keydown", function (e) {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        textNode.text(textarea.value);
        removeTextarea();
      }
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        removeTextarea();
      }
    });

    textarea.addEventListener("keydown", function (e) {
      let scale = textNode.getAbsoluteScale().x;
      setTextareaWidth(textNode.width() * scale);
      textarea.style.height = "auto";
      textarea.style.height =
        textarea.scrollHeight + textNode.fontSize() + "px";
    });

    function handleOutsideClick(e) {
      console.log(e.target, "eTarget");
      console.log(getComputedStyle(e.target).zIndex, "Compputed style");
      if (
        e.target.tagName === "CANVAS" ||
        getComputedStyle(e.target).zIndex == 0
      ) {
        setIsSelected(false);

        textNode.text(textarea.value);
        removeTextarea();
      }
    }
    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });
  };

  const getPositionForDusbin = () => {
    const textNode = textRef.current;
    const pos = {
      x: textNode.x() + textNode.width() - 30,
      y: textNode.y() - 40,
    };
    return pos;
  };

  const deleteSomething = () => {
    deleteText(id);
  };

  useEffect(() => {
    if (isSelected) {
      textTrRef.current.nodes([textRef.current]);
      textTrRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    if (textAreaRef?.current) {
      textAreaRef.current.style.color = selectedColor;
    }
  }, [selectedColor]);

  return (
    <>
      <Text
        ref={textRef}
        fontSize={30}
        draggable
        fill={selectedColor}
        
        onDragMove={(e) => {
          // const textNode = textRef.current;
          // let maxX = 500 - textNode.textWidth;
          // let maxY = 500 - textNode.textHeight;
          // textNode.y(Math.max(textNode.y(), 0));
          // textNode.y(Math.min(textNode.y(), maxY));
          // textNode.x(Math.max(textNode.x(), 0));
          // textNode.x(Math.min(textNode.x(), maxX));
        }}
        text="Enter a text"
        onClick={(e) => {
          setIsSelected(true);
          setTimeout(() => {
            handleText(e);
          }, 200);
        }}
        // onDblClick={(e) => {
        //   handleText(e);
        // }}

        onTransform={() => {
          const textNode = textRef.current;
          textNode.setAttrs({
            width: Math.max(textNode.width() * textNode.scaleX(), 20),
            scaleX: 1,
            scaleY: 1,
          });
        }}
      />
      {isSelected && (
        <>
          <Transformer
            ref={textTrRef}
            enabledAnchors={["middle-left", "middle-right"]}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 30 || newBox.height < 30) {
                return oldBox;
              }
              return newBox;
            }}
          />
          <Dustbin
            pos={getPositionForDusbin()}
            deleteSomething={deleteSomething}
          />
          <Html
            divProps={{
              style: {
                userSelect:"none",
                zIndex:0,
                top:"-400px",
              },
            }}
          >
            <SketchPicker
              color={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.hex);
              }}
              className="relative left-[500px] top-[400px]"
            />
          </Html>
        </>
      )}
    </>
  );
};

export default CustomText;
