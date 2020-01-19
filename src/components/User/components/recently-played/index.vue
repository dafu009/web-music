<template lang="pug">
  .recently-played
    .title 最近播放
    .list
      template(v-for="(item, index) in playedList")
        .item(:key="index")
          .cover-wrap
            img(v-lazy="item.picUrl")
            transition(name="fade")
              .mask
                play.selfPlay(:song="item")
          .info
            p.name 《{{item.songName}}》
            p.artise {{item.artist}}
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
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
}
</script>
<style lang="scss" scoped>
.recently-played {
  padding: 30px;
  .title {
    font-size: 24px;
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
}
</style>
