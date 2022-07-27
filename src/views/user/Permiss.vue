<template>
    <div>
      <div class="permissTool">
        <el-input size="medium" placeholder="请输入角色英文名" v-model="role.name">
          <template slot="prepend">ROLE_</template>
        </el-input>
        <el-input size="medium" v-model="role.nameZh" placeholder="请输入角色中文名" @keydown.enter.native="addRole"></el-input>
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="addRole">添加角色</el-button>
      </div>
      <!--手风琴-->
      <div class="permissMain">
        <el-collapse v-model="activeName" accordion @change="change">
          <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>可访问资源</span>
                <el-button style="float: right; padding: 3px 0;color: crimson" type="text" icon="el-icon-delete" @click="deleteRole(r.id)"></el-button>
              </div>
              <div>
                <el-tree show-checkbox
                         :data="allMenus"
                         :props="defaultProps"
                         ref="tree"
                         :key="index"
                         :default-checked-keys="selectMenus"
                         node-key="id">
                </el-tree>
                <div style="display: flex;justify-content: flex-end">
                  <el-button size="mini" @click="cancelUpdate">取消</el-button>
                  <el-button size="mini" type="primary" @click="doUpdate(r.id,index)">确认修改</el-button>
                </div>
              </div>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Permiss',
    data(){
      return{
        role:{
          name:'',
          nameZh:''
        },
        roles:[],
        allMenus:[],
        selectMenus:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        activeName:-1,
      }
    },
    mounted(){
      this.initRoles();
    },
    methods:{
      deleteRole(rid){
        this.$confirm('此操作将删除系统角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/system/role/permiss/'+rid).then(resp=> {
            this.initRoles();
          })

          this.$notify({
            title: '成功',
            message: '角色删除成功',
            type: 'success'
          });

        }).catch(() => {
          this.$notify({
            title: '警告',
            message: '已取消删除',
            type: 'warning'
          });

        });
      },
      addRole(){
        if (this.role.name&&this.role.nameZh){
          this.postRequest('/system/role/permiss/role/',this.role).then(resp=> {
            if (resp) {
              this.initRoles();

              this.$notify({
                title: '成功',
                message: '角色添加成功',
                type: 'success'
              });

              this.role.name='';
              this.role.nameZh='';
            }
          })
        }else {
          this.$notify({
            title: '警告',
            message: '角色不能为空',
            type: 'warning'
          });
        }
      },
      cancelUpdate(){
        this.activeName=-1;
      },
      doUpdate(rid,index){
        let tree = this.$refs.tree[index];
        let selectedKeys = tree.getCheckedKeys(true);
        let url = '/system/role/permiss/?rid='+rid;
        selectedKeys.forEach(Key =>{
          url+='&mids='+Key;
        });
        this.putRequest(url).then(resp=>{
          if (resp){
            this.initRoles();
            this.activeName=-1;

            this.$notify({
              title: '成功',
              message: this.role.name+'角色权限修改成功',
              type: 'success'
            });
          }
        })
      },
      change(rid){
        if (rid){
          this.initAllMenus();
          this.initSelecteMenus(rid);
        }
      },
      initSelecteMenus(rid){
        this.getRequest('/system/role/permiss/mid/'+rid).then(resp=> {
          if (resp) {
            console.log(resp);
            this.selectMenus=resp;
          }
        })
      },
      initAllMenus(){
        this.getRequest('/system/role/permiss/menu').then(resp=> {
          if (resp) {
            this.allMenus=resp;
          }
        })
      },
      initRoles(){
        this.getRequest('/system/role/permiss').then(resp=> {
          if (resp) {
            this.roles=resp;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .permissTool{
    display: flex;
    justify-content: flex-start;
  }
  .permissTool .el-input{
    width: 250px;
    margin-right: 10px;
  }
  .permissMain{
    margin-top: 20px;
  }

</style>
