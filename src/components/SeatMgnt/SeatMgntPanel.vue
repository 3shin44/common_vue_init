<template>
  <div>
    <!-- 結果表格與動畫 -->
    <div
      v-if="isQuerying"
      class="d-flex justify-content-center align-items-center pt-2"
    >
      <div class="loading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <div v-if="!isQuerying">
      <div class="d-flex justify-content-end">
        <el-button type="success" size="mini" @click="handleEdit('insert')"
          >新增</el-button
        >
        <el-button type="danger" size="mini" @click="handleEdit('delete')"
          >刪除</el-button
        >
      </div>

      <CommonTable
        :number-per-page="10"
        :headers="headers"
        :table-data="tableData"
        @button-click="(rIdx, rData) => handleEdit('update', rData)"
        :select-list.sync="selectedList"
      />

      <SeatEditModal
        :action-type="actionType"
        :modal-show.sync="modalShow"
        :edit-content="currentData"
        @request-save="updateData"
        @clear-current="currentData = null"
      ></SeatEditModal>
    </div>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable.vue'
import SeatEditModal from '@/components/SeatMgnt/SeatEditModal.vue'
export default {
  name: 'SeatMgntPanel',
  components: { CommonTable, SeatEditModal },
  props: {},
  data() {
    return {
      headers: [
        {
          width: 55,
          colAttrs: {
            type: 'selection',
            className: 'selection-fix'
          }
        },
        {
          label: '位次',
          data: 'Seat',
          colAttrs: {
            className: 'text-center'
          }
        },
        {
          label: '主機IP',
          data: 'IP',
          colAttrs: {
            className: 'text-center'
          }
        },
        {
          label: '操作',
          type: 'button',
          colAttrs: {
            className: 'text-center'
          }
        }
      ],
      // 讀取動畫
      isQuerying: false,
      // 編輯視窗顯示
      modalShow: false,
      // 當前編輯物件指標
      currentData: null,
      actionType: '',
      // 表格資料來源
      tableData: [],
      // 已選列表 (刪除用)
      selectedList: []
    }
  },
  methods: {
    // 開啟編輯視窗 & 更新指標
    handleEdit(actionType, targetData) {
      this.actionType = actionType
      // 只在更新時 指向currentData
      if (actionType === 'update') {
        this.currentData = targetData
      }
      this.modalShow = true
    },
    // EMIT上來的新資料, 更新到原始資料陣列
    async updateData(actionType, rData) {
      this.isQuerying = true
      this.tableData = []
      switch (actionType) {
        case 'insert':
          this.insertNewSeat(rData)
          break

        case 'update':
          this.updateSeat(rData)
          break

        case 'delete':
          this.deleteSeat()
          break

        default:
          break
      }
      await this.mockLoading()
      this.tableData = this.$mockData.seatList
      this.isQuerying = false
    },
    insertNewSeat(rData) {
      // 找到最後一組資料, 取得DBID
      let getLastDBID =
        this.$mockData.seatList[this.$mockData.seatList.length - 1]
      if (!getLastDBID) {
        getLastDBID = 1
      } else {
        getLastDBID = getLastDBID.DBID
        getLastDBID++
      }
      // 對原始資料變更
      rData.DBID = getLastDBID
      this.$mockData.seatList.push(rData)
    },
    updateSeat(rData) {
      let target = this.$mockData.seatList.find(
        (e) => Number(e.DBID) === Number(rData.DBID)
      )
      // 回寫到原始資料 再丟給表格元件
      Object.assign(target, rData)
    },
    deleteSeat() {
      // 逐筆刪除
      this.$mockData.seatList = this.$mockData.seatList.filter((element) => {
        // 當前資料有出現在刪除名單裡的
        let findIndex = this.selectedList.findIndex(
          (subElement) => Number(subElement.DBID) === Number(element.DBID)
        )
        // 沒出現的才保留
        return findIndex === -1
      })
    },
    // 模擬讀取秒數
    mockLoading(interval = 1000) {
      return new Promise((res) => {
        setTimeout(() => {
          res('')
        }, interval)
      })
    }
  },
  mounted() {
    ;(async () => {
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
/* 編譯時產生問題, 強制補CSS樣式 */
::v-deep .selection-fix .cell {
  padding-left: 14px;
  padding-right: 14px;
}
</style>
