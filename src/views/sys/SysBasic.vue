<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="部门管理" name="DeptMana" >
        <DeptMana></DeptMana>
      </el-tab-pane>

      <el-tab-pane label="权限组管理" name="RoleMana">
        <RoleMana></RoleMana>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RoleMana from "../../components/basic/RoleMana";
import DeptMana from "../../components/basic/DeptMana";
export default {
  name: "SysBasic",
  components: {
    DeptMana,
    RoleMana
  },
  data () {
    return {
      activeName: 'RoleMana'
    }
  }
}
</script>

<style scoped>

</style>
