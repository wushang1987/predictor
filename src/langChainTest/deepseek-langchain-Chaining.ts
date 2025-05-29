import { ChatDeepSeek } from "@langchain/deepseek";
import { ChatPromptTemplate } from "@langchain/core/prompts";


import dotenv from "dotenv";
dotenv.config();

const llm = new ChatDeepSeek({
    model: "deepseek-chat",
    // model: "deepseek-reasoner",
    temperature: 0,
    apiKey: process.env.DEEPSEEK_API_KEY
    // other params...
});

const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        "You are a helpful assistant that translates {input_language} to {output_language}.",
    ],
    ["human", "{input}"],
]);


async function main() {
    const chain = prompt.pipe(llm);
    const aiMsg = await chain.invoke({
        input_language: "English",
        output_language: "Chinese",
        input: "I love programming.",
    });
    console.log(aiMsg.content);
}

main();