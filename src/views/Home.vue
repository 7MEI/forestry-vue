<template>
  <div>
    <el-container class="home_con">
      <el-header class="header">
           <div class="title">林业自然保护区管理系统</div>
           <div>
             <el-button icon="el-icon-bell" type="text" plain
                        size="normal" style="margin-right: 36px;margin-bottom: 5px;color: #61c091;font-size: 18px" @click="goChat">消息</el-button>
             <el-dropdown class="userInfo" @command="commandHandler">
             <span class="el-dropdown-link" >
               <span style="margin-right: 26px;margin-bottom: 10px;color: white; font-size: 18px">{{user.name}}</span>
                <img :src="this.user.picture" class="userpicture">
             </span>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                 <el-dropdown-item command="setting">设置</el-dropdown-item>
                 <el-dropdown-item command="logout">注销登录</el-dropdown-item>
               </el-dropdown-menu>
             </el-dropdown>
           </div>
      </el-header>
        <el-container>
            <el-aside width="200px">
                <!--菜单点击事件-->
                   <el-menu router unique-opened>
                <el-submenu :index="index+''"
                            v-for="(item,index) in routes"
                            v-if="!item.hidden"
                            :key="index">
                  <template slot="title">
                    <i :class="item.iconCls" style="color: #1accff;margin-right: 5px"></i>
                    <span>{{item.name}}</span>
                  </template>
                  <el-menu-item :index="children.path" v-for="
(children,indexj) in item.children"
                                :key="indexj">{{children.name}}
                  </el-menu-item>
                </el-submenu>
                     <el-button type="text" style="margin-left: 22px;font-size: 14px;color: #272c33;" @click="toUserHome">普通用户界面</el-button>
              </el-menu>


            </el-aside>
            <el-main>
              <el-breadcrumb separator-class="el-icon-arrow-right"
                              v-if="this.$router.currentRoute.path!='/home'">
                  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item><el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
              </el-breadcrumb>
              <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
                面向西部地区的林业自然保护区管理系统！
              </div>
              <router-view class="homeview"/>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>


<script>
    export default {
      name: "Home",
      components: {
      },
      //拿到用户对象
      data(){
        return{
          user: JSON.parse(window.sessionStorage.getItem('user'))
        }
      },
      computed: {
        routes() {
          return this.$store.state.routes;
        }
      },
      methods: {
        toUserHome(){
          this.$router.push('/UserHome')
        },
        goChat(){
          this.$router.push('/chat')
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
        }
      }
    }
</script>

<style>
.header {
  background: #61c091;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  box-sizing: border-box;
  /*height: 400px;*/
}
.header .title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #ffffff;
  text-align: center;
}
.el-dropdown-link img{
  margin-left:-10px;
  border-radius: 62px;
  width: 62px;
  height: 62px;
  /*margin-top: 18px;*/
  margin-bottom: -12px;

 }
.homeWelcome{
  text-align: center;
  font-size: 30px;
  font-family: 华文行楷;
  color: #61c091;
  padding-top: 50px;
   }
.homeview{
  margin-top: 15px;
}
.home_con{
  width: 100%;
  height: 100% !important;
}
.userpicture{

}
</style>