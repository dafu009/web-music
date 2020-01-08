<template lang="pug">
  .play-list(ref="wrapper")
    waterfall(ref="waterfall" :list="playList" :gutter="5" :width="300" backgroundColor="#f3f3f3" :phoneCol="3")
      template(slot="item" slot-scope="props")
        .item(@click="detail(props.data.id)")
          .cover
            img(:src="props.data.picUrl")
          .text
            p.type {{ props.data.copywriter }}
            p {{ props.data.name }}   
</template>
<script lang="ts">
import Detector from 'element-resize-detector'
import Waterfall from 'vue-waterfall-plugin'
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import mutations from '../../../store/mutations'
@Component({
  components: {
    Waterfall
  },
  directives: {
    resize: {
      inserted: el => {
        console.log(el)
      }
    }
  }
})
export default class playList extends Vue {
  @Ref('wrapper') readonly wrapper!: any
  @Ref('waterfall') readonly waterfall!: any

  @State(state => state.recommend.playList) playList: any

  @Action('getRecommendPlayList') getRecommendPlayList: any
  @Action('getPlayListDetail') getPlayListDetail: any

  created() {
    this.getRecommendPlayList()
  }
  mounted() {
    const erd = Detector()
    const self = this
    erd.listenTo(this.wrapper, function(el: HTMLDivElement) {
      if (el) {
        self.waterfall.refresh()
      }
    })
  }

  detail(id: number) {
    this.getPlayListDetail(id)
      .then(() => {
        this.$router.push({
          path: `/recommend/${id}`
        })
      })
      .catch(() => {
        this.$message({
          type: 'error',
          message: '网络错误请重试'
        })
      })
  }
}
</script>
<style lang="scss" scoped>
.play-list {
  margin: 0 auto;
  padding: 0;
  .item {
    box-sizing: border-box;
    cursor: pointer;
    list-style: none;
    width: 250px;
    background-color: #fff;
    padding: 8px;
    margin: 10px auto;
    border-radius: 10px;
    .cover {
      margin: 0 auto;
      background-color: #f3f3f3;
      box-sizing: border-box;
      width: 230px;
      height: 230px;
      border: 1px solid #f3f3f3;
      padding: 8px;
      text-align: center;
      border-radius: 10px;
      img {
        border-radius: 10px;
        height: 100%;
      }
    }
    .text {
      align-self: center;
      font-size: 16px;
      color: #616161;
      p {
        margin: 0;
        padding: 5px 0;
      }
      .type {
        color: #3a3a3a;
      }
    }
  }
}
</style>
