// ...已有接口...
import request from '@/server/axios.ts'

export const getBlogList = (params: { page: number; pageSize: number }) => {
    return request({
      url: '/api/v1/blogs/getAllBlogs',
      method: 'get',
      params: {
        page: params.page,
        limit: params.pageSize
      }
    })
  }
  export const createBlog= ( data:any) => {
    return request({
      url: '/api/v1/blogs',
      method: 'post',
      data
    })
  }
  // 已有updateUser接口...