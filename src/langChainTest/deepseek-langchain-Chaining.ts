import { ChatPromptTemplate } from "@langchain/core/prompts";
import deepseekModel from "./common/deepseekModel";

const llm = deepseekModel;

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