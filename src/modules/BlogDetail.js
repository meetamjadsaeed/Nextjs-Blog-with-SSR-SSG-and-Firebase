import React, { useEffect, useState } from "react";

import AppService from "../services/appServices";
import ReUse from "../utils/reUse";

import BlogDetailContent from "./BlogDetailContent";

import ObjBasedApiDataLoader from "../modules/shared/ReUsableHOC/ObjBasedApiDataLoader";

function BlogDetail({ currentSlug }) {
  function BlogDetail({ loading, data }) {
    return <BlogDetailContent data={data} />;
  }

  const EnhancedRecipedetail = ObjBasedApiDataLoader(BlogDetail);

  const [apiData, setApiData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const showRecipe = AppService.getBlog({ blogId: currentSlug });
    showRecipe.then((res) => {
      //   console.log(res, "apiData");
    });
    ReUse.getApiDataById(showRecipe, setApiData, setLoading);
  }, [currentSlug]);

  //   console.log(res, "apiData");

  return <EnhancedRecipedetail data={apiData} loading={loading} />;
}

export default BlogDetail;
