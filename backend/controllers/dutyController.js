import DriverDuty from "../models/DriverDuty.js";

const normalizeTrainType = (value) => {
  if (value === undefined || value === null) return undefined;
  const v = String(value).toLowerCase().trim();
  if (v.includes('up')) return 'UP';
  if (v.includes('dn') || v.includes('dl') || v.includes('down')) return 'DN';
  return null;
};

export const addDuty = async (req, res) => {
  try {
    const body = { ...req.body };
    const normalized = normalizeTrainType(body.trainType);
    if (normalized === null) return res.status(400).json({ error: 'Invalid trainType' });
    if (normalized !== undefined) body.trainType = normalized;

    const duty = await DriverDuty.create(body);
    res.json(duty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDuties = async (req, res) => {
  const { date, driver, train } = req.query;

  let filter = {};
  if (date) filter.date = new Date(date);
  if (driver) filter.driverName = new RegExp(driver, "i");
  if (train) filter.trainNumber = train;

  const duties = await DriverDuty.find(filter).sort({ dutyTime: 1 });
  res.json(duties);
};

export const updateDuty = async (req, res) => {
  try {
    const body = { ...req.body };
    const normalized = normalizeTrainType(body.trainType);
    if (normalized === null) return res.status(400).json({ error: 'Invalid trainType' });
    if (normalized !== undefined) body.trainType = normalized;

    const duty = await DriverDuty.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true }
    );
    res.json(duty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDuty = async (req, res) => {
  try {
    await DriverDuty.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
