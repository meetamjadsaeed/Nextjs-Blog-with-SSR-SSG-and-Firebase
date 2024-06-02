import React, { useEffect, useState } from "react";

import Posts from "./Posts";

const BlogBody = ({ defaultModule = "posts" }) => {
  const [currentWrapper, setCurrentWrapper] = useState(null);

  useEffect(() => {
    const availableModules = {
      posts: <Posts />,
    };

    const normalizedDefaultModule = defaultModule?.toLowerCase();
    if (availableModules[normalizedDefaultModule]) {
      setCurrentWrapper(availableModules[normalizedDefaultModule]);
    } else {
      console.error(`Wrapper for module '${defaultModule}' not found`);
      setCurrentWrapper(availableModules["posts"]);
    }
  }, [defaultModule]);

  return currentWrapper;
};

export default BlogBody;
