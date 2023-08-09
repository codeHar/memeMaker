import { useRef } from "react";

const AddSticker = ({ addNewSticker }) => {
  const fileUploadRef = useRef();

  const handleFile = (e) => {
    const sticker = e?.target?.files[0];
    if (sticker) {
      const stickerUrl = window.URL.createObjectURL(sticker);
      addNewSticker(stickerUrl);
    }
  };

  return (
    <>
      <button onClick={() => fileUploadRef.current.click()}>Add Sticker</button>
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

export default AddSticker;
