<template xmlns:border-radius="http://www.w3.org/1999/xhtml" xmlns:margin-left="http://www.w3.org/1999/xhtml"
          xmlns:margin-right="http://www.w3.org/1999/xhtml">
  <el-container class="home-container">
    <!--    导航-->
    <el-header style="height: 70px;">
      <div>
        <span style="margin-left:20px;">
          <img

              width="250px;"
              style="margin-left:-10px;
              border-radius: 50%;
              width: 70px;
              height: 70px;"
              height="100%;"
              alt
              srcset
          />
        </span>
      </div>
      <el-dropdown>
        <div class="block">
          <!--          -->
          <el-avatar :size="50" :src="this.userInfo.avatar" style="cursor: pointer;">

          </el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown" trigger="click">
          <el-dropdown-item>
            <span type="danger" @click="toWelcome"><span class="el-icon-house"></span> &nbsp;系统首页</span>
          </el-dropdown-item>
          <el-dropdown-item>

            <span type="danger" @click="getContact"><span class="el-icon-ship"></span> &nbsp;交流讨论</span>

          </el-dropdown-item>

          <el-dropdown-item>

            <span type="danger" @click="logout"><span class="el-icon-switch-button"></span> &nbsp;退出登入</span>

          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!--主体-->
    <el-container style="height: 500px;">
      <!--菜单-->
      <el-aside :width="isOpen==true?'64px':'200px'">
        <div class="toggle-btn" @click="toggleMenu">|||</div>
        <el-menu router unique-opened>
        <el-submenu :index="index+''"
                    v-for="(item,index) in routes"
                    v-if="!item.hidden"
                    :key="index">
          <template slot="title">
            <i :class="item.iconCls" style="color: #61c091;margin-right: 5px"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item :index="children.path" v-for="
        (children,indexj) in item.children"
                        :key="indexj">{{children.name}}
          </el-menu-item>
        </el-submenu>
        </el-menu>



<!--        <el-menu-->
<!--            class="el-menu-vertical-demo"-->
<!--            :collapse="isOpen"-->
<!--            :router="true"-->
<!--            :default-active="activePath"-->
<!--            background-color="#272c33"-->
<!--            :collapse-transition="false"-->
<!--            text-color="rgba(255,255,255,0.7)"-->
<!--            unique-opened-->
<!--        >-->
<!--          &lt;!&ndash;          2将Main中的menuList数据传递到MenuTree组件中去&ndash;&gt;-->
<!--          <MenuTree :menuList="this.MenuList"></MenuTree>-->
<!--        </el-menu>-->

      </el-aside>

      <!--右边主体-->
      <el-main v-loading="loading">
        <!--        定义路由视图-->
        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>


export default {
  name: 'Home',
  computed: {
    routes() {
      return this.$store.state.routes;
    }

  },
  data() {
    return {
      loading: true,
      activePath: "", //激活的路径
      isOpen: false,
      menuList: {},
      userInfo: {},


    };
  },
  //注册组件
  components: {

  },
  methods: {
    /**
     *
     * 退出登入
     */
    async logout() {
      var res = await this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消退出登入"
        });
      });
      if (res == "confirm") {
        window.localStorage.clear();
        this.$router.push("/login");
      }
    },
    /**
     * 去系统首页
     */
    toWelcome() {
      this.$router.push("/welcome");
    },
    /**
     加载菜单数据
     */
    async getMenuList() {
      const {data: res} = await this.$http.get("user/findMenu");
      if (res.code !== 200)
        return this.$message.error("获取菜单失败:" + res.msg);
      this.menuList = res.data;
    },
    /**
     获取用户信息
     */
    async getUserInfo() {
      const {data: res} = await this.$http.get("user/info");
      if (res.code !== 200) {
        return this.$message.error("获取用户信息失败:" + res.msg);
      } else {
        this.userInfo = res.data;
        //保存用户
        this.$store.commit("setUserInfo", res.data);
      }
    },
    /**
     * 菜单伸缩
     */
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },

    /**
     * 点击交流
     */
    getContact() {
      const w = window.open('about:blank');
      w.location.href = 'https://www.zykcoderman.xyz/';
    }

  },
  mounted() {
    this.getUserInfo();
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
    // if(window.sessionStorage.getItem("activePath")==null){
    //   this.activePath='/welcome';
    // }
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
};
</script>

<style>
/* 为对应的路由跳转时设置动画效果 */

.el-header {
  background-color: #272c33;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 19px;
  padding-left: 0px;
}

.el-aside {
  background-color: #272c33
}

.el-main {
  background-color: #eaedf1;
}

.home-container {
  width: 100%;
  height: 100% !important;
}

.toggle-btn {
  background-color: #2d3a4b !important;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>


<!--<el-menu router unique-opened>-->
<!--<el-submenu :index="index+''" v-for="(item,index) in-->
<!--routes"-->
<!--            v-if="!item.hidden"-->
<!--            :key="index">-->
<!--  <template slot="title">-->
<!--    <i class="el-icon-location"></i>-->
<!--    <span>{{item.name}}</span>-->
<!--  </template>-->
<!--  <el-menu-item :index="children.path" v-for="-->
<!--(children,indexj) in item.children"-->
<!--                :key="indexj">{{children.name}}-->
<!--  </el-menu-item>-->
<!--</el-submenu>-->
<!--</el-menu>-->