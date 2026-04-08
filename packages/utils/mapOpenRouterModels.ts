interface OpenRouterModel {
  id: string
  context_length: number
  architecture?: { tokenizer?: string }
  pricing?: {
    prompt?: string
    completion?: string
    image?: string
    request?: string
    internal_reasoning?: string
    input_cache_read?: string
    web_search?: string
  }
  top_provider?: {
    max_completion_tokens?: number | null
  }
}

export interface ModelCostDetails {
  slug: string
  provider: string
  tokenizer: string

  context_window: number
  max_input_tokens: number
  max_output_tokens: number

  cost_per_token: {
    input: number
    output: number
    reasoning?: number
    cache_read?: number
  }

  cost_per_request: {
    web_search?: number
    request?: number
    image?: number
  }

  worst_case_cost: number
}


function num(v?: string) {
  if (!v) return 0
  return Number(v)
}

export function mapOpenRouterModels(
  models: OpenRouterModel[]
): Record<string, ModelCostDetails> {

  const registry: Record<string, ModelCostDetails> = {}

  for (const m of models) {

    const inputPrice = num(m.pricing?.prompt)
    const outputPrice = num(m.pricing?.completion)

    const reasoningPrice =
      num(m.pricing?.internal_reasoning)

    const cacheReadPrice =
      num(m.pricing?.input_cache_read)

    const webSearchPrice =
      num(m.pricing?.web_search)

    const requestPrice =
      num(m.pricing?.request)

    const imagePrice =
      num(m.pricing?.image)

    const maxInput = m.context_length
    const maxOutput =
      m.top_provider?.max_completion_tokens ?? 4096

    const inputWorst =
      maxInput * inputPrice

    const outputWorst =
      maxOutput * outputPrice

    const reasoningWorst =
      maxOutput * reasoningPrice

    const cacheWorst =
      maxInput * cacheReadPrice

    const totalWorst =
      inputWorst +
      outputWorst +
      reasoningWorst +
      cacheWorst +
      webSearchPrice +
      requestPrice +
      imagePrice

    registry[m.id] = {
      slug: m.id,
      provider: m.id.split("/")[0] || "unknown",

      tokenizer:
        m.architecture?.tokenizer ?? "unknown",

      context_window: m.context_length,
      max_input_tokens: maxInput,
      max_output_tokens: maxOutput,

      cost_per_token: {
        input: inputPrice,
        output: outputPrice,
        reasoning: reasoningPrice || undefined,
        cache_read: cacheReadPrice || undefined
      },

      cost_per_request: {
        web_search: webSearchPrice || undefined,
        request: requestPrice || undefined,
        image: imagePrice || undefined
      },

      worst_case_cost: totalWorst
    }
  }

  return registry
}

