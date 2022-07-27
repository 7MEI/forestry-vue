<template>
<div>
  <div>
    <Userheader></Userheader>
  </div>
  <div>
    <el-table
        :data="PicShow"
        style="width: 100%"
        border
        :show-header = "false"
        :cell-style="{padding: '0'}"
    >
      <el-table-column
          prop="url"
          height="200"
          width="200">
        <template #default="scope">
          <el-image class="table-td-thumb" :src="scope.row.url" :preview-src-list="[scope.row.url]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="url1"
          height="200"
          width="200">
        <template #default="scope">
          <el-image class="table-td-thumb" :src="scope.row.url1" :preview-src-list="[scope.row.url1]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="url2"
          height="200"
          width="200">
        <template #default="scope">
          <el-image class="table-td-thumb" :src="scope.row.url2" :preview-src-list="[scope.row.url2]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="url3"
          height="200"
          width="200">
        <template #default="scope">
          <el-image class="table-td-thumb" :src="scope.row.url3" :preview-src-list="[scope.row.url3]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="url4"
          height="200"
          width="200">
        <template #default="scope">
          <el-image class="table-td-thumb" :src="scope.row.url4" :preview-src-list="[scope.row.url4]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="url5"
          height="200"
          width="200">
        <template #default="scope">
          <el-image class="table-td-thumb" :src="scope.row.url5" :preview-src-list="[scope.row.url5]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="url6"
          height="200"
          width="200">
        <template #default="scope">
          <el-image class="table-td-thumb" :src="scope.row.url6" :preview-src-list="[scope.row.url6]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="url"
          height="200"
          width="200">
        <template #default="scope">
          <el-image class="table-td-thumb" :src="scope.row.url" :preview-src-list="[scope.row.url]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="url7"
          height="200"
          width="200">
        <template #default="scope">
          <el-image class="table-td-thumb" :src="scope.row.url7" :preview-src-list="[scope.row.url7]">
          </el-image>
        </template>
      </el-table-column>

    </el-table>
  </div>
  <div style="margin:  0 133px 0 133px">
    <el-tabs v-model="UserName" type="border-card" >
      <el-tab-pane class="label-text" label="动物分类2" name="AnimalSort" icon="el-icon-plus"><AnimalSort></AnimalSort></el-tab-pane>
      <el-tab-pane label="动物信息" name="AnimalUInfo"><AnimalUInfo></AnimalUInfo></el-tab-pane>
    </el-tabs>
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
import AnimalSort from "@/components/user/aniInfo/AnimalSort"
import AnimalUInfo from "@/components/user/aniInfo/AnimalUInfo"
export default {
  name: "AnimalView",
  data(){
    return{
      UserName: 'AnimalSort',
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
    }
  },
  components:{
    Userheader,
    AnimalUInfo,
    AnimalSort
  },

}
</script>

<style scoped>
.label-text{
  /*font-size: 30px;*/
}
.table-td-thumb{
  width: 200px;
  height: 200px;
}
</style>