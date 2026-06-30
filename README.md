# IntegrateWise AI Chat Gateway

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

IntegrateWise is a Nuxt AI chat application that keeps agents decoupled from individual inference providers. It uses the AI SDK for streaming chat, while the product architecture treats Cloudflare AI (Modelflare), Hugging Face, OpenAI, Anthropic, Gemini, and local models as interchangeable execution engines behind an IntegrateWise AI Gateway.

```text
                IntegrateWise Gateway
                        │
        ┌───────────────┼────────────────┐
        │               │                │
   Cloudflare AI     Hugging Face     Local Models
    (Modelflare)      Inference          (optional)
        │               │
        └────── OpenAI Compatible ──────┘
                        │
                  ADK / MCP / Agents
                        │
                 Digital Memory Spine
```

## Features

- ⚡️ **Streaming AI messages** powered by the [AI SDK](https://ai-sdk.dev) with thinking/reasoning support
- 🧭 **Gateway-first model access** so agents request capabilities instead of depending on one provider
- 🔁 **Provider interchangeability** across Cloudflare AI, Hugging Face, OpenAI, Anthropic, Gemini, and local models
- 🔍 **Web search** with built-in provider tools (Anthropic, OpenAI)
- 📊 **Charts and weather** tool calling with rich UI rendering
- 🔐 **Authentication** via GitHub OAuth using [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils)
- 💾 **Chat history persistence** using SQLite database ([Turso](https://turso.tech) in production) and [Drizzle ORM](https://orm.drizzle.team)
- 📎 **File uploads** with drag & drop using [NuxtHub Blob](https://hub.nuxt.com/docs/blob) (requires authentication)
- ✨ **Markdown rendering** with streaming code highlighting via [Comark](https://comark.dev)

## IntegrateWise Doctrine

The platform should never be coupled to a single model or inference provider.

```text
Truth
    │
Digital Memory Spine
    │
AI Gateway
    │
Capabilities
    │
Providers
        ├── Cloudflare AI (Modelflare)
        ├── Hugging Face
        ├── OpenAI
        ├── Anthropic
        ├── Gemini
        └── Local Models
```

> **Truth you own. AI you rent. Approval in between.**

The Digital Memory Spine, AI Gateway, ADK, MCP, and governance layer remain permanent architecture. Providers are replaceable execution engines.

## Gateway Policy

Agents must not call inference providers directly. They call the IntegrateWise AI Gateway, and the gateway decides the model, provider, fallback, retry strategy, cost controls, latency profile, governance checks, and logging.

```text
Agent
   │
   ▼
IntegrateWise AI Gateway
   │
   ├── Cloudflare AI
   ├── Hugging Face
   ├── OpenAI
   ├── Anthropic
   ├── Gemini
   ├── Local Models
   └── Future Providers
```

Agents request capabilities such as:

```text
reason()
extract()
embed()
rerank()
summarize()
vision()
code()
```

The gateway maps those capabilities to the best provider for the workload.

## Provider Roles

### Cloudflare AI (Modelflare)

Use Cloudflare AI for low-latency inference, edge-native execution, global deployment, production workloads, small and medium reasoning models, embeddings, classification, extraction, and structured outputs.

It is a good primary provider for entity extraction, schema synthesis, governance checks, routing, AI workers, and background intelligence.

Typical model families include Llama 3.x, Qwen 3, DeepSeek, Mistral, Gemma, embedding models, and rerank models.

### Hugging Face

Use Hugging Face for the latest open models, specialized models, vision, OCR, speech, experimental reasoning, and fine-tuned enterprise models.

It is the long-tail provider whenever Cloudflare AI does not host the model required by a capability.

Example model families include Qwen, DeepSeek, Mistral, Phi, Granite, Gemma, ModernBERT, Jina embeddings, BGE embeddings, and ColBERT rerankers.

## Recommended Capability Mapping

| Capability | Primary | Fallback |
| --- | --- | --- |
| Reasoning | Cloudflare AI | Hugging Face |
| Code | Cloudflare AI | Hugging Face |
| Embeddings | Cloudflare AI | Hugging Face |
| Reranking | Cloudflare AI | Hugging Face |
| Vision | Hugging Face | Cloudflare AI |
| OCR | Hugging Face | Cloudflare AI |
| Speech | Hugging Face | Cloudflare AI |
| Schema AI | Cloudflare AI | Hugging Face |
| Entity360 Synthesis | Cloudflare AI | Hugging Face |

## Quick Start

Make sure to install the dependencies:

```bash
pnpm install
```

Run database migrations:

```bash
pnpm db:migrate
```

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Setup

### AI Integration

This application uses the [Vercel AI SDK](https://ai-sdk.dev/) for streaming AI responses. The IntegrateWise architecture keeps provider selection behind a gateway boundary so the app can add Cloudflare AI, Hugging Face, OpenAI, Anthropic, Gemini, local models, and future providers without coupling agent code to provider-specific APIs.

For local development, set your API key in `.env`:

```bash
AI_GATEWAY_API_KEY=<your-ai-gateway-api-key>
```

### Authentication (Optional)

This template uses [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils) for authentication with GitHub OAuth.

To enable authentication, [create a GitHub OAuth application](https://github.com/settings/applications/new) and set:

```bash
NUXT_OAUTH_GITHUB_CLIENT_ID=<your-github-oauth-app-client-id>
NUXT_OAUTH_GITHUB_CLIENT_SECRET=<your-github-oauth-app-client-secret>
NUXT_SESSION_PASSWORD=<your-password-minimum-32-characters>
```

### Blob Storage (Optional)

This template uses [NuxtHub Blob](https://hub.nuxt.com/docs/blob) for file uploads, which supports multiple storage drivers:

- **Local filesystem** (default for development, stored in `.data/blob`)
- **[Vercel Blob](https://vercel.com/docs/vercel-blob)** (auto-configured when deployed to Vercel)
- **[Cloudflare R2](https://hub.nuxt.com/docs/blob#set-a-driver)** (when deployed to Cloudflare)
- **[Amazon S3](https://hub.nuxt.com/docs/blob#set-a-driver)** (with manual configuration)

For **Vercel Blob**, assign a Blob Store to your project from the Vercel dashboard (Project → Storage), then set the token for local development:

```bash
BLOB_READ_WRITE_TOKEN=<your-vercel-blob-token>
```

> [!NOTE]
> File uploads require authentication. See the [NuxtHub Blob documentation](https://hub.nuxt.com/docs/blob#set-a-driver) for configuring other storage drivers.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.
