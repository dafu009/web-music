<template lang="pug">
.recently-search
  .header
    .title 最近搜索
    transition(name="fade")
      .clear(@click="clear" v-if="this.searchList.length > 0")
        span.iconfont &#xe631
        span 清空搜索记录
  .list(v-if="this.searchList.length > 0")
    template(v-for="(key, index) in searchList")
      .item(:key="index" @click="research(key)") {{ key }}
  .no-data(v-if="this.searchList.length === 0") 暂无数据
    
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Action, Mutation } from 'vuex-class'
import { CONFIG } from '@/store/types'
@Component({
  components: {}
})
export default class index extends Vue {
  @State((state: CONFIG) => JSON.parse(state.globalEvent.recentlySearched))
  searchList!: any
  @Mutation('setRecentlySearched') setRecentlySearched!: Function
  @Action('searchTotalAction') searchTotalAction!: Function

  async research(keyword: string) {
    await this.searchTotalAction(keyword).then(() => {
      this.$router.push('/search')
    })
  }

  clear () {
    this.setRecentlySearched('[]')
  }
}
</script>
<style lang="scss" scoped>
.recently-search {
  padding: 30px;
  border-bottom: 1px solid #ccc;
  .header {
    display: flex;
    align-items: baseline;
    .title {
      font-size: 24px;
      margin-right: 20px;
    }
    .clear {
      cursor: pointer;
      font-size: 12px;
      padding: 4px 8px;
      color: #595959;
      border: 1px solid #ccc;
      border-radius: 10px;
      span {
        vertical-align: middle;
      }
      .iconfont {
        margin-right: 5px;
      }
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .item {
      cursor: pointer;
      padding: 5px 10px;
      margin-right: 10px;
      text-align: center;
      background-color: #e6e6e6;
      border-radius: 10px;
    }
    .item:hover {
      background-color: #ccc;
    }
  }
  .no-data {
    font-size: 20px;
    margin: 20px;
    text-align: center;
    color: #909090;
  }
}
</style>
