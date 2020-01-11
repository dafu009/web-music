<template lang="pug">
transition(name="fade")
  section.albums(v-if="currentName === 'albums'")
    template(v-for="(item, index) in albums")
      .item(:key="item.id" @click="toAlbumDetail(item.id)")
        .cover
          img(:src="item.picUrl")
        .name {{item.name}}
          span(v-if="item.alias.length > 0")  - {{item.alias[0]}}
        .artist {{item.artist.name}}
</template>
<script lang="ts">
import { State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class artists extends Vue {
  @Prop(String) private currentName!: string

  @State(state => state.search.albums.result) albums: any

  @Action('getAlbumDetail') getAlbumDetail: any

  toAlbumDetail (id: number) {
    this.getAlbumDetail(id)
      .then(() => {
        this.$router.push({
          path: `/album/${id}`
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
.albums {
  display: flex;
  flex-direction: column;
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
      }
    }
    .name {
      flex: 2
    }
    .artist {
      flex:1;
      text-align: center;
    }
  }
}
</style>
