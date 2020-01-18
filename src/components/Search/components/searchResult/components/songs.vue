<template lang="pug">
transition(name="fade")
  .wrap
    section.songs(v-if="currentName === 'songs'")
      template(v-for="(item, index) in Lists")
        .item(:key="index")
          .song
            .name {{ item.name }}
          .singer(@click="toSingerDetail(item.artists[0].id)")
            .name {{ item.artists[0].name }}
          .operating
            play.selfPlay(:song="item")
      loading(@loadMore="loadMore" v-if="loadingShow")
</template>
<script lang="ts">
import { State, Mutation, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Play from '@/common/components/play.vue'
import Loading from '@/components/Loading/index.vue'
import { CONFIG, SearchParams } from '@/store/types'

@Component({
  components: {
    Play,
    Loading
  }
})
export default class songs extends Vue {
  @Prop(String) private currentName!: string
  @State((state: CONFIG) => state.search.songs) songs!: SearchParams
  @State((state: CONFIG) => state.search.reset) isReset!: boolean

  @Mutation('setSearchIsReset') setSearchIsReset!: Function
  @Mutation('setLoading') setLoading!: Function
  @Mutation('setSearchSongsPage') setSearchSongsPage!: Function
  @Action('getSearchSongs') getSearchSongs!: Function
  @Action('GetArtistDetail') GetArtistDetail!: Function

  private total = []
  private loadingShow = true

  get Lists() {
    if (!this.songs.result || this.songs.result.length === 0) {
      this.loadingShow = false
      return this.total
    }
    if (this.isReset) {
      this.loadingShow = true
      this.total = this.songs.result
      this.setSearchIsReset(false)
    } else {
      this.total = this.total.concat(this.songs.result)
    }
    return this.total
  }

  async toSingerDetail (id: number) {
    await this.GetArtistDetail(id)
    this.$router.push({
      path: `/singer/${id}`
    })
  }

  loadMore() {
    setTimeout(async () => {
      const { limit, offset } = this.songs
      console.log(this.songs)
      this.setSearchSongsPage(limit + offset)
      await this.getSearchSongs()
      this.setLoading(false)
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
.songs {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  .item:nth-child(2n - 1) {
    background-color: #e6e6e6;
  }
  .item {
    padding: 0 20px;
    display: flex;
    position: relative;
    height: 50px;
    align-items: center;
    .song {
      flex: 1;
    }
    .singer {
      flex: 1;
      cursor: pointer;
    }
    .operating {
      cursor: pointer;
      width: 100px;
      height: 100%;
      position: relative;
      .selfPlay {
        color: #595959;
      }
    }
  }
}
</style>
