import React, { useEffect, useState } from "react";
import PublicMedia from "../../assets/images";

const GlobalHeader = () => {
  const [message, setMessage] = useState("");

  const handleFetchAndStoreData = async () => {
    setMessage("Fetching and storing data...");
    try {
      const response = await fetch("/api/fetchAndStoreData", {
        method: "POST",
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage("Failed to fetch and store data");
    }
  };
  return (
    <>
      {/* // <!--Header--> */}
      <div
        className="w-full m-0 p-0 bg-cover bg-bottom"
        style={{
          backgroundImage: `url(${PublicMedia.cover})`,
          height: "60vh",
          maxHeight: "460px",
        }}
      >
        <button onClick={handleFetchAndStoreData}>test</button>

        <div className="container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal">
          <p className="text-xl md:text-2xl text-gray-500">
            Welcome to my Blog
          </p>
        </div>
      </div>
    </>
  );
};

export default GlobalHeader;
