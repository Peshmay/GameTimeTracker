import { Request, Response } from "express";
import fetch from "node-fetch";

export async function getWeather(req: Request, res: Response) {
  try {
    const city = (req.query.city as string) || "Gothenburg";
    const key = process.env.OPENWEATHER_API_KEY || "fetch";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${key}`;
    const r = await fetch(url);
    const data: any = await r.json();
    if (!r.ok) return res.status(400).json({ error: data });
    res.json({ city: data.name, temp: data.main?.temp });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
