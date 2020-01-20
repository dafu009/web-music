<template lang="pug">
  .recently-played
    .header
      .title 最近播放
      transition(name="fade")
        .clear(@click="clear" v-if="this.playedList.length > 0")
          span.iconfont &#xe631
          span 清除播放记录
    .list(v-if="this.playedList.length > 0")
      template(v-for="(item, index) in playedList")
        .item(:key="index")
          .cover-wrap
            img(v-lazy="item.picUrl")
            .mask
              play.selfPlay(:song="item")
          .info
            p.name 《{{item.songName}}》
            p.artise {{item.artist}}
    .no-data(v-if="this.playedList.length === 0") 暂无数据
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { CONFIG, CurrentMusic } from '@/store/types'
import Play from '@/common/components/play.vue'

@Component({
  components: {
    Play
  }
})
export default class RecentlyPlayed extends Vue {
  @State((state: CONFIG) => JSON.parse(state.globalEvent.recentlyPlayedList))
  playedList!: CurrentMusic[]

  @Mutation('setRecentlyPlayedList') setRecentlyPlayedList!: Function

  clear () {
    this.setRecentlyPlayedList('[]')
  }
}
</script>
<style lang="scss" scoped>
.recently-played {
  padding: 30px;
  border-bottom: 1px solid #ccc;
  .header {
    display: flex;
    align-items: baseline;
    .title {
      font-size: 24px;
      margin-right: 20px;
    }
    .clear {
      cursor: pointer;
      font-size: 12px;
      padding: 4px 8px;
      color: #595959;
      border: 1px solid #ccc;
      border-radius: 10px;
      span {
        vertical-align: middle;
      }
      .iconfont {
        margin-right: 5px;
      }
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin: 20px 5px 10px;
      .cover-wrap {
        box-sizing: border-box;
        width: 150px;
        height: 150px;
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
        .mask {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.35);
          border-radius: 10px;
          .selfPlay {
            color: #fff;
          }
        }
      }
      .info {
        margin-top: 10px;
        p {
          margin: 0 auto;
          font-size: 14px;
          text-align: center;
          width: 150px;
          overflow: hidden;
        }
      }
    }
  }
  .no-data {
    font-size: 20px;
    margin: 20px;
    text-align: center;
    color: #909090;
  }
}
</style>
