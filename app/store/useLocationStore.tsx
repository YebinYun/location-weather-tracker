"use client";

import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

export interface ILocationTypes {
  latitude: number;
  longitude: number;
}

export const locationState = atom<ILocationTypes>({
  key: "location",
  default: {
    latitude: null,
    longitude: null,
  },
});

const useLocationStore = () => {
  const [location, setLocation] = useRecoilState(locationState);
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((res) => {
        if (!res) return;
        const { latitude, longitude } = res.coords;
        return setLocation({
          latitude: latitude,
          longitude: longitude,
        });
      });
    }
  };

  useEffect(() => {
    return getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { location, getLocation };
};

export default useLocationStore;
