<template>
  <div class="seat-edit-modal">
    <el-dialog :title="cModalTitle" :visible.sync="dialogVisible" width="80%">
      <div class="px-3" v-if="actionType != 'delete'">
        <div class="row">
          <p class="col-2 col-form-label">位次</p>
          <div class="col-10">
            <p class="p-0 m-0"><el-input v-model="cloneContent.Seat" size="mini"></el-input></p>
          </div>
        </div>
        <div class="row">
          <p class="col-2 col-form-label">主機IP</p>
          <div class="col-10">
            <p class="p-0 m-0"><el-input size="mini" v-model="cloneContent.IP"></el-input></p>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer d-flex justify-content-center">
        <el-button :type="cBtnState.type" @click="requestSave">{{ cBtnState.label }}</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SeatEditModal',
  props: {
    modalShow: {
      type: Boolean,
      default: false
    },
    editContent: {
      type: Object,
      default: () => ({})
    },
    actionType: {
      type: String,
      default: "insert"
    }
  },
  data() {
    return {
      dialogVisible: false,
      cloneContent: {}
    }
  },
  methods: {
    // 送上去處理 (動作類型, 資料組)
    requestSave() {
      this.$emit('request-save', this.actionType, this.cloneContent)
      this.dialogVisible = false
    },
    // 資料初始化
    resetCloneContent() {
      this.cloneContent = {
        DBID: null,
        Seat: "",
        IP: ""
      }
    }
  },
  created() {
    this.resetCloneContent()
  },
  computed: {
    cModalTitle() {
      let modalTitle = ""

      switch (this.actionType) {
        case "insert":
          modalTitle = "新增位次"
          break;

        case "update":
          modalTitle = "編輯位次"
          break;

        case "delete":
          modalTitle = "確認刪除"
          break;
      }
      return modalTitle
    },
    cBtnState() {
      let btnState = {
        type: "primary",
        label: "儲存"
      }

      if (this.actionType === 'delete') {
        btnState.type = "danger"
        btnState.label = "刪除"
      }
      return btnState
    }
  },
  watch: {
    // 監聽資料, PROP下來後要產生另一個新的物件做編輯
    editContent: {
      handler(newVal) {
        this.resetCloneContent()
        if (this.actionType === 'update') {
          Object.assign(this.cloneContent, newVal)
        }
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
