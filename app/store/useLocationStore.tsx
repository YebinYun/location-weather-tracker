"use client";

import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

export interface ILocationTypes {
  latitude: number | null;
  longitude: number | null;
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
    setLocation({
      latitude: null,
      longitude: null,
    });
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((res) => {
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
