import type { ChatMessage } from "@repo/types";


export class MessageTransformer {

  private estimateTokens(messages: ChatMessage[]): number {
    return messages.reduce(
      (acc, msg) => acc + Math.ceil(msg.content.length / 4),
      0,
    );
  }

  transform(messages: ChatMessage[], maxTokens: number): ChatMessage[] {
    if (messages.length <= 2) return messages;

    let currentTokens = this.estimateTokens(messages);
    if (currentTokens <= maxTokens) return messages;

    console.log(
      `[MessageTransformer] Prompt (${currentTokens} tokens) exceeds context limit (${maxTokens}). Compressing...`,
    );

    const result = [...messages];


    while (result.length > 2 && currentTokens > maxTokens) {
      const middleIndex = Math.floor(result.length / 2);

      // Remove the middle message.
      const removed = result.splice(middleIndex, 1)[0];
      if (removed) {
        const tokensRemoved = Math.ceil(removed.content.length / 4);
        console.log(
          `[MessageTransformer] Removing message at index ${middleIndex}: Role='${removed.role}', ContentLength=${removed.content.length}, EstTokens=${tokensRemoved}`,
        );
        currentTokens -= tokensRemoved;
      }
    }

    console.log(
      `[MessageTransformer] Compression complete. Final messages: ${result.length}, Total estimated tokens: ${currentTokens}`,
    );
    return result;
  }
}

export const messageTransformer = new MessageTransformer();
