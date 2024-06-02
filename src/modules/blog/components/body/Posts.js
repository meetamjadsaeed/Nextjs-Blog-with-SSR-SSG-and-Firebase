import React, { useEffect, useState } from "react";
import ReUse from "../../../../utils/reUse";
import AppService from "../../../../services/appServices";

import { db } from "../../../../../firebaseConfig.js";

import { collection, getDocs } from "firebase/firestore";

import BlogPostCard from "./BlogPostCard";

const Posts = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allRecipes = AppService.getBlogs();
    ReUse.getApiData(allRecipes, setApiData, setLoading);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => doc.data());
    };

    fetchPosts();
  }, []);
  return (
    <>
      <div className="flex flex-wrap justify-between pt-12 -mx-6">
        {ReUse.mapItems(loading, apiData, BlogPostCard)}
      </div>
    </>
  );
};

export default Posts;
