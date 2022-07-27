<template>
  <div>

    <div>
      <div>
        <el-card class="box-card" v-for="(anisort,index) in AnimalSort" :key="index">
          <div slot="header"  style="font-family:华文行楷;font-size:30px; color: #af2eaa;margin-left: 620px">
            <span>{{anisort.chinesename}}</span>
            <div style="float: right;">
              <template>
                <el-button type="warning" icon="el-icon-plus" @click="watchDetails(anisort)">查看详情>>></el-button>
              </template>
            </div>
          </div>
          <div @click="watchDetails(anisort)">
            <div style="float: left;width: 210px;margin-bottom: 10px;margin-left: 60px">
              <img :src="anisort.intropicture" class="picture-container">
            </div>

            <div style=" float: right;width: 1000px;margin-right: 80px;margin-top: -230px">
              <p class="right-span">{{anisort.characteristic}}</p>
            </div>
          </div>
        </el-card>
        <!--  查出详情页面-->
        <el-dialog  :visible.sync="OneDialog"   title="分类详情" >
          <div>
            <div slot="header">
              <img :src="watchOne.video" class="detail-gif">
            </div>
            <div class="dialog_text">
              <div class="show-container">
                <div style="height: min-content;"><p class="right-span">{{watchOne.characteristic}}</p></div>
                <el-card style="height: 150px">
                  <div style="float: left;width: 200px;margin-left: 10px">
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

        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AnimalSort",
  data() {
    return {
      watchOne: [],
      AnimalSort: [],
      AllUrl: '',
      PicShow:[{
        url3:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F29%2F20200329051654_knQuf.thumb.400_0.gif&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639826680&t=583dd773a7eab4ecbfc2cc7d75f5c2f7',
        url1:'https://forestrys.oss-cn-guangzhou.aliyuncs.com/9f510fb30f2442a7a093a74fd143ad4bd01302be.jpg',
        url2:'https://forestrys.oss-cn-guangzhou.aliyuncs.com/63d9f2d3572c11df2a4b2fb7632762d0f603c288.jpg',
        url:'https://forestrys.oss-cn-guangzhou.aliyuncs.com/src%3Dhttp___hbimg.b0.upaiyun.com_048263dbaa3c53b82e3cb468fb87e374480259de2116d-D2Ml59_fw658%26refer%3Dhttp___hbimg.b0.upaiyun.jpg',
        url4:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic49.nipic.com%2Ffile%2F20140919%2F18675274_175748124000_2.jpg&refer=http%3A%2F%2Fpic49.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639829481&t=16fba5d26084985180d46834c94d07cf',
        url7:'https://forestrys.oss-cn-guangzhou.aliyuncs.com/f2deb48f8c5494ee0166998d2df5e0fe98257eda.jpg',
        url5:'https://forestrys.oss-cn-guangzhou.aliyuncs.com/9a504fc2d562853525b8581798ef76c6a7ef63a8.jpg',
        url6:'https://forestrys.oss-cn-guangzhou.aliyuncs.com/src%3Dhttp___uploadfile.bizhizu.cn_up_86_5a_dd_865addc1f9b7c1764a6f585709153a9c.jpg%26refer%3Dhttp___uploadfile.bizhizu.jpg'
      }],
      AnimalVo:{
        AnnimalSort: undefined
      },
      OneDialog: false,
    }
  },

  mounted() {
    this.initAnimalSort();
    this.AnimalInfo();
    this.Animal();
  },
  methods:{
    //查看详情
    watchDetails(index){
      this.$router.push({
        path: '/AnimalShow',
        name: 'AnimalShow',
        params: {
          name: index,
        }
      })
    },
    initAnimalSort(){
      this.getRequest('/animals/basic/AnimalSort').then(resp=>{
        if (resp){
          this.AnimalSort = resp
        }
      })
    },
    // 右侧弹框消息
    AnimalInfo() {
      this.instance = this.$notify({
        dangerouslyUseHTMLString: true,
        title: "动物的分类",
        message: "1、按生活环境分:陆生动物、水生动物、两栖动物;\n" +
            "2、按哺乳分:哺乳动物、非哺乳动物。\n",
        type: "info",
      });
    },
    Animal() {
      this.instance = this.$notify({
        // dangerouslyUseHTMLString: true,
        title: "保护野生动物",
        message: "革除滥食野生动物陋习，保障人民群众生命健康安全" +
            "(We will eliminate the habit of overeating wild animals and protect the lives, health and safety of the people) " ,
        type: "info",
        position: 'bottom-right'
      });
    },
    //设置滑动切换轮播图
    swiperleft: function (index) {
      //上一页
      this.$refs.carousel.prev();
      //设置幻灯片的索引
      this.$refs.carousel.setActiveItem(index - 1);
    },
    swiperright: function (index) {
      //下一页
      this.$refs.carousel.next();
      this.$refs.carousel.setActiveItem(index + 1);
    },
  },
}
</script>
<style scoped>
.intro{
  margin:0;
  text-indent:2em;
  line-height: 30px;
  font-size: 18px;
  font-family: 楷体;
  font-weight: 500;
}

.detail-picture{
  margin-left: 30px;
  width: 90%;
  height: 250px;
}


.his-span{
  font-size: 20px;
  text-indent:2em;
  line-height: 35px;
  font-family: 楷体;
  /*font-weight: 400;*/
}

.picture-container{
  width: 200px;
  height: 200px;
  border-radius: 200px;
}
.table-td-thumb{
  width: 200px;
  height: 180px;
}
.right-span{
  margin-left: 20px;
  margin-top: 50px;
  text-indent: 2em;
  line-height: 35px;
  font-size: 21px;
  font-family: 楷体;
  font-weight: 550;
  width: 100%;

}
</style>