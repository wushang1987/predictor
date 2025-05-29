import { ChatDeepSeek } from "@langchain/deepseek";
import dotenv from "dotenv";
dotenv.config();

const deepseekModel = new ChatDeepSeek({
    model: "deepseek-chat",
    // model: "deepseek-reasoner",
    temperature: 0,
    apiKey: process.env.DEEPSEEK_API_KEY
    // other params...
});

export default deepseekModel;