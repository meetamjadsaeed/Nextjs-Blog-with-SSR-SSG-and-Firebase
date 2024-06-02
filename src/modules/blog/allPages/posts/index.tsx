import React from "react";
import BlogLayout from "../../layout";
import BlogBody from "../../components/body";

const PostsPage = () => {
  return (
    <BlogLayout>
      <BlogBody defaultModule={"posts"} />
    </BlogLayout>
  );
};

export default PostsPage;
