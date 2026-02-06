import mongoose from 'mongoose'


export const mongoDBConnect = async () => {


    try {

        const MONGO_URI = process.env.MONGO_URI
        if (!MONGO_URI) throw new error("Database environment variable is not loaded.")
        const connection = await mongoose.connect(MONGO_URI,

            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            // }

        )


        console.log(`MongoDB is Connected. Host: ${connection.connection.host}`);


    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }

}

