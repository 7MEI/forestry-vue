<template>
<div style="background-color: #f3f6fa">
  <div>
    <Userheader></Userheader>
  </div>
  <div style="margin: 0 193px 0 193px">
    <div style="font-size: 33px;font-family: 楷体;text-align: center;color: #c7c93c">
      <p>
        {{OnePlant.plantname}}详情
      </p>
    </div>
      <el-card class="card-info">
        <div slot="header"  style="font-family:华文行楷;font-size:25px;text-align: center;font-weight: 600">
          <span>{{OnePlant.plantname}}</span>
        </div>
        <div>
          <div class="dialog_text">
            <div class="show-container">
              <div style="height: min-content;">国家保护级别：{{OnePlant.plantgrade}}</div>
              <el-divider></el-divider>
              <div>所属种类：{{OnePlant.sort.sort}}</div>
              <el-divider></el-divider>
              <div>数量：{{OnePlant.plantnumber}}</div>
              <el-divider></el-divider>
              <div>种植位置：{{OnePlant.location}}</div>
              <el-divider></el-divider>
              <div style="background-color: #adc9d2;color: #FFFFFF;font-size: 40px;height:55px;margin-top:20px;font-family: 楷体">外形特征 Description</div>
              <div style="margin-top: 15px"><p class="text-sh">形态：  {{OnePlant.plantintroduce}}</p></div>
              <div style="background-color: #adc9d2;color: #FFFFFF;font-size: 40px;height:55px;margin-top:20px;font-family: 楷体">价值 Value</div>
              <div style="margin-top: 15px"><p class="text-sh">所含价值：  {{OnePlant.plantvalue}}</p></div>
              <div style="background-color: #adc9d2;color: #FFFFFF;font-size: 40px;height:55px;margin-top:20px;font-family: 楷体">保护措施 Safeguard Procedures</div>
              <div style="margin-top: 15px"><p class="text-sh">措施：  {{OnePlant.measure}}</p></div>
              <el-divider></el-divider>
<!--              style="width: 100%;height: 450px;background-color: #7d7f7f;margin: auto"-->
              <div >
                <div  class="left-picture">
                  <img :src="OnePlant.plantpicture" class="show-picture">
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
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
  name: "PlantShow",
  data(){
    return{
      OnePlant:[]
    }
  },
  components: {
    Userheader
  },
  //点进页面自动查询所有用户信息
  mounted() {
    this.initPlantShow()
  },
  methods:{
    initPlantShow(){
      // 取到路由带过来的参数
      let router = this.$route.params.name;
      this.OnePlant  = router
    }
  }
}
</script>

<style scoped>
.text-sh{
  line-height: 32px;
  text-indent:2em;
  font-size: 21px;
}
.show-picture{
  /*opacity: 2.5;*/
  width: 1200px;
  height: 400px;
}
.show-container{
  font-size: 21px;
  font-family: 楷体;
  font-weight: 600;
}
.card-info{
  margin-top: -15px;
}
.left-picture{
  margin-left: 20px;
  margin-top: 13px;
  float: left;
}
</style>