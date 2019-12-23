<template lang="pug">
  .play-list-detail
    .header
      .cover
        img(v-lazy="playListDetail.picUrl")
      .info
        .name 《 {{playListDetail.name}} 》
        .desc {{playListDetail.desc}}
    ul.tags
      img(src="@/assets/image/tags.png")
      li.item(v-for="(item, index) in playListDetail.tags") {{ item }}  
      .play-all
        span.iconfont(@click="playAll") &#xe636
    ul.list
      li.item(v-for="(item, index) in playListDetail.tracks")
        .cover-wrap(@mouseover="over(index)")
          img(v-lazy="item.al.picUrl")
          transition(name="fade")
            .mask(v-if="currentIndex === index")
              .play(@click.stop="play(item)")
                span.iconfont(v-if="GlobalPlaying && currentMusic.songId === item.id") &#xe69e
                span.iconfont(v-if="!GlobalPlaying || currentMusic.songId !== item.id") &#xe6a4
        .info
          p.name 《{{item.name}}》
          p.artise {{item.ar[0].name}}
</template>
<script lang="ts">
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Player from '../../Nav/components/Player.vue';
@Component({
  components: {}
})
export default class detail extends Vue {
  @State(state => state.globalEvent.playing) GlobalPlaying: any
  @State(state => state.recommend.playListDetail) playListDetail: any
  @State(state => state.globalEvent.playList) playList: any
  @State(state => state.globalEvent.currentMusic) currentMusic: any

  @Mutation('setPlayList') setPlayList: any
  @Mutation('setCurrentIndex') setCurrentIndex: any

  private currentIndex: number = 0

  created() {
    if (!this.playListDetail.id) {
      this.$router.push('/recommend')
      return
    }
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
    this.playListDetail.tracks.map((item: any) => {
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
  over (index: number) {
    this.currentIndex = index
  }

  async play (item: any) {
    const CurrentMusic = this.__setPlayLists(item)
    await this.__pushList(CurrentMusic)
    await this.setCurrentIndex(this.playList.length - 1)
  }
}
</script>
<style lang="scss" scoped>
ul > li {
  list-style: none;
}
.play-list-detail {
  .header {
    display: flex;
    .cover {
      flex-shrink: 0;
      width: 250px;
      height: 250px;
      margin-right: 50px;
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 40px;
      .name {
        font-size: 24px;
      }
      .desc {
        padding: 10px 0;
        color: #7b7b7b;
      }
    }
  }
  .tags {
    display: flex;
    align-items: center;
    margin: 20px 0;
    padding: 0;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    .item {
      font-size: 14px;
      width: 40px;
      text-align: center;
      border: 2px solid #515151;
      border-radius: 10px;
      padding: 3px 8px;
      margin: 0 5px;
    }
    .play-all {
      flex: 1;
      text-align: right;
      .iconfont {
        cursor: pointer;
        font-size: 40px;
      }
    }
  }
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      margin: 0 5px 10px;
      .cover-wrap{
        box-sizing: border-box;
        width: 150px;
        height: 150px;
        position: relative;
        margin: 0 auto;
        img {
          width: 100%;
          border-radius: 10px;
        }
        .mask {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.6);
          border-radius: 10px;
          .play {
            width: 50px;
            height: 50px;
            cursor: pointer;
            text-align: center;
            margin: 0 auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .iconfont {
              top: 0;
              right: 0;
              position: absolute;
              font-size: 50px;
              color: #fff;
            }
          }
        }
      }
      .info {
        margin-top: 10px;
        p {
          margin: 0;
          font-size: 14px;
          text-align: center;
          min-width: 180px;
          overflow: hidden;
        }
      }
    }
  } 
}
</style>
