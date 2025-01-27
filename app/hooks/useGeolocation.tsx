import { useState, useEffect } from "react";

const useGeolocation = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [currentLocation, setCurrentLocation] = useState({
    city: null,
    quarter: null,
  });

  const getLocationName = async (latitude: number, longitude: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    if (!response.ok) return;
    const data = await response.json();
    return {
      city: data.address.city || null,
      quarter: data.address.quarter || data.address.borough || null,
    };
  };

  // 현재 위도, 경도 확인 -> 지역 이름 확인 및 저장
  const getLocation = async () => {
    setCurrentLocation({ city: null, quarter: null });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (res) => {
        const { latitude, longitude } = res.coords;

        setLocation({
          latitude: latitude,
          longitude: longitude,
        });

        await getLocationName(latitude, longitude)
          .then((res) => {
            setCurrentLocation({
              city: res.city,
              quarter: res.quarter,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      });
    }
  };

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { currentLocation, getLocation };
};

export default useGeolocation;
