import "./App.css";
import CurrentWeather from "./components/CurrentWeather/index.";
import WeeklyForecast from "./components/WeeklyForecast";
import HourlyForecast from "./components/HourlyForecast";

const App = () => {
  return (
    <main className="app">
      <CurrentWeather />
      <HourlyForecast />
      <WeeklyForecast />
    </main>
  );
};

export default App;
