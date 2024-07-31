import { useContext, useEffect, useState } from "react";
import { FilterOptions, RequestBody } from "./types";
import Home from "./pages/Home/Home";
import useFetch from "./hooks/useFetch";
import { StateContext } from "./context/StateContext";
import Loading from "./components/Loading/Loading";

export default function App() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("StateContext must be used within a StateProvider");
  }
  const {
    setAtms,
    selectedBank,
    selectedBankType,
    debouncedSearch,
    setIsQueryHaveCity,
  } = context;
  const [bodyRequest, setBodyRequest] = useState<Partial<RequestBody>>({});
  const { data, loading, queryHaveCity } = useFetch(bodyRequest);

  useEffect(() => {
    const filters: Partial<FilterOptions> = {
      ATM_Type: selectedBankType,
      Bank_Name: [selectedBank],
    };
    const body: Partial<RequestBody> = {
      q: debouncedSearch,
      filters: filters,
    };
    setBodyRequest(body);
  }, [selectedBank, selectedBankType, debouncedSearch]);
  /**
   * Update the Manager Context if the query have city in it
   */
  useEffect(() => {
    setIsQueryHaveCity(queryHaveCity);
  }, [queryHaveCity]);
  /**
   * Update the ATMS list in the Manager Context
   */
  useEffect(() => {
    if (data) {
      setAtms(data);
    }
  }, [data]);

  return loading ? <Loading /> : <Home />;
}
