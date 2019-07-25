import {login, logout, getInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

import * as TYPES from '../types'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  id: ''
}

const mutations = {
  [TYPES.SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [TYPES.SET_NAME]: (state, name) => {
    state.name = name
  },
  [TYPES.SET_AVATAR]: (state, avatar) => {
    state.avatar = avatar
  },
  [TYPES.SET_ID]: (state, userId) => {
    state.id = userId
  }
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login({username: username.trim(), password: password}).then(response => {
        const {data} = response
        commit(TYPES.SET_TOKEN, data.token)
        commit(TYPES.SET_ID,data.id)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.id).then(response => {
        const {data} = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {name, avatar} = data

        commit(TYPES.SET_NAME, name)
        commit(TYPES.SET_AVATAR, avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit(TYPES.SET_TOKEN, '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit(TYPES.SET_TOKEN, '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

