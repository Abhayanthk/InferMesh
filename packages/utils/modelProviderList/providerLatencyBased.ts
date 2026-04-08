import { buildModelProviderMap } from "./shared.ts"

/**
 * Build a model→provider map from latency-sorted data.
 * Models are ordered by latency (fastest first) in the source JSON.
 */
export function buildModelProviderLatencyMap(models: any[]) {
  return buildModelProviderMap(models)
}