<template>
  <div class="edit-modal">
    <el-dialog title="詳細內容" :visible.sync="dialogVisible" width="80%">
      <div class="px-3">
        <div class="row">
          <p class="col-2 col-form-label">帳號</p>
          <div class="col-10">
            <p class="p-0 m-0">{{ cloneContent.Account }}</p>
          </div>
        </div>
        <div class="row">
          <p class="col-2 col-form-label">姓名</p>
          <div class="col-10">
            <p class="p-0 m-0">{{ cloneContent.Name }}</p>
          </div>
        </div>
        <hr class="my-3" />
        <div class="row">
          <p class="col-2 col-form-label">※ 接線單位</p>
          <div class="col-10">
            <el-select
              v-model="cloneContent.ResponsibleDept"
              size="mini"
              class="w-100"
            >
              <el-option
                v-for="(item, index) in $mockData.deptList"
                :key="index"
                :label="item.Name"
                :value="item.Name"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <p class="col-2 col-form-label">※ 身分</p>
          <div class="col-10">
            <el-select v-model="cloneContent.Role" size="mini" class="w-100">
              <el-option
                v-for="(item, index) in $mockData.roleList"
                :key="index"
                :label="item.Name"
                :value="item.Name"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer d-flex justify-content-center">
        <el-button type="primary" @click="requestSave">儲存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditModal',
  props: {
    modalShow: {
      type: Boolean,
      default: false
    },
    editContent: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogVisible: false,
      cloneContent: {}
    }
  },
  methods: {
    // 送上去處理
    requestSave() {
      this.$emit('request-save', this.cloneContent)
      this.dialogVisible = false
    },
    // 資料初始化
    resetCloneContent() {
      this.cloneContent = {
        DBID: 0,
        Account: '',
        Name: '',
        Role: '',
        ResponsibleDept: ''
      }
    }
  },
  created() {
    this.resetCloneContent()
  },
  watch: {
    // 監聽資料, PROP下來後要產生另一個新的物件做編輯
    editContent: {
      handler(newVal) {
        this.resetCloneContent()
        Object.assign(this.cloneContent, newVal)
      },
      immediate: true
    },
    // 傳遞v-model (自己包一次 element-ui: dialogVisible)
    modalShow: {
      handler(newVal) {
        this.dialogVisible = newVal
      },
      immediate: true
    },
    dialogVisible: {
      handler(newVal) {
        if (!newVal) {
          this.$emit('update:modalShow', false)
          this.$emit('clear-current')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__title {
  font-size: 20px;
  color: #0e81bf;
  font-weight: bold;
}
.row {
  display: flex;
  align-items: center;
}
</style>
