import request from '@/server/axios.ts'

export const loginUser = (userInfo: {}) => {
  return request({
    url: '/api/v1/auth/login',
    method: 'post',
    data: userInfo
  })
}

export const register = (userInfo: {}) => {
  return request({
    url: '/api/v1/auth/register',
    method: 'post',
    data: userInfo
  })
}

export const getUserInfo = (params: {}) => {
  return request({
    url: '/api/v1/auth/user',
    method: 'get',
    params
  })
}

export const updateUser = (data: {}) => {
  return request({
    url: '/api/v1/auth/update/user',
    method: 'post',
    data
  })
}


