import { MapPinIcon } from "@heroicons/react/24/solid";
import { WeatherInfo } from "../../interfaces";
import { kelvinToCelsius } from "./utils";
import "./style.css";

const WeatherDetails: React.FC<WeatherInfo> = ({
  name,
  weather,
  main,
  visibility,
  wind,
}) => {
  if (!main?.temp) {
    return <div className="details-top">No results found</div>;
  }
  return (
    <div className="details-container">
      <div className="details-top">
        <MapPinIcon className="map-icon" />
        <h2> {name}</h2>
      </div>
      <div className="details-mid">
        <h1 className="temp">{kelvinToCelsius(main.temp)}&deg;</h1>
        <div className="icon-container">
          <img
            className="icon"
            src={` https://openweathermap.org/img/wn/${weather[0].icon}.png`}
            alt={weather[0].icon}
          />
        </div>
        <h1>{weather[0].main}</h1>
      </div>
      <div className="details-footer">
        <div className="tag blue">Humidity: {main.humidity}</div>
        <div className="tag yellow">Visibility: {visibility}</div>
        <div className="tag purple">Wind Speed: {wind.speed} </div>
        <div className="tag purple">Wind Deg: {wind.deg} &deg;</div>
      </div>
    </div>
  );
};

export default WeatherDetails;
