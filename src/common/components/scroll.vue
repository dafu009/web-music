<template lang="pug">
  .scroll-wrapper(ref="wrapper")
    slot
</template>
<script lang="ts">
import BScroll from 'better-scroll'
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
const DIRECTION_H: string = 'horizontal'
const DIRECTION_V: string = 'vertical'
@Component({})
export default class scroll extends Vue {
  @Prop() private probeType?: number = 1
  @Prop() private click?: boolean = false
  @Prop() private listenScroll?: boolean = false
  @Prop() private data = []
  @Prop() private pullup?: boolean = false
  @Prop() private beforeScroll?: boolean = false
  @Prop() private refreshDelay?: number = 20
  @Prop() private direction?: string = DIRECTION_V

  @Ref('wrapper') readonly wrapper!: HTMLDivElement

  @Watch('data')
  dataChange() {
    setTimeout(() => {
      this.refresh()
    }, this.refreshDelay)
  }

  private scroll: any = 0

  _initScroll() {
    if (!this.wrapper) return
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: this.click,
      eventPassthrough:
        this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
    })
    if (this.listenScroll) {
      this.scroll.on('scroll', (pos: any) => {
        this.$emit('scroll', pos)
      })
    }
    if (this.pullup) {
      this.scroll.on('scrollEnd', () => {
        if (this.scroll.y <= this.scroll.maxScrollY + 50) {
          this.$emit('scrollToEnd')
        }
      })
    }
    if (this.beforeScroll) {
      this.scroll.on('beforeScrollStart', () => {
        this.$emit('beforeScroll')
      })
    }
  }
  disable() {
    this.scroll && this.scroll.disable()
  }
  enable() {
    this.scroll && this.scroll.enable()
  }
  refresh() {
    this.scroll && this.scroll.refresh()
  }
  scrollTo() {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
  }
  scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
  }
}
</script>
<style lang="scss" scoped></style>
