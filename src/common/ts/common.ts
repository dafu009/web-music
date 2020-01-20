import store from '@/store'
import { CurrentMusic } from '@/store/types'

export function __setPlayLists (detail: any) {
  if (detail.songId) {
    return detail
  }
  const { al: album, ar: artist, name, id } = detail
  const CurrentMusic = {
    album: album.name,
    picUrl: album.picUrl,
    artist: artist[0].name,
    artistId: artist[0].id,
    songName: name,
    songId: id
  }
  return CurrentMusic
}
export async function __pushList (lists: any) {
  let list = store.state.globalEvent.playList
  list.push(lists)
  store.commit('setPlayList', list)
}

export function createOnlyId () {
  return new Date().valueOf().toString(16)
}

export function Deduplication (objArray: CurrentMusic[]) {
  var hash: any = {};
  objArray = objArray.reduce((item: any, next: CurrentMusic) => {
    hash[next.songId] ? '' : hash[next.songId] = true && item.push(next)
    return item
  }, [])
  return objArray;
}