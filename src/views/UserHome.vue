<template>
  <div>
    <Userheader></Userheader>
    <div>
      <el-carousel :interval="1500" indicator-position="outside" height="450px" ref="carousel">
        <el-carousel-item v-for="(item,index) in AllSlide" :key="item.id">
          <v-touch :swipe-options="{direction: 'horizontal'}" v-on:swipeleft="" v-on:swiperight="" class="wrapper">
            <div class="menu-container" ref="menuContainer">
              <img v-lazy="item.url" class="ii"><img>
            </div>
          </v-touch>
        </el-carousel-item>
      </el-carousel>
    </div>
   <div>
     <div class="text-activity">
       <p>知识主题活动</p>
     </div>
     <div style="margin-left: 215px;margin-right: 195px">
       <div class="User-card">
         <el-card class="boxx-card" v-for="(apply,index) in UserApplys" :key="index">
           <div slot="header"  style="font-family:华文行楷;font-size:25px; color: #0ec3cb;text-align: center">
             <span>{{apply.subject}}</span>
           </div>
           <div>
             <div>
               <div @click="UserShow(apply,true)">
                 <img :src="apply.picture" :alt="apply.picture" :title="apply.picture" class="picture-user">
               </div>
             </div>
           </div>
           <!--          -->
         </el-card>

       </div>
     </div>
   </div>
    <div>
      <div class="text-activity">
        <p>主题活动预告</p>
      </div>
      <div style="margin-left: 215px;margin-right: 195px">
        <div class="User-card">
          <el-card class="boxx-card" v-for="(app,index) in Applys" :key="index">
            <div slot="header"  style="font-family:华文行楷;font-size:25px; color: #0ec3cb;text-align: center">
              <span>{{app.subject}}</span>
            </div>
            <div>
              <div>
                <div @click="UserShow(app,false)">
                  <img :src="app.picture" :alt="app.picture" :title="app.picture" class="picture-user">
                </div>
              </div>
            </div>
            <!--          -->
          </el-card>

        </div>
      </div>
    </div>
    <div style="width: 100%;background-color: #555d65;margin-top: 20px">
      <div style="padding: 3px 120px 3px 290px;color: #FFFFFF;font-size: 19px;font-family: 楷体;opacity: 59%">
        <p style="font-size: 21px">友情链接:</p>
        <p>http://xxx.com</p>
        <div>
          <span>关于我们</span>  |
          <span>联系我们</span>  |
          <span>帮助我们</span>  |
          <span>帮助中心</span>  |
          <span>资源下载</span>
        </div>
        <!--            <p>服务热线：077154689(梧州) Email:Seven@qq.com</p>-->
      </div>
    </div>
  </div>
</template>

<script>
import Userheader from "@/components/user/Userheader";
import Card from "@/components/chat/card";
export default {
  name: "UserHome",
  components:{
    Card,
    Userheader,
  },
  data() {
    return {
      AllSlide: [],
      UserApplys: [],
      IsStatus:'',
      Wacthapplys: '',
      Applys:[],
      userApplyVo:{
        value: ''
      },
      showDialog:false,
    }
  },
   mounted(){
    this.initSlide();
        this.initUserApply();
        this.initApply();
   },
  methods: {
    //查看详情
    UserShow(index,IsStatus){
      this.$router.push({
        path: '/ActivityShow',
        name: 'ActivityShow',
        params: {
          name: index,
          name2: IsStatus,
        }
      })

    },
    initSlide(){
      this.getRequest('/slideshow/AllInfo').then(resp => {
        if (resp) {
          this.AllSlide = resp
        }
      })
    },
    initUserApply(){
        //把后端的currentPage，size传过来
        this.getRequest('/act/user/AllApply').then(resp => {
          if (resp) {
            this.UserApplys = resp.data
          }
        })
    },
    initApply(){
        //把后端的currentPage，size传过来
        this.getRequest('/act/apply/AllApply').then(resp => {
          if (resp) {
            this.Applys = resp.data
          }
        })
    },
  }
}
</script>

<style>

.picture-user{
  margin-top: -22px;
  width: 250px;
  height: 200px;
}
.User-card{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
margin-top: 12px;
}
.boxx-card{
  margin-left: -5px;
  margin-top: 19px;
}
.text-activity{
  margin: auto 780px;
  font-family: 楷体;
  font-size: 33px;
  width: max-content;
  font-weight: 600;
  color: #c7c93c;
}
.ii{
  width: 100%;
  height: 500px;
}
</style>