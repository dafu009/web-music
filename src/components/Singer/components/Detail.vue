<template lang="pug">
  .detail
    .info
      .avatar
        img(v-lazy="singerDetail.img1v1Url")
      .des
        p.name {{ singerDetail.name }}
        p.desc {{ singerDetail.briefDesc }}
    ul.music-list
      p.title 热门歌曲
      li.item(v-for="(item, index) in singerDetail.hotSongs" v-show="index < limit")
        .song-cover
          img(v-lazy="item.al.picUrl")
        p.song-name {{ item.al.name }}
</template>
<script lang="ts">
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Overview extends Vue {
  @State(state => state.singer.detail) singerDetail: any
  private limit: number = 10
  created() {
    if (!this.singerDetail.id) {
      this.$router.push('/singer')
      return
    }
    console.log(this.singerDetail)
  }
}
</script>
<style lang="scss" scoped>
.detail {
  .info {
    display: flex;
    .avatar {
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
    li.item {
      font-size: 18px;
      list-style: none;
      display: flex;
      margin-bottom: 15px;
      .song-cover {
        width: 100px;
        height: 100px;
        margin-right: 20px;
        img {
          width: 100%;
        }
      }
      .song-name {
        
      }
    }
  }
}
</style>
