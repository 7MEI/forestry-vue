<template>
  <div class="tabs-container">
    <el-tabs v-model="activeName" type="border-card" >
      <el-tab-pane label="动物分类" name="AniSort" icon="el-icon-plus">
        <AniSort></AniSort></el-tab-pane>
      <el-tab-pane label="动物分类2" name="AniSorts" icon="el-icon-plus"><AniSorts></AniSorts></el-tab-pane>
      <el-tab-pane label="动物信息" name="AnimalInfo"><AnimalInfo></AnimalInfo></el-tab-pane>
      <el-tab-pane label="动物数据监测" :disabled="quanxian" name="AnimalData"><AnimalData></AnimalData></el-tab-pane>
      <el-tab-pane label="历史数据" :disabled="quanxian" name="HistoryData"><HistoryData></HistoryData></el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import AniSort from "@/components/animal/AniSort";
import AniSorts from "@/components/animal/AniSorts";
import AnimalInfo from "@/components/animal/AnimalInfo";
import AnimalData from "@/components/animal/AnimalData";
import HistoryData from "@/components/animal/HistoryData"
export default {
  name: "AniBasic",
  data(){
    return{
      user: JSON.parse(window.sessionStorage.getItem('user')),
      quanxian: '',
      activeName: 'AniSorts'}
  },
  mounted() {
    this.initQuanXian()
  },
  methods:{
    initQuanXian(){
      if (this.user.employee[0].departmentId != 7){
        this.quanxian = true
      }else {
        this.quanxian = false
      }
    }

  },
  components:{
    AnimalInfo,
    AniSort,
    AniSorts,
    AnimalData,
    HistoryData,
  },


}
</script>

<style scoped>
.tabs-container{
  font-size: 20px;
}
</style>