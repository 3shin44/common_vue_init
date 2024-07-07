<template>
  <div class="dn-mgnt-view p-2">
    <!-- 結果表格與動畫 -->
    <div v-if="isQuerying" class="d-flex justify-content-center align-items-center pt-2">
      <div class="loading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <DNMgntPanel v-if="!isQuerying" />
  </div>
</template>

<script>
  import DNMgntPanel from '@/components/DNMgnt/DNMgntPanel.vue'
  export default {
    name: 'DNMgntView',
    components: { DNMgntPanel },
    props: {},
    data() {
      return {
        // 讀取動畫
        isQuerying: false,
      }
    },
    methods: {
      // 模擬讀取秒數
      mockLoading() {
        return new Promise((res) => {
          setTimeout(() => {
            res('')
          }, 1000)
        })
      }
    },
    mounted() {
      ; (async () => {
        this.isQuerying = true
        await this.mockLoading()
        this.isQuerying = false
      })()
    }
  }
</script>

<style lang="scss" scoped>

</style>