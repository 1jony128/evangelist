import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions({width: 100,
    height: 100}));

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    function handleOrientation(e){
      // eslint-disable-next-line no-unused-expressions
      window.screen.orientation.type 
    }
    window.screen.orientation.addEventListener('change', handleOrientation)
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}