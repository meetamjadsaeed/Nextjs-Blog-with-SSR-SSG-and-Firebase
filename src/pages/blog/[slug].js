import { useRouter } from "next/router";
import BlogDetail from "../../modules/BlogDetail";
import React from "react";

const PostDetail = () => {
  const router = useRouter();
  const { slug } = router.query || {};

  if (typeof slug === "undefined") {
    return null;
  }

  return (
    <>
      <BlogDetail currentSlug={slug} />
    </>
  );
};

export default PostDetail;
