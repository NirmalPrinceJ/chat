export type AiCapability
  = | 'reason'
    | 'extract'
    | 'embed'
    | 'rerank'
    | 'summarize'
    | 'vision'
    | 'ocr'
    | 'speech'
    | 'code'
    | 'schema'
    | 'entity360'

export type AiProvider
  = | 'cloudflare-ai'
    | 'hugging-face'
    | 'openai'
    | 'anthropic'
    | 'gemini'
    | 'local'

export interface CapabilityRoute {
  capability: AiCapability
  primary: AiProvider
  fallback: AiProvider
}

export const CAPABILITY_ROUTES: CapabilityRoute[] = [
  { capability: 'reason', primary: 'cloudflare-ai', fallback: 'hugging-face' },
  { capability: 'code', primary: 'cloudflare-ai', fallback: 'hugging-face' },
  { capability: 'embed', primary: 'cloudflare-ai', fallback: 'hugging-face' },
  { capability: 'rerank', primary: 'cloudflare-ai', fallback: 'hugging-face' },
  { capability: 'summarize', primary: 'cloudflare-ai', fallback: 'hugging-face' },
  { capability: 'vision', primary: 'hugging-face', fallback: 'cloudflare-ai' },
  { capability: 'ocr', primary: 'hugging-face', fallback: 'cloudflare-ai' },
  { capability: 'speech', primary: 'hugging-face', fallback: 'cloudflare-ai' },
  { capability: 'schema', primary: 'cloudflare-ai', fallback: 'hugging-face' },
  { capability: 'extract', primary: 'cloudflare-ai', fallback: 'hugging-face' },
  { capability: 'entity360', primary: 'cloudflare-ai', fallback: 'hugging-face' }
]

export function getCapabilityRoute(capability: AiCapability) {
  return CAPABILITY_ROUTES.find(route => route.capability === capability)
}
