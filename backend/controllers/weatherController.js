const { getCache, setCache } = require("../cache/weatherCache");

exports.getWeather = async (req, res) => {
  try {
    const city = req.params.city?.trim();
    if (!city) {
      return res.status(400).json({ error: "City required" });
    }

    const cached = getCache(city);
    if (cached) {
      return res.json(cached);
    }

    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({ error: `City "${city}" not found` });
    }

    const { latitude, longitude, timezone } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=${
        timezone || "auto"
      }`
    );
    const weatherData = await weatherRes.json();

    if (!weatherData.daily) {
      return res.status(500).json({ error: "No forecast data" });
    }

    const response = {
      city,
      current_weather: weatherData.current_weather,
      today: {
        min: weatherData.daily.temperature_2m_min[0],
        max: weatherData.daily.temperature_2m_max[0],
        code: weatherData.daily.weathercode[0]
      },
      forecast: weatherData.daily.time.map((date, i) => ({
        date,
        min: weatherData.daily.temperature_2m_min[i],
        max: weatherData.daily.temperature_2m_max[i],
        code: weatherData.daily.weathercode[i]
      }))
    };

    setCache(city, response);
    res.json(response);
  } catch (err) {
    console.error("WeatherController error:", err);
    res.status(500).json({ error: "Error fetching weather data" });
  }
};
