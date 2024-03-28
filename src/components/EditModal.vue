<template>
  <div class="edit-modal">
    <el-dialog title="詳細內容" :visible.sync="dialogVisible" width="80%">
      <div class="px-3">
        帳號 {{ editContent.Account }}
        姓名 {{ editContent.Name }}
        <hr>
        接線單位
        身分
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">儲存</el-button>
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
      editContent: () => ({})
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
      cloneContent: {}
    },
    computed: {


    },
    watch: {
      editContent: {
        handler(newVal) {
          this.cloneContent = Object.assign(newVal)
        }
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