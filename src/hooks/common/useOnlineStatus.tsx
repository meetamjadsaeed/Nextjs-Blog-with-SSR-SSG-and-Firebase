import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const useOnlineStatus = () => {
  // const dispatch = useDispatch();

  const [isOnline, setIsOnline] = useState(true); // Assume online by default

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    try {
      if (typeof navigator !== "undefined" && "onLine" in navigator) {
        setIsOnline(navigator.onLine);
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
      } else {
        // In case 'navigator' or 'onLine' property is not available
        console.error(
          "Unable to determine online status. 'navigator' or 'onLine' property is not supported."
        );
      }
    } catch (error) {
      console.error("An error occurred while checking online status:", error);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;
