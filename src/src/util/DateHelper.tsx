import format from 'date-fns/format'

/**
 *
 * @summary 日付を文字列に整形する。表示用にもAPIのPOST用にも利用可能。
 * @param date
 */
export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd') // date-fns v2から dd は小文字
}

export function formatPeriod({ start, end }: { start: string | Date; end: string | Date }): string {
  return `${typeof start === 'string' ? start : formatDate(start)} 〜 ${
    typeof end === 'string' ? end : formatDate(end)
  }`
}

export function calcAge(birthday: string, targetday: string) {
  const age = Math.floor(
    (parseInt(targetday.replace(/\-/g, ''), 10) - parseInt(birthday.replace(/\-/g, ''), 10)) / 10000
  )
  return age
}

// 対象年(元号)
export const reportYear = (year: string) => {
  const businessYear = new Date(year).toLocaleString('ja-JP-u-ca-japanese', {
    era: 'short',
    year: 'numeric'
  })

  const gengouNum = businessYear.replace(/\D*/, '').replace('年', '')
  const gengouNumAddZero = (0 + gengouNum).slice(-2)

  // TODO: 新元号にはフォーマットが届き次第の対応
  const gengou = businessYear.slice(0, 2).replace('平成', '7')

  const returnYear = gengou + gengouNumAddZero

  return returnYear
}

// 健診受診日(元号)
export const reportStartDate = (date: string) => {
  const startDate = new Date(date)

  const startMonth = startDate.getMonth() + ''
  const startMonthAddZwro = (0 + startMonth).slice(-2)

  const startDay = startDate.getDay() + ''
  const startDayAddZwro = (0 + startDay).slice(-2)

  const returnDate = reportYear(date) + startMonthAddZwro + startDayAddZwro
  return returnDate
}
