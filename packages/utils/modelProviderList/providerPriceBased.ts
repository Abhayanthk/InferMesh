import { buildModelProviderMap } from "./shared.ts"

/**
 * Build a model→provider map from price-sorted data.
 * Models are ordered by price (cheapest first) in the source JSON.
 */
export function buildModelProviderPriceMap(models: any[]) {
  return buildModelProviderMap(models)
}
