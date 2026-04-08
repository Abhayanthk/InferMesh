/**
 * Shared logic to build a model→provider map from any OpenRouter JSON dataset.
 * Each model entry is keyed by the model name (part after "/") and stores
 * the slugPrefix (part before "/") along with the full provider object.
 */
export function buildModelProviderMap(models: any[]) {

  const map: Record<string, { slugPrefix: string; provider: any }[]> = {}

  for (const m of models) {

    const fullSlug: string = m.slug ?? ""
    const slashIndex = fullSlug.indexOf("/")

    const slugPrefix = slashIndex !== -1 ? fullSlug.slice(0, slashIndex) : ""
    const modelName  = slashIndex !== -1 ? fullSlug.slice(slashIndex + 1) : fullSlug

    // grab the entire provider object from the endpoint
    const provider = m?.endpoint?.provider_info ?? m?.endpoint ?? null

    if (!map[modelName]) {
      map[modelName] = []
    }

    map[modelName].push({ slugPrefix, provider })
  }

  return map
}
