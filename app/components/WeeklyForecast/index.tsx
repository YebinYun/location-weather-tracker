import React from "react";
import "./index.css";
import Image from "next/image";
import SUN from "/public/weather/sun.png";

// 주간 날씨를 알려주는 컴포넌트
const WeeklyForecast = () => {
  const todayTomorrow = [
    {
      day: "오늘",
      date: "1.23",
      minTemperature: "-2",
      maxTemperature: "6",
      morningPrecipitation: "0",
      afternoonPrecipitation: "0",
    },
    {
      day: "내일",
      date: "1.24",
      minTemperature: "-2",
      maxTemperature: "9",
      morningPrecipitation: "0",
      afternoonPrecipitation: "0",
    },
  ];
  const weekForecast = [
    {
      day: "토",
      date: "1.25",
      minTemperature: "0",
      maxTemperature: "2",
      morningPrecipitation: "0",
      afternoonPrecipitation: "0",
    },
    {
      day: "일",
      date: "1.26",
      minTemperature: "-1",
      maxTemperature: "7",
      morningPrecipitation: "10",
      afternoonPrecipitation: "20",
    },
    {
      day: "월",
      date: "1.26",
      minTemperature: "-1",
      maxTemperature: "7",
      morningPrecipitation: "10",
      afternoonPrecipitation: "20",
    },
    {
      day: "화",
      date: "1.26",
      minTemperature: "-1",
      maxTemperature: "7",
      morningPrecipitation: "10",
      afternoonPrecipitation: "20",
    },
    {
      day: "수",
      date: "1.26",
      minTemperature: "-1",
      maxTemperature: "7",
      morningPrecipitation: "10",
      afternoonPrecipitation: "20",
    },
    {
      day: "목",
      date: "1.26",
      minTemperature: "-1",
      maxTemperature: "7",
      morningPrecipitation: "10",
      afternoonPrecipitation: "20",
    },
  ];

  return (
    <section className="weekly-forecast">
      <h1 className="title">주간 날씨</h1>
      <ul className="today-tomorrow-forecast">
        {todayTomorrow.map((item) => (
          <li className="today-tomorrow-list">
            <div className="date-info">
              <span className="day">{item.day}</span>
              <span className="date">{item.date}</span>
            </div>

            <div className="precipitation-probability">
              <div className="precipitation-info">
                <span>오전</span>
                <span>{item.morningPrecipitation}%</span>
              </div>
              <div className="weather-icon">
                <Image className="weather-img" src={SUN} alt="맑음" />
              </div>
              <div className="weather-icon">
                <Image className="weather-img" src={SUN} alt="맑음" />
              </div>
              <div className="precipitation-info">
                <span>오후</span>
                <span>{item.afternoonPrecipitation}%</span>
              </div>
            </div>

            <div className="temperature-range">
              <span className="min-temperature">{item.minTemperature}</span>
              <span className="temp-divider">/</span>
              <span className="max-temperature">{item.maxTemperature}</span>
            </div>
          </li>
        ))}
      </ul>

      <ul className="week-forecast">
        {weekForecast.map((item) => (
          <li className="week-forecast-list">
            <div className="precipitation-info">
              <span className="day">{item.day}</span>
              <span className="date">{item.date}</span>
            </div>

            <div className="weather-icon">
              <Image className="weather-img" src={SUN} alt="맑음" />
              <Image className="weather-img" src={SUN} alt="맑음" />
            </div>

            <div className="week-forecast-detail">
              <div className="temperature">
                <span className="min-temperature">{item.minTemperature}</span>
                <span className="temp-divider">/</span>
                <span className="max-temperature">{item.maxTemperature}</span>
              </div>
              <div className="precipitation-probability">
                <span>{item.morningPrecipitation}%</span>
                <span>{item.afternoonPrecipitation}%</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WeeklyForecast;
