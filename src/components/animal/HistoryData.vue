<template>
  <div class="tabs-container">
    <el-tabs v-model="activeName" type="border-card" >
      <el-tab-pane label="卡片展示" name="HistoryAniData"><HistoryAniData></HistoryAniData></el-tab-pane>
      <el-tab-pane label="表格展示" name="TableData"><TableData></TableData></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import HistoryAniData from "@/components/animal/history/HistoryAniData";
import TableData from "@/components/animal/history/TableData"
export default {
  name: "HistoryData",
  data(){
    return{
      activeName: 'HistoryAniData'}
  },
  components:{
    HistoryAniData,
    TableData,
  },
}
</script>

<style scoped>
.tabs-container{
  font-size: 20px;
}
</style>