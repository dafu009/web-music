<template lang="pug">
  .nav(:style="{ maxHeight: `${windowHeight}px` }")
    .base-line(:style="{ top: `${(currentIndex + 1) * 54}px` }")
    template(v-for="(item, index) in categoryList")
      .nav-item(
        :key="item.value"
        :class="{'active': currentIndex === index}"
        @click="current(index, item.value)") {{ item.name }}
</template>
<script lang="ts">
import RankCategory from '@/base/rankCategory'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { CONFIG, Rank } from '@/store/types'
@Component({
  components: {}
})
export default class Nav extends Vue {
  @State((state: CONFIG) => state.rank) CurrnetRank!: Rank

  @Action('getTopRank') getTopRank: any
  private currentIndex: number = 0
  get windowHeight () {
    return window.innerHeight
  }
  get categoryList() {
    return Object.entries(RankCategory).map(([name, value]) => ({
      name,
      value
    }))
  }
  async created () {
    await this.current()
  }

  async current(index: number = 0, id: number = 0) {
    await this.getTopRank(id)
    this.currentIndex = index
    this.$router.push({
      path: `/rank/${id}`
    })
  }
}
</script>
<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
  padding-bottom: 10px;
  .nav-item {
    width: 250px;
    padding: 10px;
    margin: 5px 0;
    position: relative;
    cursor: pointer;
  }
  .nav-item::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50px;
    bottom: -10px;
    right: 0;
    border-radius: 20px;
    transition: 0.3s;
    opacity: 0.7;
    background: rgba(#3677ff, 0.5);
    transform-origin: left;
    transform: scaleX(0);
  }
  .nav-item:hover::after {
    transform: scaleX(1);
  }
}
.base-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 5px;
  background: #447df5;
  border-radius: 20px;
}
.nav::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.nav::-webkit-scrollbar-track {
  background-color: #fff;
}

.nav::-webkit-scrollbar-thumb {
  background: rgb(146, 181, 255);
  border-radius: 20px;
}
</style>
