import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getResult } from '@/lib/result-store'
import { VibeCard } from '@/components/vibe-card'
import { ShareActions } from '@/components/share-actions'

interface ResultPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ResultPageProps): Promise<Metadata> {
  const { id } = await params
  const result = await getResult(id)

  if (!result) {
    return { title: '結果が見つかりません' }
  }

  return {
    title: `${result.typeName} — VibeCard`,
    description: result.catchCopy,
    openGraph: {
      title: `わたしのVibeは「${result.typeName}」✨`,
      description: result.catchCopy,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `わたしのVibeは「${result.typeName}」✨`,
      description: result.catchCopy,
    },
  }
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params
  const result = await getResult(id)

  if (!result) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <p className="mb-2 text-sm text-zinc-500">あなたの診断結果</p>
          <h1 className="text-2xl font-bold text-zinc-100">VibeCard</h1>
        </div>

        <VibeCard result={result} />

        <ShareActions result={result} />
      </div>

      <footer className="mt-16 pb-8 text-xs text-zinc-600">
        VibeCard &middot; AIで性格診断
      </footer>
    </div>
  )
}
