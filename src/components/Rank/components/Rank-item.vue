<template lang="pug">
  .rank-item(:style="{ maxHeight: `${windowHeight}px` }")
    .item
      .header
        .cover
          img(v-lazy="CurrnetRank.cover")
        .desc
          .name {{ CurrnetRank.name }}
          .creator
            .avatar
              img(v-lazy="CurrnetRank.creator.avatarUrl")
            .name {{ CurrnetRank.creator.nickname }}
          .des {{ CurrnetRank.desc }}
          .updateTime 最近更新：{{ CurrnetRank.updateTime | formatDate }}
      .content
        .list
          .song
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { CONFIG, Rank } from '@/store/types'
import { formatDate } from '@/common/ts/filter'
@Component({
  components: {},
  filters: {
    formatDate
  }
})
export default class RankItem extends Vue {
  @State((state: CONFIG) => state.rank) CurrnetRank!: Rank
  get windowHeight() {
    return window.innerHeight
  }
}
</script>
<style lang="scss" scoped>
.rank-item {
  margin-left: 20px;
  overflow: hidden;
  overflow-y: scroll;
  flex: 1;
  padding: 20px 50px;
  .header {
    display: flex;
    .cover {
      width: 200px;
      height: 200px;
      margin-right: 40px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover
      }
    }
    .desc {
      flex: 1;
      display: flex;
      flex-direction: column;
      .name {
        font-size: 24px;
        flex: 1;
      }
      .creator {
        display: flex;
        align-items: center;
        flex: 1;
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }
        .name {
          font-size: 16px;
        }
      }
      .des {
        flex: 1;
      }
      .updateTime {
        font-size: 14px;
        text-align: right;
      }
    }
  }
}
.rank-item::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.rank-item::-webkit-scrollbar-track {
  background-color: #fff;
}

.rank-item::-webkit-scrollbar-thumb {
  background: rgb(146, 181, 255);
  border-radius: 20px;
}
li {
  height: 100px;
  width: 100px;
  background-color: aqua;
}
</style>
