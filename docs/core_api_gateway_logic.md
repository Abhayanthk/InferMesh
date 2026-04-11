# API Gateway Core Architecture

This diagram highlights the main routing, fallback, and tracking logic of the API implementation. It removes boilerplate components to focus on the application's unique value proposition.

```mermaid
classDiagram
    direction TB

    class ApiGateway {
        <<Express Server Entrypoint>>
        -app: Express
        -port: number
        +start() void
        -handleChatCompletions(req, res) Promise
    }

    class LLMRouter {
        <<Core Orchestrator>>
        -providers: Map~string, AIProvider~
        -retryHandler: RetryHandler
        +callLlm(normalized: NormalizedChatRequest) Promise
        -executeWithRetry(provider, model, req, collector) Promise
    }

    class AIProvider {
        <<Interface>>
        +providerName: string
        +generateChat(modelSlug, messages, options, apiKey) Promise
    }

    class TelemetryCollector {
        <<Observability Engine>>
        -run: Run
        +startStep(model, provider, req) number
        +completeStep(stepIndex, response) void
        +failStep(stepIndex, error) void
        +completeRun(response) void
        +failRun(error) void
    }

    class RetryHandler {
        <<Resiliency Layer>>
        +maxAttempts: number
        +computeDelay(attempt) number
        +sleep(ms) Promise
    }

    class DecisionEngine {
        <<Recovery Logic>>
        +decide(error, attempt, maxAttempts) RouterAction
    }

    class ErrorClassifier {
        <<Mapping Logic>>
        +classifyErrorUniversal(err) Object
    }
    
    class NormalizedChatRequest {
        <<Standardized Payload>>
        +model_slug: string[]
        +messages: ChatMessage[]
        +temperature: number
        +provider: string
    }

    %% End-to-End Flow Relationships
    ApiGateway --> NormalizedChatRequest : 1. Parses HTTP into
    ApiGateway --> LLMRouter : 2. Injects Payload into callLlm()
    
    LLMRouter *-- TelemetryCollector : 3. Initializes to track Run/Steps
    LLMRouter o-- AIProvider : 4. Selects implementation & executes
    
    LLMRouter *-- RetryHandler : 5. Manages transient delays locally
    LLMRouter ..> DecisionEngine : 6. On Error - Checks execution action
    DecisionEngine ..> ErrorClassifier : 7. Resolves HTTP faults to buckets
    
    AIProvider <|.. GeminiProvider
    AIProvider <|.. OpenAIProvider
    AIProvider <|.. AnthropicProvider
    AIProvider <|.. BedrockProvider
    AIProvider <|.. GrokProvider
```
