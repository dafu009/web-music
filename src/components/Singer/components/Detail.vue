<template lang="pug">
  .detail
    back-to(:title="backTo" @back="goBack")
    .info
      .avatar
        img(v-lazy="singerDetail.img1v1Url")
      .des
        p.name {{ singerDetail.name }}
        p.desc {{ singerDetail.briefDesc }}
        p.more 
    .music-list
      .title 
        p.txt 热门歌曲
        play-all(:allSongList="singerDetail.hotSongs")
      .wrap
        ul.list
          template(v-for="(item, index) in singerDetail.hotSongs")
            li.item(ref="item" v-if="index < limit")
              .item-wrap
                .song-cover
                  img(v-lazy="item.al.picUrl")
                .text
                  p.song-name {{ item.name }}
                  p.album-name {{ item.al.name }}
                .operating
                  .operating_item.add(@click="add(item)")
                    span.iconfont &#xe6a0
                  .operating_item.play(@click="play(item)")
                    span.iconfont &#xe6a2
                transition(name="fade")
                  blow.blow-position(
                    v-if="currentMusic.songId === item.id && GlobalPlaying")
        loading(@loadMore="loadmore" v-if="!isHide")
    .album-list
      .title 
        p.txt 热门专辑
      .wrap
        .list
          template(v-for="(item, index) in singerDetail.hotAlbums")
            .item(:key="index" @click="toAlbumDetail(item.id, singerDetail.name)")
              .cover
                img(:src="item.picUrl")
              .name {{item.name}}
                span(v-if="item.alias.length > 0")  - {{item.alias[0]}}
              .artist {{item.artist.name}}
</template>
<script lang="ts">
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { __setPlayLists, __pushList } from '@/common/ts/common'

import Loading from '@/components/Loading/index.vue'
import Blow from '@/common/components/Blow.vue'
import PlayAll from '@/common/components/playAll.vue'
import { CONFIG } from '@/store/types'
import BackTo from '@/common/components/BackTo.vue';

@Component({
  components: {
    Blow,
    BackTo,
    Loading,
    PlayAll
  }
})
export default class Overview extends Vue {
  @Ref('item') readonly item!: any
  @State((state: CONFIG) => state.globalEvent.playing) GlobalPlaying: any
  @State((state: CONFIG) => state.singer.detail) singerDetail: any
  @State((state: CONFIG) => state.globalEvent.playList) playList: any
  @State((state: CONFIG) => state.globalEvent.currentMusic) currentMusic: any

  @Mutation('setLoading') setLoading: any
  @Mutation('setCurrentIndex') setCurrentIndex: any
  @Mutation('setGlobalMessageShow') setGlobalMessageShow: any
  @Mutation('setGlobalMessage') setGlobalMessage: any

  @Action('getAlbumDetail') getAlbumDetail: any

  private isHide: boolean = false
  private limit: number = 10
  private backTo: string = ''

  beforeRouteEnter(to: any, from: any, next: Function): void {
    next((vm: Vue) => {
      let title = ''
      if (from.path.match(/search/) || to.path.match(/search/)) title = '搜索'
      else if (from.path.match(/singer/) || to.path.match(/singer/)) title = '歌手'
      vm.$data.backTo = title
    })
  }

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
  goBack() {
    this.$router.go(-1)
  }
  async play(item: any) {
    const CurrentMusic = __setPlayLists(item)
    await __pushList(CurrentMusic)
    await this.setCurrentIndex(this.playList.length - 1)
  }
  async add(item: any) {
    const CurrentMusic = __setPlayLists(item)
    await __pushList(CurrentMusic)
    this.setGlobalMessage({ type: 'success', message: '添加成功' })
    this.setGlobalMessageShow(true)
  }
  async toAlbumDetail(id: number, singer: string) {
    await this.getAlbumDetail(id)
    this.$router.push({
      path: `/album/${id}`,
      query: {
        singer
      }
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
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
      }
    }
  }
  
  .music-list {
    .title {
      display: flex;
      margin: 25px 0;
      p {
        margin: 0;
      }
      .txt {
        font-size: 24px;
        margin-right: 30px;
      }
      .playAll {
        width: 40px;
        height: 40px;
        text-align: center;
        .iconfont {
          cursor: pointer;
          font-size: 40px;
        }
      }
    }
    .wrap {
      max-height: 600px;
      overflow: hidden;
      overflow-y: scroll;
      box-shadow: 1px 1px 15px rgba(0,0,0,0.3);
      ul.list {
        display: flex;
        flex-wrap: wrap;
        li.item {
          list-style: none;
          margin-left: 2px;
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
                cursor: pointer;
                padding: 10px 0;
                margin: 0 10px;
                width: 30px;
                height: 30px;
                .iconfont {
                  font-size: 30px;
                  color: #515151;
                }
              }
            }
            .blow-position {
              bottom: 10px;
              right: 30px;
            }
          }
        }
      }
    
    }
  }
  .album-list {
    margin-top: 20px;
    
    .title {
      margin: 25px 0;
      p {
        margin: 0;
      }
      .txt {
        font-size: 24px;
        margin-right: 30px;
      }
    }
    .wrap {
      max-height: 600px;
      overflow: hidden;
      overflow-y: scroll;
      box-shadow: 1px 1px 15px rgba(0,0,0,0.3);
      .list {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        padding: 0 10px;
        .item:nth-child(2n-1) {
          background-color: #e6e6e6;
        }
        .item {
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          .cover {
            width: 50px;
            height: 50px;
            line-height: 50px;
            margin-right: 20px;
            img {
              width: 100%;
            }
          }
          .name {
            flex: 2;
          }
          .artist {
            flex: 1;
            text-align: center;
          }
        }
      }
    }
  }
}
.wrap::-webkit-scrollbar {
  width: 8px;
  background-color: #fff
}

.wrap::-webkit-scrollbar-track {
  background-color: #fff
}

.wrap::-webkit-scrollbar-thumb {
  background: rgb(146, 181, 255);
  border-radius: 20px;
}
</style>
