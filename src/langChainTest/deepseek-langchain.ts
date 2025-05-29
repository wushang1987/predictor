import { ChatDeepSeek } from "@langchain/deepseek";
import dotenv from "dotenv";
dotenv.config();

const llm = new ChatDeepSeek({
    model: "deepseek-chat",
    // model: "deepseek-reasoner",
    temperature: 0,
    apiKey: process.env.DEEPSEEK_API_KEY
    // other params...
});


async function main() {
    const aiMsg = await llm.invoke([
        [
            "system",
            "You are a helpful assistant that translates English to French. Translate the user sentence.",
        ],
        ["human", "I love programming."],
    ]);
    console.log(aiMsg.content);
}

main();