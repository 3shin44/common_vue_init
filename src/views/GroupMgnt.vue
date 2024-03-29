<template>
  <div class="group-mgnt-view p-2">
    <div class="main-title">群組管理</div>
    <hr />
    <!-- 結果表格與動畫 -->
    <div
      v-if="isQuerying"
      class="query-result d-flex justify-content-center align-items-center pt-2"
    >
      <div class="loading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <CommonTable
      v-if="!isQuerying"
      :number-per-page="7"
      :headers="headers"
      :table-data="tableData"
      @button-click="openEdit"
    />

    <EditModal
      :modal-show.sync="modalShow"
      :edit-content="currentData"
      @request-save="updateData"
      @clear-current="currentData = null"
    ></EditModal>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable.vue'
import EditModal from '@/components/EditModal.vue'
export default {
  name: 'GroupMgntView',
  components: { CommonTable, EditModal },
  props: {},
  data() {
    return {
      headers: [
        {
          label: '帳號',
          data: 'Account'
        },
        {
          label: '姓名',
          data: 'Name'
        },
        {
          label: '身分',
          data: 'Role'
        },
        {
          label: '接線單位',
          data: 'ResponsibleDept'
        },
        {
          label: '操作',
          type: 'button'
        }
      ],
      // 讀取動畫
      isQuerying: false,
      // 編輯視窗顯示
      modalShow: false,
      // 當前編輯物件指標
      currentData: null,
      // 表格資料來源
      tableData: []
    }
  },
  methods: {
    // 開啟編輯視窗 & 更新指標
    openEdit(idx, rData) {
      this.currentData = rData
      this.modalShow = true
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
    ;(async () => {
      // 進入後模擬讀取名單列表
      this.isQuerying = true
      this.tableData = this.$mockData.agentList
      await this.mockLoading()
      this.isQuerying = false
    })()
  }
}
</script>

<style lang="scss" scoped>
.query-result {
  height: 50vh;
}
</style>
