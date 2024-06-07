import PostsPage from "../modules/blog/allPages/posts";
import AppService from "../services/appServices";
export default function Home({ data }) {
  return (
    <>
      <PostsPage apiData={data} />
    </>
  );
}

// The getServerSideProps function
export async function getServerSideProps(context) {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
