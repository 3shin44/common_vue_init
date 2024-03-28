<template>
  <div class="group-mgnt-view p-2">
    <CommonTable
      :number-per-page="7"
      :headers="headers"
      :table-data="$mockData.agentList"
      @button-click="openEdit"
    />

    <EditModal
     :modal-show.sync="modalShow"
     :edit-content="currentData"
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
      currentData: null
    }
  },
  methods: {
    openEdit(idx, rData) {
      console.log(idx, rData)
      this.currentData = rData
      this.modalShow = true
    }
  },
  mounted() {}
}
</script>

<style scoped></style>
