import deepseekModel from "./common/deepseekModel";

const aiMsg = await deepseekModel.invoke([
    [
        "system",
        "You are a helpful assistant that translates English to French. Translate the user sentence.",
    ],
    ["human", "I love programming."],
]);
console.log(aiMsg.content);
