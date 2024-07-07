<template>
  <div>
    <div class="d-flex justify-content-end">
      <el-button type="success" size="mini" @click="handleEdit('insert')">新增</el-button>
      <el-button type="danger" size="mini" @click="handleEdit('delete')">刪除</el-button>
    </div>

    <CommonTable 
      :number-per-page="10" 
      :headers="headers" 
      :table-data="tableData" 
      @button-click="openEdit" 
      :select-list.sync="selectedList"
    />

    <DNEditModal :modal-show.sync="modalShow" :edit-content="currentData" @request-save="updateData"
      @clear-current="currentData = null"></DNEditModal>
  </div>
</template>

<script>
  import CommonTable from '@/components/CommonTable.vue'
  import DNEditModal from '@/components/DNMgnt/DNEditModal.vue'
  export default {
    name: 'DNMgntPanel',
    components: { CommonTable, DNEditModal },
    props: {},
    data() {
      return {
        headers: [
          {
            width: 55,
            colAttrs: {
              type: "selection"
            }
          },
          {
            label: '位次',
            data: 'Seat',
            colAttrs: {
              className: "text-center"
            }
          },
          {
            label: '主機IP',
            data: 'IP',
            colAttrs: {
              className: "text-center"
            }
          },
          {
            label: '操作',
            type: 'button',
            colAttrs: {
              className: "text-center"
            }
          }
        ],
        // 讀取動畫
        isQuerying: false,
        // 編輯視窗顯示
        modalShow: false,
        // 當前編輯物件指標
        currentData: null,
        // 表格資料來源
        tableData: [],
        selectedList: []
      }
    },
    methods: {
      // 開啟編輯視窗 & 更新指標
      handleEdit(actionType, targetData) {
        this.modalShow = true
      },
      openEdit(targetData) {
        console.log(targetData)
      },
      // EMIT上來的新資料, 更新到原始資料陣列
      async updateData(rData) {
        this.isQuerying = true
        this.tableData = []
        let target = this.$mockData.agentList.find(
          (e) => Number(e.DBID) === Number(rData.DBID)
        )
        // 回寫到原始資料 再丟給表格元件
        Object.assign(target, rData)
        this.tableData = this.$mockData.agentList
        await this.mockLoading()
        this.isQuerying = false
      },
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
        // 進入後模擬讀取名單列表
        this.isQuerying = true
        this.tableData = this.$mockData.seatList
        await this.mockLoading()
        this.isQuerying = false
      })()
    }
  }
</script>

<style lang="scss" scoped>

</style>