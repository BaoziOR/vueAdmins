import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout'
// 实现按需加载，require.ensure(dependencies: String[], callback: function(require), chunkName: String)
// const HelloWorld =  r =>  require.ensure([],() => r(require('@/components/HelloWorld')),'HelloWorld')
// const Home = r => require.ensure([],()=>r(require("@/components/home")),'home')
// const Mine = r => require.ensure([],()=>r(require("@/components/mine")),'mine')
// const Find = r => require.ensure([],()=>r(require("@/components/find")),'find')
const UserList = r => require.ensure([],()=>r(require("@/components/user/userList")),'user')
const Login = r => require.ensure([],()=>r(require("@/components/login")),'login')
const Dashboard = r => require.ensure([],()=>r(require("@/components/dashboard")),'dashboard')
const Transaction = r => require.ensure([],()=>r(require("@/components/user/transaction")),'user')
const NewsList = r => require.ensure([],()=>r(require("@/components/information/newsList")),'information')
const Message = r => require.ensure([],()=>r(require("@/components/information/message")),'information')
const OpinionList = r => require.ensure([],()=>r(require("@/components/opinion/opinionList")),'opinion')
const Permission = r => require.ensure([],()=>r(require("@/components/permission/list")),'permission')
const Log = r => require.ensure([],()=>r(require("@/components/log/list")),'log')
const NewsAdd= r => require.ensure([],()=>r(require("@/components/information/NewsAdd")),'information')
const NewsEdit= r => require.ensure([],()=>r(require("@/components/information/NewsEdit")),'information')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/login",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
      name:'login',
      component: Login,
      hidden: true
    },
      {
    path: '/',
    component: Layout,
    iconCls:'fa fa-tachometer dashboard',
    name: '首页',
    leaf: true,//只有一个节点
    children: [
        { path: '/dashboard', component: Dashboard, name: '首页' }
    ]
},
{
  path: '/',
  component: Layout,
  name: '用户管理',
  iconCls: 'fa fa-users',//图标样式class
  children: [
      { path: '/userList', component: UserList, name: '用户列表' },
      { path: '/transaction', component: Transaction, name: '交易明细' },
  ]  
},

{
  path: '/',
  component: Layout,
  name: '消息管理',
  iconCls: 'fa fa-commenting',//图标样式class
  children: [
      { path: '/newsList', component: NewsList, name: '资讯列表' },
      { path: '/newsList/add', component: NewsAdd, name: '资讯添加', hidden: true },
      { path: '/newsList/edit', component: NewsEdit, name: '资讯编辑', hidden: true },
      { path: '/message', component: Message, name: '资讯消息' },
  ]  
},
{
  path: '/',
  component: Layout,
  name: '意见管理',
  iconCls: 'fa fa-pencil-square-o',//图标样式class
  children: [
      { path: '/opinionList', component: OpinionList, name: '消息列表' },
  ]  
},
{
  path: '/',
  component: Layout,
  name: '权限管理',
  iconCls: ' fa fa-lock',//图标样式class
  children: [
      { path: '/permissionList', component: Permission, name: '管理员列表' },
  ]  
},
{
  path: '/log',
  component: Layout,
  iconCls:'fa fa-file-text',
  name: '操作日志',
  leaf: true,//只有一个节点
  children: [
      { path: '/log', component: Log, name: '操作日志' }
  ]
},
]
})
