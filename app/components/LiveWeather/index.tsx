"use client";

import React from "react";
import "./index.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import useGetLiveWeather from "../../lib/useGetLiveWeather";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

const LiveWeather = () => {
  const { liveWeatherData } = useGetLiveWeather();

  const options = {
    plugins: {
      legend: { display: false }, // 범례를 숨김
      datalabels: {
        color: "black",
        weight: "bold",
        formatter: (value: number) => (!value ? value : `${value}°`),
        font: { size: 14 },
      },
    },
    scales: { y: { display: false }, x: { display: false } },
    maintainAspectRatio: false,
    // responsive: false,
  };

  const data = {
    labels:
      liveWeatherData &&
      liveWeatherData?.map((_: null, index: number) => index + 1),
    datasets: [
      {
        label: "",
        data: liveWeatherData?.map((items: { temperature: number }) => {
          return items.temperature;
        }),
        borderColor: "#B8D5FA",
        borderWidth: 5,
        pointRadius: 0,
        tension: 0.5,
      },
    ],
  };

  const weatherAttributes = [
    { label: "강수확률", unit: "(%)", key: "precipitationProbability" },
    { label: "강수량", unit: "(mm)", key: "humidity" },
    { label: "바람", unit: "(m/s)", key: "wind" },
    { label: "습도", unit: "(%)", key: "humidity" },
  ];

  return (
    <section className="live-weather">
      <h1 className="title">실시간 날씨</h1>
      <table className="live-weather-table">
        <thead className="live-weather-header">
          <tr className="live-weather-rows">
            <th className="data-header">
              <span className="label-today">오늘</span>
            </th>
            {liveWeatherData?.map((items: { time: string }, index: number) => (
              <th key={index} className="data-header">
                {items.time.slice(0, 2)}시
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="live-weather-body">
          <tr>
            <td colSpan={liveWeatherData?.length + 1} className="data-body">
              <div
                style={{
                  width: "100%",
                  height: "50px",
                  marginTop: "20px",
                }}
              >
                <Line data={data} options={options} />
              </div>
            </td>
          </tr>
          {weatherAttributes.map((weatherList) => (
            <tr key={weatherList.key} className={`_cn${weatherList.label}`}>
              <th scope="row" className="data-header">
                <span className="data-header-tite">
                  <em>{weatherList.label}</em>
                  <span className="data-header-unit">{weatherList.unit}</span>
                </span>
              </th>
              {liveWeatherData?.map((items: any, index: number) => (
                <td key={index} className="data-body-data">
                  <span className="data-body-unit">
                    <em>{items[weatherList.key]}</em>
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default LiveWeather;
