import { useQuery } from "@tanstack/react-query";
import useLocationStore from "../store/useLocationStore";
import { dfs_xy_conv } from "../hooks/useCoordinateTransformer";

// 날씨 정보 받아오는 api
const useGetWeather = () => {
  const { location } = useLocationStore();
  const result = dfs_xy_conv("toXY", location.latitude, location.longitude); // 위도, 경도
  const getWeatherQuerykey = ["weather"];

  const getWeatherData = async () => {
    return await fetch(`/api/weather?nx=${result.x}&ny=${result.y}`)
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
    enabled: !!location.latitude && !!location.longitude,
  });

  return { weatherData };
};

export default useGetWeather;
