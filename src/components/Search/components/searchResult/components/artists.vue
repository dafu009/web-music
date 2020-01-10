<template lang="pug">
transition(name="fade")
  section.artists(v-if="currentName === 'artists'")
    template(v-for="(item, index) in artists")
      .item(:key="item.id" @click="detail(item.id)")
        .avatar
          img(v-lazy="item.img1v1Url")
        .name {{ item.name }}
</template>
<script lang="ts">
import { State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class artists extends Vue {
  @Prop(String) private currentName!:string

  @State(state => state.search.artists.result) artists: any
  @Action('GetArtistDetail') GetArtistDetail: any

  async detail(id: number) {
    this.GetArtistDetail(id)
      .then(() => {
        this.$router.push({
          path: `/singer/${id}`
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
.artists{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .item {
    .avatar {
      cursor: pointer;
      margin: 30px 30px 10px 30px;
      width: 100px;
      height: 100px;
      border: 2px solid #ccc;
      border-radius: 50%;
      display: flex;
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
</style>
