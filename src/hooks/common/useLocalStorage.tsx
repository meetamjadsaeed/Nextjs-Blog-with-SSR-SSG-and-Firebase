// import { useState, useMemo, useEffect } from "react";

// const useLocalStorage = (key: any, initialValue: any) => {
//   if (!key) {
//     throw new Error("useLocalStorage requires a 'key' parameter.");
//   }

//   const memoizedInitialValue = useMemo(() => {
//     try {
//       const storedValue = localStorage.getItem(key);
//       return storedValue ? JSON.parse(storedValue) : initialValue;
//     } catch (error) {
//       console.error(`Error parsing stored value for key '${key}':`, error);
//       return initialValue;
//     }
//   }, [key, initialValue]);

//   const [value, setValue] = useState(memoizedInitialValue);

//   useEffect(() => {
//     try {
//       localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.error(`Error storing value for key '${key}':`, error);
//     }
//   }, [key, value]);

//   return [value, setValue];
// };

// export default useLocalStorage;
