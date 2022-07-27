import Vue from 'vue'
import Vuex from 'vuex'
import  SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import {getRequest} from "@/utils/api";
import {Notification} from "element-ui"

Vue.use(Vuex)
const now = new Date();
const store = new Vuex.Store({
    /*state ：全局state对象,用于保存所有组件的公共数据
getters ：监听state值的最新状态（计算属性）
mutations ：唯一可以改变state值的方法(同步执行)
actions ：异步执行mutations方法*/
    state: {
        routes: [],
        sessions: {},
        admins: [], //获取其他用户数据
        currentAdmin: JSON.parse(window.sessionStorage.getItem('user')),
        currentSession: null,
        filterKey:'',
        stomp:null,
        isDot:{}
    },
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        },
        INIT_ADMIN(state,admin){
            state.currentAdmin = admin;
        },
        changeCurrentSession (state,currentSession) {
            state.currentSession = currentSession;
            Vue.set(state.isDot,state.currentAdmin.username + '#' + state.currentSession.username,false);
        },
        addMessage (state,msg) {
            let mss = state.sessions[state.currentAdmin.username + '#' + msg.to];
            if(!mss){
                // state.sessions[state.currentAdmin.username + '#' + msg.to] = [];
                // 接收到消息时更新界面
                Vue.set(state.sessions,state.currentAdmin.username + '#' +msg.to,[]);
            }
            state.sessions[state.currentAdmin.username + '#' + msg.to]
                .push({
                    content:msg.content,
                    date: new Date(),
                    self: !msg.notSelf
                })
        },
        INIT_DATA (state) {
            // 浏览器本地的历史聊天记录
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        INIT_ADMINS(state, data){
            state.admins = data;
        }
    },
    actions: {
        connect(context){
            context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
            let token = window.sessionStorage.getItem('tokenStr');
            context.state.stomp.connect({'Auth-Token':token},success=>{
                context.state.stomp.subscribe('/user/queue/chat',msg=>{
                    let receiveMsg = JSON.parse(msg.body);
                    if(!context.state.currentSession || receiveMsg.from !== context.state.currentSession.username){
                        Notification.info({
                            title: '[' + receiveMsg.formNickName + ']发来一条消息',
                            message: receiveMsg.content.length > 10 ? receiveMsg.content.substr(0,10) : receiveMsg.content,
                            position: 'bottom-right'
                        });
                        Vue.set(context.state.isDot,context.state.currentAdmin.username + '#' + receiveMsg.from,true);
                    }
                    receiveMsg.notSelf = true;
                    receiveMsg.to = receiveMsg.from;
                    context.commit('addMessage',receiveMsg);
                })
            },error=>{

            })
        },
        initData (context) {
            context.commit('INIT_DATA');
            getRequest('/chat/admin').then(resp=>{
                if(resp){
                    context.commit('INIT_ADMINS', resp)
                }
            })
        }
    }
    // modules: {}
});
// 监听session发生变化后将聊天记录存到localStorage
store.watch(function (state) {
    return state.sessions
},function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
},{
    deep:true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
});
export default store;
