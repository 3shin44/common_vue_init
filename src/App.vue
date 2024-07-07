<template>
  <div id="app">
    <el-row class="app__adjust_height">
      <el-col :span="4" class="app__adjust_height">
        <el-menu class="border-0" :default-active="defaultMenuIndex">
          <el-menu-item v-for="(item, index) of tabList" :key="index" :index="index.toString()"
            @click="changeComponent(item.compName)">
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="app__adjust_height app__adjust_border">
        <component class="w-100" :is="currentCompnent" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import GroupMgntView from './views/GroupMgntView.vue'
  import PageMgntView from './views/PageMgntView.vue'
  import SeatMgntView from './views/SeatMgntView.vue'
  export default {
    name: 'App',
    components: {
      GroupMgntView, PageMgntView, SeatMgntView
    },
    data() {
      return {
        tabList: [
          {
            label: "人員設定",
            compName: "GroupMgntView"
          },
          {
            label: "頁面設定",
            compName: "PageMgntView"
          },
          {
            label: "話機設定",
            compName: "SeatMgntView"
          }
        ],
        currentCompnent: "",
        defaultMenuIndex: "0"
      }
    },
    methods: {
      changeComponent(cName) {
        this.currentCompnent = cName
      }
    },
    mounted(){
      this.currentCompnent = "SeatMgntView",
      this.defaultMenuIndex = "2"
    }
  }
</script>

<style lang="scss" scoped>
  body, #app, .app__adjust_height, .app__adjust_height .el-menu{
    min-height: 100vh;
    height: 100%;
  }
  .app__adjust_border{
    border-left: solid 1px #e6e6e6;
  }
</style>