type RecursiveNullable<T> = {
  [P in keyof T]-?: T[P] extends undefined | string | boolean
    ? T[P]
    : T[P] extends number | Date | (number | undefined) | (Date | undefined)
    ? (T[P] | null)
    : RecursiveNullable<T[P]>
}

export default RecursiveNullable
