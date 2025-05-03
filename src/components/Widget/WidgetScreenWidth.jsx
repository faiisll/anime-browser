import React, { useEffect, useState } from 'react'

export default function WidgetScreenWidht() {
    // State to store the current screen width
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to update screen width on resize
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  // useEffect to add the resize event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getTailwindBreakpoint = (width) => {
    if (width >= 1536) return '2xl';
    if (width >= 1280) return 'xl';
    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 640) return 'sm';
    return 'xs'; // No official 'xs' breakpoint in Tailwind, but can be used for mobile
  };
  return (
    <div className='fixed bottom-0 left-0 bg-white shadow-xl p-2' style={{zIndex: "9999999"}}>
        <span>Width: {screenWidth}px ({getTailwindBreakpoint(screenWidth)})</span>
    </div>
  )
}
