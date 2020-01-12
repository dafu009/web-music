<template lang="pug">
.searchForm(:class="{'active': isActive}")
  span.submit.iconfont(@click="search") &#xe6e2
  input.input(
    clearable
    type="text"
    v-model="keywords"
    placeholder="歌曲, 歌单, 歌手, MV..."
    @keyup.enter="search"
    @focus="isActive = true"
    @blur="isActive = false")
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, State, Mutation } from 'vuex-class'
@Component({
    components: {
        
    }
})
export default class search extends Vue {

  private keywords: string = ''
  private isActive: boolean = false
  @Mutation('setSearchKeywords') setSearchKeywords: any
  @Mutation('setSearchStatus') setSearchStatus: any
  @Mutation('resetSearchAllConfig') resetSearchAllConfig: any

  @Action('getSearchSongs') getSearchSongs: any
  @Action('getSearchArtists') getSearchArtists: any
  @Action('getSearchAlbums') getSearchAlbums: any
  @Action('getSearchPlaylist') getSearchPlaylist: any
  @Action('getSearchMv') getSearchMv: any

  async search () {
    if (this.keywords) {
      await this.resetSearchAllConfig()
      await this.setSearchKeywords(this.keywords)
      Promise.all(
        [
          this.getSearchSongs(),
          this.getSearchArtists(),
          this.getSearchAlbums(),
          this.getSearchPlaylist(),
          this.getSearchMv()
      ])
      .then(async () => {
        await this.setSearchStatus(true)
        if (this.$route.name === 'search') return
        this.$router.push('/search')
      })
      .catch(() => {})
    }
  }

}
</script>
<style lang='scss' scoped >
.searchForm {
  width: 250px;
  height: 40px;
  margin: 0 auto 25px;
  line-height: 40px;
  border-radius: 40px;
  border: 2px solid #717171;
  background:#F9F0DA;
  .submit {
    padding: 0 12px;
    font-size: 30px;
    vertical-align: top;
    cursor: pointer;
    color: #717171;
  }
  .input {
    height: 100%;
    padding: 0;
    border-radius: 40px;
    border: none;
    outline: none;
    width: 180px;
    background:#F9F0DA;
    transition: .3s linear;
    vertical-align: top;
    color: #3c3c3c;
  }
}
.active {
  border: 2px solid rgb(14, 42, 90);
  box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.4);
  .submit {
    color: rgb(14, 42, 90)
  }
}
</style>