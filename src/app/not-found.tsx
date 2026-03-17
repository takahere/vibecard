export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <span className="text-6xl">🔮</span>
      <h2 className="mt-6 text-2xl font-bold text-zinc-100">ページが見つかりません</h2>
      <p className="mt-2 text-sm text-zinc-400">
        お探しのページは存在しないか、削除されました。
      </p>
      <a
        href="/"
        className="mt-8 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
      >
        診断を始める
      </a>
    </div>
  )
}
