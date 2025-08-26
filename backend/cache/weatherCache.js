const cache = {};

exports.getCache = (city) => {
  const entry = cache[city];
  if (!entry) {
    return null;
  }

  if (Date.now() - entry.timestamp > 5 * 60 * 1000) {
    delete cache[city];
    return null;
  }

  return entry.data;
};

exports.setCache = (city, data) => {
  cache[city] = { data, timestamp: Date.now() };
};
