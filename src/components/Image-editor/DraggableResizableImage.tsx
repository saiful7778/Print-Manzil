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

  // Type guard to check if the event is a MouseEvent
  const isMouseEvent = (
    e: React.MouseEvent | React.TouchEvent
  ): e is React.MouseEvent => {
    return "clientX" in e && "clientY" in e;
  };

  // Start dragging (Mouse or Touch)
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = isMouseEvent(e) ? e.clientX : e.touches[0].clientX;
    const clientY = isMouseEvent(e) ? e.clientY : e.touches[0].clientY;

    isDragging.current = true;
    dragStart.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };

  // Handle dragging (Mouse or Touch)
  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging.current) {
      const clientX = isMouseEvent(e) ? e.clientX : e.touches[0].clientX;
      const clientY = isMouseEvent(e) ? e.clientY : e.touches[0].clientY;

      onPositionChange(
        clientX - dragStart.current.x,
        clientY - dragStart.current.y
      );
    }
  };

  // Stop dragging
  const handleDragStop = () => {
    isDragging.current = false;
  };

  // Start resizing (Mouse or Touch)
  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();

    const clientX = isMouseEvent(e) ? e.clientX : e.touches[0].clientX;
    const clientY = isMouseEvent(e) ? e.clientY : e.touches[0].clientY;

    isResizing.current = true;
    resizeStart.current = {
      width: size.width,
      height: size.height,
      x: clientX,
      y: clientY,
    };
  };

  // Handle resizing (Mouse or Touch)
  const handleResize = (e: React.MouseEvent | React.TouchEvent) => {
    if (isResizing.current) {
      const clientX = isMouseEvent(e) ? e.clientX : e.touches[0].clientX;
      const clientY = isMouseEvent(e) ? e.clientY : e.touches[0].clientY;

      const deltaX = clientX - resizeStart.current.x;
      const deltaY = clientY - resizeStart.current.y;

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
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragStop}
      onTouchCancel={handleDragStop}
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
        onTouchStart={handleResizeStart}
        onTouchMove={handleResize}
        onTouchEnd={handleResizeStop}
        onTouchCancel={handleResizeStop}
      />
    </div>
  );
};

export default DraggableResizableImage;
