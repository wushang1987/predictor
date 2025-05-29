// Note: tslab only works inside a jupyter notebook. Don't worry about running this code yourself!
import * as tslab from "tslab";

import { agent } from './deepseek-langGraph2';
import { writeFileSync } from "node:fs";

const graph = agent.getGraph();
// const image = await graph.drawMermaidPng();
// const arrayBuffer = await image.arrayBuffer();

// await tslab.display.png(new Uint8Array(arrayBuffer));

// import { writeFileSync } from "node:fs";

const graphStateImage = await graph.drawMermaidPng();
const graphStateArrayBuffer = await graphStateImage.arrayBuffer();

const filePath = "./graphState.png";
writeFileSync(filePath, new Uint8Array(graphStateArrayBuffer));