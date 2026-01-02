import Route from "../models/Route.js";

export const addRoute = async (req, res) => {
  try {
    const route = await Route.create(req.body);
    res.json(route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRoutes = async (req, res) => {
  try {
    const { trainNumber, trainType } = req.query;
    let filter = {};
    if (trainNumber) filter.trainNumber = trainNumber;
    if (trainType) filter.trainType = trainType;
    
    const routes = await Route.find(filter);
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRoute = async (req, res) => {
  try {
    await Route.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
