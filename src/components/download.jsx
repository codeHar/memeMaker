const DownloadToImage = ({ node }) => {

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExport = () => {
    const uri = node?.current?.toDataURL();
    downloadURI(uri, "stage.png");

  };

  return (
    <button
      className="p-2 rounded-lg border border-gray-400"
      onClick={handleExport}
    >
      Image Download Karlo
    </button>
  );
};

export default DownloadToImage;
