import { useQuery } from "@tanstack/react-query";

// 날씨 정보 받아오는 api
const useGetWeather = () => {
  const getWeatherQuerykey = ["weather"];

  const getWeatherData = async () => {
    return await fetch("/api/weather", { method: "GET" })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const { data: weatherData } = useQuery({
    queryKey: getWeatherQuerykey,
    queryFn: getWeatherData,
  });

  return { weatherData };
};

export default useGetWeather;
