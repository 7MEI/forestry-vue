<template>
<div style="background-color: #f3f6fa">
  <div>
    <Userheader></Userheader>
  </div>
  <div style="margin: 0 193px 0 193px">
    <div style="font-size: 33px;font-weight:550;font-family: 楷体;text-align: center;color: #c7c93c">
      <p>
        {{Wacthapplys.subject}}活动详情
      </p>
    </div>
    <!--  查出详情页面-->
      <el-row :gutter="15">
        <el-card class="">
          <div slot="header"  style="font-family:华文行楷;font-size:29px; text-align: center;font-weight: 550">
            <span>{{Wacthapplys.subject}}</span>
          </div>
          <div>
            <div class="dialog_text">
              <div class="Info-container">
                <div style="height: min-content;">活动内容：{{Wacthapplys.content}}</div>
                <el-divider></el-divider>
                <div>活动地点：{{Wacthapplys.place}}</div>
                <el-divider></el-divider>
                <div>可报名人数：{{Wacthapplys.applynum}}</div>
                <el-divider></el-divider>
                <div>
                  <span>负责人：{{Wacthapplys.applyper}}     </span>
                  <span>  |  {{Wacthapplys.starttime}}</span>
                </div>
                <el-divider></el-divider>
                <div>联系方式：{{Wacthapplys.telephone}}</div>
                <el-divider></el-divider>
                <div>结束报名时间：{{Wacthapplys.endtime}}</div>
                <div>活动开始时间：{{Wacthapplys.starttime}}</div>
                <div class="">
                  <img :src="Wacthapplys.picture" class="pic">
                </div>

                <div style="background-color: #57bbbf;height: 3px;">
                  <el-divider><i class="el-icon-star-on"></i></el-divider>
                </div>
              </div>
            </div>
            <span slot="footer">
        <el-button type="warning" v-if="HH" plain @click="orderInfo(Wacthapplys)" style="width: 100%;margin-top: 20px;font-size: 20px">去报名</el-button>
      </span>
          </div>

        </el-card>
      </el-row>

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

  <!--  报名信息-->
  <el-dialog :visible.sync="orderDialog"  title="填写报名信息">
    <el-row :gutter="15">
      <el-form ref="orderForm" :model="orders" :rules="orderRules" size="medium" label-width="100px">
        <el-col :span="12">
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="orders.name" placeholder="请输入真实姓名" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
          <el-form-item label="身份证号码" prop="idnumeber">
            <el-input v-model="orders.idnumeber" placeholder="请输入用户名"  clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动编号" prop="applyid">
            <el-input v-model="orders.applyid" disabled placeholder="请输入手机" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="telephone">
            <el-input v-model="orders.telephone" onkeyup="value=value.replace(/[^\d]/g,0)" placeholder="请输入邮箱" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div slot="footer">
      <el-button type="danger" plain @click="toCancel">取消</el-button>
      <el-button type="success" plain @click="toAdd">确定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import Userheader from "@/components/user/Userheader";
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.vueClickOutside);
    delete el.vueClickOutside;
  }
};
export default {
  name: "ActivityShow",
  data(){
    return{
      user: JSON.parse(window.sessionStorage.getItem('user')),
      oderApplys: {
        id: null,
      },
      HH:'',
      Wacthapplys:'',
      orderDialog:false,
      orders: {
        applyid: null,
        name: null,
        telephone: null,
        idnumeber: null,
      },
      orderRules: {
        applyid: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        telephone: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        idnumeber: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
      },
    }
  },
  directives: { clickoutside },
  mounted(){
    this.initActivityShow();
  },
  components:{
    Userheader,
  },
  methods: {
    toAdd() {
          console.log(this.orders)
          this.postRequest('/or/info/addOrd',this.orders).then(resp => {
            if (resp) {
              console.log("咩啊")
              this.$message.success("报名成功")
              this.orderDialog = false
            }
          })
    },
    //取消添加或修改
    toCancel() {
      this.orderDialog = false
    },
    orderInfo(index) {
      this.openDialog()
      Object.assign(this.oderApplys, index)
      this.orders.applyid = this.oderApplys.id
      this.orders.name = this.user.name
      console.log(this.user.name)
      console.log("ddddddddd")
      console.log(this.orderDialog)
    },
    openDialog() {
      this.orderDialog = true
    }
    ,
    initActivityShow() {
      // 取到路由带过来的参数
      let router = this.$route.params.name;
      let router2 = this.$route.params.name2;
      this.Wacthapplys = router
      this.HH = router2
    },


  }
}
</script>

<style lang="less" scoped >
.Info-container{
  font-size: 25px;
  line-height: 30px;
  font-family: 楷体;
}
.pic{
  width: 100%;
  height: 500px;
}

.common{
  width: 70%;
  margin: 20px auto;
}
.content{
  width: 100%;
}
.contentImg{
  width: 100%;
}
.user-card{
  width: 100%;
}
.avatar_img_isfang{
  width: 160px;
  height: 160px;
  margin: 20px 50px 20px 30px;
}
.img-container{
  width: 100%;
  display: flex;
  margin-left: 20px;
}
.userinfo-container el-descriptions-item{
  font-size: 14px;
  color: cornflowerblue;
}
.main {
  width: 1000px;
  margin: 0 auto;
  .title{
    color: #8a9aa9;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    padding: 1.67rem 0 5px;
  }
  .comment-form{
    display: flex;
    position: relative;
    padding: 10px;
    background-color: #fafbfc;
    border-radius: 3px;
    margin: 1.333rem 0;

    .avatar-box{
      flex: 0 0 auto;
      .header-img{
        margin-right: 10px;
      }
    }
    .form-box{
      flex: 1 1 auto;
      position: relative;
      .input-box{
        position: relative;
        display: inline-block;
        width: 100%;
        .reply-input {
          min-height: 20px;
          line-height: 22px;
          padding: 10px 110px 10px 10px;
          color: #ccc;
          background-color: #fff;
          border: 1px solid #f1f1f1;
          border-radius: 3px;
          text-align: left;

          &:empty:before {
            content: attr(placeholder);
          }

          &:focus:before {
            content: none;
          }
          &:focus {
            border: 1px solid #007fff;
            outline: none;
          }
        }
      }
      .action-box{
        display: flex;
        align-items: center;
        margin: .65rem 0 0;
        .emoji{
          position: relative;
          .emoji-box {
            display: flex;
            align-items: center;
            position: relative;
            color: #027fff;
            cursor: pointer;
            font-size: 14px;
            span{
              display:inline-block;
              padding-left: 20px;
              height: 18px;
              background: url('../../../assets/img/2.jpg')  left center no-repeat;
              background-size:18px;
            }

          }
        }
        .reply-btn-box {
          flex: 0 0 auto;
          margin-left: auto;
        }
      }

    }
  }

  .item {
    margin-bottom: 15px;
    padding: 10px;
    .comment {
      display: flex;

      .user-popover-box {
        height: 40px;
      }

      .content-box {
        border-bottom: 1px solid #f1f1f1;
        margin-left: 15px;
        flex: 1 1 auto;
        text-align: left;

        .meta-box {
          display: flex;
          align-items: center;
          font-size: 14px;
          line-height: 1.2;
          white-space: nowrap;
        }
        .content {
          margin-top: 5px;
          font-size: 16px;
          line-height: 1.8;
          word-wrap: break-word;
          white-space: pre-wrap;
          word-break: break-all;
          color: #505050;
          a{
            display:inline-block;
            margin:0 4px;
            font-size: 14px;
            font-weight: 400;
            color: #406599;
            cursor:pointer;
          }
        }
        .reply-stat {
          display: flex;
          margin-top: 10px;
          font-weight: 400;
          .author-time {
            font-size: 14px;
            color: #8a9aa9;
            cursor: default;
          }

          .icon-btn {
            flex: 0 0 auto;
            display: flex;
            justify-content: space-between;
            margin-left: auto;
            min-width: 8.8rem;
            color: #8a93a0;
            user-select: none;

            span {
              display: inline-block;
              margin: 0 8px;
              min-width: 100px;
              padding: 0 3px;
              cursor: pointer;
            }
          }
        }

        .reply-box {
          margin: 15px 0;
          background-color: #efefef;
          border-radius: 3px;
          .item{
            padding: 10px 0 10px 10px;
            &:not(:last-child) {
              border-bottom: 1px solid rgba(178,186,194,0.3);
            }
          }
        }
      }
    }
  }
}

.my-reply {
  padding: 10px;
  background-color: #fafbfc;

  .header-img {
    display: inline-block;
    vertical-align: top;
  }
  .reply-info {
    position: relative;
    display: inline-block;
    margin-left: 5px;
    width: 90%;
    @media screen and (max-width: 1200px) {
      width: 80%;
    }

    .reply-input {
      min-height: 20px;
      line-height: 22px;
      padding: 10px 110px 10px 10px;
      color: #ccc;
      background-color: #fff;
      border: 1px solid #f1f1f1;
      border-radius: 3px;
      text-align: left;
      &:empty:before {
        content: attr(placeholder);
      }

      &:focus:before {
        content: none;
      }

      &:focus {
        border: 1px solid #007fff;
        outline: none;
      }
    }
  }

  .reply-btn-box {
    .reply-btn {
      position: relative;
      float: right;
      height: 100%;
    }
  }
}

.my-comment-reply {
  margin-left: 50px;

  .reply-input {
    display: flex;
  }
}

.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178, 186, 194, 0.3);
}

.author-title {
  padding: 10px;

  .header-img {
    display: inline-block;
    vertical-align: top;
  }

  .author-info {
    display: inline-block;
    margin-left: 5px;
    width: 60%;
    height: 40px;
    line-height: 20px;

    >span {
      display: block;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .author-name {
      color: #000;
      font-size: 18px;
      font-weight: bold;
    }

    .author-time {
      font-size: 14px;
    }
  }

  .icon-btn {
    width: 30%;
    padding: 0 !important;
    float: right;

    @media screen and (max-width: 1200px) {
      width: 20%;
      padding: 7px;
    }

    >span {
      cursor: pointer;
    }

    .iconfont {
      margin: 0 5px;
    }
  }

  .talk-box {
    margin: 0 50px;

    >p {
      margin: 0;
      text-align: left;
    }

    .reply {
      font-size: 16px;
      color: #000;
    }
  }

  .reply-box {
    margin: 10px 0 0 50px;
    background-color: #efefef;
  }
}
.add{
  margin-left: 88%;
  padding-top: 20px;
}
</style>