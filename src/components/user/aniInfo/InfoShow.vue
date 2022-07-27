<template>
<div style="background-color: #f3f6fa">
  <div>
    <Userheader></Userheader>
  </div>
  <div style="margin: 0 193px 0 193px;background-color: #FFFFFF">
    <div style="font-size: 33px;font-family: 楷体;text-align: center;color: #c7c93c">
      <p>
        {{AniDeail.chinesename}}详情
      </p>
    </div>
    <div>
      <div class="onedialog">
        <div class="onedialog-name"><span>{{AniDeail.chinesename}}</span>
          <span>{{AniDeail.foreignname}}</span></div>
        <div>
          <div  class="left-picture">
            <img :src="AniDeail.picture" class="detail-gif">
          </div>
          <div  class="right-text">
            <div><span>界：动物界 Animalia</span></div>
            <div><span>门：脊索动物门 chordata</span></div>
            <div><span>纲：哺乳动物纲 Mammalia</span></div>
            <div><span>目：食肉目 Carnivora</span></div>
            <div><span>分布：{{AniDeail.distribution}}</span></div>
          </div>
        </div>
      </div>
      <div class="dialog_text">
        <div class="card-container">
          <el-card>
            <div><span>中文名：{{AniDeail.chinesename}}</span></div>
            <div><span>外文名：{{AniDeail.foreignname}}</span></div>
            <div><span>所属分类：{{AniDeail.sort.chinesename}}</span></div>
            <div><span>简要：{{AniDeail.jianjie}}</span></div>
          </el-card>
          <div>
          </div>
        </div>
        <div style="margin-top: 49px;font-size: 20px">
          <div style="margin-left: 50px"><span>体长：{{AniDeail.length}}厘米</span>
            <div style="float: right;margin-right: 145px"><span>身高：{{AniDeail.height}}</span></div></div>
          <el-divider></el-divider>
          <div style="margin-left: 50px"><span>体重：{{AniDeail.weight}}公斤</span><div style="float: right;margin-right: 145px"><span>食性：{{AniDeail.feeding}}</span></div></div>
          <el-divider></el-divider>
          <div style="margin-left: 50px"><span>繁殖：{{AniDeail.breed}}</span>  <div style="float: right;margin-right: 145px"><span>习性：{{AniDeail.habit}}</span></div></div>
          <el-divider></el-divider>
          <div style="margin-left: 50px"><span>位置：{{AniDeail.location}}</span></div>
        </div>
        <div style="background-color: #adc9d2;color: #FFFFFF;font-size: 40px;height:55px;margin-top: 20px;font-family: 楷体">外形特征 Description</div>
        <div><p class="p-feature">{{AniDeail.feature}}</p></div>
        <div style="background-color: #adc9d2;color: #FFFFFF;font-size: 40px;height:55px;margin-top: 20px;font-family: 楷体">生态习性 EcologicaHabit</div>
        <div><p class="p-feature">{{AniDeail.ecohabit}}</p></div>
        <div style="background-color: #adc9d2;color: #FFFFFF;font-size: 40px;height:55px;margin-top: 20px;font-family: 楷体">地理分布 Distribution</div>
        <div><p class="p-feature">{{AniDeail.distribution}}</p></div>
      </div>
    </div>
  </div>
  <div style="width: 100%;background-color: #555d65;margin-top: 30px">
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
  name: "InfoShow",
  data(){
    return{
      AniDeail:''
    }
  },
  components:{
    Userheader
  },
  mounted(){
    this.initInfoShow()
  },
  methods:{
    initInfoShow(){
      // 取到路由带过来的参数
      let router = this.$route.params.name;
       this.AniDeail = router
      console.log(this.AniDeail)
    }
  }
}
</script>

<style scoped>
.p-feature{
  margin-top: 35px;
  line-height: 32px;
  text-indent:2em;
  font-size: 20px;
}
.card-container{
  margin-top: 30px;
  line-height: 32px;
  /*height: 700px;*/
  /*font-size: 17px;*/
  /*font-family: 楷体;*/
  font-size: 19px;
}
.detail-gif{
  width: 350px;
  height: 230px;
}
.left-picture{
  margin-left: 20px;
  margin-top: 13px;
  float: left;
}
.right-text{
  margin-left: 40px;
  margin-top: 13px;
  float: left;
  width: 850px;
  height: 150px;
  color: #FFFFFF;
  line-height: 32px;
  font-size: 19px;
}
.onedialog-name{
  width: 100%;
  height: 40px;
  background-color: #656768;
  text-align: center;
  font-family: 微软雅黑;
  font-size: 22px;
  color: #FFFFFF;
}
.onedialog{
  width: 100%;
  height: 300px;
  background-color: #464849;
}
</style>