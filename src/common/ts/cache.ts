import storage from 'good-storage'

const __SEARCHED__ = '__searched__'
const __PLAYED__ = '__played__'

export function setSearchedList (value: any) {
  storage.set(__SEARCHED__, value)
}
export function setPlayedList (value: any) {
  storage.set(__PLAYED__, value)
}
