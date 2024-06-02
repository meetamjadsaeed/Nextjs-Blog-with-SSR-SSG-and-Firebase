import React from "react";
import GlobalFooter from "../modules/shared/components/globalFooter";

const about = ({ title, body }) => {
  return (
    <>
      {/* <!--slide in nav--> */}

      {/* <!--Title--> */}
      <div className="text-center pt-16 md:pt-32">
        <p className="text-sm md:text-base text-green-500 font-bold">
          04 JULY 2023 <span className="text-gray-900">/</span> GETTING STARTED
        </p>
        <h1 className="font-bold break-normal text-3xl md:text-5xl">{title}</h1>
      </div>

      {/* <!--image--> */}
      <div
        className="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/collection/1118905/')",
          height: "75vh",
        }}
      ></div>

      {/* <!--Container--> */}
      <div className="container max-w-5xl mx-auto -mt-32">
        <div className="mx-0 sm:mx-6">
          <div
            className="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal"
            style={{ fontFamily: "Georgia,serif" }}
          >
            {/* <!--Post Content--> */}

            <p className="py-6">{body}</p>

            {/* <!--/ Post Content--> */}
          </div>
        </div>
      </div>

      <GlobalFooter />
    </>
  );
};

export default about;

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/posts/40");
  const data = await res.json();

  return {
    props: {
      title: data?.title,
      body: data?.body,
    },
    revalidate: 10, // Revalidate at most every 10 seconds
  };
}
