// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueQuillEditor from 'vue-quill-editor'
import "./assets/sass/common/_global.scss";
import "./assets/sass/common/_function.scss";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/element-variables.scss';
import 'font-awesome/css/font-awesome.min.css';
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(ElementUI);
Vue.use(VueQuillEditor)
// 前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to,from,next,'我都')
  next()
})
// 后置守卫
router.afterEach((to, from) => {
  //...
})
// 封装fetch
import fetch from './fetch'
// 传入Vue 参数
//fetch(Vue)
Vue.prototype.$http=fetch
//fetch.get('url',{'参数'});
// 引入公用方法库
import Utils from './utils'
// 将公用方法定义在vue原型
Vue.prototype.Utils = Utils

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
