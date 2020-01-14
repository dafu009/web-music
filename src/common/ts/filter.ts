export function formatDate (value: number, type: string) {
  if (!value) return ''

  const isDou = (n: number) => (n > 9 ? n : `0${n}`)

  const date = new Date(Number(value))
  let Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()

  // if (type === 'MM-DD') {
    // return `${isDou(M)}/${isDou(D)}`
  // }
  // if (type === 'YY-MM') {
  //   return `${Y}/${isDou(M)}`
  // }
  // if (type === 'YY-MM-DD') {
    return `${Y}年${isDou(M)}月${isDou(D)}日`
  // }
  // return `${Y}/${isDou(M)}/${isDou(D)} \n ${isDou(h)}:${isDou(m)}:${isDou(s)}`
}