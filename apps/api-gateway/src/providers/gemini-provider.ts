import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { modelRegistry } from "../utils/modelRegistry";

export interface AIProvider {
  providerName: string;
  generateChat(modelSlug: string, messages: any[], options: any, apiKey: string): Promise<any>;
}

function cost_Calculation(modelSlug_old: string, usageMetadata: any){
  const modelSlug = "google/"+ modelSlug_old
  console.log(modelSlug)

  if(!modelRegistry[modelSlug]){
    return 0
  }
    const cost_per_token = modelRegistry[modelSlug].cost_per_token
    console.log("cost_per_token:",cost_per_token)
    console.log("usageMetadata:",usageMetadata)
    const cost = usageMetadata.promptTokenCount * cost_per_token.input + usageMetadata.candidatesTokenCount * cost_per_token.output + (usageMetadata.thoughtsTokenCount||0) * (cost_per_token.reasoning || 0) + (usageMetadata.cacheReadTokenCount||0) * (cost_per_token.cache_read || 0)
    return cost 
    

}


export class GeminiProvider implements AIProvider {
  providerName = "gemini";

  async generateChat(
    modelSlug: string,
    messages: any[],
    options: any,
    apiKey: string
  ): Promise<any> {
    console.log(messages)
    const client = new GoogleGenAI({
      apiKey: apiKey,
    });
    
    const system = messages.find(m => m.role === 'system')?.content || "You are a helpful assistant.";
    const user = messages.filter(m => m.role === 'user').map(m => m.content).join('\n');

    const response = await client.models.generateContent({
      model: modelSlug,
      contents: user,
      config: {
        systemInstruction: system,
      }
    });


    const cost =  cost_Calculation(modelSlug, response.usageMetadata)
    console.log("cost from gemini provider:", cost);

    return response.text;
  }
}

// GenerateContentResponse {
//   sdkHttpResponse: {
//     headers: {
//       'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
//       'content-encoding': 'gzip',
//       'content-type': 'application/json; charset=UTF-8',
//       date: 'Sat, 14 Mar 2026 04:49:31 GMT',
//       server: 'scaffolding on HTTPServer2',
//       'server-timing': 'gfet4t7; dur=781',
//       'transfer-encoding': 'chunked',
//       vary: 'Origin, X-Origin, Referer',
//       'x-content-type-options': 'nosniff',
//       'x-frame-options': 'SAMEORIGIN',
//       'x-xss-protection': '0'
//     }
//   },
//   candidates: [ { content: [Object], finishReason: 'STOP', index: 0 } ],
//   modelVersion: 'gemini-2.5-flash',
//   responseId: '2ui0ae_sMKrVg8UP8tiYwAg',
//   usageMetadata: {
//     promptTokenCount: 8,
//     candidatesTokenCount: 8,
//     totalTokenCount: 39,
//     promptTokensDetails: [ [Object] ],
//     thoughtsTokenCount: 23
//   }
// }