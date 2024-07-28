<template>
  <div class="bs-table">
    <table class="table table-bordered">
      <tbody>
        <tr v-for="(parentItem, index) in tableCfg" :key="index">
          <template v-for="(childItem, index) in parentItem">
            <th class="bg-secondary" scope="row" :key="'th' + index">
              {{ childItem.thLabel }}
            </th>
            <td :colspan="childItem.colspan" :key="'td' + index">
              {{ tableData && tableData[childItem.tdValue] }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BSTable',
  props: {
    colCount: {
      type: Number,
      default: 2
    },
    tableCfg: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      tempArray: []
    }
  },
  computed: {
    // 整理成二維陣列
    cRenderArray() {
      let renderArray = []

      let cloneArray = JSON.parse(JSON.stringify(this.tableCfg))

      function _toArray(sourceArr, currentArr, count = 0, maxCount) {
        if (count >= maxCount) {
          renderArray.push(currentArr)
          currentArr = []
          count = 0
        }
        if(sourceArr.length < maxCount){
           renderArray.push(sourceArr)
           sourceArr = []
        }
        if (sourceArr.length === 0 || ) {
          return
        }

        let shiftedItem = sourceArr.shift()
        count += 1 + shiftedItem.colspan
        currentArr.push(shiftedItem)

        _toArray(sourceArr, currentArr, count, maxCount)
      }

      _toArray(cloneArray, [], 0, this.colCount)

      return renderArray
    }
  }
}
</script>

<style scoped></style>
