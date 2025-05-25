"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const node_cron_1 = __importDefault(require("node-cron"));
const cors_1 = __importDefault(require("cors"));
const getPrediction_1 = require("./getPrediction");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// MongoDB connection
mongoose_1.default.connect(`${process.env.MONGODB}/predictions`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
// Prediction schema
const predictionSchema = new mongoose_1.default.Schema({
    content: String,
    createdAt: { type: Date, default: Date.now },
});
const Prediction = mongoose_1.default.model("Prediction", predictionSchema);
// Schedule getPrediction at 1:00 a.m. every day
node_cron_1.default.schedule("0 1 * * *", async () => {
    try {
        const content = await (0, getPrediction_1.getPrediction)();
        await Prediction.create({ content });
        console.log("Prediction saved at 1:00 a.m.");
    }
    catch (err) {
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
        const content = await (0, getPrediction_1.getPrediction)();
        const prediction = await Prediction.create({ content });
        res.status(201).json(prediction);
    }
    catch (err) {
        res.status(500).json({ error: "Prediction failed" });
    }
});
// Serve static files from client/dist
app.use(express_1.default.static(path_1.default.join(__dirname, "../../dist/client/")));
// Fallback: serve index.html for any non-API route
app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../dist/client/index.html"));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
