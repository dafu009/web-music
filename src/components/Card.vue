<template lang="pug">
  .card-item
    .card-item_side
      .card-item__focus
      .card-item__cover
        img.card-item__bg(:src="randomImage")
      .card-item__content

</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Card extends Vue {
  randomImgId: number = 0

  get randomImage() {
    return `https://picsum.photos/id/${this.randomImgId}/500/300`
  }

  RandomNum(Min: number, Max: number) {
    let Range = Max - Min
    let Rand = Math.random()
    let num = Min + Math.round(Rand * Range)
    return num
  }

  init() {
    this.randomImgId = this.RandomNum(1, 1000)
  }

  created() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.card-item {
  height: 300px;
  max-width: 500px;
  margin: 0 auto;
  .card-item_side {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    backface-visibility: hidden;
    box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55);
    .card-item__focus {
      position: absolute;
      border-radius: 5px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85);
      opacity: 0;
      pointer-events: none;
      overflow: hidden;
      border: 2px solid rgba(255, 255, 255, 0.65);
    }
    .card-item__cover {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: #1c1d27;
      background-image: linear-gradient(147deg, #354fce 0%, #0c296b 74%);
      border-radius: 15px;
      overflow: hidden;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    .card-item__content {
      box-sizing: border-box;
      padding: 25px 15px;
      position: relative;
      height: 100%;
      text-shadow: 7px 6px 10px rgba(14, 42, 90, 0.8);
    }
  }
}
</style>
