export type ConsultationType = 'medical_checkup' | 'high_stress' | 'long_hour'

export const consultationTypes: Array<{ type: ConsultationType; label: string }> = [
  { type: 'medical_checkup', label: '健康診断' },
  { type: 'high_stress', label: '高ストレス' },
  { type: 'long_hour', label: '長時間労働' }
]
