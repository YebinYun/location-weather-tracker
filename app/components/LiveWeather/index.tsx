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
  const temperatureData = liveWeatherData?.temperature;

  const options = {
    plugins: {
      legend: { display: false }, // 범례를 숨김
      datalabels: {
        color: "black",
        weight: "bold",
        formatter: (value: number) => `${value}℃`,
        font: { size: 15 },
      },
    },
    scales: { y: { display: false }, x: { display: false } },
    responsive: false,
  };

  const data = {
    labels:
      temperatureData &&
      temperatureData?.map((_: any, index: number) => index + 1),
    datasets: [
      {
        label: "",
        data: temperatureData,
        borderColor: "#B8D5FA",
        borderWidth: 5,
        pointRadius: 0,
        tension: 0.5,
      },
    ],
  };

  return (
    <section className="live-weather">
      <h1 className="title">실시간 날씨</h1>
      <div>
        <Line data={data} options={options} />
      </div>
    </section>
  );
};

export default LiveWeather;
