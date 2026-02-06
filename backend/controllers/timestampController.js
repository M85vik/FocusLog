import Timestamp from "../models/timestampModel.js"
import mongoose from "mongoose";
import Timeseries from "../models/timeSeriesModel.js"
import { getTimeDifference } from "../utils/getTimeDifference.js";

const createTimestamp = async (req, res) => {

  try {

    const { title } = req.body

    const trimmedTitle = title.trim();


    const timestampExisting = await Timestamp.findOne({
      title: trimmedTitle
    })


    if (timestampExisting) throw new Error("Timestamp with this title already exists")


    const ts = await Timeseries.create({
      startTime: new Date()
    });



    const timestamp = await Timestamp.create({
      title: trimmedTitle,
      timeseries: [ts._id]
    })


    if (!timestamp) throw new Error("Error Creating TimeStamp..")


    res.status(201).json({ message: "TimeStamp Created Successfully." })





  } catch (error) {

    console.error(error);
    res.status(501).json({ message: error.message })

  }

}


const getAllTimestamps = async (req, res) => {
  try {
    const timestamps = await Timestamp.find()
      .populate("timeseries")
      .sort({ createdAt: -1 });

    res.status(200).json({
      timestamps: timestamps || []
    });


  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};


const addNewTimeseries = async (req, res) => {
  try {
    const { timestampId } = req.params;

    const timestamp = await Timestamp.findById(timestampId);

    if (!timestamp) {
      return res.status(404).json({ message: "Timestamp not found" });
    }

    const ts = new Timeseries({
      startTime: new Date()
    });

    await ts.save();

    timestamp.timeseries.push(ts._id);

    await timestamp.save();

    res.status(200).json({
      message: "New Timeseries added successfully",
      timestamp
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const updateTimeseries = async (req, res) => {
  try {
    const { timeseriesId } = req.params;

    // 1. Find timeseries
    const timeseries = await Timeseries.findById(timeseriesId);

    if (!timeseries)
      return res.status(404).json({ message: "Timeseries not found" });

    // Prevent double update
    if (timeseries.endTime) {
      return res.status(400).json({
        message: "Session already ended"
      });
    }

    // 2. End session
    const endTime = new Date();

    const durations = getTimeDifference(
      timeseries.startTime,
      endTime
    );

    const hours = durations.hours || 0;

    timeseries.endTime = endTime;
    timeseries.hours = hours;

    await timeseries.save();

    // 3. Find parent Timestamp
    const timestamp = await Timestamp.findOne({
      timeseries: timeseries._id
    });

    if (timestamp) {
      // 4. Add new hours
      timestamp.totalHours =
        (timestamp.totalHours || 0) + hours;

      await timestamp.save();
    }

    res.status(200).json({
      message: "Session ended & total hours updated",
      hoursAdded: hours,
      totalHours: timestamp?.totalHours
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};


const deleteTimestamp = async (req, res) => {
  try {
    const { timestampId } = req.params;

    const timestamp = await Timestamp.findById(timestampId);

    if (!timestamp)
      return res.status(404).json({ message: "Timestamp not found" });

    // Delete all related timeseries first
    await Timeseries.deleteMany({
      _id: { $in: timestamp.timeseries }
    });

    // Delete timestamp
    await Timestamp.findByIdAndDelete(timestampId);

    res.status(200).json({
      message: "Timestamp and related timeseries deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};



const aggregateTotalHours = async (req, res) => {
  try {
    const { timestampId } = req.params;

    const result = await Timestamp.aggregate([
      // 1. Match the timestamp
      {
        $match: {
          _id: new mongoose.Types.ObjectId(timestampId)
        }
      },

      // 2. Join with Timeseries collection
      {
        $lookup: {
          from: "timeseries",          // collection name (plural, lowercase)
          localField: "timeseries",
          foreignField: "_id",
          as: "timeseriesDocs"
        }
      },

      // 3. Unwind array (optional but useful)
      {
        $unwind: "$timeseriesDocs"
      },

      // 4. Group and sum hours
      {
        $group: {
          _id: "$_id",
          totalHours: {
            $sum: "$timeseriesDocs.hours"
          }
        }
      }
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "Timestamp not found" });
    }

    const totalHours = result[0].totalHours || 0;

    // 5. Save back to Timestamp
    await Timestamp.findByIdAndUpdate(timestampId, {
      totalHours
    });

    res.status(200).json({
      message: "Total hours calculated (aggregation)",
      totalHours
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export { getAllTimestamps, createTimestamp, addNewTimeseries, updateTimeseries, deleteTimestamp, aggregateTotalHours };