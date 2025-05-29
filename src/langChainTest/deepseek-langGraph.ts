import { ChatDeepSeek } from "@langchain/deepseek";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatAnthropic } from "@langchain/anthropic";
import { tool } from "@langchain/core/tools";

import { z } from "zod";

import dotenv from "dotenv";
dotenv.config();

const model = new ChatDeepSeek({
    model: "deepseek-chat",
    // model: "deepseek-reasoner",
    temperature: 0,
    apiKey: process.env.DEEPSEEK_API_KEY
    // other params...
});



async function main() {
    const search = tool(async ({ query }) => {
        if (query.toLowerCase().includes("sf") || query.toLowerCase().includes("san francisco")) {
            return "It's 60 degrees and foggy."
        }
        return "It's 90 degrees and sunny."
    }, {
        name: "search",
        description: "Call to surf the web.",
        schema: z.object({
            query: z.string().describe("The query to use in your search."),
        }),
    });



    const agent = createReactAgent({
        llm: model,
        tools: [search],
    });

    const result = await agent.invoke(
        {
            messages: [{
                role: "user",
                content: "what is the weather in sf"
            }]
        }
    );

    console.log(result);
}

main();