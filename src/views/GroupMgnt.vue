<template>
  <div class="group-mgnt-view p-2">
    <CommonTable
      :number-per-page="7"
      :headers="headers"
      :table-data="tableData"
      @button-click="openEdit"
    />

    <EditModal
     :modal-show.sync="modalShow"
     :edit-content="currentData"
     @request-save="updateData"
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
      isLoading: false,
      modalShow: false,
      currentData: null,
      tableData: []
    }
  },
  methods: {
    openEdit(idx, rData) {
      console.log(idx, rData)
      this.currentData = rData
      this.modalShow = true
    },
    async updateData(rData){
      this.tableData = []
      let target = this.$mockData.agentList.find(e=> Number(e.DBID) === Number(rData.DBID) )
      Object.assign(target, rData)
      this.tableData = this.$mockData.agentList
    }
  },
  mounted() {
    this.tableData = this.$mockData.agentList
  }
}
</script>

<style scoped></style>
