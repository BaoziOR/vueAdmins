import * as types from '../types'
import axios from 'axios'
import fetch from '../../fetch'
const state = {
  postUserInfo:[],
}

const actions = {  
  loginAdmin({commit}, userInfo){
  //   return new Promise((resolve, reject) => {
  //     axios({
  //       method:'post',
  //       url:'/main/admin/auth/login',
  //       data:userInfo
  //     }).then((res) => {
  //     console.log(res)
  //     const data=JSON.parse(res.data.data)
  //     commit('SET_USERINFO',data)
  //     resolve(data)
  //   })
  // })
    return new Promise((resolve, reject) => {
    
    fetch.post('/main/admin/auth/login',userInfo
    ).then((res)=>{
      console.log(res)
      const data=JSON.parse(res.data.data)
      commit('SET_USERINFO',data)
     resolve(data)
    })
    })
}
}
const getters = {
  postUserInfo: state => state.postUserInfo
}
const mutations = {
  SET_USERINFO: (state, postUserInfo) => {
    state.postUserInfo = postUserInfo
  }

}

export default {
  state,
  actions,
  getters,
  mutations
}
