import { getPrediction } from "../src/getPrediction";

describe("getPrediction", () => {
    it(
        "should return a prediction string",
        async () => {
            const result = await getPrediction();
            expect(typeof result).toBe("string");
            expect(result.length).toBeGreaterThan(0);
        },
        60000 // Set timeout for this test to 60 seconds
    );
});
