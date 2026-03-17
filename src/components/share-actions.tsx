'use client'

import { useState } from 'react'
import type { VibeResult } from '@/lib/types'

interface ShareActionsProps {
  readonly result: VibeResult
}

export function ShareActions({ result }: ShareActionsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const tweetText = `わたしのVibeは「${result.typeName}」✨\n\n${result.catchCopy}\n\nあなたのVibeは？`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-bold text-white ring-1 ring-zinc-700 transition-all hover:ring-zinc-500 hover:scale-[1.02] active:scale-[0.98]"
      >
        𝕏 でシェアする
      </a>
      <button
        onClick={() => void handleCopy()}
        className="rounded-2xl border border-zinc-700 px-6 py-4 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-white active:scale-[0.98]"
      >
        {copied ? '✅ コピーしました！' : '📋 リンクをコピー'}
      </button>
      <a
        href="/"
        className="rounded-2xl bg-violet-600 px-6 py-4 text-center text-sm font-semibold text-white transition-all hover:bg-violet-700 hover:scale-[1.02] active:scale-[0.98]"
      >
        ✨ もう一度診断する
      </a>
    </div>
  )
}
