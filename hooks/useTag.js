import { useState, useEffect } from "react";
import axios from "axios";

const useTag = () => {
  // state
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await axios.get("/tags");
        setTags(data);
      } catch (err) {
        console.log(err);
      }
    };

    getTags();
  }, []);

  return {
    tags,
  };
};

export default useTag;
