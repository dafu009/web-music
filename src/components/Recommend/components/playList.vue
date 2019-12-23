<template lang="pug">
  ul.play-list
    li.item(@click="detail(item.id)" v-for="(item, index) in playList" :key="index")
      .cover
        img(v-lazy="item.picUrl")
      .text
        p.type {{ item.copywriter }}
        p {{ item.name }}
</template>
<script lang="ts">
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class playList extends Vue {
  @State(state => state.recommend.playList) playList: any

  @Action('getRecommendPlayList') getRecommendPlayList: any
  @Action('getPlayListDetail') getPlayListDetail: any

  created() {
    this.getRecommendPlayList()
  }

  detail (id: number) {
     this.getPlayListDetail(id)
      .then(() => {
        this.$router.push({
          path: `/recommend/${id}`
        })
      })
      .catch(() => {
        this.$message({
          type: 'error',
          message: '网络错误请重试'
        })
      })
  }
}
</script>
<style lang="scss" scoped>
ul.play-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  padding: 0;
  li.item {
    box-sizing: border-box;
    cursor: pointer;
    list-style: none;
    width: 250px;
    background-color: #fff;
    padding: 8px;
    margin: 20px;
    border-radius: 10px;
    .cover {
      margin: 0 auto;
      background-color: #f3f3f3;
      box-sizing: border-box;
      width: 230px;
      height: 230px;
      border: 1px solid #f3f3f3;
      padding: 8px;
      text-align: center;
      border-radius: 10px;
      img {
        border-radius: 10px;
        height: 100%;
      }
    }
    .text {
      align-self: center;
      font-size: 16px;
      color: #616161;
      p {
        margin: 0;
        padding: 5px 0;
      }
      .type {
        color: #3a3a3a;
      }
    }
  }
}
</style>
