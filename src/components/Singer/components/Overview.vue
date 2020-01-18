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
import { Singer, CONFIG } from '@/store/types'
@Component({
  components: {
    CategoryNav,
    Loading,
    Lists
  }
})
export default class Overview extends Vue {
  @State((state: CONFIG) => state.singer) singer!: Singer
  @Mutation('setSingerPageNum') setSingerPageNum!: Function
  @Mutation('reSetSingerConfig') reSetSingerConfig!: Function
  @Mutation('setGlobalLoading') setGlobalLoading!: Function

  @Action('GetArtistList') GetArtistList!: Function

  private title: string = '热门歌手'
  private totalList = []
  private currentCategory: number = 0

  async created() {
    this.setGlobalLoading(true)
    await this.GetArtistList({ isTop: true, cat: 0 })
    this.reload()
  }
  reload() {
    this.totalList = this.singer.artists
  }
  concatList() {
    this.totalList = this.totalList.concat(this.singer.artists)
  }
  async loadmore() {
    setTimeout(async () => {
      if (this.singer.artists.length === 0) return
      await this.setSingerPageNum(this.singer.pageNum + 1)
      if (this.currentCategory === 0) {
        await this.GetArtistList({ isTop: true, cat: 0 })
      } else {
        await this.GetArtistList({ isTop: false, cat: this.currentCategory })
      }
      this.concatList()
    }, 500)
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
      await this.GetArtistList({isTop: true, cat: 0})
    } else {
      await this.GetArtistList({isTop: false, cat: this.currentCategory})
    }
    this.reload()
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
