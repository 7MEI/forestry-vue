<template>
    <div id="app">
      <div id="main" style="width: 600px;height:400px;float: left;"></div>
      <div id="main1" style="width: 600px;height:400px;float: left;"></div>
      <div id="main3" style="width: 600px;height:400px;float: left;"></div>
    </div>
    
  </template>
  <script>

  export default {
    
    data() {
    return {
   
     
    };
  },
  created(){
    this.drawChart();
  
    console.log("2222222222222",partsId);
  },

    name: "app",
    methods: {
      drawChart() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("main"));
        this.$ajax.get('analy/findRep').then((res=>{
          console.log("++++++++++++++1=",res);
          // let resdata=Array.from(res.data)
          let resdata=Array.from(res.data.data)
          console.log("+++++++++++++++++++++++=",res.data);
          console.log("!@+++++++++++++++++++=",resdata);
          // let repairtype = Array.from(new Set(resdata.map(v => v.repairtype)));
          let repairtype = new Set(resdata.map(v => v.repairtype));
          
          repairtype.forEach(item => {
             
                            let count = res.data.data.filter(v => v.repairtype === item).length
                            
                            pieOption.series[0].data.push({name: item, value: count})
                        })
                          // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(pieOption);
        }))
        // // 指定图表的配置项和数据
        let pieOption = {
          title: {
            text: "汽车维修分析",
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
      this.$ajax.get('analy/findEx').then((res=>{
        let resdata=Array.from(res.data.data)
        console.log(resdata);
        let partsId = new Set(resdata.map(v => v.partsId));
        console.log("+++++++++++++++1=",partsId);
        let count =partsId[0];
        let sum =0;
        let i=0;
        
        partsId.forEach(item => {
                         
                           console.log("==========",item);
                           
                            let s=0;
                            
                            let dt =resdata.filter(v => v.partsId === item);
                            dt.forEach(function (val,idx,arr) {
                           
                              s+=val.number;
                            },0);
                           
                            console.log("++++++++++++++++=1",dt[0].number);
                        
                            console.log("11111111111=",s);
                            option.series[0].data.push({name: item, value:s})
                            
                        })
                        myChart.setOption(option);
          
      }))
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "零件使用情况",
          
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          data: ["销量"]
        },
        xAxis: {
         data:[]

        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data:[]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
   
    }
 
    },
    drawChart2(){
      let myChart = this.$echarts.init(document.getElementById("main2"));
      myChart.setOption(option);
      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      };

     
    },
    mounted() {
      this.drawChart();
      this.drawChart1();
      this.drawChart2();
    
    },
    
  };
  </script>
  
 