import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import deepseekModel from "./common/deepseekModel";


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



export const agent = createReactAgent({
    llm: deepseekModel,
    tools: [search],
});

const result = await agent.invoke(
    {
        messages: [{
            role: "user",
            content: "what is the weather in beijing"
        }]
    }
);

console.log(result);