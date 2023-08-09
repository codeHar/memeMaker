const ImgUpload = ({ setSticker }) => {
  const handleImage = (e) => {
    if (e.target.files[0]) {
      const imgUrl= window.URL.createObjectURL(e.target.files[0])
      setSticker(imgUrl);
    }
  };

  return (
    <div>
      Upload Image
      <input type="file" onChange={(e) => handleImage(e)}></input>
    </div>
  );
};

export default ImgUpload;
