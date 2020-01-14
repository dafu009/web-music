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
      PlayAll.all(:allSongList="songs")
      template(v-for="(item, index) in songs")
        .item(:key="index")
          .name
            span.name 《{{ item.name }}》 
            span(v-if="item.alia.length > 0") （{{item.alia[0]}}）
          play.selfPlay(:song="item")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Mutation, Action } from 'vuex-class'
import PlayAll from '@/common/components/playAll.vue'
import Play from '@/common/components/play.vue'
@Component({
  components: {
    Play,
    PlayAll
  }
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
      const route = vm.$route
      switch(from.name) {
        case 'search':
          title = '搜索'
          break
        case 'singer':
          title = '歌手'
          break
        default:
          title = route.query.singer ? `${route.query.singer}` : ''
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
    .all {
      margin-bottom: 20px
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
      position: relative;
      .name {
        flex: 1;
        height: 40px;
        line-height: 40px;
      }
      .selfPlay {
        left: 95%;
        color: #545454;
      }
    }
  }
}
</style>
