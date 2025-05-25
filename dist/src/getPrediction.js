"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrediction = getPrediction;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.default({
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.OPENAI_API_KEY,
});
async function getPrediction() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "请预测美国2025中期选举" }],
        model: "deepseek-chat",
    });
    const content = completion.choices[0].message.content;
    return content ?? "";
}
if (require.main === module) {
    getPrediction().then(console.log);
}
