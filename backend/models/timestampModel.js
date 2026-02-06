import { model, Schema } from 'mongoose'
// import Timeseries from './timeSeriesModel'

const timestampSchema = new Schema(
    {
        title: {
            type: String
        },

        totalHours: {
            type: Number,
            default:0
        },

        timeseries: [
            {
                type: Schema.Types.ObjectId,
                ref: "Timeseries"

            }

        ],

    }
)


const Timestamp = model("Timestamp", timestampSchema)

export default Timestamp