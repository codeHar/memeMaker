import { useRef } from "react";

const AddImage = ({ addImage,btnTitle='Add Image' }) => {
  const fileUploadRef = useRef();

  const handleFile = (e) => {
    const sticker = e?.target?.files[0];
    if (sticker) {
      const stickerUrl = window.URL.createObjectURL(sticker);
      addImage(stickerUrl);
    }
  };

  return (
    <>
      <button onClick={() => fileUploadRef.current.click()}>{btnTitle}</button>
      <input
        type="file"
        ref={fileUploadRef}
        id="fileInput"
        onChange={(e) => handleFile(e)}
        style={{ display: "none" }}
      />
    </>
  );
};

export default AddImage;
