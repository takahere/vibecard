import type { VibeResult } from './types'

const useKV = !!process.env.KV_REST_API_URL

const RESULT_PREFIX = 'result:'
const TTL_SECONDS = 86400 * 30 // 30 days

// ---------------------------------------------------------------------------
// Vercel KV (Upstash Redis) store
// ---------------------------------------------------------------------------

async function kvStore() {
  const { kv } = await import('@vercel/kv')
  return kv
}

async function kvSaveResult(result: VibeResult): Promise<void> {
  const store = await kvStore()
  await store.set(`${RESULT_PREFIX}${result.id}`, JSON.stringify(result), {
    ex: TTL_SECONDS,
  })
}

async function kvGetResult(id: string): Promise<VibeResult | null> {
  const store = await kvStore()
  const data = await store.get<string>(`${RESULT_PREFIX}${id}`)
  if (!data) return null
  return typeof data === 'string'
    ? (JSON.parse(data) as VibeResult)
    : (data as unknown as VibeResult)
}

async function kvGetRecentResults(limit: number): Promise<readonly VibeResult[]> {
  const store = await kvStore()
  const keys = await store.keys(`${RESULT_PREFIX}*`)
  if (keys.length === 0) return []

  const pipeline = store.pipeline()
  for (const key of keys) {
    pipeline.get(key)
  }
  const values = await pipeline.exec()

  const results: VibeResult[] = []
  for (const raw of values) {
    if (!raw) continue
    try {
      const parsed: VibeResult =
        typeof raw === 'string' ? (JSON.parse(raw) as VibeResult) : (raw as unknown as VibeResult)
      results.push(parsed)
    } catch {
      // skip corrupted entries
    }
  }

  return results
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

// ---------------------------------------------------------------------------
// File-based store (local development fallback)
// ---------------------------------------------------------------------------

async function fileSaveResult(result: VibeResult): Promise<void> {
  const { writeFile, mkdir } = await import('node:fs/promises')
  const { join } = await import('node:path')
  const dir = join(process.cwd(), 'data', 'results')
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, `${result.id}.json`), JSON.stringify(result, null, 2), 'utf-8')
}

async function fileGetResult(id: string): Promise<VibeResult | null> {
  try {
    const { readFile } = await import('node:fs/promises')
    const { join } = await import('node:path')
    const filePath = join(process.cwd(), 'data', 'results', `${id}.json`)
    const data = await readFile(filePath, 'utf-8')
    return JSON.parse(data) as VibeResult
  } catch {
    return null
  }
}

async function fileGetRecentResults(limit: number): Promise<readonly VibeResult[]> {
  try {
    const { readFile, mkdir, readdir } = await import('node:fs/promises')
    const { join } = await import('node:path')
    const dir = join(process.cwd(), 'data', 'results')
    await mkdir(dir, { recursive: true })
    const files = await readdir(dir)
    const jsonFiles = files.filter((f) => f.endsWith('.json'))

    const results: VibeResult[] = []
    for (const file of jsonFiles) {
      try {
        const data = await readFile(join(dir, file), 'utf-8')
        results.push(JSON.parse(data) as VibeResult)
      } catch {
        // skip corrupted files
      }
    }

    return results
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  } catch {
    return []
  }
}

// ---------------------------------------------------------------------------
// Public API -- auto-selects backend based on KV_REST_API_URL presence
// ---------------------------------------------------------------------------

export async function saveResult(result: VibeResult): Promise<void> {
  return useKV ? kvSaveResult(result) : fileSaveResult(result)
}

export async function getResult(id: string): Promise<VibeResult | null> {
  return useKV ? kvGetResult(id) : fileGetResult(id)
}

export async function getRecentResults(limit = 10): Promise<readonly VibeResult[]> {
  return useKV ? kvGetRecentResults(limit) : fileGetRecentResults(limit)
}
