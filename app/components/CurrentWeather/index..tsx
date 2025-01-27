"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import "./index.css";
import useGeolocation from "../../hooks/useGeolocation";

// 사용자 위치 기반 현재 날씨를 알려주는 컴포넌트
const CurrentWeather = () => {
  const [isbookmark, setIsBookmark] = useState<boolean>(false);
  const bookmark = isbookmark ? "fluent-color:star-16" : "iconoir:star";
  const { currentLocation, getLocation } = useGeolocation();

  return (
    <section className="current-weather">
      <div className="current-location">
        <button onClick={() => setIsBookmark(!isbookmark)}>
          <Icon icon={bookmark} />
        </button>
        <h2>
          {currentLocation.city} {currentLocation.quarter}
        </h2>
        <button onClick={getLocation}>
          <Icon icon="lsicon:map-location-filled" />
        </button>
      </div>

      <div className="weather-details">
        <div className="current-temperature">
          <Icon className="temperature-icon" icon="line-md:sunny-loop" />
          <h1 className="temperature-value">2.7</h1>
          <div className="weather-info-wrap">
            <h3 className="weather-info">맑음</h3>
            <h4 className="temperature-comparison">어제와 같은 기온</h4>
          </div>
        </div>

        <ul className="current-weather-details">
          <li>습도 51%</li>
          <li>체감 2.7</li>
          <li>북서풍 0.6</li>
          <li>미세 보통</li>
          <li>초미세 나쁨</li>
          <li>일몰 17:45</li>
        </ul>
      </div>
    </section>
  );
};

export default CurrentWeather;
