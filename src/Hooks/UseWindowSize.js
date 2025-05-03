import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint(window.innerWidth));

  // Function to determine the Tailwind breakpoint
  const getBreakpoint = (width) => {
    if (width >= 1536) return '2xl';
    if (width >= 1280) return 'xl';
    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 640) return 'sm';
    return 'xs'; // No official 'xs' breakpoint in Tailwind, but can be used for mobile
  };

  // Update the breakpoint when the window is resized
  const handleResize = () => {
    setBreakpoint(getBreakpoint(window.innerWidth));
  };

  useEffect(() => {
    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
};

export default useWindowSize;