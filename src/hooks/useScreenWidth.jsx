import { useState, useEffect } from 'react';

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize with current width

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenWidth;
};

export default useScreenWidth;
