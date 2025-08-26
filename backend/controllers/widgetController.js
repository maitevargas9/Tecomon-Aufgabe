const Widget = require("../models/Widget");

// Retrieve all widgets
exports.getWidgets = async (req, res) => {
  try {
    const widgets = await Widget.find().sort({ createdAt: -1 });
    res.json(widgets);
  } catch (err) {
    res.status(500).json({ error: "Error loading the widgets" });
  }
};

// Create new widget
exports.createWidget = async (req, res) => {
  try {
    const { location } = req.body;
    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }

    const widget = new Widget({ location });
    await widget.save();

    res.status(201).json(widget);
  } catch (err) {
    res.status(500).json({ error: "Error creating the widgets" });
  }
};

// Delete widget
exports.deleteWidget = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Widget.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Widget not found" });
    }

    res.json({ message: "Widget deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting the widgets" });
  }
};
