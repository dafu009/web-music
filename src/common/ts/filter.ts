export function formatDate (value: number | string, type: string) {
  if (!value) return ''

  const isDou = (n: number) => (n > 9 ? n : `0${n}`)

  const date = new Date(value)
  let Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()

  return `${Y}年${isDou(M)}月${isDou(D)}日`
}