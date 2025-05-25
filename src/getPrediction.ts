import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function getPrediction(): Promise<string> {
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
