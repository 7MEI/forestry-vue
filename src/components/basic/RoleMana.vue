<template>
  <div>
    <div class="inputHeader">
      <el-input placeholder="请输入角色英文名" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input placeholder="请输入角色中文名" v-model="role.nameZh"></el-input>
      <el-button @click="fnAddRole" type="primary" icon="el-icon-plus">添加角色</el-button>
    </div>
    <div style="margin-top: 20px; width: 700px">
      <el-collapse v-model="activeName" @change="fnChangeCollapse" accordion>
        <el-collapse-item v-for="(role, index) in roles" :title="role.nameZh" :name="role.id">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可操作资源</span>
              <el-button @click="fnDeleteRole(role)" icon="el-icon-delete" type="text" style="float: right;color: #FF0000"></el-button>
            </div>
            <div>
              <el-tree :data="allMenus"
                       show-checkbox
                       node-key="id"
                       ref="tree"
                       :key="index"
                       :default-checked-keys="selectedMenus"
                       :props="defaultProps"
                       ></el-tree>
              <div style="display: flex; justify-content: flex-end;margin-top: 10px;">
                <el-button size="mini" @click="fnCancelUpdate">取消修改</el-button>
                <el-button size="mini" type="primary" @click="fnUpdateRoleMenus(role.id, index)">确认修改</el-button>
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
  name: "RoleMana",
  data () {
    const defaultProps = {
      children: 'children',
      label: 'name'
    }
    return {
      id:'',
      role: {
        name: '',
        nameZh: ''
      },
      defaultProps,
      activeName: -1,
      selectedMenus: [],
      allMenus: [],
      roles: [],
    }
  },
  mounted () {
    this.fnInitRoles()
  },
  methods: {
    /**
     * 初始化角色数据
     */
    fnInitRoles() {
      this.getRequest('/system/basic/permission/list').then(res => {
        if(res) {
          this.roles = res
        }
      })
    },
    /**
     * 初始化所有菜单
     */
    fnInitAllMenus() {
      this.getRequest('/system/basic/permission/menus').then(res => {
        if(res) {
          this.allMenus = res
        }
      })
    },
    /**
     * 激活折叠面板回调函数
     * @param rid
     */
    fnChangeCollapse(rid) {
      if(rid) {
        this.selectedMenus = []
        this.fnInitAllMenus()
        this.getRequest('/system/basic/permission/mid/'+rid).then(res => {
          if(res) {
            this.selectedMenus = res
          }
        })
      }
    },
    /**
     * 更新角色菜单权限
     * @param rid 角色id
     * @param index 树形控件下标
     */
    fnUpdateRoleMenus(rid, index){
      // true表示只获取叶子节点
      let checkedMenus = this.$refs.tree[index].getCheckedKeys(true)
      let url = '/system/basic/permission/updatemenus/'+rid
      checkedMenus.forEach(key => {
        url += '&mids=' + key
      })
      this.putRequest(url).then(res => {
        if(res) {
          this.activeName = -1
        }
      })
    },
    /**
     * 取消更新操作
     */
    fnCancelUpdate () {
      this.activeName = -1
    },
    /**
     * 添加角色
     */
    fnAddRole () {
      if(this.role.name && this.role.nameZh) {
        this.postRequest('/system/basic/permission/add', this.role).then(res => {
          if(res) {
            this.fnInitRoles()
            this.role.name = ''
            this.role.nameZh = ''
          }
        })
      }else {
        this.$message.error('所有字段不能为空！')
      }
    },
    /**
     * 删除角色
     * @param role
     */
    fnDeleteRole(role) {
      this.$confirm('此操作将会永久删除['+role.nameZh+']角色，是否继续？','提示', {
        confirmButtonText: '',
        cancelButtonText: '',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/permission/delete'+role.id).then(res => {
          if(res) {
            this.fnInitRoles()
          }
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>
.inputHeader .el-input{
  width: 260px;
  margin-right: 10px;
}
</style>
