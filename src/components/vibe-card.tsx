'use client'

import type { VibeResult } from '@/lib/types'

interface VibeCardProps {
  readonly result: VibeResult
}

export function VibeCard({ result }: VibeCardProps) {
  return (
    <div
      className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${result.themeColor}22 0%, #09090b 50%, ${result.themeColor}11 100%)`,
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: `${result.themeColor}30` }}
      />
      <div
        className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: `${result.themeColor}20` }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-6 text-center">
        {/* Logo */}
        <p className="text-xs font-medium tracking-widest text-zinc-500 uppercase">VibeCard</p>

        {/* Type name */}
        <div>
          <h2
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: result.themeColor }}
          >
            {result.typeName}
          </h2>
          <p className="mt-2 text-sm text-zinc-400">{result.catchCopy}</p>
        </div>

        {/* Divider */}
        <div
          className="h-px w-16"
          style={{ backgroundColor: `${result.themeColor}40` }}
        />

        {/* Traits */}
        <div className="flex w-full flex-col gap-3">
          {result.traits.map((trait, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm text-zinc-300"
            >
              {trait}
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-2 text-xs text-zinc-600">vibecard.app</p>
      </div>
    </div>
  )
}
