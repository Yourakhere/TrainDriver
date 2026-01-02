import DriverStatus from "../models/DriverStatus.js";

export const addStatus = async (req, res) => {
  try {
    const body = { ...req.body };
    const status = await DriverStatus.create(body);
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStatus = async (req, res) => {
  try {
    const data = await DriverStatus.find(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
