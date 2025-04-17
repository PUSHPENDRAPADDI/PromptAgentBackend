import React, { useState, useEffect } from 'react';
import TerminalComponent from './TerminalComponent';

const ResizableTerminalFromTop = () => {
  const [height, setHeight] = useState(130);
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = () => {
    setIsDragging(true);
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight > 100 && newHeight < window.innerHeight - 100) {
        setHeight(newHeight);
      }
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '13vw',
      right: '17vw',
      borderRadius: '10px',
      backgroundColor: '#fff',
      zIndex: "10000"
    }}>
      <div
        style={{
          height: height,
          borderBottom: '2px solid #ccc',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          onMouseDown={onMouseDown}
          style={{
            width: '100%',
            height: `${height}px`,
            backgroundColor: '#fff',
            borderRadius: '10px 10px 0px 0px',
            color: 'black',
            cursor: 'ns-resize',
            overflowY: 'scroll',
            position: 'relative',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
          <TerminalComponent />
        </div>
      </div>
    </div >
  );
};

export default ResizableTerminalFromTop;
