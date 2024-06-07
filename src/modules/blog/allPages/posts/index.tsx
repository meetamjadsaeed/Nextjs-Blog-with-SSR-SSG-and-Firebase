import React from "react";
import BlogLayout from "../../layout";
import BlogBody from "../../components/body";

const PostsPage = ({ apiData }) => {
  return (
    <BlogLayout>
      <BlogBody defaultModule={"posts"} apiData={apiData} />
    </BlogLayout>
  );
};

export default PostsPage;
