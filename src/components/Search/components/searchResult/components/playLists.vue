<template lang="pug">
transition(name="fade")
  .wrap(v-if="currentName === 'playLists'")
    section.playLists
      template(v-for="(item, index) in Lists")
        .item(:key="index" @click="detail(item.id)")
          .cover
            img(v-lazy="item.coverImgUrl")
          .name {{item.name}}
    loading(@loadMore="loadMore" v-if="loadingShow")
</template>
<script lang="ts">
import { State, Action, Mutation } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Loading from '@/components/Loading/index.vue'
@Component({
  components: {
    Loading
  }
})
export default class playLists extends Vue {
  @Prop(String) private currentName!: string
  @State(state => state.search.playLists) playLists: any
  @State(state => state.search.reset) isReset: any

  @Mutation('setSearchIsReset') setSearchIsReset: any
  @Mutation('setLoading') setLoading: any
  @Mutation('setSearchPlayListsPage') setSearchPlayListsPage: any
  @Action('getPlayListDetail') getPlayListDetail: any
  @Action('getSearchPlaylist') getSearchPlaylist: any

  private total = []
  private loadingShow = true

  get Lists () {
    if (!this.playLists.result  || this.playLists.result.length === 0) {
      this.loadingShow = false
      return this.total
    }
    if (this.isReset) {
      this.loadingShow = true
      this.total = this.playLists.result
      this.setSearchIsReset(false)
    } else {
      this.total = this.total.concat(this.playLists.result)
    }
    return this.total
  }
  detail(id: number) {
    this.getPlayListDetail(id)
      .then(() => {
        this.$router.push({
          path: `/play-list/${id}`
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
      const { limit, offset } = this.playLists
      this.setSearchPlayListsPage(limit + offset)
      await this.getSearchPlaylist()
      this.setLoading(false)
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
.playLists {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  .item {
    cursor: pointer;
    width: 150px;
    margin: 10px 15px;
    .cover {
      width: 150px;
      height: 150px;
      text-align: center;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .name {
      font-size: 14px;
      color: #515151;
      padding: 10px 5px 0;
    }
  }
}
</style>
