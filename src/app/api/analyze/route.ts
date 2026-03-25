import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { generateVibe } from '@/lib/ai'
import { saveResult } from '@/lib/result-store'
import type { AnalyzeApiResponse, VibeResult } from '@/lib/types'

export async function POST(request: Request): Promise<NextResponse<AnalyzeApiResponse>> {
  try {
    const body = (await request.json()) as { answers?: string[] }

    if (!body.answers || !Array.isArray(body.answers) || body.answers.length !== 5) {
      return NextResponse.json(
        { success: false, error: '5つの回答が必要です' },
        { status: 400 },
      )
    }

    const vibeData = await generateVibe(body.answers)

    const result: VibeResult = {
      id: nanoid(10),
      typeName: vibeData.typeName,
      catchCopy: vibeData.catchCopy,
      traits: vibeData.traits,
      themeColor: vibeData.themeColor,
      answers: body.answers,
      createdAt: new Date().toISOString(),
    }

    await saveResult(result)

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'エラーが発生しました'
    console.error('Vibe analysis failed:', error)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
