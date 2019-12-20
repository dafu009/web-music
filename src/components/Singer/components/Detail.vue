<template lang="pug">
  .detail
    el-page-header(@back="backToSinger" content="歌手")
    .info
      .avatar
        img(v-lazy="singerDetail.img1v1Url")
      .des
        p.name {{ singerDetail.name }}
        p.desc {{ singerDetail.briefDesc }}
    .music-list
      p.title 热门歌曲
      ul.list
        li.item(ref="item" v-for="(item, index) in singerDetail.hotSongs" v-show="index < limit")
          .item-wrap
            .song-cover
              img(v-lazy="item.al.picUrl")
            .text
              p.song-name {{ item.name }}
              p.album-name {{ item.al.name }}
            .operating
              .operating_item.add(@click="add(item.id)")
                img(src="@/assets/image/add.png")
              .operating_item.play(@click="play(item.id)")
                img(src="@/assets/image/play.png")
      loading(@loadMore="loadmore" v-if="!isHide")
      
</template>
<script lang="ts">
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import Loading from '@/components/Loading/index.vue'

@Component({
  components: {
    Loading
  }
})
export default class Overview extends Vue {
  @Ref('item') readonly item!: any
  @State(state => state.singer.detail) singerDetail: any
  @State(state => state.globalEvent.playList) playList: any
  @State(state => state.globalEvent.currentIndex) currentIndex: any
  @State(state => state.globalEvent.currentMusic) currentMusic: any

  @Mutation('setLoading') setLoading: any
  @Mutation('setPlaying') setPlaying: any
  @Mutation('setPlayList') setPlayList: any
  @Mutation('setCurrentIndex') setCurrentIndex: any
  @Mutation('setCurrentSong') setCurrentSong: any

  @Action('GetCurrentMusic') GetCurrentMusic: any

  private isHide: boolean = false
  private limit: number = 10
  created() {
    if (!this.singerDetail.id) {
      this.$router.push('/singer')
      return
    }
  }
  loadmore() {
    setTimeout(() => {
      this.limit = 20
      this.setLoading(false)
      if (this.singerDetail.hotSongs.length === this.item.length)
        this.isHide = true
    }, 1000)
  }
  backToSinger() {
    this.$router.go(-1)
  }
  async play(id: number) {
    await this.setPlaying(false)
    const CurrentMusic = await this.GetCurrentMusic(id)
    await this.setPlayList(CurrentMusic)
    await this.setCurrentIndex(this.playList.length - 1)
    await this.setCurrentSong(this.playList[this.currentIndex])
    await this.setPlaying(true)
  }
  async add(id: number) {
    const CurrentMusic = await this.GetCurrentMusic(id)
    await this.setPlayList(CurrentMusic)
    this.$message({
      message: '成功添加到播放列表',
      type: 'success'
    })
  }
}
</script>
<style lang="scss" scoped>
.detail {
  position: relative;
  .info {
    display: flex;
    margin-top: 20px;
    .avatar {
      flex-shrink: 0;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.4);
      img {
        border: 1px solid #4c4c4c;
        border-radius: 50%;
        width: 100%;
      }
    }
    .des {
      flex-shrink: 1;
      margin-left: 50px;
      .name {
        font-size: 30px;
      }
      .desc {
        max-width: 800px;
      }
    }
  }
  .music-list {
    .title {
      font-size: 24px;
    }
    ul.list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li.item {
        list-style: none;
        .item-wrap {
          position: relative;
          width: 400px;
          font-size: 18px;
          display: flex;
          margin-bottom: 15px;
          .song-cover {
            box-sizing: border-box;
            border: 1px solid #ccc;
            padding: 5px;
            width: 100px;
            height: 100px;
            margin-right: 20px;
            overflow: hidden;
            text-align: center;
            img {
              height: 100%;
            }
          }
          .text {
            max-width: 160px;
            p {
              margin: 0;
            }
            .song-name {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 40px;
              line-height: 40px;
            }
            .album-name {
              font-size: 14px;
              color: #5d5d5d;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
            }
          }
          .operating {
            position: absolute;
            right: 30px;
            bottom: 10px;
            display: flex;
            .operating_item {
              padding: 10px;
              width: 30px;
              height: 30px;
              img {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
