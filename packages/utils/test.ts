import { buildModelProviderLatencyMap } from "./modelProviderList/providerLatencyBased.ts";
import { buildModelProviderPriceMap } from "./modelProviderList/providerPriceBased.ts";
import { buildModelProviderThroughputMap } from "./modelProviderList/providerThroughputBased.ts";
import latencyModelInfo from "../data/latency.json" with { type: "json" };
import priceModelInfo from "../data/price.json" with { type: "json" };
import throughputModelInfo from "../data/throughput.json" with { type: "json" };
import { writeFileSync } from "fs";

const latencyMap = buildModelProviderLatencyMap((latencyModelInfo as any).data.models);
const priceMap = buildModelProviderPriceMap((priceModelInfo as any).data.models);
const throughputMap = buildModelProviderThroughputMap((throughputModelInfo as any).data.models);

const output = {
  latency: latencyMap,
  price: priceMap,
  throughput: throughputMap,
};

// Write to file so you can see everything (no terminal truncation)
writeFileSync("output.json", JSON.stringify(priceMap, null, 2));
console.log("✅ Written to output.json");
console.log(`  Latency models: ${Object.keys(latencyMap).length}`);
console.log(`  Price models: ${Object.keys(priceMap).length}`);
console.log(`  Throughput models: ${Object.keys(throughputMap).length}`);

//  npx ts-node --esm utils/test.ts for running