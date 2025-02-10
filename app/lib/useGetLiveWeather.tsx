"use client";

import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import useLocationStore from "../store/useLocationStore";
import { dfs_xy_conv } from "../hooks/useCoordinateTransformer";

// 주간 날씨 정보 받아오는 api
const useGetLiveWeather = () => {
  const { location } = useLocationStore();

  const result = dfs_xy_conv("toXY", location.latitude, location.longitude); // 위도, 경도

  const getLiveWeatherQuerykey = useMemo(
    () => ["liveWeather", location.latitude, location.longitude],
    [location.latitude, location.longitude]
  );

  const getLiveWeatherData = async () => {
    if (!location.latitude || !location.longitude) return {};
    return await fetch(`/api/liveWeather?nx=${result.x}&ny=${result.y}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const { data: liveWeatherData } = useSuspenseQuery({
    queryKey: getLiveWeatherQuerykey,
    queryFn: getLiveWeatherData,
  });

  return { liveWeatherData };
};

export default useGetLiveWeather;
