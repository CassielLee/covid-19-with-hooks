// 自定义Hook特点：
// 表面上：一个命名格式为 useXXX 的函数，但不是 React 函数式组件
// 本质上：内部通过使用 React 自带的一些 Hook （例如 useState 和 useEffect ）来实现某些通用的逻辑
import { useState, useEffect } from "react";

const BASE_URL = "https://corona.lmao.ninja";

export function useCoronaAPI(
  path,
  { initialData = null, converter = (data) => data, refetchInterval = null }
) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}${path}`);
      const data = await response.json();
      setData(converter(data));
    };
    fetchData();

    if (refetchInterval) {
      const intervalId = setInterval(fetchData, refetchInterval);
      return () => clearInterval(intervalId);
    }
  }, [converter, path, refetchInterval]);

  return data;
}
