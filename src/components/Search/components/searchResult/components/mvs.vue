<template lang="pug">
transition(name="fade")
  .wrap(v-if="currentName === 'mvs'")
    section.mvs
      template(v-for="(item, index) in Lists")
        .item(:key="index" @click="watchMv(item)" :title="item.name")
          .cover
            img(:src="item.cover")
            .mask
              .play
                span.iconfont &#xe6a4
          .name {{ item.name }}
    loading(@loadMore="loadMore" v-if="loadingShow")
</template>
<script lang="ts">
import { State, Mutation, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Loading from '@/components/Loading/index.vue'
@Component({
  components: {
    Loading
  }
})
export default class mvs extends Vue {
  @Prop(String) private currentName!: string
  @State(state => state.search.reset) isReset: any
  @State(state => state.search.mvs) mvs: any
  @Mutation('setLoading') setLoading: any
  @Mutation('setSearchIsReset') setSearchIsReset: any
  @Mutation('setSearchMvsPage') setSearchMvsPage: any
  @Mutation('setMvPlayerStatus') setMvPlayerStatus: any
  @Mutation('setPlaying') setMusicPlaying: any

  @Action('getSearchMv') getSearchMv: any
  @Action('getCurrentMv') getCurrentMv: any

  private total = []
  private loadingShow = true

  get Lists() {
    if (!this.mvs.result || this.mvs.result.length === 0) {
      this.loadingShow = false
      return this.total
    }
    if (this.isReset) {
      this.loadingShow = true
      this.total = this.mvs.result
      this.setSearchIsReset(false)
    } else {
      this.total = this.total.concat(this.mvs.result)
    }
    return this.total
  }
  loadMore () {
    setTimeout(async () => {
      const { limit, offset } = this.mvs
      this.setSearchMvsPage(limit + offset)
      await this.getSearchMv()
      this.setLoading(false)
    }, 500)
  }
  async watchMv ({ name, artistName, id, cover }: any) {
    await this.getCurrentMv({ id, name, artistName, cover })
    this.setMvPlayerStatus(true)
    this.setMusicPlaying(false)
  }
}
</script>
<style lang="scss" scoped>
.mvs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
  .item {
    margin: 0 20px 10px;
    cursor: pointer;
    width: 200px;
    .cover {
      width: 200px;
      position: relative;
      .mask {
        position: absolute;
        width: 100%;
        height: calc(100% - 5px);
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.5);
        .play {
          position: absolute;
          width: 45px;
          height: 45px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          span {
            font-size: 40px;
            color: #fff;
          }
        }
      }
      img {
        min-height: 112px;
        width: 100%;
      }
    }
    .name {
      padding: 0 5px 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
  }
}
</style>
