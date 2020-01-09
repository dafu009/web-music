<template lang="pug">
  .search
    .searchForm
      span.submit.iconfont(@click="search") &#xe6e2
      input.input(
        clearable
        type="text"
        v-model="keywords"
        placeholder="歌曲, 歌单, 歌手, MV..."
        @keyup.enter="search"
        @blur="keywords = ''")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, State, Mutation } from 'vuex-class'
@Component({
  components: {

  }
})
export default class search extends Vue {
  @State(state => state.search.songs.result) songs: any

  @Mutation('setSearchKeywords') setSearchKeywords: any

  @Action('getSearchSongs') getSearchSongs: any
  @Action('getSearchArtists') getSearchArtists: any
  @Action('getSearchPlaylist') getSearchPlaylist: any
  @Action('getSearchMv') getSearchMv: any

  private keywords: string = ''
  private Pagination = {
    songs: {
      limit: 10,
      offset: 0
    },
    artists: {
      limit: 10,
      offset: 0
    }
  }
  async search () {
    await this.setSearchKeywords(this.keywords)
    this.getSearchSongs()
    this.getSearchArtists()
    this.getSearchPlaylist()
    this.getSearchMv()
  }
}
</script>
<style lang="scss" scoped>
.search {
  .searchForm {
    height: 45px;
    line-height: 45px;
    display: inline-block;
    border-radius: 40px;
    border: 2px solid #324B4E;
    background:#F9F0DA;
    .submit {
      padding: 0 12px;
      font-size: 30px;
      vertical-align: top;
      cursor: pointer;
    }
    .input {
      height: 100%;
      padding: 0;
      border-radius: 45px;
      border: none;
      outline: none;
      width: 300px;
      background:#F9F0DA;
      transition: .3s linear;
      vertical-align: top;
      color: #3c3c3c;
    }
    .input:focus {
      width: 350px;
    }
  }
}
</style>
