import { useRef } from "react";

interface DraggableResizableImageProps {
  src: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onPositionChange: (x: number, y: number) => void;
  onSizeChange: (width: number, height: number) => void;
}
const DraggableResizableImage: React.FC<DraggableResizableImageProps> = ({
  src,
  position,
  size,
  onPositionChange,
  onSizeChange,
}) => {
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ width: 0, height: 0, x: 0, y: 0 });

  // Start dragging
  const handleDragStart = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Handle dragging
  const handleDrag = (e: React.MouseEvent) => {
    if (isDragging.current) {
      onPositionChange(
        e.clientX - dragStart.current.x,
        e.clientY - dragStart.current.y
      );
    }
  };

  // Stop dragging
  const handleDragStop = () => {
    isDragging.current = false;
  };

  // Start resizing
  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    isResizing.current = true;
    resizeStart.current = {
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY,
    };
  };

  // Handle resizing
  const handleResize = (e: React.MouseEvent) => {
    if (isResizing.current) {
      const deltaX = e.clientX - resizeStart.current.x;
      const deltaY = e.clientY - resizeStart.current.y;

      onSizeChange(
        Math.max(50, resizeStart.current.width + deltaX),
        Math.max(50, resizeStart.current.height + deltaY)
      );
    }
  };

  // Stop resizing
  const handleResizeStop = () => {
    isResizing.current = false;
  };

  return (
    <div
      className="absolute select-none"
      style={{
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        cursor: "move",
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragStop}
      onMouseLeave={handleDragStop}
    >
      <img
        src={src}
        alt="Uploaded"
        className="w-full h-full object-contain pointer-events-none"
      />
      <div
        className="w-3 h-3 bg-blue-500 absolute bottom-0 right-0 cursor-se-resize"
        onMouseDown={handleResizeStart}
        onMouseMove={handleResize}
        onMouseUp={handleResizeStop}
        onMouseLeave={handleResizeStop}
      />
    </div>
  );
};

export default DraggableResizableImage;
