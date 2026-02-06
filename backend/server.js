import dotenv from 'dotenv'
dotenv.config()
import { mongoDBConnect } from './config/mongoDBConnect.js';
import express from 'express'
import cors from 'cors'
import timestampRoutes from "./routes/timestampRoutes.js"
await mongoDBConnect();

const app = express();

const PORT = process.env.PORT;

if(!PORT) throw new Error("PORT is not loaded.");

app.use(cors())
app.use(express.json());

// Routes
app.use("/api/timestamp", timestampRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(PORT, ()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
    
})


