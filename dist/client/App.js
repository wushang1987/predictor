"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const axios_1 = __importDefault(require("axios"));
const TOPIC = "预测美国2025中期选举";
function App() {
    const [predictions, setPredictions] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        axios_1.default.get("/api/predictions").then((res) => {
            setPredictions(res.data);
        });
    }, []);
    return ((0, jsx_runtime_1.jsxs)(material_1.Container, { maxWidth: "md", sx: { mt: 4 }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h4", gutterBottom: true, align: "center", children: TOPIC }), (0, jsx_runtime_1.jsx)(material_1.Box, { display: "flex", flexDirection: "column", gap: 2, children: predictions.map((p) => ((0, jsx_runtime_1.jsx)(material_1.Card, { children: (0, jsx_runtime_1.jsxs)(material_1.CardContent, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body1", children: p.content }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "caption", color: "text.secondary", children: new Date(p.createdAt).toLocaleString() })] }) }, p._id))) })] }));
}
exports.default = App;
