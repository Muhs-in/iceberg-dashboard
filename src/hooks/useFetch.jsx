import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, { withCredentials: true });

        if (response.status !== 200) {
          throw new Error("Could not fetch data");
        }

        setData(response.data);
        setIsPending(false);
        setError(null);
      } catch (error) {
        setIsPending(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
