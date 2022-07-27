<template>
<div>
  <el-carousel :interval="1500" indicator-position="outside" height="300px" ref="carousel">
    <el-carousel-item v-for="(item,index) in AllUrl" :key="item.url">
      <v-touch :swipe-options="{direction: 'horizontal'}" v-on:swipeleft="swiperleft(index)" v-on:swiperight="swiperright(index)" class="wrapper">
        <div class="menu-container" ref="menuContainer">
          <img v-lazy="item.url" class="ii"><img>
        </div>
      </v-touch>
    </el-carousel-item>
  </el-carousel>

</div>
</template>

<script>
export default {
  name: "AniSort",
  data(){
    return{
      AllUrl: [],
    }
  },
  mounted() {
    this.initUrl();
  },
  methods: {
    initUrl(){
      this.getRequest('/animals/basic/AllPic').then(resp => {
        if (resp) {
          this.AllUrl = resp;
        }
      })
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
.ii{
  width: 100%;
  height: 300px;
}
</style>