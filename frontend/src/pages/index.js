import { useEffect, useState } from "react";
import Widget from "../components/Widget";
import { fetchWidgets, createWidget } from "../utils/api";

export default function Dashboard() {
  const [widgets, setWidgets] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchWidgets().then(setWidgets);
  }, []);

  const handleAdd = async () => {
    if (!location) return;
    const widget = await createWidget(location);
    setWidgets([...widgets, widget]);
    setLocation("");
  };

  const handleDelete = (id) => {
    setWidgets(widgets.filter((w) => w._id !== id));
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🌤️ Weather Dashboard
      </h1>

      <div className="flex justify-center mb-6">
        <input
          className="px-4 py-2 border rounded-l-xl focus:outline-none w-64"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-r-xl hover:bg-blue-600"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {widgets.map((widget) => (
          <Widget key={widget._id} widget={widget} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
