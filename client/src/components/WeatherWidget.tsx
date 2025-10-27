import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<{ temp: number; city: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/weather", {
          params: { city: "Stockholm" }
        });
        setWeather({ temp: res.data.temp, city: res.data.city });
      } catch {
        setWeather(null);
      }
    })();
  }, []);

  return (
    <div className="flex justify-end p-3 text-sm text-gray-600">
      {weather ? `${weather.city}: ${weather.temp.toFixed(1)}°C` : "Weather unavailable"}
    </div>
  );
}
