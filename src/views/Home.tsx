import React, { useState, useEffect } from "react";
import * as fabric from "fabric";

const Home: React.FC = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    const canvasInstance = new fabric.Canvas("canvas");
    setCanvas(canvasInstance);


    return () => {
      canvasInstance.dispose();
    };
  }, []);

  const addImg = (
    e: React.FormEvent,
    url: string,
    canvi: fabric.Canvas | null
  ) => {
    e.preventDefault();
    if (!canvi) return;
    fabric.FabricImage.fromURL(url)
      .then((img) => {
        const fixedWidth = 150; 
        const fixedHeight = 150; 

        const scaleX = fixedWidth / img.width!;
        const scaleY = fixedHeight / img.height!;
        const scale = Math.min(scaleX, scaleY);

        img.set({
          left: 100,
          top: 100,
          scaleX: scale,
          scaleY: scale,
          hasControls: true,
          hasBorders: true,
        });
        canvi.add(img);
        canvi.renderAll();
      })
      .catch((err) => {
        console.error("Error loading image:", err);
      });
  };

  const handleBackgroundUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    canvi: fabric.Canvas | null
  ) => {
    if (!canvi) return;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        fabric.FabricImage.fromURL(dataUrl)
          .then((img) => {
            const canvasWidth = canvi.width!;
            const canvasHeight = canvi.height!;
            const imgWidth = img.width!;
            const imgHeight = img.height!;

         
            const scaleX = canvasWidth / imgWidth;
            const scaleY = canvasHeight / imgHeight;
            const scale = Math.min(scaleX, scaleY);

   
            img.set({
              scaleX: scale,
              scaleY: scale,
              left: (canvasWidth - imgWidth * scale) / 2,
              top: (canvasHeight - imgHeight * scale) / 2,
              originX: "left",
              originY: "top",
              selectable: false,
              evented: false,
              hasControls: false,
            });

            canvi.add(img);
            canvi.renderAll();
          })
          .catch((err) => {
            console.error("Error setting background image:", err);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadCanvasAsImage = (canvi: fabric.Canvas | null) => {
    if (!canvi) return;
    const dataURL = canvi.toDataURL({
      format: "png",
      quality: 1.0,
      multiplier: 1,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas.png";
    link.click();
  };

  const removeSelectedImg = (canvi: fabric.Canvas | null) => {
    if (canvi) {
      const activeObject = canvi.getActiveObject();
      if (activeObject && activeObject.type === "image") {
        canvi.remove(activeObject);
        canvi.renderAll();
      }
    }
  };

  const clearCanvas = (canvi: fabric.Canvas | null) => {
    if (canvi) {
      canvi.clear();
      canvi.backgroundImage = undefined;
      canvi.renderAll();
    }
  };

  const imageUrls = [
    { label: "sunglasses", url: "/sunglasses.png" },
    { label: "hat", url: "/hat.png" },
    { label: "cigarette", url: "/cigarette.png" },
  ];

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex justify-between gap-2 my-5">
        {imageUrls.map((image) => (
          <img
            key={image.url}
            onClick={(e) => addImg(e as any, image.url, canvas)}
            src={image.url}
            className="w-[100px] cursor-pointer border-[2px] border-[#000]"
          />
        ))}
        <img
          onClick={() => removeSelectedImg(canvas)}
          src="/icons/delete.svg"
          className="w-[50px] cursor-pointer"
        />
        <img
          onClick={() => clearCanvas(canvas)}
          src="/icons/restart.svg"
          className="w-[40px] cursor-pointer"
        />
        <img
          onClick={() => downloadCanvasAsImage(canvas)}
          src="/icons/download.svg"
          className="w-[40px] cursor-pointer"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleBackgroundUpload(e, canvas)}
        className="absolute bottom-10"
      />
      <canvas id="canvas" width={500} height={300} />
    </div>
  );
};

export default Home;
