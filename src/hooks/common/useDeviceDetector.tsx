import { useState, useEffect } from "react";

const useDeviceDetector = (maxWidth = 768) => {
  const [isMobile, setIsMobile] = useState(false); // changed from false to true temporarily
  const [aspectRatio, setAspectRatio] = useState({});

  const handleResize = () => {
    if (typeof window !== "undefined") {
      const isMobileMediaQuery = window.matchMedia(
        `(max-width: ${maxWidth}px)`
      );
      setIsMobile(isMobileMediaQuery.matches);
      setAspectRatio({ width: window.innerWidth, height: window.innerHeight });
    }
  };

  useEffect(() => {
    handleResize(); // Initial setup

    const resizeListener = () => {
      handleResize();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", resizeListener);
    }

    return () => {
      // Clean up the listener when the component unmounts
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", resizeListener);
      }
    };
  }, []);

  return { isMobile, aspectRatio };
};

export default useDeviceDetector;
