// ...已有接口...
import request from '@/server/axios.ts'
import { URLSearchParams } from 'node:url';

export const getComment = (data:any) => {
    return request({
      url: '/api/v1/comment',
      method: 'post',
      data
    })
  }
  export const createComment= ( data:any) => {
    return request({
      url: '/api/v1/comment/create',
      method: 'post',
      data
    })
  }

  export const createLike= ( data:any) => {
    return request({
      url: '/api/v1/comment/like',
      method: 'post',
      data
    })
  }

  export const commentIdReply= (data:any) => {
    return request({
      url: `/api/v1/comment/reply`,
      method: 'post',
      data
    })
  }

  export const updateBlog= ( id:any,data:any) => {
    return request({
      url: `/api/v1/blogs/${id}`,
      method: 'put',
      data         
    })
  }

  // 在现有接口后添加
export const getBlogDetail = (id: string) => {
    return request({
      url: `/api/v1/blogs/${id}`,
      method: 'get'
    })
  }