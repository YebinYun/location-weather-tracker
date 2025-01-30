"use client";

import { useQuery } from "@tanstack/react-query";
import useLocationStore from "../store/useLocationStore";

interface LocationData {
  city?: string | null;
  quarter?: string | null;
  borough?: string | null;
}

const useGetLocation = () => {
  const { location } = useLocationStore();
  const getLocationQuerykey = ["location"];
  const getLocationData = async (): Promise<LocationData> => {
    return await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`
    )
      .then(async (res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        const data: { address: LocationData } = await res.json();
        return {
          city: data.address.city || null,
          quarter: data.address.quarter || data.address.borough || null,
        };
      })
      .catch((err) => {
        console.error(err);
        return {
          city: null,
          quarter: null,
        };
      });
  };

  const { data: LocationData } = useQuery<LocationData>({
    queryKey: getLocationQuerykey,
    queryFn: getLocationData,
    enabled: !!location.latitude && !!location.longitude,
  });

  return { LocationData };
};

export default useGetLocation;
