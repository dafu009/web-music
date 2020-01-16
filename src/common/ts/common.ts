import store from '@/store'
import debounce from 'lodash/debounce'
export function __setPlayLists (detail: any) {
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
export async function  __pushList (lists: any) {
  let list = store.state.globalEvent.playList
  list.push(lists)
  store.commit('setPlayList', list)
}