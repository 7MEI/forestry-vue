<template>
  <div>

    <img src="../../assets/img/2.jpg" width="50px" height="50px" class="add" title="发布求租信息" @click="dialogVisible=true">
    <div class="common">
      <div class="content">
        <!--全部商品图片展示-->
        <div class="contentImg">
          <div class="title">
            <h2>物品求租</h2>
          </div>
          <div>
            <div class="main">
              <div class="item" v-for="(item,i) in askList" :key="i">
                <div class="comment">
                  <div class="user-popover-box">
                    <el-avatar class="header-img" :src="item.avatar"></el-avatar>
                  </div>
                  <div class="content-box">
                    <div class="meta-box">
                      <span class="username">{{item.adminName}}</span>
                    </div>
                    <div class="content">{{item.content}}</div>
                    <div class="reply-stat">
                      <span class="author-time">{{item.createTime}}</span>
                      <div class="icon-btn">
              <span @click="showReplyInput(i,item.adminName,item.commentId)">
                <i class="iconfont el-icon-s-comment"></i>
                回复({{item.childReplies.length}})
              </span>
                        <span @click="showLike(item)">
                <i class="iconfont el-icon-thumb" style="color: darkorange"></i>
                点赞({{item.commentLike}})
              </span>
                      </div>
                    </div>
                    <div class="reply-box">
                      <div class="item" v-for="(reply,j) in item.childReplies" :key="j">
                        <div class="comment">
                          <div class="user-popover-box">
                            <el-avatar class="header-img" :src="reply.replyAvatar"></el-avatar>
                          </div>
                          <div class="content-box">
                            <div class="meta-box">
                              <span class="username">{{reply.replyUserName}}</span>
                            </div>
                            <div class="content">
                              <span>回复<a>{{item.askUserName}}</a>:</span>
                              <span class="reply">{{reply.replyContent}}</span>
                            </div>
                            <div class="reply-stat">
                              <span class="author-time">{{reply.createTime}}</span>
                              <div class="icon-btn">
                                <span @click="showChildLike(reply)">
                                  <i class="iconfont el-icon-thumb" style="color: darkorange"></i>
                                  点赞({{reply.replyLike}})
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div  v-show="_inputShow(i)" class="my-reply my-comment-reply comment-form">
                      <div class="avatar-box"><el-avatar class="header-img"  :src="defaultAvatar"></el-avatar></div>
                      <div class="form-box">
                        <div class="input-box" >
                          <div
                              tabindex="0"
                              contenteditable="true"
                              spellcheck="false"
                              placeholder="输入评论..."
                              @input="onDivInput($event)"
                              class="reply-input reply-comment-input"
                          ></div>
                        </div>
                        <div class="action-box">
                          <div class="reply-btn-box">
                            <el-button class="reply-btn" size="medium" @click="sendCommentReply(item)" type="primary">发表评论</el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="完善评论信息" :visible.sync="dialogVisible" :center="true">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-col :span="12">
            <el-form-item label="求租名称" prop="askName">
              <el-input v-model="formData.askName" placeholder="请输入求租名称" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签" prop="askCate">
              <el-input v-model="formData.askCate" placeholder="请输入标签" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="最低价格" prop="lowPrice">
              <el-input-number v-model="formData.lowPrice" placeholder="最低价格" :step='5' :precision='2'>
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="最高价格" prop="highPrice">
              <el-input-number v-model="formData.highPrice" placeholder="最高价格" :step='5' :precision='2'>
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新旧程度" prop="askNew">
              <el-input-number v-model="formData.askNew" placeholder="新旧程度" :step='1' controls-position=right
                               :max='10'></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="求租描述" prop="askContent">
              <el-input v-model="formData.askContent" type="textarea" placeholder="请输入求租描述"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

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
  name: 'SysInit',
  data(){
    return{
      dialogVisible: false,
      replyData:{
        replyId:undefined,
        replyLike:undefined,
        replyUserName:undefined,
        content:undefined,
        replyToId:undefined,
      },
      reply:{
        replyUserName:undefined,
        replyContent:undefined,
        replyAvatar:undefined,
        replyNum:1,
        replyToId:undefined,
      },
      askGood:{
        commentId:undefined,
        commentLike:undefined,
      },
      askList:[],
      inputAdd:"",
      isShowEmoji:false,
      replyInput:"",
      btnShow: false,
      index: "0",
      content:'',
      emojiContent: "",
      myName: "Lana Del Rey",
      defaultAvatar: "../../static/images/default-avatar.png",
      myHeader:
          "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
      myId: 19870621,
      to: "",
      toId: -1,
      comments: [
        {
          name: "Lana Del Rey",
          id: 19870621,
          headImg:"https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
          comment: "我发布一张新专辑Norman Fucking Rockwell,大家快来听啊",
          time: "2019年9月16日 18:43",
          commentNum: 2,
          like: 15,
          inputShow: false,
          reply: [
            {
              from: "Taylor Swift",
              fromId: 19891221,
              fromHeadImg:
                  "https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg",
              to: "Lana Del Rey",
              toId: 19870621,
              comment: "我很喜欢你的新专辑！！",
              time: "2019年9月16日 18:43",
              commentNum: 0,
              like: 15,
              inputShow: false
            },
            {
              from: "Ariana Grande",
              fromId: 1123,
              fromHeadImg:
                  "https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg",
              to: "Lana Del Rey",
              toId: 19870621,
              comment: "别忘记宣传我们的合作单曲啊",
              time: "2019年9月16日 18:43",
              commentNum: 0,
              like: 5,
              inputShow: false
            }
          ]
        },
        {
          name: "Taylor Swift",
          id: 19891221,
          headImg:
              "https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg",
          comment: "我发行了我的新专辑Lover",
          time: "2019年9月16日 18:43",
          commentNum: 1,
          like: 5,
          inputShow: false,
          reply: [
            {
              from: "Lana Del Rey",
              fromId: 19870621,
              fromHeadImg:
                  "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
              to: "Taylor Swift",
              toId: 19891221,
              comment: "新专辑和speak now 一样棒！",
              time: "2019年9月16日 18:43",
              commentNum: 25,
              like: 5,
              inputShow: false
            }
          ]
        },
        {
          name: "Norman Fucking Rockwell",
          id: 20190830,
          headImg:
              "https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg",
          comment: "Plz buy Norman Fucking Rockwell on everywhere",
          time: "2019年9月16日 18:43",
          commentNum: 0,
          like: 5,
          inputShow: false,
          reply: []
        }
      ],
      formData: {
        askUserName:undefined,
        askLike:0,
        avatar:undefined,
        askName: undefined,
        askCate: undefined,
        lowPrice: undefined,
        highPrice: undefined,
        askNew: undefined,
        askContent: undefined,
      },
      rules: {
        askName: [{
          required: true,
          message: '请输入求租名称',
          trigger: 'blur'
        }],
        askCate: [{
          required: true,
          message: '请输入标签',
          trigger: 'blur'
        }],
        lowPrice: [{
          required: true,
          message: '最低价格',
          trigger: 'blur'
        }],
        highPrice: [{
          required: true,
          message: '最高价格',
          trigger: 'blur'
        }],
        askNew: [{
          required: true,
          message: '新旧程度',
          trigger: 'blur'
        }],
        askContent: [{
          required: true,
          message: '请输入求租描述',
          trigger: 'blur'
        }],
      },
    };
  },
  directives: { clickoutside },
  mounted(){
    this.initAllStore();
  },
  methods:{
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.formData.askUserName=this.user.username
        this.formData.avatar=this.user.avatar
        this.postRequest('/activity/user/comment/add',this.formData).then(resp => {
          if (resp) {
            console.log(resp);
            this.$notify.success({ title: '成功', message: resp.message });
            this.initAllStore();
          }
        })
        this.dialogVisible=false
      })
    },
    //查询全部数据
    initAllStore () {
      this.getRequest('/activity/user/comment').then(resp => {
        if (resp) {
          console.log(resp);
          this.askList=resp;
        }
      })
    },
    inputFocus() {
      var replyInput = document.getElementById("replyInput");
      replyInput.focus();
    },
    showReplyBtn() {
      this.btnShow = true;
    },
    hideReplyBtn() {
      this.inputAdd = '';
      this.isShowEmoji = false;
    },
    showReplyInput(i, name, id) {
      this.comments[this.index].inputShow = false;
      this.index = i;
      this.comments[i].inputShow = true;
      this.to = name;
      this.toId = id;
    },
    _inputShow(i) {
      return this.comments[i].inputShow;
    },
    _inputHide(i) {
      this.comments[i].inputShow = false;
    },
    sendComment() {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "评论不能为空"
        });
      } else {

      }
    },
    // 修改点赞数量
    showLike(data){
      console.log('askLike'+data.commentLike)
      let i=parseInt(data.commentLike)
      this.askGood.commentLike=i+1
      console.log('askLike'+this.askGood.commentLike)
      this.askGood.commentId=data.commentId
      this.putRequest('/activity/user/comment/update',this.askGood).then(resp => {
        if (resp) {
          console.log(resp);
          this.initAllStore();
        }
      })

    },
    // 修改子评论点赞数量
    showChildLike(data){
      Object.assign(this.replyData,data);
      this.replyData.replyLike=this.replyData.replyLike+1
      console.log('replyLike'+this.replyData.replyLike+this.replyData)
      this.putRequest('/activity/user/reply/update',this.replyData).then(resp => {
        if (resp) {
          console.log(resp);
          this.initAllStore();
        }
      })
    },
    sendCommentReply(data) {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "评论不能为空"
        });
      } else {
        console.log(data.commentId)
        this.reply.replyToId=data.commentId
        this.reply.replyUserName=this.user.name
        this.reply.replyAvatar=this.user.picture
        this.postRequest('/activity/user/reply/add',this.reply).then(resp => {
          if (resp) {
            console.log(resp);
            this.initAllStore();
          }
        })

      }
    },
    onDivInput: function(e) {
      this.replyComment = e.target.innerHTML;
      this.reply.replyContent=e.target.innerHTML;
    },
    showEmoji(e){
      this.inputAdd = e.target.className;
      this.isShowEmoji = true;
      console.log(e.target.className)
    },
    selectEmoji(emoji) {

      this.emojiContent += `[${emoji}]`.replace(/\[([A-Za-z0-9_]+)\]/g, '<img src="../../static/images/$1.png" class="emoji" draggable="false">')//传过来的名字转为图片
      console.log(this.emojiContent)
      this.replyComment = this.emojiContent
    },
    customEmoji(text) { //这个函数就是服务器端把传过来的名称转化为图片的
      return text.replace(/\[([A-Za-z0-9_]+)\]/g, '<img src="../../static/images/$1.png" class="emoji" draggable="false">')
    },
    dateStr(date) {
      //获取js 时间戳
      var time = new Date().getTime();
      //去掉 js 时间戳后三位，与php 时间戳保持一致
      time = parseInt((time - date) / 1000);
      //存储转换值
      var s;
      if (time < 60 * 10) {
        //十分钟内
        return "刚刚";
      } else if (time < 60 * 60 && time >= 60 * 10) {
        //超过十分钟少于1小时
        s = Math.floor(time / 60);
        return s + "分钟前";
      } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
        //超过1小时少于24小时
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
      } else if (time < 60 * 60 * 24 * 30 && time >= 60 * 60 * 24) {
        //超过1天少于30天内
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
      } else {
        //超过30天ddd
        var date = new Date(parseInt(date));
        return (
            date.getFullYear() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getDate()
        );
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
              background: url('../../assets/img/2.jpg')  left center no-repeat;
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
