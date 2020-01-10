<template lang="pug">
transition(name="fade")
  section.songs(v-if="currentIndex === 3")
    template(v-for="(item, index) in playLists")
      .item(@click="detail(item.id)")
        .cover
          img(v-lazy="item.coverImgUrl")
        .name {{item.name}}
</template>
<script lang="ts">
import { State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class playLists extends Vue {
  @Prop(Number) private currentIndex!: number

  @Action('getPlayListDetail') getPlayListDetail: any

  @State(state => state.search.playLists.result) playLists: any

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
}
</script>
<style lang="scss" scoped>
.songs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
      }
    }
    .name {
      font-size: 14px;
      color: #515151
    }
  }
}
</style>
