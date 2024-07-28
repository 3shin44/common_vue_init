<template>
  <div class="main-view p-4">
    <h1>MainView</h1>
    <!-- 欄位總數, td:colspan數 -->
    <BSTable :col-count="6" :table-cfg="header" :table-data="tableData" />


    <div class="form-floating">
      <textarea id="floatingTextarea" class="form-control" >
        {{header}}
      </textarea>
      <label for="floatingTextarea">HEADER CFG</label>
    </div>
  </div>
</template>

<script>
import BSTable from '@/components/BSTable'
export default {
  name: 'MainView',
  props: {},
  components: { BSTable },
  data() {
    return {
      header: [
        [
          {
            "thLabel": "表頭1",
            "tdValue": "key1",
            "colspan": 1
          },
          {
            "thLabel": "表頭2",
            "tdValue": "key2",
            "colspan": 1
          },
          {
            "thLabel": "表頭3",
            "tdValue": "key3",
            "colspan": 1
          }
        ],
        [
          {
            "thLabel": "表頭4",
            "tdValue": "key4",
            "colspan": 2
          },
          {
            "thLabel": "表頭5",
            "tdValue": "key5",
            "colspan": 2
          }
        ],
        [
          {
            "thLabel": "表頭6",
            "tdValue": "key6",
            "colspan": 3
          },
          {
            "thLabel": "表頭7",
            "tdValue": "key7",
            "colspan": 1
          }
        ]
      ],
      tableData: {
        key1: 111,
        key2: 222,
        key3: 333,
        key4: 444,
        key5: 555,
        key6: 666,
        key7: 777
      }
    }
  },
  methods: {},
  mounted() { }
}
</script>

<style scoped></style>
