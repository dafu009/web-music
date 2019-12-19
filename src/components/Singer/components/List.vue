<template lang="pug">
.lists
  .item(v-for="(item, index) in lists" :key="index" @click="detail(item.id)")
    .avatar
      img(v-lazy="item.img1v1Url")
    .name {{ item.name }}
</template>
<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class List extends Vue {
  @Prop() private lists!: []
  @Action('GetArtistDetail') GetArtistDetail: any

  async detail(id: number) {
    await this.GetArtistDetail(id)
    this.$router.push({
      path: `/singer/${id}`
    })
  }
}
</script>
<style lang="scss" scoped>
.lists {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 100px;
  .item {
    .avatar {
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
