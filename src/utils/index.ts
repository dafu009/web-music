export function RadomNumber (Min: number, Max: number) {
  let Range = Max - Min
  let Rand = Math.random()
  let num = Min + Math.round(Rand * Range)
  return num
}
