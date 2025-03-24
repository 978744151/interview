// ...已有接口...
import request from '@/server/axios.ts'

export const getNftList = (params: { page: number; perPage: number }) => {
    return request({
      url: '/api/v1/nft-categories',
      method: 'get',
      params: {
        page: params.page,
        perPage: params.perPage
      }
    })
  }
  export const getNftsList = (params: { page: number; perPage: number }) => {
    return request({
      url: '/api/v1/nfts',
      method: 'get',
      params
    })
  }
  export const getNfts = (params: {  },id:string) => {
    return request({
      url: `/api/v1/nfts/${id}`,
      method: 'get',
      params
    })
  }
  export const createNFt= ( data:any) => {
    return request({
      url: '/api/v1/nft-categories',
      method: 'post',
      data
    })
  }
  export const deleteNft= ( id:any) => {
    return request({
      url: `/api/v1/nft-categories`,
      method: 'delete',
    })
  }
  export const updateNft= ( id:any,data:any) => {
    return request({
      url: `/api/v1/nft-categories`,
      method: 'put',
      data
    })
  }

  // 在现有接口后添加
export const getBlogDetail = (id: string) => {
    return request({
      url: `/api/v1/nft-categories/${id}`,
      method: 'get'
    })
  }

  export const getNoticeListSync = (id: string) => {
    return request({
      url: `/api/v1/theone-news/sync`,
      method: 'post'
    })
  }  
  export const getNoticeList = (id: string) => {
    return request({
      url: `/api/v1/theone-news`,
      method: 'get'
    })
  }  