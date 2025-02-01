"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import "./index.css";
import useGetLocation from "../../lib/useGetLocation";
import useLiveWeather from "../../hooks/useLiveWeather";
import useLocationStore from "../../store/useLocationStore";

// 사용자 위치 기반 현재 날씨를 알려주는 컴포넌트
const CurrentWeather = () => {
  const [isbookmark, setIsBookmark] = useState<boolean>(false);
  const bookmark = isbookmark ? "fluent-color:star-16" : "iconoir:star";
  const { getLocation } = useLocationStore();
  const { LocationData } = useGetLocation();
  const { weatherDataList } = useLiveWeather();

  return (
    <section className="current-weather">
      <div className="current-location">
        <button onClick={() => setIsBookmark(!isbookmark)}>
          <Icon icon={bookmark} />
        </button>
        <h2>
          {LocationData?.city} {LocationData?.quarter}
        </h2>
        <button onClick={getLocation}>
          <Icon icon="lsicon:map-location-filled" />
        </button>
      </div>

      <div className="weather-details">
        <div className="current-temperature">
          <Icon className="temperature-icon" icon="line-md:sunny-loop" />
          <h1 className="temperature-value">{weatherDataList.t1h}</h1>
          {/* <div className="weather-info-wrap">
            <h3 className="weather-info">맑음</h3>
            <h4 className="temperature-comparison">어제와 같은 기온</h4>
          </div> */}
        </div>

        <ul className="current-weather-details">
          <li className="current-weather-details-item">
            <p className="details-title">습도</p>
            <p className="details-value">{weatherDataList.reh}</p>
          </li>
          <li className="current-weather-details-item">
            <p className="details-title">풍향</p>
            <p className="details-value">{weatherDataList.vec}</p>
          </li>
          <li className="current-weather-details-item">
            <p className="details-title">풍속</p>
            <p className="details-value">{weatherDataList.wsd}</p>
          </li>
          <li className="current-weather-details-item">
            <p className="details-title">강수형태</p>
            <p className="details-value">{weatherDataList.pty}</p>
          </li>
          <li className="current-weather-details-item">
            <p className="details-title">동서풍</p>
            <p className="details-value">{weatherDataList.uuu}</p>
          </li>
          <li className="current-weather-details-item">
            <p className="details-title">남북풍</p>
            <p className="details-value">{weatherDataList.vvv}</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CurrentWeather;
