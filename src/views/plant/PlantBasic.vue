<template>
  <div class="tabs-container">
    <el-tabs v-model="activeName" type="border-card" >
      <el-tab-pane label="植物信息" name="PlantInfos" icon="el-icon-plus">
      <PlantInfos></PlantInfos></el-tab-pane>
      <el-tab-pane label="数据跟踪调查" :disabled="quanxian" name="PlantData"><PlantData></PlantData></el-tab-pane>
      <el-tab-pane label="历史数据" :disabled="quanxian" name="HistoryPlanData" click="history"><HistoryPlanData></HistoryPlanData></el-tab-pane>
      <el-tab-pane label="Task" :disabled="quanxian" name="fourth">Task</el-tab-pane>
    </el-tabs>
</div>

</template>

<script>
import PlantInfos from '../../components/plants/PlantInfos'
import PlantData from "@/components/plants/PlantData";
import HistoryPlanData from "@/components/plants/HistoryPlanData";
export default {
  name: "PlantBasic",
  data(){
    return{
      user: JSON.parse(window.sessionStorage.getItem('user')),
      quanxian: '',
      activeName: 'PlantInfos'}
  },
  mounted() {
    this.initQuanXian()
  },
  methods:{
    initQuanXian(){
      if (this.user.employee[0].departmentId != 6){
        this.quanxian = true
        console.log(this.user.employee[0].departmentId)
        console.log("部门编号")
      }else {
        this.quanxian = false
      }
    }

  },
  components:{
    HistoryPlanData,
    PlantData,
    PlantInfos
  },
}
</script>

<style scoped>
.tabs-container{
  font-size: 20px;
}
</style>