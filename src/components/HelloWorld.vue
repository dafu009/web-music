<template lang="pug">
  div(class=["hello"])
    h1(:class="'test'") {{ msg }}
    h3 vue + axios + pug + stylus + typeScript
</template>

<script lang="ts">
import CheckImage from './checkImage.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg?: string
  mounted() {
    this.cons()
  }
  cons() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
