type CONFIG = {
  readonly user: string,
  readonly music: string
}
const BASE_URL: CONFIG = {
  user: '/api',
  music: '/music'
}
export default BASE_URL