import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import {initMenu} from "./utils/menu"
import 'font-awesome/css/font-awesome.min.css'

import {postRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {downloadRequest} from "@/utils/download";
import VueTouch from 'vue-touch'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import Vant,{Lazyload} from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.use(Lazyload);


Vue.use(VueTouch, {name: 'v-touch'})
Vue.config.productionTip = false

Vue.use(ElementUI);

// 用组件的形式引入到 main.js 主函数中，就可以在Vue的其他组件全局调用请求接口获取返回数据
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.downloadRequest = downloadRequest;



const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


/*路由导航守卫
to: Route : 即将要进入的目标 路由对象
from: Route : 当前导航正要离开的路由
next: Function : 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参
数。
 */
router.beforeEach((to, from, next)=>{
  if (to.path=='/'){
    next()
  } else {
    //判断是否登录window.sessionStorage.setItem('tokenStr',tokenStr);
    if(window.sessionStorage.getItem('tokenStr')){
      // 初始化菜单
      initMenu(router,store);
      if (!window.sessionStorage.getItem("user")) {
        //判断用户信息是否存在
        return getRequest('/admin/info').then(resp => {
          if (resp) {
            //存入用户信息sessionStorage只能存字符串
            window.sessionStorage.setItem("user", JSON.stringify(resp));
            next();
          }
        });
      }
      next();
    }else {
      //否则判断目前是否前往登录页

         next();


    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
