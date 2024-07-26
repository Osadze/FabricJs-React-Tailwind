import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./index.css";
import ImageUpload from "./components/ImageUpload";
import DraggableItem from "./components/Draggable/DraggableItem";

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const captureRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleDownload = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "combined-image.png";
      link.click();
    }
  };

  return (
    <div className="App w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <ImageUpload onImageUpload={handleImageUpload} />
      <div ref={captureRef} className="relative">
        {imageUrl && (
          <div className=" relative">
            <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
            <DraggableItem />
          </div>
        )}
      </div>
      <button
        onClick={handleDownload}
        className=" p-2 bg-blue-500 text-white rounded"
      >
        Download Image
      </button>
    </div>
  );
};

export default App;
