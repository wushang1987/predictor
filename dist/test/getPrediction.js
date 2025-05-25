"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPrediction_1 = require("../src/getPrediction");
describe("getPrediction", () => {
    it("should return a prediction string", async () => {
        const result = await (0, getPrediction_1.getPrediction)();
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThan(0);
    }, 60000 // Set timeout for this test to 60 seconds
    );
});
