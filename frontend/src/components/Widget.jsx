import { useEffect, useState } from "react";
import { fetchWeather, deleteWidget } from "../utils/api";
import { getWeatherIcon } from "../utils/weatherIcons";

export default function Widget({ widget, onDelete }) {
  const [weather, setWeather] = useState(null);

  useEffect(
    () => {
      fetchWeather(widget.location).then(setWeather);
    },
    [widget.location]
  );

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center w-full max-w-lg">
      <h3 className="text-2xl font-bold mb-6">
        {widget.location}
      </h3>

      {weather
        ? weather.error
          ? <p className="text-red-500">
              {weather.error}
            </p>
          : <div className="flex flex-col items-center w-full">
              <div className="flex flex-col items-center mb-6 bg-blue-50 p-4 rounded-2xl shadow-sm w-full">
                <span className="text-6xl mb-2">
                  {getWeatherIcon(weather.current_weather.weathercode)}
                </span>
                <p className="text-3xl font-semibold">
                  {weather.current_weather.temperature}°C
                </p>
                <p className="text-gray-600 mt-1">
                  {" "}<span className="font-medium">
                    {weather.today.min}°C
                  </span>{" "}
                  / <span className="font-medium">{weather.today.max}°C</span>
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-center w-full">
                {weather.forecast.slice(1, 7).map((day, i) =>
                  <div
                    key={i}
                    className="p-3 bg-gray-100 rounded-2xl flex flex-col items-center shadow-sm hover:shadow-md transition"
                  >
                    <p className="text-sm font-medium mb-1">
                      {new Date(day.date).toLocaleDateString("en-GB", {
                        weekday: "short"
                      })}
                    </p>
                    <span className="text-3xl mb-1">
                      {getWeatherIcon(day.code)}
                    </span>
                    <p className="text-gray-600 text-sm">
                      {day.min}°C / {day.max}°C
                    </p>
                  </div>
                )}
              </div>
            </div>
        : <p>Loads...</p>}

      <button
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition w-full"
        onClick={() => {
          deleteWidget(widget._id);
          onDelete(widget._id);
        }}
      >
        Delete
      </button>
    </div>
  );
}
