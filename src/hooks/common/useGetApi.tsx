import { useState, useEffect, useCallback } from "react";

const useGetApi = (apiService) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const apiResp = await apiService();
      const { errors, message, response, data: responseData } = apiResp || {};

      if (responseData) {
        setData(responseData);
      } else if (errors) {
        setError(errors);
      } else {
        setError("No data received from API");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useGetApi;
