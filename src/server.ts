import express from "express";
import mongoose from "mongoose";
import cron from "node-cron";
import cors from "cors";
import { getPrediction } from "./getPrediction";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(`${process.env.MONGODB}/predictions`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as any)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Prediction schema
const predictionSchema = new mongoose.Schema({
    content: String,
    createdAt: { type: Date, default: Date.now },
});
const Prediction = mongoose.model("Prediction", predictionSchema);

// Schedule getPrediction at 1:00 a.m. every day
cron.schedule("0 1 * * *", async () => {
    try {
        const content = await getPrediction();
        await Prediction.create({ content });
        console.log("Prediction saved at 1:00 a.m.");
    } catch (err) {
        console.error("Prediction error:", err);
    }
});

// API to get all predictions
app.get("/api/predictions", async (_req, res) => {
    const predictions = await Prediction.find().sort({ createdAt: -1 });
    res.json(predictions);
});

// API to create a new prediction
app.post("/api/predictions", async (_req, res) => {
    try {
        const content = await getPrediction();
        const prediction = await Prediction.create({ content });
        res.status(201).json(prediction);
    } catch (err) {
        res.status(500).json({ error: "Prediction failed" });
    }
});

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, "../../dist/client/")));

// Fallback: serve index.html for any non-API route
app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../dist/client/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
