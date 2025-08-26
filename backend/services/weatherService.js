const fetch = require("node-fetch");
const { getCache, setCache } = require("./cache");

/**
 * Retrieve the coordinates of a city using the Open-Meteo Geocoding API
 * @param {string} location - Name of the city
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
async function getCoordinates(location) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    location
  )}&count=1&language=de`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }
  const { latitude, longitude } = data.results[0];
  return { latitude, longitude };
}

/**
 * Get the current weather for a city
 * @param {string} location
 * @returns {Promise<Object>}
 */
async function fetchWeather(location) {
  const cached = getCache(location);
  if (cached) return cached;

  try {
    const { latitude, longitude } = await getCoordinates(location);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await fetch(url);
    const data = await response.json();

    setCache(location, data);
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
}

module.exports = { fetchWeather };
