import type { Question } from './types'

export const QUESTIONS: readonly Question[] = [
  {
    id: 1,
    text: '理想の休日の過ごし方は？',
    options: [
      { label: '🏠 家でまったり読書や映画', value: 'home_relax' },
      { label: '🏔️ アウトドアで冒険', value: 'outdoor_adventure' },
      { label: '☕ カフェで友達とおしゃべり', value: 'cafe_social' },
      { label: '💻 新しいスキルを学ぶ', value: 'learn_skill' },
    ],
  },
  {
    id: 2,
    text: 'チームでの自分の役割は？',
    options: [
      { label: '🧠 アイデアを出すブレイン', value: 'idea_brain' },
      { label: '🎯 みんなをまとめるリーダー', value: 'leader' },
      { label: '🤝 調整役のムードメーカー', value: 'coordinator' },
      { label: '🔧 黙々と実行する職人', value: 'executor' },
    ],
  },
  {
    id: 3,
    text: '一番好きな時間帯は？',
    options: [
      { label: '🌅 早朝の静けさ', value: 'early_morning' },
      { label: '☀️ 活気ある昼間', value: 'daytime' },
      { label: '🌆 黄昏どきの夕方', value: 'evening' },
      { label: '🌙 誰にも邪魔されない深夜', value: 'late_night' },
    ],
  },
  {
    id: 4,
    text: 'ストレス解消法は？',
    options: [
      { label: '🎵 音楽を聴く・演奏する', value: 'music' },
      { label: '🏃 体を動かす', value: 'exercise' },
      { label: '🍳 美味しいものを食べる・作る', value: 'food' },
      { label: '✍️ 書く・描く・創作する', value: 'create' },
    ],
  },
  {
    id: 5,
    text: '理想の働き方は？',
    options: [
      { label: '🚀 スタートアップで世界を変える', value: 'startup' },
      { label: '🏢 安定した大企業でキャリアアップ', value: 'corporate' },
      { label: '🌴 フリーランスで自由に', value: 'freelance' },
      { label: '🎨 好きなことを仕事にする', value: 'passion' },
    ],
  },
]
