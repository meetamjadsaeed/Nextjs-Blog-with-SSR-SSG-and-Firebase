import React, { useEffect, useState } from "react";
import ReUse from "../../../../utils/reUse";
import AppService from "../../../../services/appServices";

import { db } from "../../../../../firebaseConfig.js";

import { collection, getDocs } from "firebase/firestore";

import BlogPostCard from "./BlogPostCard";

const Posts = ({ apiData }) => {
  console.log(apiData, "apiData");

  // const [apiData, setApiData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const allRecipes = AppService.getBlogs();

  //   console.log(allRecipes, "firstRecipe");

  //   ReUse.getApiData(allRecipes, setApiData, setLoading);
  // }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => doc.data());
      // setApiData(postsList);
    };

    fetchPosts();
  }, []);
  return (
    <>
      <div className="flex flex-wrap justify-between pt-12 -mx-6">
        {ReUse.mapItems(false, apiData?.posts, BlogPostCard)}
      </div>
    </>
  );
};

export default Posts;
