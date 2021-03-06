import React, { useEffect, useState } from "react";
import GlobalStats from "./components/GlobalStats";
import CountriesChart from "./components/CountriesChart";
import SelectDataKey from "./components/SelectDataKey";
import { useCoronaAPI } from "./hooks/useCoronaAPI";
import "./App.css";

const BASE_URL = "https://corona.lmao.ninja";
function App() {
  const [globalStats, setGlobalStats] = useState({});
  // const [countries, setCountries] = useState([]);
  const [key, setKey] = useState("cases");

  useEffect(() => {
    const fetchGlobalStats = async () => {
      const response = await fetch(`${BASE_URL}/v2/all`);
      const data = await response.json();
      setGlobalStats(data);
    };

    fetchGlobalStats();
    // 每五秒获取一次数据
    const intervalId = setInterval(fetchGlobalStats, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // 利用原生的useEffect函数
  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     const response = await fetch(`${BASE_URL}/v2/countries?sort=${key}`);
  //     const data = await response.json();
  //     setCountries(data.slice(0, 10));
  //   };

  //   fetchCountries();
  // }, [key]);

  // 利用自定义的hook函数
  const countries = useCoronaAPI(`/v2/countries?sort=${key}`, {
    initialData: [],
    converter: (data) => data.slice(0, 10),
  });
  return (
    <div className="App">
      <h1>COVID-19</h1>
      <GlobalStats stats={globalStats} />
      <SelectDataKey onChange={(e) => setKey(e.target.value)} />
      <CountriesChart data={countries} dataKey={key} />
    </div>
  );
}

export default App;
