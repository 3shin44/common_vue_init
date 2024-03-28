<template>
  <div class="edit-modal">
    <el-dialog title="詳細內容" :visible.sync="dialogVisible" width="80%">
      <div class="px-3">
        帳號 {{ cloneContent.Account }}
        姓名 {{ cloneContent.Name }}
        <hr>
        接線單位
        <el-select v-model="cloneContent.ResponsibleDept" size="mini">
          <el-option v-for="(item, index) in $mockData.deptList" :key="index" :label="item.Name" :value="item.Name">
          </el-option>
        </el-select>
        身分
      </div>
      <span slot="footer" class="dialog-footer">
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
      },
    },
    data() {
      return {
        dialogVisible: false,
        cloneContent: {}
      }
    },
    methods: {
      requestSave() {
        this.$emit("request-save", this.cloneContent)
        this.dialogVisible = false
      },
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
    created(){
      this.resetCloneContent()

    },
    watch: {
      editContent: {
        handler(newVal) {
          this.resetCloneContent()
          Object.assign(this.cloneContent, newVal)
        },
        immediate: true
      },
      // 傳遞v-model
      modalShow: {
        handler(newVal) {
          this.dialogVisible = newVal
        },
        immediate: true
      },
      dialogVisible: {
        handler(newVal) {
          if (!newVal) {
            this.$emit("update:modalShow", false)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>