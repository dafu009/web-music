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
  @Action('GetTopArtistList') GetTopArtistList: any
  @Action('GetArtistList') GetArtistList: any

  private title: string = '热门歌手'
  private totalList = []
  private currentCategory: number = 0

  async created() {
    await this.GetTopArtistList({root: this})
    this.pageLoad()
  }
  pageLoad() {
    this.totalList = this.singer.artists
  }
  async loadmore() {
    setTimeout(async () => {
      if (this.singer.artists.length === 0) return
      await this.setSingerPageNum(this.singer.pageNum + 1)
      if (this.currentCategory === 0) {
        await this.GetTopArtistList({root: this})
      } else {
        await this.GetArtistList({ cat: this.currentCategory, root: this })
      }
      this.totalList = this.totalList.concat(this.singer.artists)
      this.setLoading(false)
    }, 1000)
  }

  async _resetSinger() {
    await this.reSetSingerConfig()
    this.totalList = []
  }

  async checkoutCategory(data: any) {
    this.title = data.name
    this.currentCategory = data.value
    await this._resetSinger()
    if (data.value === 0) {
      await this.GetTopArtistList({ root: this })
    } else {
      await this.GetArtistList({ cat: data.value, root: this })
    }
    this.totalList = this.singer.artists
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
