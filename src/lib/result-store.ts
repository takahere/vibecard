import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import type { VibeResult } from './types'

const DATA_DIR = join(process.cwd(), 'data', 'results')

async function ensureDir(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true })
}

export async function saveResult(result: VibeResult): Promise<void> {
  await ensureDir()
  const filePath = join(DATA_DIR, `${result.id}.json`)
  await writeFile(filePath, JSON.stringify(result, null, 2), 'utf-8')
}

export async function getResult(id: string): Promise<VibeResult | null> {
  try {
    const filePath = join(DATA_DIR, `${id}.json`)
    const data = await readFile(filePath, 'utf-8')
    return JSON.parse(data) as VibeResult
  } catch {
    return null
  }
}

export async function getRecentResults(limit = 10): Promise<readonly VibeResult[]> {
  try {
    await ensureDir()
    const files = await readdir(DATA_DIR)
    const jsonFiles = files.filter((f) => f.endsWith('.json'))

    const results: VibeResult[] = []
    for (const file of jsonFiles) {
      try {
        const data = await readFile(join(DATA_DIR, file), 'utf-8')
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
