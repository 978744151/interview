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

export const getUserInfo = (params: {id:''}) => {
  return request({
    url: `/api/v1/auth/me`,
    method: 'get',
    params
  })
}

export const updateUser = (data: {}) => {
  return request({
    url: '/api/v1/auth/updatedetails',
    method: 'put',
    data
  })
}


