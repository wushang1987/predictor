// agent.ts

// IMPORTANT - Add your API keys here. Be careful not to publish them.
import { ChatDeepSeek } from "@langchain/deepseek";

import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

// Define the tools for the agent to use
const agentTools = [new TavilySearchResults({ maxResults: 3 })];

import dotenv from "dotenv";
dotenv.config();

const agentModel = new ChatDeepSeek({
    model: "deepseek-chat",
    // model: "deepseek-reasoner",
    temperature: 0,
    apiKey: process.env.DEEPSEEK_API_KEY
    // other params...
});


// Initialize memory to persist state between graph runs
const agentCheckpointer = new MemorySaver();
const agent = createReactAgent({
    llm: agentModel,
    tools: agentTools,
    checkpointSaver: agentCheckpointer,
});

// Now it's time to use!
const agentFinalState = await agent.invoke(
    { messages: [new HumanMessage("what is the current weather in sf")] },
    { configurable: { thread_id: "42" } },
);

console.log(
    agentFinalState.messages[agentFinalState.messages.length - 1].content,
);

const agentNextState = await agent.invoke(
    { messages: [new HumanMessage("what about ny")] },
    { configurable: { thread_id: "42" } },
);

console.log(
    agentNextState.messages[agentNextState.messages.length - 1].content,
);