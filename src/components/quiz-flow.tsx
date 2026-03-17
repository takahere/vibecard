'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/lib/questions'

const ANALYZING_MESSAGES = [
  'あなたの回答を分析中...',
  '性格パターンを読み解いています...',
  'ユニークなタイプを生成中...',
  'カードをデザインしています...',
  'もうすぐ完成...',
]

export function QuizFlow() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingMessage, setLoadingMessage] = useState(ANALYZING_MESSAGES[0])
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in')

  const question = QUESTIONS[currentStep]

  const handleSelect = async (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentStep < QUESTIONS.length - 1) {
      setFadeState('out')
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        setFadeState('in')
      }, 200)
    } else {
      setLoading(true)
      setError(null)

      let messageIndex = 0
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % ANALYZING_MESSAGES.length
        setLoadingMessage(ANALYZING_MESSAGES[messageIndex])
      }, 1500)

      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers }),
        })

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || '分析に失敗しました')
        }

        router.push(`/result/${data.data.id}`)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました')
        setLoading(false)
      } finally {
        clearInterval(interval)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-zinc-700 border-t-violet-500" />
          <span className="animate-pulse text-5xl">✨</span>
        </div>
        <p className="animate-pulse text-center text-sm text-zinc-400">{loadingMessage}</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      {/* Progress Bar */}
      <div className="mb-8 flex w-full max-w-md items-center gap-2">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= currentStep ? '#8b5cf6' : '#27272a',
            }}
          />
        ))}
      </div>

      {/* Question Counter */}
      <p className="mb-3 text-sm font-medium text-zinc-500">
        {currentStep + 1} / {QUESTIONS.length}
      </p>

      {/* Question */}
      <div
        className={`w-full max-w-md transition-all duration-200 ${
          fadeState === 'in' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <h2 className="mb-8 text-center text-2xl font-bold text-zinc-100">{question.text}</h2>

        <div className="flex flex-col gap-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => void handleSelect(option.value)}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-5 py-4 text-left text-base text-zinc-200 transition-all hover:scale-[1.02] hover:border-violet-500/50 hover:bg-zinc-800/80 active:scale-[0.98]"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mt-6 text-center text-sm text-red-400">{error}</p>}
    </div>
  )
}
