const cache = new Map();

function setCache(location, data) {
  cache.set(location, { data, timestamp: Date.now() });
}

function getCache(location) {
  const cached = cache.get(location);
  if (!cached) return null;
  if (Date.now() - cached.timestamp > 5 * 60 * 1000) {
    cache.delete(location);
    return null;
  }
  return cached.data;
}

module.exports = { setCache, getCache };
