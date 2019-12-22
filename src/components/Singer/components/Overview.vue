<template lang="pug">
.overview
  .title {{ title }}
  .singer-content
    category-nav(@checkout="checkoutCategory")
    lists(:lists="totalList")
  loading(@loadMore="loadmore" v-if="singer.artists.length !== 0")
</template>
<script lang="ts">
import Lists from './List.vue'
import CategoryNav from './CategoryNav.vue'
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Loading from '@/components/Loading/index.vue'
import api from '@/api'
@Component({
  components: {
    CategoryNav,
    Loading,
    Lists
  }
})
export default class Overview extends Vue {
  @State(state => state.singer) singer: any
  @Mutation('setLoading') setLoading: any
  @Mutation('setSingerPageNum') setSingerPageNum: any
  @Mutation('reSetSingerConfig') reSetSingerConfig: any
  @Mutation('setGlobalLoading') setGlobalLoading: any

  @Action('GetArtistList') GetArtistList: any

  private title: string = '热门歌手'
  private totalList = []
  private currentCategory: number = 0

  async created() {
    this.setGlobalLoading(true)
    this._getGetArtistList(true, this.pageLoad)
  }
  async _getGetArtistList(isTop: boolean, cb: any, cat?: number) {
    this.GetArtistList({ isTop, cat })
      .then((data: boolean) => {
        if (data) {
          cb()
        } else {
          this.$message({
            type: 'error',
            message: '请求失败请重试'
          })
          this.setGlobalLoading(false)
          this.setLoading(false)
        }
      })
      .catch(() => {})
  }
  pageLoad() {
    this.totalList = this.singer.artists
    this.setGlobalLoading(false)
  }
  concatList() {
    this.totalList = this.totalList.concat(this.singer.artists)
    this.setLoading(false)
  }
  async loadmore() {
    setTimeout(async () => {
      if (this.singer.artists.length === 0) return
      await this.setSingerPageNum(this.singer.pageNum + 1)
      if (this.currentCategory === 0) {
        await this._getGetArtistList(true, this.concatList)
      } else {
        await this._getGetArtistList(
          false,
          this.concatList,
          this.currentCategory
        )
      }
    }, 1000)
  }

  async _resetSinger() {
    await this.reSetSingerConfig()
    this.totalList = []
  }

  async checkoutCategory(data: any) {
    this.setGlobalLoading(true)
    this.title = data.name
    this.currentCategory = data.value
    await this._resetSinger()
    if (data.value === 0) {
      await this._getGetArtistList(true, this.pageLoad)
    } else {
      await this._getGetArtistList(false, this.pageLoad, data.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.overview {
  .title {
    font-size: 24px;
    margin-bottom: 10px;
  }
}
</style>
