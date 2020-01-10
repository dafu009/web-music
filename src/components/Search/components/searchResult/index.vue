<template lang="pug">
  .search-result
    nav
      ul
        li.tab(
          v-for="(item, index) in tabs"
          :key="item.name"
          @click="switchTab(index)"
          :class="[index === currentIndex ? 'tab-current' : '']")
          p
            span.iconfont(:class="item.icon")
            span {{ item.title }}
    .content-wrap
      songs(:currentIndex="currentIndex")
      artists(:currentIndex="currentIndex")
      playLists(:currentIndex="currentIndex")
      mvs(:currentIndex="currentIndex")
</template>
<script lang="ts">
import { State } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'

import Songs from './components/songs.vue'
import Artists from './components/artists.vue'
import PlayLists from './components/playLists.vue'
import Mvs from './components/mvs.vue'

@Component({
  components: {
    Songs,
    Artists,
    PlayLists,
    Mvs
  }
})
export default class searchResult extends Vue {
  @State(state => state.search.artists.result) artists: any
  @State(state => state.search.playLists.result) playLists: any
  @State(state => state.search.mvs.result) mvs: any

  private tabs = [
    {
      title: '歌曲',
      name: 'songs',
      icon: 'icon-Music'
    },
    {
      title: '歌手',
      name: 'artists',
      icon: 'icon-personal'
    },
    {
      title: '歌单',
      name: 'playLists',
      icon: 'icon-SongListgedan'
    },
    {
      title: 'MV',
      name: 'mvs',
      icon: 'icon-MV'
    }
  ]
  private currentIndex = 0

  mounted() {}

  switchTab(index: number) {
    this.currentIndex = index
  }
}
</script>
<style lang="scss" scoped>
.search-result {
  padding: 40px;
  position: relative;
  nav {
    background-color: #fff;
    ul {
      list-style: none;
      position: relative;
      display: flex;
      margin: 0 auto;
      padding: 0;
      max-width: 1000px;
      justify-content: center;
      li {
        position: relative;
        margin: 0;
        flex: 1;
        height: 60px;
        text-align: center;
        p {
          margin: 0;
          padding: 0;
          font-size: 20px;
          position: relative;
          transition: color 0.3s, transform 0.3s;
          .iconfont {
            padding: 0 8px;
            font-size: 24px;
            vertical-align: bottom;
          }
        }
      }
      li:last-child::before {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #447df5;
        transition: transform 0.3s;
      }
      li:first-child.tab-current ~ li:last-child::before {
        transform: translateX(-300%);
      }
      li:nth-child(2).tab-current ~ li:last-child::before {
        transform: translateX(-200%);
      }
      li:nth-child(3).tab-current ~ li:last-child::before {
        transform: translateX(-100%);
      }
      li.tab-current p {
        color: #447df5;
        transform: translateY(8px);
      }
    }
  }
  .content-wrap {
    padding: 30px 10px;
    position: relative;
    min-height: 400px;
    section {
      position: absolute;
    }
  }
}
</style>
