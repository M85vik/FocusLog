import {model, Schema} from 'mongoose'


const timeseriesSchema = new Schema(
    {
        hours:{
            type:Number,
            default:0
        },

        startTime:{
            type:Date
        },

        endTime:{
            type:Date
        }
    }
)


const Timeseries = model("Timeseries", timeseriesSchema);


export default Timeseries