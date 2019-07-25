import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/auth/login.do',
    method: 'post',
    params: data
  })
}

export function getInfo(userId) {
  return request({
    url: '/sys/user/userInfo.do',
    method: 'get',
    params: {userId: userId}
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
