import { useState, useRef } from "react";
import ImageUpload from "./ImageUpload";
import DraggableResizableImage from "./DraggableResizableImage";
import tShirtMockUp from "@/assets/images/tShirt-mockup.png";
import { Button } from "../utilities/Button";

const ImageEditor: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePosition, setImagePosition] = useState({ x: 100, y: 100 });
  const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
  const editorRef = useRef<HTMLDivElement>(null);

  const exportImage = async () => {
    if (editorRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const editor = editorRef.current;
        const { width, height } = editor.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        // Draw T-Shirt background
        const tShirtImage = new Image();
        tShirtImage.src = tShirtMockUp;
        await new Promise((resolve) => {
          tShirtImage.onload = () => {
            ctx.drawImage(tShirtImage, 0, 0, width, height);
            resolve(null);
          };
        });

        if (uploadedImage) {
          const userImage = new Image();
          userImage.src = uploadedImage;
          await new Promise((resolve) => {
            userImage.onload = () => {
              ctx.drawImage(
                userImage,
                imagePosition.x,
                imagePosition.y,
                imageSize.width,
                imageSize.height
              );
              resolve(null);
            };
          });
        }
        
        const link = document.createElement("a");
        link.download = "tShirt_design.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    }
  };

  return (
    <div className="grid grid-cols-2 my-4 w-[70%] gap-4 mx-auto">
      <div
        ref={editorRef}
        className="relative w-full max-w-[500px] aspect-[0.85/1] bg-cover bg-center border border-gray-700"
        style={{ backgroundImage: `url('${tShirtMockUp}')` }}
      >
        {uploadedImage && (
          <DraggableResizableImage
            src={uploadedImage}
            position={imagePosition}
            size={imageSize}
            onPositionChange={(x, y) => setImagePosition({ x, y })}
            onSizeChange={(width, height) => setImageSize({ width, height })}
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        <ImageUpload onUpload={setUploadedImage} />
        <Button onClick={exportImage} className="py-2 px-4">
          Export Design
        </Button>
      </div>
    </div>
  );
};

export default ImageEditor;
