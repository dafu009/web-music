<template lang="pug">
transition(name="fade")
  .wrap(v-if="currentName === 'albums'")
    section.albums
      template(v-for="(item, index) in Lists")
        .item(:key="index" @click="toAlbumDetail(item.id)")
          .cover
            img(:src="item.picUrl")
          .name {{item.name}}
            span(v-if="item.alias.length > 0")  - {{item.alias[0]}}
          .artist {{item.artist.name}}
    loading(@loadMore="loadMore")
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
export default class artists extends Vue {
  @Prop(String) private currentName!: string

  @State(state => state.search.albums) albums: any
  @State(state => state.search.reset) isReset: any

  @Mutation('setSearchIsReset') setSearchIsReset: any
  @Mutation('setLoading') setLoading: any
  @Mutation('setSearchAlbumsPage') setSearchAlbumsPage: any
  @Action('getSearchAlbums') getSearchAlbums: any
  @Action('getAlbumDetail') getAlbumDetail: any

  private total = []

  get Lists() {
    if (this.isReset) {
      this.total = this.albums.result
      this.setSearchIsReset(false)
    } else {
      this.total = this.total.concat(this.albums.result)
    }
    return this.total
  }

  toAlbumDetail(id: number) {
    this.getAlbumDetail(id)
      .then(() => {
        this.$router.push({
          path: `/album/${id}`
        })
      })
      .catch(() => {
        this.$message({
          type: 'error',
          message: '网络错误请重试'
        })
      })
  }

  loadMore() {
    setTimeout(async () => {
      const { limit, offset } = this.albums
      this.setSearchAlbumsPage(limit + offset)
      await this.getSearchAlbums()
      this.setLoading(false)
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
.albums {
  display: flex;
  flex-direction: column;
  .item:nth-child(2n-1) {
    background-color: #e6e6e6;
  }
  .item:hover {
    background-color: #ccc;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    .cover {
      width: 50px;
      height: 50px;
      line-height: 50px;
      margin-right: 20px;
      img {
        width: 100%;
      }
    }
    .name {
      flex: 2;
    }
    .artist {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
