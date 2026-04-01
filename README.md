# AetherRoute

**AetherRoute** is a high-performance, scalable LLM (Large Language Model) routing platform designed to provide a unified interface for multiple AI providers. Much like OpenRouter, AetherRoute abstracts the complexity of managing different AI SDKs, providing a single, OpenAI-compatible gateway for seamless integration with OpenAI, Anthropic, Google, Mistral, and more.

---

## Key Features

- **Unified API Gateway**: Access 300+ models from top providers through a single OpenAI-compatible endpoint.
- **Provider Abstraction**: Switch between models (e.g., GPT-4 to Claude 3) by simply changing a single parameter in your request.
- **Streaming Support**: Native support for Server-Sent Events (SSE) to enable real-time token streaming.
- **Intelligent Rate Limiting**: Built-in protection against API abuse and efficient quota management.
- **Secure Key Management**: Multi-tenant architecture for secure storage and rotation of provider API keys.
- **Usage Monitoring**: Comprehensive dashboard for tracking token consumption, latency, and cost across all models.
- **API Key Caching**: High-performance caching layer to minimize database overhead and reduce request latency.

---

## Tech Stack

### **Frontend (Dashboard)**
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS & CSS Modules
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### **Backend (Microservices)**
- **Runtime**: [Node.js](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Monorepo Management**: [Turborepo](https://turbo.build/)

### **Database & Infrastructure**
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **State Management**: React Hooks & Context API

---

## Architecture

AetherRoute is built as a monorepo using **Turborepo**, ensuring a clean separation of concerns and efficient code sharing:

- **`apps/dashboard`**: A modern Next.js web application for users to manage API keys, monitor usage, and explore available models.
- **`apps/api-backend`**: The core routing engine that handles incoming OpenAI-compatible requests and proxies them to the respective providers.
- **`apps/primary-backend`**: Management service for user authentication, billing, and organizational settings.
- **`packages/db`**: Shared Prisma client and database schema used across all microservices.
- **`packages/ui`**: Shared React component library for consistent UI across the platform.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/AetherRoute.git
   cd AetherRoute
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root and relevant apps based on `.env.example`.

4. **Initialize the Database:**
   ```bash
   npx turbo run db:generate
   npx turbo run db:push
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   - Dashboard: `http://localhost:3000`
   - API Gateway: `http://localhost:4000`

---

## API Usage

AetherRoute is designed to be a drop-in replacement for OpenAI.

### Python Example
```python
from openai import OpenAI

client = OpenAI(
  base_url="https://api.aetherroute.dev/v1",
  api_key="your-aether-key"
)

response = client.chat.completions.create(
  model="anthropic/claude-3-sonnet",
  messages=[{"role": "user", "content": "Hello!"}]
)
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**Manas Vivek Saxena**
- GitHub: [@manasviveksaxena](https://github.com/manasviveksaxena)
- LinkedIn: [Your Profile Link]
