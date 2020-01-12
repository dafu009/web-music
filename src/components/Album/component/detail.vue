<template lang="pug">
  .album-detail
    el-page-header(@back="goBack" :content="backTo")
    .header
      .cover
        img(v-lazy="album.picUrl")
      .desc
        p.name 《{{ album.name }}》{{album.alias.length > 0 ? `（${album.alias[0]}）` : ''}}
        p {{ album.description }}  
      .artist(@click="toArtist(album.artist.id)")
        .avatar
          img(v-lazy="album.artist.picUrl")
          span.name {{ album.artist.name }}
    .lists
      .playAll(@click="playAll")
        span.iconfont &#xe636
      template(v-for="(item, index) in songs")
        .item(:key="index")
          .name
            span.name 《{{ item.name }}》 
            span(v-if="item.alia.length > 0") （{{item.alia[0]}}）
          .play(@click="play(item)")
            span.iconfont(v-if="GlobalPlaying && currentMusic.songId === item.id") &#xe69e
            span.iconfont(v-if="!GlobalPlaying || currentMusic.songId !== item.id") &#xe6a4
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Mutation, Action } from 'vuex-class'
@Component({
  components: {}
})
export default class detail extends Vue {
  @State(state => state.album.songs) songs: any
  @State(state => state.album.album) album: any
  @State(state => state.globalEvent.playing) GlobalPlaying: any
  @State(state => state.globalEvent.playList) playList: any
  @State(state => state.globalEvent.currentMusic) currentMusic: any

  @Mutation('setPlayList') setPlayList: any
  @Mutation('setCurrentIndex') setCurrentIndex: any
  
  private backTo: string = ''

  beforeRouteEnter(to: any, from: any, next: Function): void {
    next((vm: Vue) => {
      let title = ''
      switch(from.name) {
        case 'search':
          title = '搜索'
          break
        case 'singer':
          title = '歌手'
          break
      }
      vm.$data.backTo = title
    })
  }
  beforeCreate () {
    if (!this.album && !this.songs) {
      this.$router.push('/recommend')
      return
    }
  }

  goBack() {
    this.$router.go(-1)
  }

  __setPlayLists(detail: any) {
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
  async __pushList (lists: any) {
    let list = this.playList
    list.push(lists)
    await this.setPlayList(list)
  }

  async playAll () {
    let list: any = []
    this.songs.map((item: any) => {
      list.push(this.__setPlayLists(item))
    })
    list.map((item: any) => {
      this.__pushList(item)
    })
    this.$message({
      type: 'success',
      message: '添加成功'
    })
    if (this.GlobalPlaying) {
      return
    } else {
      this.setCurrentIndex(0)
    }
  }

  async play (item: any) {
    const CurrentMusic = this.__setPlayLists(item)
    await this.__pushList(CurrentMusic)
    await this.setCurrentIndex(this.playList.length - 1)
  }
}
</script>
<style lang="scss" scoped>
.album-detail {
  .header {
    margin-top: 20px;
    display: flex;
    align-items: center;
    .cover {
      flex-shrink: 0;
      box-sizing: border-box;
      width: 150px;
      height: 150px;
      padding: 5px;
      border: 1px solid #ccc;
      img {
        width: 100%;
      }
    }
    .desc {
      padding: 20px;
      p {
        font-size: 14px;
        color: #515151;
        line-height: 2;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
      }
      .name {
        color: #000;
        font-size: 16px;
      }
    }
    .artist {
      flex-shrink: 0;
      .avatar {
        text-align: center;
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        .name {
          font-size: 18px;
        }
      }
    }
  }
  .lists {
    padding: 20px 50px;
    .playAll {
      width: 40px;
      height: 40px;
      text-align: center;
      padding-bottom: 20px;
      .iconfont {
        cursor: pointer;
        font-size: 40px;
      }
    }
    .item:nth-child(2n) {
      background-color: #e6e6e6;
    }
    .item:hover {
      background-color: #ccc;
    }
    .item {
      display: flex;
      padding: 5px 10px;
      align-items: center;
      border: 1px solid #ccc;
      margin: 5px;
      .name {
        flex: 1;
        height: 40px;
        line-height: 40px;
      }
      .play {
        position: relative;
        width: 40px;
        height: 40px;
        cursor: pointer;
        span {
          font-size: 40px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }
}
</style>
