import { ImageResponse } from 'next/og'
import { getResult } from '@/lib/result-store'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface OgImageProps {
  params: Promise<{ id: string }>
}

export default async function OgImage({ params }: OgImageProps) {
  const { id } = await params
  const result = await getResult(id)

  if (!result) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#09090b',
            color: '#a1a1aa',
            fontSize: 32,
          }}
        >
          結果が見つかりません
        </div>
      ),
      { ...size },
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage: `radial-gradient(circle at 30% 30%, ${result.themeColor}22 0%, transparent 50%), radial-gradient(circle at 70% 70%, ${result.themeColor}15 0%, transparent 50%)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <p style={{ fontSize: 16, color: '#71717a', letterSpacing: 4 }}>VIBECARD</p>
          <p
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: result.themeColor,
              lineHeight: 1.1,
            }}
          >
            {result.typeName}
          </p>
          <p style={{ fontSize: 24, color: '#a1a1aa', marginTop: 8 }}>
            {result.catchCopy}
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 32,
            }}
          >
            {result.traits.map((trait, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 24px',
                  borderRadius: 16,
                  backgroundColor: `${result.themeColor}15`,
                  border: `1px solid ${result.themeColor}30`,
                  color: '#d4d4d8',
                  fontSize: 18,
                }}
              >
                {trait}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
