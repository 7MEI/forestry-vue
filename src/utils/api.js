//引入 axios
import axios from 'axios'
//引入 element-ui 的错误提示信息组件
import {Message} from 'element-ui';
//引入 router
import router from "../router";


axios.interceptors.request.use(config => {
    //判断如果存在token，请求携带这个token
    if (window.sessionStorage.getItem('tokenStr')) {
        //让拦截的请求携带token，放在请求体 Authorization 中
        config.headers['Authorization'] = window.sessionStorage.getItem(('tokenStr'));
    }
    return config;
}, error => {
    console.log(error);
})


//response（响应） interceptors （拦截器）  处理不同情况的响应和请求，统一处理，
//success => 并不是响应成功，只是说成功的访问到了接口，需要获取响应码进行相应的处理
axios.interceptors.response.use(success => {
    //业务逻辑错误处理，访问到接口但是逻辑有错误，比如删除部门，部门底下有员工，无法删除，报错
    if (success.status && success.status === 200) {//判断前端访问接口是否成功，并且是否 = 200
        // 进来，说明前端调用接口成功
        // success.data.code 是后端响应返回的数据状态码
        // 500：业务逻辑错误，401：未登录或用户信息过期(项目后端自己设置好的)，403：权限不足，错误
        if (success.data.code === 500 || success.data.code === 401 || success.data.code === 403) {
            //从后端获取具体状态码和错误状信息
            //这个 message.error 是 element-ui 的样式
            Message.error({message: success.data.message});
            //返回json数据，因为错误了，所以返回null
            return null;
            //data是json对象
        }
        //执行到这，说明功能正确没有错误情况
        if (success.data.message) {
            //从后端获取响应的状态码和信息
            Message.success({message: success.data.message});
        }
    }
    //说明没错误，返回json数据
    return success.data;
    //这个错误处理的是直接接口都没访问到
}, error => {
    if (error.response.code === 504 || error.code === 404) {
        //返回错误信息
        Message.error({message: "服务器挂了，囧"});
    } else if (error.response.code === 403) {
        Message.error({message: "权限不足，请联系管理员"});
    } else if (error.response.code === 401) {
        Message.error({message: '请先登录！'});
        //跳转到登录页，replace : 替换为 '/' 这个路径的页面
        router.replace('/')
    } else {
        //如果以上的错误都不是，打印出这个错误信息
        if (error.response.data.message) {//判断打印的信息是否存在，如果存在的话就打印
            Message.error({message: error.response.data.message});
        } else {//错误信息都没有，未知的错误
            Message.error({message: '服务器挂了，未知的错误'})
        }
    }
    //返回相应的数据，因为错误了，没有数据，所以返回null
    return null;
});

//如果接口写好了还需要在url前面或者后面加一个路径
let base = '';//如果不加就为空，需要加就吧要加的路径在这里写上
//处理请求，
// export const 出口 ， postRequest 是方法名 ， url,params ：表示请求需要路径，请求需要参数
export const postRequest = (url, params) => {
    //请求后端接口
    return axios({
        //请求方法 post 方法
        method: 'post',
        //请求路径
        url: `${base}${url}`,
        //数据
        data: params
    })
}
//封装delete请求
export const deleteRequest = (url, params) => {
    //请求后端接口
    return axios({
        //请求方法 delete 方法
        method: 'delete',
        //请求路径
        url: `${base}${url}`,
        //数据
        data: params
    })
}
//封装get请求
export const getRequest = (url, params) => {
    //请求后端接口
    return axios({
        //请求方法 get 方法
        method: 'get',
        //请求路径
        url: `${base}${url}`,
        //数据
        data: params
    })
}
//封装put请求
export const putRequest = (url, params) => {
    //请求后端接口
    return axios({
        //请求方法 put 方法
        method: 'put',
        //请求路径
        url: `${base}${url}`,
        //数据
        data: params
    })
}
