import React from "react";

const ObjBasedApiDataLoader =
  (Component) =>
  ({ loading, data, ...props }) => {
    if (loading) {
      return "loading";
    } else if (Object.keys(data || {}).length === 0) {
      return "no record";
    } else {
      return <Component data={data} {...props} />;
    }
  };

export default ObjBasedApiDataLoader;
