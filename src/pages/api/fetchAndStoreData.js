import { db } from "../../../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

export default async function fetchAndStoreData(req, res) {
  //   if (req.method !== "POST") {
  //     return res.status(405).json({ message: "Method not allowed" });
  //   }

  try {
    const response = await fetch("https://dummyjson.com/posts");
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch data from dummyjson");
    }
    const data = await response.json();

    const postsCollection = collection(db, "posts");
    const promises = data?.posts.map((post) => addDoc(postsCollection, post));
    await Promise.all(promises);

    res.status(200).json({ data: data, message: "Data stored successfully" });
  } catch (error) {
    console.error("Error fetching and storing data:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error?.message });
  }
}
