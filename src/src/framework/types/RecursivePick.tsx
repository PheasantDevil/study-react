interface NextInt {
  0: 1
  1: 2
  2: 3
  3: 4
  4: 5
  5: 6
  6: 7
  7: 8
  8: 9
  9: 10
  10: 11
  11: 12
  12: 13
  13: 14
  14: 15
  15: 16
  16: 17
  17: 18
  18: 19
  19: 20
  [rest: number]: number
}

// https://github.com/Microsoft/TypeScript/issues/12290#issuecomment-446761961
// type PathType<T, P extends string[], Index extends keyof P & number = 0> = {
//   [K in keyof P & number & Index]: P[K] extends undefined
//     ? T
//     : P[K] extends keyof T
//     ? NextInt[K] extends (keyof P & number)
//       ? PathType<T[P[K]], P, Extract<NextInt[K], keyof P & number>>
//       : T[P[K]]
//     : never
// }[Index]

// type RecursivePick<T, P extends string[], Index extends keyof P & number = 0> = {
//   [K in keyof P & number & Index]: P[K] extends undefined
//     ? T
//     : P[K] extends keyof T
//     ? NextInt[K] extends (keyof P & number)
//       ? { [key in P[K]]: RecursivePick<Required<T>[P[K]], P, Extract<NextInt[K], keyof P & number>> }
//       : T[P[K]]
//     : never
// }[Index]

export type RecursivePick<T, P extends string[], Index extends keyof P & number = 0> = {
  [K in keyof P & number & Index]: P[K] extends undefined
    ? T
    : P[K] extends keyof NonNullable<T>
    ? NextInt[K] extends (keyof P & number)
      ? { [key in P[K]]: RecursivePick<NonNullable<T>[P[K]], P, Extract<NextInt[K], keyof P & number>> }
      : NonNullable<T>[P[K]]
    : never
}[Index]

export type RecursivePicks<T, Ps extends string[][]> = (Ps[0] extends undefined ? {} : RecursivePick<T, Ps[0]>) &
  (Ps[1] extends undefined ? {} : RecursivePick<T, Ps[1]>) &
  (Ps[2] extends undefined ? {} : RecursivePick<T, Ps[2]>) &
  (Ps[3] extends undefined ? {} : RecursivePick<T, Ps[3]>) &
  (Ps[4] extends undefined ? {} : RecursivePick<T, Ps[4]>) &
  (Ps[5] extends undefined ? {} : RecursivePick<T, Ps[5]>) &
  (Ps[6] extends undefined ? {} : RecursivePick<T, Ps[6]>) &
  (Ps[7] extends undefined ? {} : RecursivePick<T, Ps[7]>) &
  (Ps[8] extends undefined ? {} : RecursivePick<T, Ps[8]>) &
  (Ps[9] extends undefined ? {} : RecursivePick<T, Ps[9]>) &
  (Ps[10] extends undefined ? {} : RecursivePick<T, Ps[10]>) &
  (Ps[11] extends undefined ? {} : RecursivePick<T, Ps[11]>) &
  (Ps[12] extends undefined ? {} : RecursivePick<T, Ps[12]>) &
  (Ps[13] extends undefined ? {} : RecursivePick<T, Ps[13]>) &
  (Ps[14] extends undefined ? {} : RecursivePick<T, Ps[14]>) &
  (Ps[15] extends undefined ? {} : RecursivePick<T, Ps[15]>) &
  (Ps[16] extends undefined ? {} : RecursivePick<T, Ps[16]>) &
  (Ps[17] extends undefined ? {} : RecursivePick<T, Ps[17]>) &
  (Ps[18] extends undefined ? {} : RecursivePick<T, Ps[18]>) &
  (Ps[19] extends undefined ? {} : RecursivePick<T, Ps[19]>) &
  (Ps[20] extends undefined ? {} : RecursivePick<T, Ps[19]>)
