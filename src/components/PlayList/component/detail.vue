<template lang="pug">
  .play-list-detail
    .header
      .cover
        img(v-lazy="playListDetail.picUrl")
      .info
        .name 《 {{playListDetail.name}} 》
        .desc {{playListDetail.desc}}
    ul.tags
      span.iconfont &#xe610
      li.item(v-for="(item, index) in playListDetail.tags") {{ item }}  
      play-all.all(:allSongList="playListDetail.tracks")
    .list(ref="wrapper")
      waterfall(ref="waterfall" :list="playListDetail.tracks" :gutter="5" :width="200" backgroundColor="#f3f3f3" :phoneCol="3")
        template(slot="item" slot-scope="props")
          .item
            .cover-wrap
              img(v-lazy="props.data.al.picUrl" @load="refresh")
              transition(name="fade")
                .mask
                  play.selfPlay(:song="props.data")
            .info
              p.name 《{{props.data.name}}》
              p.artise {{props.data.ar[0].name}}
</template>
<script lang="ts">
import Detector from 'element-resize-detector'
import Waterfall from 'vue-waterfall-plugin'
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import Play from '@/common/components/play.vue'
import PlayAll from '@/common/components/playAll.vue'
import { CONFIG, CurrentMusic } from '@/store/types'
@Component({
  components: {
    Play,
    PlayAll,
    Waterfall
  }
})
export default class detail extends Vue {
  @Ref('wrapper') readonly wrapper!: any
  @Ref('waterfall') readonly waterfall!: any

  @State((state: CONFIG) => state.recommend.playListDetail) playListDetail: any
  @State((state: CONFIG) => state.globalEvent.playList) playList!: CurrentMusic[]

  created() {
    if (!this.playListDetail.id) {
      this.$router.push('/recommend')
      return
    }
  }

  mounted() {
    const erd = Detector()
    const self = this
    erd.listenTo(this.wrapper, function(el: HTMLDivElement) {
      if (el) {
        self.refresh()
      }
    })
  }
  refresh () {
    this.waterfall.refresh()
  }
}
</script>
<style lang="scss" scoped>
ul > li {
  list-style: none;
}
.play-list-detail {
  position: absolute;
  width: 100%;
  .header {
    display: flex;
    .cover {
      flex-shrink: 0;
      width: 250px;
      height: 250px;
      margin-right: 50px;
      border-radius: 10px;
      box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.4);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
    .iconfont {
      font-size: 36px;
      margin-right: 10px;
    }
    .item {
      font-size: 14px;
      text-align: center;
      border: 2px solid #515151;
      border-radius: 10px;
      padding: 4px 10px;
      margin: 0 5px;
    }
    .all {
      text-align: right
    }
  }
  .list {
    .grid {
      box-shadow: 1px 1px 15px rgba(0,0,0,0.3);
    }
    .item {
      margin: 20px 5px 10px;
      .cover-wrap{
        box-sizing: border-box;
        width: 150px;
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 10px;
        img {
          width: 100%;
          border-radius: 10px;
        }
        .mask {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: calc(100% - 5px);
          background-color: rgba(0,0,0,0.35);
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
