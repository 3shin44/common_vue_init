<template>
  <div class="main-view">
    <h1>MainView</h1>
    <div>
      {{ urlParam }}
      <br>
      {{ count }}
    </div>


    <button @click="setURLParam">GET URL PARAM</button>
    <button @click="addCount">addCount</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MainView',
  props: {},
  data() {
    return {}
  },
  methods: {
    setURLParam() {
      this.$store.commit('setUrlParam', {
        key1: 1,
        key2: 2
      })
      this.$forceUpdate()
    },
    addCount(){
      this.$store.commit('setCount')
    }
  },
  computed: {
    ...mapState([
      'urlParam',
      'count'
      // ...
    ])
  },
  async mounted() { 
    console.log(1)
    await this.$store.dispatch('aQueryAPI')
    console.log(2)
  }
}
</script>

<style scoped></style>
