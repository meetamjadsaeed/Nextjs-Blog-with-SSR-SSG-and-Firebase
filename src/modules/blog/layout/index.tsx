import React from "react";
import GlobalWrapper from "../../shared/components/globalWrapper";
import GlobalFooter from "../../shared/components/globalFooter";
import GlobalHeader from "../../shared/components/globalHeader";
import Head from "next/head";
import ReUse from "../../../utils/reUse";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          rel="stylesheet"
        />
      </Head>

      <GlobalHeader />

      <div className="container px-4 md:px-0 max-w-6xl mx-auto -mt-32">
        <div className="mx-0 sm:mx-6">
          <div className="w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">
            {children}
          </div>

          {/* <!--Subscribe-->	 */}
          <div className="container font-sans bg-green-100 rounded mt-8 p-4 md:p-24 text-center">
            <h2 className="font-bold break-normal text-2xl md:text-4xl">
              Subscribe
            </h2>
            <h3 className="font-bold break-normal font-normal text-gray-600 text-base md:text-xl">
              Get the latest posts delivered right to your inbox
            </h3>
            <div className="w-full text-center pt-4">
              <form action="#">
                <div className="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                  <input
                    type="email"
                    placeholder="youremail@example.com"
                    className="flex-1 appearance-none rounded shadow p-3 text-gray-600 mr-2 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex-1 mt-4 md:mt-0 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-green-400"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- /Subscribe--> */}
        </div>
      </div>

      <GlobalFooter />
    </>
  );
};

export default BlogLayout;
