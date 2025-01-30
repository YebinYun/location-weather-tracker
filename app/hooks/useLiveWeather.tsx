import { useEffect, useState } from "react";
import useGetWeather from "../lib/useGetWeather";

const useLiveWeather = () => {
  const { weatherData } = useGetWeather();

  // 실시간 날씨 정보
  const [weatherDataList, setWeatherDataList] = useState({
    t1h: "", // 기온
    rn1: "", // 1시간 강수량
    uuu: "", // 동서바람성분
    vvv: "", // 남북바람성분
    reh: "", // 습도
    pty: "", // 강수형태
    vec: "", // 풍향
    wsd: "", // 풍속
  });
  const liveWeather = weatherData?.response?.body?.items.item;

  const liveWeatherDataList = () => {
    const updatedWeatherDataList = { ...weatherDataList };

    if (Array.isArray(liveWeather)) {
      liveWeather?.forEach((item) => {
        switch (item.category) {
          case "T1H":
            updatedWeatherDataList.t1h = item.obsrValue + "℃"; // 기온
            break;
          case "RN1":
            updatedWeatherDataList.rn1 = item.obsrValue + "mm"; // 1시간 강수량
            break;
          case "UUU":
            updatedWeatherDataList.uuu = item.obsrValue + "m/s"; // 동서바람성분
            break;
          case "VVV":
            updatedWeatherDataList.vvv = item.obsrValue + "m/s"; // 남북바람성분
            break;
          case "REH":
            updatedWeatherDataList.reh = item.obsrValue + "%"; // 습도
            break;
          case "PTY": // 강수형태
            switch (item.obsrValue) {
              case "0":
                updatedWeatherDataList.pty = "없음";
                break;
              case "1":
                updatedWeatherDataList.pty = "비";
                break;
              case "2":
                updatedWeatherDataList.pty = "비/눈 ";
                break;
              case "3":
                updatedWeatherDataList.pty = "눈 ";
                break;
              case "5":
                updatedWeatherDataList.pty = "빗방울 ";
                break;
              case "6":
                updatedWeatherDataList.pty = "빗방울/눈날림 ";
                break;
              case "7":
                updatedWeatherDataList.pty = "눈날림 ";
                break;
              default:
                break;
            }
            break;
          case "VEC":
            updatedWeatherDataList.vec = item.obsrValue + "°"; // 풍향
            break;
          case "WSD":
            updatedWeatherDataList.wsd = item.obsrValue + "m/s"; // 풍속
            break;
          default:
            break;
        }
      });
    }
    setWeatherDataList(updatedWeatherDataList);
  };

  useEffect(() => {
    if (weatherData) {
      liveWeatherDataList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData]);

  return { weatherDataList };
};

export default useLiveWeather;
