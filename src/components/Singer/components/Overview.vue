<template lang="pug">
.overview
  .title {{ '热门歌手' }}
  .singer-content
    .sort-tab
    .lists
      .item(v-for="(item, index) in lists" :key="index")
        .avatar
          img(v-lazy="item.img1v1Url")
        .name {{ item.name }}
  loading
</template>
<script lang="ts">
import { Mutation, State } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Loading from '@/components/Loading/index.vue'
import api from '@/api'
@Component({
  components: {
    Loading
  }
})
export default class Overview extends Vue {
  @State(state => state.singer.artists) lists: any
  @Mutation('setSingerList') setSingerList: any

  created() {
    api.singer
      .getTopArtistList({
        params: {
          offset: 0,
          limit: 20
        }
      })
      .then(data => {
        this.setSingerList(data)
      })
      .catch(() => {})
  }
}
</script>
<style lang="scss" scoped>
.overview {
  .title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  .singer-content {
    .sort-tab {
      width: 100%;
      height: 100px;
      background-color: #ccc;
    }
    .lists {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .item {
        .avatar {
          margin: 30px 30px 10px 30px;
          width: 100px;
          height: 100px;
          border: 2px solid #ccc;
          border-radius: 50%;
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
  }
}
</style>
