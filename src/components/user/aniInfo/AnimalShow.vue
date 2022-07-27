<template>
<div style="background-color: #f3f6fa">
  <div >
    <Userheader></Userheader>
  </div>

  <div style="margin: 0 193px 0 193px">
    <div style="font-size: 33px;font-family: 楷体;text-align: center;color: #c7c93c">
      <p>
        {{watchOne.chinesename}}详情
      </p>
    </div>
    <div>
      <div slot="header">
        <img :src="watchOne.video" class="detail-gif">
      </div>
      <div class="dialog_text" >
        <div class="show-container">
          <div style="height: min-content;"><p class="right-span">{{watchOne.characteristic}}</p></div>
          <el-card style="height: 150px">
            <div style="float: left;width: 200px;margin-left: 110px">
              <el-card class="card">
                <div style="background-color: #1accff;width: 200px;height: 40px;margin-left: -20px;margin-top: -35px;text-align: center;font-size: 15px"><p style="text-align-all: center">中文</p></div>
                <div style="text-align: center;font-family: 微软雅黑;font-size: 15px;"><span>{{watchOne.chinesename}}</span></div>
              </el-card>
            </div>
            <div style="float: left;width: 200px;margin-left: 60px">
              <el-card class="card">
                <div style="background-color: #1accff;width: 200px;height: 40px;margin-left: -20px;margin-top: -35px;text-align: center;font-size: 15px"><p>外文名</p></div>
                <div style="text-align: center;font-family: 微软雅黑;font-size: 15px;"><span>{{watchOne.foreignname}}</span></div>
              </el-card>
            </div>
            <div style="float: left;width: 200px;margin-left: 60px">
              <el-card class="card">
                <div style="background-color: #1accff;width: 200px;height: 40px;margin-left: -20px;margin-top: -35px;text-align: center;font-size: 15px"><p>含义</p></div>
                <div style="text-align: center;font-family: 微软雅黑;font-size: 15px;"><span>{{watchOne.hanyi}}</span></div>
              </el-card>
            </div>
          </el-card>
          <div class="">
            <img :src="watchOne.intropicture" class="detail-picture">
          </div>
          <div >
            <p style="font-family:华文行楷;font-size:30px; color: #1accff;margin-left: -9px;width: 80px">简介</p>
            <el-divider></el-divider>
            <div class="intro"><p>{{watchOne.introduce}}</p></div>
          </div>
          <div >
            <p style="font-family:华文行楷;font-size:30px; color: #1accff;margin-left: -9px;">发展历史</p>
            <el-divider></el-divider>
            <div class="intro"><p>{{watchOne.history}}</p></div>
          </div>
          <div>
            <el-carousel :interval="4000" indicator-position="outside" height="400px" ref="carousel">
              <el-carousel-item v-for="(item,index) in AllUrl" :key="item.url">
                <v-touch :swipe-options="{direction: 'horizontal'}" v-on:swipeleft="swiperleft(index)" v-on:swiperight="swiperright(index)" class="wrapper">
                  <div class="his-container" ref="menuContainer">
                    <img v-lazy="item.url" class="detail-his"><img>
                  </div>
                </v-touch>
              </el-carousel-item>
            </el-carousel>

          </div>
        </div>
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
export default {
  name: "AnimalShow",
 data(){
    return{
      watchOne: '',
      AllUrl: [
        {
          url:'https://forestrys.oss-cn-guangzhou.aliyuncs.com/63d9f2d3572c11df2a4b2fb7632762d0f603c288.jpg'
        },
        {
          url:'https://forestrys.oss-cn-guangzhou.aliyuncs.com/9f510fb30f2442a7a093a74fd143ad4bd01302be.jpg'
        },
        {
          url:'https://forestrys.oss-cn-guangzhou.aliyuncs.com/f2deb48f8c5494ee0166998d2df5e0fe98257eda.jpg'
        }
      ],
    }
 },
  components:{
    Userheader,
  },
  mounted() {
    this.initAnimalOne();
  },
  methods: {
    initAnimalOne(){
      // 取到路由带过来的参数
      let routerParams = this.$route.params.name;
      this.watchOne = routerParams
      console.log(this.watchOne)
      },
  }

}
</script>

<style scoped>
.detail-gif{
  width: 100%;
  height: 400px;
}
.detail-picture{
  /*margin-left: 30px;*/
  width: 100%;
  height: 450px;
}
.intro{
  margin:0;
  text-indent:2em;
  line-height: 50px;
  font-size: 22px;
  font-family: 楷体;
  font-weight: 300;
}
.right-span{
  text-indent: 2em;
  line-height: 48px;
  font-size: 21px;
  font-family: 楷体;
  font-weight: 550;
  width: 100%;

}
.card{
  text-align: center;
  width: 200px;
  height: 100px;
  margin-left: 120px;
}
.detail-his{
  width: 100%;
  height: 500px;
}
</style>