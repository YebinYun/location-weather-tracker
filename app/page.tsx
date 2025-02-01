import "./styles/page.css";
import CurrentWeather from "./components/CurrentWeather";
import WeeklyForecast from "./components/WeeklyForecast";
import HourlyForecast from "./components/HourlyForecast";

export default function Page() {
  return (
    <main className="app">
      <CurrentWeather />
      <WeeklyForecast />
      <HourlyForecast />
    </main>
  );
}
