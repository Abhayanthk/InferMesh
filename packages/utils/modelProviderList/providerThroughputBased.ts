import { buildModelProviderMap } from "./shared.ts"

/**
 * Build a model→provider map from throughput-sorted data.
 * Models are ordered by throughput (highest first) in the source JSON.
 */
export function buildModelProviderThroughputMap(models: any[]) {
  return buildModelProviderMap(models)
}
