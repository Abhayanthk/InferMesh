import { mapOpenRouterModels } from './mapOpenRouterModels';
import openrouterModelRegistry from './openrouter_model_registry.json';

export const modelRegistry = mapOpenRouterModels(openrouterModelRegistry.data)
// console.log(modelRegistry)



// 'openai/gpt-3.5-turbo': {
//     slug: 'openai/gpt-3.5-turbo',
//     provider: 'openai',
//     tokenizer: 'GPT',
//     context_window: 16385,
//     max_input_tokens: 16385,
//     max_output_tokens: 4096,
//     cost_per_token: {
//       input: 5e-7,
//       output: 0.0000015,
//       reasoning: undefined,
//       cache_read: undefined
//     },
//     cost_per_request: { web_search: undefined, request: undefined, image: undefined },
//     worst_case_cost: 0.0143365
//   }
