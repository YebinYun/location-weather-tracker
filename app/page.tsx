import "./styles/page.css";
import CurrentWeather from "./components/CurrentWeather";
import WeeklyForecast from "./components/WeeklyForecast";
import LiveWeather from "./components/LiveWeather";
import { Suspense } from "react";
import Skeleton from "./loading";
import CurrentWeatherSkeleton from "./components/CurrentWeather/CurrentWeatherSkeleton";

export default function Page() {
  return (
    <main className="app">
      <Suspense fallback={<CurrentWeatherSkeleton />}>
        <CurrentWeather />
      </Suspense>
      <Suspense fallback={<Skeleton w={100} h={200} wUnit={"%"} />}>
        <LiveWeather />
      </Suspense>
      <Suspense fallback={<Skeleton w={100} h={200} wUnit={"%"} />}>
        <WeeklyForecast />
      </Suspense>
    </main>
  );
}
