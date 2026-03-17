import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

interface VibeGeneration {
  readonly typeName: string
  readonly catchCopy: string
  readonly traits: readonly [string, string, string]
  readonly themeColor: string
}

const SYSTEM_PROMPT = `あなたは性格診断の専門家です。ユーザーの5つの質問への回答パターンを分析し、ユニークで魅力的な性格タイプを生成します。

生成する性格タイプは:
- SNSでシェアしたくなるようなキャッチーな名前
- 共感できる特徴
- ポジティブで自己肯定感が上がる内容

必ず以下のJSON形式で返してください（マークダウンやコードフェンスなし、生のJSONのみ）:
{
  "typeName": "性格タイプ名（8文字以内、日本語、例: 静寂の戦略家）",
  "catchCopy": "1行キャッチコピー（30字以内）",
  "traits": ["特徴1（20字以内）", "特徴2（20字以内）", "特徴3（20字以内）"],
  "themeColor": "#hex色コード（その性格タイプに合う美しい色）"
}`

export async function generateVibe(answers: readonly string[]): Promise<VibeGeneration> {
  const userPrompt = `以下の5つの質問への回答から性格タイプを分析してください:

1. 理想の休日: ${answers[0]}
2. チームでの役割: ${answers[1]}
3. 好きな時間帯: ${answers[2]}
4. ストレス解消法: ${answers[3]}
5. 理想の働き方: ${answers[4]}

この回答パターンから、ユニークで魅力的な性格タイプを1つ生成してください。`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const textBlock = message.content.find((block) => block.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude')
  }

  const parsed = JSON.parse(textBlock.text) as {
    typeName: string
    catchCopy: string
    traits: [string, string, string]
    themeColor: string
  }

  return {
    typeName: parsed.typeName,
    catchCopy: parsed.catchCopy,
    traits: parsed.traits,
    themeColor: parsed.themeColor,
  }
}
