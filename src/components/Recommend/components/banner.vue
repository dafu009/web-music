<template lang="pug">
.swiper
  .booth(v-if="banners.length === 0")
    img(src="@/assets/image/banner.jpg")
  transition(name="fade")
    swiper(:options="swiperOption" v-if="banners.length > 0")
      swiper-slide(v-for="(item, index) in banners" :key="index")
        .item
          img(:src="item.imageUrl")
      .swiper-pagination.swiper-pagination-white(slot="pagination")
</template>
<script lang="ts">
import 'swiper/dist/css/swiper.css'
import { Mutation, State, Action } from 'vuex-class'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {
    swiper,
    swiperSlide
  }
})
export default class banner extends Vue {
  @State(state => state.recommend.banners) banners: any
  @Action('getBanner') getBanner: any

  private swiperOption = {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }

  async created() {
    await this.getBanner()
  }
}
</script>
<style lang="scss" scoped>
.booth {
  width: 900px;
  margin: 0 auto;
  img {
    width: 100%;
    border-radius: 10px;
  }
}
.swiper {
  width: 900px;
  margin: 0 auto;
  .item {
    width: 100%;
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>
