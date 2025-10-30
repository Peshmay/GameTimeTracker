// client/src/components/WeatherWidget.tsx
import { useEffect, useState } from "react";
import axios from "axios";

type Wx = { temp: number; city: string };

export default function WeatherWidget() {
  const [wx, setWx] = useState<Wx | null>(null);
  const CITY = "Uddevalla";

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/weather", {
          params: { city: CITY },
        });
        setWx({ temp: res.data.temp, city: res.data.city });
      } catch (e) {
        console.error("Weather fetch failed", e);
        setWx(null);
      }
    })();
  }, [CITY]);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex justify-end px-4 py-2">
      <div className="text-right">
        <div className="text-sm text-gray-700">{today}</div>
        <div className="flex items-center justify-end gap-2 text-gray-800">
          <span role="img" aria-label="weather">⛅</span>
          <span className="font-medium">
            {wx ? `${wx.city}: ${wx.temp.toFixed(1)}°C` : "Weather unavailable"}
          </span>
        </div>
      </div>
    </div>
  );
}
