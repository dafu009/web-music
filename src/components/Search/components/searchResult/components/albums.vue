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
    loading(@loadMore="loadMore" v-if="loadingShow")
</template>
<script lang="ts">
import { State, Action, Mutation } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Loading from '@/components/Loading/index.vue'
import { CONFIG, SearchParams } from '@/store/types'
@Component({
  components: {
    Loading
  }
})
export default class artists extends Vue {
  @Prop(String) private currentName!: string

  @State((state: CONFIG) => state.search.albums) albums!: SearchParams
  @State((state: CONFIG) => state.search.reset) isReset!: boolean

  @Mutation('setSearchIsReset') setSearchIsReset!: Function
  @Mutation('setLoading') setLoading!: Function
  @Mutation('setSearchAlbumsPage') setSearchAlbumsPage!: Function
  @Action('getSearchAlbums') getSearchAlbums!: Function
  @Action('getAlbumDetail') getAlbumDetail!: Function

  private total = []
  private loadingShow = true

  get Lists() {
    if (!this.albums.result || this.albums.result.length === 0) {
      this.loadingShow = false
      return this.total
    }
    if (this.isReset) {
      this.loadingShow = true
      this.total = this.albums.result
      this.setSearchIsReset(false)
    } else {
      this.total = this.total.concat(this.albums.result)
    }
    return this.total
  }

  async toAlbumDetail(id: number) {
    await this.getAlbumDetail(id)
    this.$router.push({
      path: `/album/${id}`
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
  margin-top: 10px;
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
        height: 100%;
        object-fit: cover;
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
