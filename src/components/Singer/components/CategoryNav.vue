<template lang="pug">
  ul.category-nav
    li.item(
      :class="{'active': currentItem === item.value}"
      v-for="(item, index) in categoryList"
      :key="item.value"
      @click="checkout(item.value, item.name)"
    ) {{ item.name }}
</template>
<script lang="ts">
import artistCategory from '@/base/artistCategory'
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Nav extends Vue {
  private lists = []
  private currentItem: number = 0
  get categoryList() {
    return Object.entries(artistCategory).map(([name, value]) => ({
      name,
      value
    }))
  }

  @Emit('checkout')
  checkout(value: number, name: string) {
    this.currentItem = value
    return {
      name, value
    }
  }

  mounted() {
  }

  
}
</script>
<style lang="scss" scoped>
.category-nav {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  li.item {
    list-style: none;
    width: 100px;
    height: 50px;
    line-height: 50px;
    margin: 0 5px;
    text-align: center;
  }
  .active {
    background-color: #e3e3e3;
    border-radius: 20px;
  }
}
</style>
