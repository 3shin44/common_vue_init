<template>
  <div class="seat-mgnt-view p-2">
    <SeatMgntPanel />
  </div>
</template>

<script>
import SeatMgntPanel from '@/components/SeatMgnt/SeatMgntPanel.vue'
export default {
  name: 'SeatMgntView',
  components: { SeatMgntPanel },
  props: {},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
