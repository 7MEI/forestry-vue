<template>
  <div id="app">
    <div id="main" style="width: 600px;height:400px;float: left;"></div>
    <div id="main1" style="width: 600px;height:400px;float: left;"></div>
    <div id="main3" style="height:400px;float: left;"></div>
  </div>

</template>
<script>

export default {
  name: "SysData",
  data() {
    return {

    };
  },
  // created(){
  //   this.drawChart();
  //
  //   console.log("2222222222222",partsId);
  // },
  methods: {

    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));

      this.getRequest('/plant/info/All/Plant').then(resp=>{
        let resdata=Array.from(resp)
        let location = new Set(resdata.map(v => v.location));

        location.forEach(item => {

          let count = resp.filter(v => v.location === item).length

          pieOption.series[0].data.push({name: item, value: count})
        })
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(pieOption);
      })
      // // 指定图表的配置项和数据
      let pieOption = {
        title: {
          text: "植物种植地区分析",
          left:"center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",

        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data:[],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },

        ]
      };

    },
    drawChart1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main1"));
      this.getRequest('/plant/info/All/Plant').then(resp=>{
        let resdata=Array.from(resp)
        console.log(resdata);
        console.log("上面输出res")
        let plantnumber = new Set(resdata.map(v => v.plantnumber));
        console.log("+++++++++++++++1=",plantnumber);
        console.log("plantnumber")
        let count =plantnumber[0];
        let sum =0;
        let i=0;

        plantnumber.forEach(item => {

          console.log("==========",item);
          console.log("输出item")

          let s=0;

          let dt =resdata.filter(v => v.plantnumber === item);
          dt.forEach(function (val,idx,arr) {
            s+=val.plantnumber;
          },0);
          console.log("++++++++++++++++=1",dt[0].plantnumber);
          console.log("11111111111=",s);
          option.series[0].data.push({name: item, value:s})
        })
        myChart.setOption(option);
      })
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "每种植物数量情况",

        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          data: ["数量"]
        },
        xAxis: {
          data:["百山祖冷杉","梵净山冷杉","元宝山冷杉","短序脆兰","多花脆兰","羊角槭","广西青梅","圆籽荷","珊瑚兰","任豆","小雏菊"]

        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            data:[]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
    }

  },
  mounted() {
    this.drawChart();
    this.drawChart1();
    // this.drawChart2();

  },

};
</script>