import express from "express";

import {
  createTimestamp,
  addNewTimeseries,
  updateTimeseries,
  deleteTimestamp,
  aggregateTotalHours,
  getAllTimestamps
} from "../controllers/timestampController.js";

const router = express.Router();



router.get("/", getAllTimestamps);

/**
 * Create new timestamp
 * POST /api/timestamp
 */
router.post("/", createTimestamp);

/**
 * Get all timestamps (we'll implement later if needed)
 * GET /api/timestamp
 */
// router.get("/", getAllTimestamps);

/**
 * Start new timeseries (start session)
 * POST /api/timestamp/:timestampId/start
 */
router.post("/:timestampId/start", addNewTimeseries);

/**
 * Stop timeseries (end session)
 * PUT /api/timeseries/:timeseriesId/stop
 */
router.put("/timeseries/:timeseriesId/stop", updateTimeseries);

/**
 * Delete timestamp
 * DELETE /api/timestamp/:timestampId
 */
router.delete("/:timestampId", deleteTimestamp);

/**
 * Recalculate total hours (aggregation backup)
 * GET /api/timestamp/:timestampId/aggregate
 */
router.get("/:timestampId/aggregate", aggregateTotalHours);

export default router;