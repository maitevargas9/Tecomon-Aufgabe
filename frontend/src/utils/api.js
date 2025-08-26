export async function fetchWidgets() {
  const res = await fetch("http://localhost:5000/widgets");
  return res.json();
}

export async function createWidget(location) {
  const res = await fetch("http://localhost:5000/widgets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location })
  });
  return res.json();
}

export async function deleteWidget(id) {
  await fetch(`http://localhost:5000/widgets/${id}`, { method: "DELETE" });
}

export async function fetchWeather(location) {
  const res = await fetch(`http://localhost:5000/widgets/weather/${location}`);
  return res.json();
}
