<template>
  <div>
    <el-container>
<!--      02b10e-->
      <div class="head">
        <div style="width: 100%;height: 100px;background-color: #439e5a">
          <div class="title">林业自然保护区管理系统</div>
          <div style="width: 900px;height: 100%;margin-left: 400px;">
            <div>
              <div style="height:30px;width: 100%;"></div>
              <el-button type="text" style="color: #7427b1; font-size: 27px;font-family: 楷体;margin-left: 200px;" @click="UserHome">首页</el-button>
              <el-button type="text" style="color: #7427b1;font-size: 27px;font-family: 楷体;margin-left: 30px;" @click="toPlant" >植物信息</el-button>
              <el-button type="text" style="color: #7427b1;font-size: 27px;font-family: 楷体;margin-left: 30px;" @click="toAnimal" >动物信息</el-button>
              <el-button v-if="IsEmployee" type="text" style="color: #7427b1;font-size: 27px;font-family: 楷体;margin-left: 30px">个人中心</el-button>
              <el-button v-if="isEmploye" type="text" style="color: #7427b1;font-size: 27px;font-family: 楷体;margin-left: 30px" @click="toHome">后台系统</el-button>
            </div>
            <div style="float: right;margin-right: -350px;margin-top: -55px">
              <el-dropdown class="userInfo" @command="commandHandler">
             <span class="el-dropdown-link" >
               <span style="margin-right: 26px;margin-bottom: 10px;color: white; font-size: 18px">{{user.name}}</span>
                <img :src="this.user.picture" class="userpicture">
             </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                  <el-dropdown-item command="setting">设置</el-dropdown-item>
                  <el-dropdown-item command="logout" >注销登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>

      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "header",
  data(){
    return{
      user: JSON.parse(window.sessionStorage.getItem('user')),
      IsEmployee:'',
      isEmploye:'',
    }
  },
  mounted(){
    this.initUserHeader()
  },
  methods:{
    initUserHeader(){
      if(this.user.employee[0]){
        this.IsEmployee=false
        this.isEmploye=true
      }else {
        this.IsEmployee =true
        this.isEmploye =false
      }
    },
    toHome(){
      this.$router.push('/home');
    },
    commandHandler(cmd) {
      if (cmd == 'logout') {
        this.$confirm('此操作将注销登录，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //注销
          this.postRequest("/logout");
          //清除用户信息
          window.sessionStorage.removeItem("user");
          window.sessionStorage.removeItem("tokenStr");
          //清空菜单
          this.$store.commit('initRoutes',[]);
          //跳转登录页
          this.$router.replace("/")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    },
    UserHome(){
      this.$router.push('/UserHome');
    },
    toPlant(){
      this.$router.push('/PlantView');
    },
    toAnimal(){
      this.$router.push('/AnimalView');
    },
  },
}
</script>

<style scoped>
.biaoqian{
  margin-top: 28px;
  width: 900px;
  margin-left: 600px;
}
.head{
  width: 100%;
  height: 100px;
}
.title {
  float: left;
  font-size: 38px;
  font-family: 华文行楷;
  margin-top: 35px;
  margin-left: 22px;
  color: #FFFFFF;
}
.el-menu-demos{
  height: 100px;
  margin: 0 auto;
}
</style>