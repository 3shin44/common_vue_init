<template>
  <div class="common-table">
    <!-- body: table -->
    <div class="base-table-body">
      <el-table
        v-loading="loading"
        :data="displayData"
        v-bind="elTableAttrs"
        @row-click="rowClick"
        empty-text="暫無資料"
        @sort-change="sortChange"
      >
        <template v-for="(item, index) in getHeaders">
          <!-- slot -->
          <el-table-column
            v-if="item.type === 'button'"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :key="index"
            v-bind="item.colAttrs"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >編輯</el-button
              >
            </template>
          </el-table-column>
          <!-- default column -->
          <el-table-column
            v-else
            :prop="item.data"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :key="index"
            v-bind="item.colAttrs"
          >
          </el-table-column>
        </template>
      </el-table>
    </div>
    <!-- footer: indicator, pagination -->
    <div class="base-table-footer pt-2">
      <!-- 資料總筆數 -->
      <div v-if="showIndicator">
        <p class="text-start">
          顯示第 {{ startNo }} 至 {{ endNo }} 項結果，共
          {{ tableData.length }} 項
        </p>
      </div>
      <!-- 頁碼 -->
      <div v-if="showPagination">
        <el-pagination
          class="d-flex justify-content-center"
          layout="prev, pager, next"
          :total="tableData.length"
          :current-page.sync="currentPageNo"
          :page-size="numberPerPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Prototype table with Number of dataset and pagination
 * @displayName Prototype Table
 */
export default {
  name: 'CommonTable',
  props: {
    /**
     * 原生讀取動畫
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 表頭設定檔 type
     * @values type 欄位類型 (ex. checkbox)
     * @values data 資料key值 (object key name)
     * @values label 欄位標籤
     * @values width 欄位寬度 (Ex. prop: 100 -> get 100px)
     * @values minWidth 最小寬大(%) Ex. prop: 10 -> get 10%)
     */
    headers: {
      type: Array,
      default: () => []
    },
    /**
     * 原始資料來源
     */
    tableData: {
      type: Array,
      default: () => []
    },
    /**
     * 每頁顯示資料量
     */
    numberPerPage: {
      type: Number,
      default: 10
    },
    /**
     * 原生表格屬性 (如: stripe, border)
     * @values 以物件傳入原生表格屬性 ( :el-table-attrs="{stripe: 'stripe', border: 'border'}" )
     */
    elTableAttrs: {
      type: Object,
      default: () => {}
    },
    /**
     * 外部指定跳至第幾頁 (有防呆, 不能指定超出範圍頁數)
     */
    toPageNo: {
      type: Number,
      default: 1
    },
    /**
     * 顯示頁碼
     */
    showPagination: {
      type: Boolean,
      default: true
    },
    /**
     * 顯示資料比數指示
     */
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 元件內部 使用的資料
      cloneTableData: [],
      // 顯示資料起訖數
      startNo: 0,
      endNo: 0,
      // 當前頁碼
      currentPageNo: 1
    }
  },
  methods: {
    /**
     * Element-UI 原生方法: 欄位資料被點擊
     * @param {object} rowData 被點擊時傳入該筆資料
     */
    rowClick(rowData) {
      /**
       * emit 被點擊的資料
       * @property {object} rowData 被點擊的資料
       */
      this.$emit('row-click', rowData)
    },

    /**
     * 根據當前頁碼 更新起訖資料筆數
     */
    updatePageNo() {
      // 更新起使頁碼
      if (this.currentPageNo === 1) {
        this.startNo = 1
      } else {
        this.startNo = (this.currentPageNo - 1) * this.numberPerPage + 1
      }
      // 更新結束頁碼
      if (this.currentPageNo * this.numberPerPage < this.tableData.length) {
        this.endNo = this.currentPageNo * this.numberPerPage
      } else {
        this.endNo = this.tableData.length
      }
    },
    /**
     * 起訖編號歸零
     */
    resetRangeNo() {
      this.startNo = 0
      this.endNo = 0
    },
    /**
     * 對所有資料進行排序
     */
    sortChange({ column, prop, order }) {
      switch (order) {
        case 'descending':
          this.cloneTableData = this.cloneTableData
            .sort((a, b) => {
              if (
                // 數字
                !isNaN(Number(a[prop])) &&
                !isNaN(Number(b[prop]))
              ) {
                return Number(a[prop]) > Number(b[prop]) ? -1 : 1
              } else if (
                // 百分比
                String(a[prop]).substr(-1) === '%' &&
                !isNaN(
                  Number(String(a[prop]).substr(0, String(a[prop]).length - 1))
                ) &&
                String(b[prop]).substr(-1) === '%' &&
                !isNaN(
                  Number(String(b[prop]).substr(0, String(b[prop]).length - 1))
                )
              ) {
                return Number(a[prop].replace('%', '')) >
                  Number(b[prop].replace('%', ''))
                  ? -1
                  : 1
              } else if (
                // 非時間格式
                this.validateDatetime(a[prop], b[prop])
              ) {
                return String(b[prop] || '').localeCompare(
                  String(a[prop] || '')
                )
              }
              return a[prop] > b[prop] ? -1 : 1
            })
            .sort((a, b) => {
              let aValue = String(a[prop])
              if (
                ['undefined', 'null'].includes(aValue) ||
                // 百分比不根據長度排
                aValue.substr(-1) === '%'
              ) {
                aValue = ''
              }
              let bValue = String(b[prop])
              if (
                ['undefined', 'null'].includes(bValue) ||
                // 百分比不根據長度排
                bValue.substr(-1) === '%'
              ) {
                bValue = ''
              }
              return bValue.length - aValue.length
            })
          break
        case 'ascending':
          this.cloneTableData = this.cloneTableData
            .sort((a, b) => {
              if (
                // 數字
                !isNaN(Number(a[prop])) &&
                !isNaN(Number(b[prop]))
              ) {
                return Number(a[prop]) > Number(b[prop]) ? 1 : -1
              } else if (
                // 百分比
                String(a[prop]).substr(-1) === '%' &&
                !isNaN(
                  Number(String(a[prop]).substr(0, String(a[prop]).length - 1))
                ) &&
                String(b[prop]).substr(-1) === '%' &&
                !isNaN(
                  Number(String(b[prop]).substr(0, String(b[prop]).length - 1))
                )
              ) {
                return Number(a[prop].replace('%', '')) >
                  Number(b[prop].replace('%', ''))
                  ? 1
                  : -1
              } else if (
                // 非時間格式
                this.validateDatetime(a[prop], b[prop])
              ) {
                return String(a[prop] || '').localeCompare(
                  String(b[prop] || '')
                )
              }
              return a[prop] > b[prop] ? 1 : -1
            })
            .sort((a, b) => {
              let aValue = String(a[prop])
              if (
                ['undefined', 'null'].includes(aValue) ||
                // 百分比不根據長度排
                aValue.substr(-1) === '%'
              ) {
                aValue = ''
              }
              let bValue = String(b[prop])
              if (
                ['undefined', 'null'].includes(bValue) ||
                // 百分比不根據長度排
                bValue.substr(-1) === '%'
              ) {
                bValue = ''
              }
              return aValue.length - bValue.length
            })
          break
        default:
          this.cloneTableData = this.cloneTableData.sort(
            (a, b) => a.defaultSort - b.defaultSort
          )
      }
    },
    // 驗證是否為時間格式 (moment不指定時間格式會叫)
    validateDatetime(a, b) {
      let newA = new Date(a) || ''
      let newB = new Date(b) || ''
      let result =
        (newA != 'Invalid Date' || newA != 'NaN') &&
        (newB != 'Invalid Date' || newB != 'NaN')
      return result
    },
    handleEdit(index, rowData) {
      this.$emit('button-click', index, rowData)
    }
  },
  computed: {
    // 表格顯示資料集
    displayData() {
      // 無資料
      if (this.cloneTableData.length === 0) {
        this.resetRangeNo()
        return []
      }

      // 開啟分頁功能時, 丟回頁碼指定範圍的資料
      if (this.showPagination) {
        // 有資料更新起訖範圍, 回傳對應資料範圍
        this.updatePageNo()
        return this.cloneTableData.slice(this.startNo - 1, this.endNo)
      } else {
        // 關閉頁碼功能時, 丟回原始資料
        return this.cloneTableData
      }
    },

    // 表頭
    getHeaders() {
      // 無指定表頭, 使用預設物件KEY值做欄位名稱
      if (this.headers.length === 0 && this.cloneTableData.length > 0) {
        let defaultHeaders = []
        for (const [key, value] of Object.entries(this.cloneTableData[0])) {
          defaultHeaders.push({
            data: key,
            label: key
          })
        }
        return defaultHeaders
      }

      // 使用外部指定表頭
      return this.headers
    }
  },
  watch: {
    // 指定跳頁
    toPageNo(newVal) {
      let maxPageNo = Math.ceil(this.cloneTableData.length / this.numberPerPage)
      if (newVal <= maxPageNo) {
        this.currentPageNo = newVal
      } else {
        this.currentPageNo = 1
      }
    },
    // 監聽上層傳遞資料, 有更新產生一組至元件內部
    tableData: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.cloneTableData = JSON.parse(JSON.stringify(newVal))
        } else {
          this.cloneTableData = []
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .cell {
  padding: 8px 10px 8px 0;
}

/* normal */
::v-deep .el-table .el-table__cell {
  min-height: 40px;
  padding: 8px 10px 8px 0;
}

/* sortable header reduce padding size */
::v-deep .el-table .el-table__cell.is-sortable {
  padding: 3px 10px 3px 0;
}
</style>
