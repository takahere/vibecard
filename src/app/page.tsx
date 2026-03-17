import { QuizFlow } from '@/components/quiz-flow'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="flex w-full flex-col items-center px-4 pt-16 pb-8 sm:pt-24 sm:pb-12">
        <div className="flex max-w-md flex-col items-center gap-5 text-center">
          <div className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-400">
            無料 &middot; 登録不要 &middot; 30秒で完了
          </div>
          <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl">
            あなたの
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
              Vibeを診断
            </span>
          </h1>
          <p className="max-w-sm text-base leading-relaxed text-zinc-400">
            5つの質問に答えるだけ。AIがあなただけの性格タイプを分析し、シェアできるカードを生成します。
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="w-full flex-1 px-4 pb-16">
        <QuizFlow />
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800/60 px-4 py-6">
        <p className="text-center text-xs text-zinc-600">
          VibeCard &middot; AIで性格診断
        </p>
      </footer>
    </div>
  )
}
