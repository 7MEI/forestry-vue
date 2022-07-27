<template>
  <div class="tabs-container">
    <el-tabs v-model="activeName" type="border-card" >
      <el-tab-pane label="卡片展示" name="CardData"><CardData></CardData></el-tab-pane>
      <el-tab-pane label="表格展示" name="HistoryDate"><HistoryDate></HistoryDate></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CardData from "@/components/plants/history/CardData"
import HistoryDate from "@/components/plants/history/HistoryDate"
export default {
  name: "HistoryPlanData",
  data(){
    return{
      activeName: 'CardData'}
  },
  components:{
    CardData,
    HistoryDate,
  },
}
</script>

<style scoped>

</style>