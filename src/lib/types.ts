export interface Question {
  readonly id: number
  readonly text: string
  readonly options: readonly QuestionOption[]
}

export interface QuestionOption {
  readonly label: string
  readonly value: string
}

export interface VibeResult {
  readonly id: string
  readonly typeName: string
  readonly catchCopy: string
  readonly traits: readonly [string, string, string]
  readonly themeColor: string
  readonly answers: readonly string[]
  readonly createdAt: string
}

export interface AnalyzeApiResponse {
  readonly success: boolean
  readonly data?: VibeResult
  readonly error?: string
}
