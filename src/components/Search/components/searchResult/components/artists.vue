<template lang="pug">
transition(name="fade")
  .wrap(v-if="currentName === 'artists'")
    section.artists
      template(v-for="(item, index) in Lists")
        .item(:key="index" @click="detail(item.id)")
          .avatar
            img(v-lazy="item.img1v1Url")
          .name {{ item.name }}
    loading(@loadMore="loadMore")
</template>
<script lang="ts">
import { State, Action, Mutation } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Loading from '@/components/Loading/index.vue';
@Component({
  components: {
    Loading
  }
})
export default class artists extends Vue {
  @Prop(String) private currentName!:string
  @State(state => state.search.reset) isReset: any
  @State(state => state.search.artists) artists: any
  @Mutation('setLoading') setLoading: any
  @Mutation('setSearchIsReset') setSearchIsReset: any

  @Mutation('setSearchArtistsPage') setSearchArtistsPage: any
  @Action('GetArtistDetail') GetArtistDetail: any
  @Action('getSearchArtists') getSearchArtists: any

  private total = []

  get Lists () {
    if (this.isReset) {
      this.total = this.artists.result
      this.setSearchIsReset(false)
    } else {
      this.total = this.total.concat(this.artists.result)
    }
    return this.total
  }

  async detail(id: number) {
    this.GetArtistDetail(id)
      .then(() => {
        this.$router.push({
          path: `/singer/${id}`
        })
      })
      .catch(() => {
        this.$message({
          type: 'error',
          message: '网络错误请重试'
        })
      })
  }
  loadMore () {
    setTimeout(async () => {
      const { limit, offset } = this.artists
      this.setSearchArtistsPage(limit + offset)
      await this.getSearchArtists()
      this.setLoading(false)
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
.artists{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
  .item {
    .avatar {
      cursor: pointer;
      margin: 30px 30px 10px 30px;
      width: 100px;
      height: 100px;
      border: 2px solid #ccc;
      border-radius: 50%;
      display: flex;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .name {
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
