import axios from 'axios'
import type { newAxiosRequestConfig } from './typed'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getStore } from '../utils/store'
import { message } from 'antd'
axios.defaults.timeout = 30000
const baseRequestConfig: AxiosRequestConfig = {
  baseURL: '/',
}
const instancs = axios.create(baseRequestConfig)
instancs.interceptors.request.use(
  (config: newAxiosRequestConfig) => {
    config.headers = {
      'authorization': getStore({name: 'token'})
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instancs.interceptors.response.use(
  (res: AxiosResponse) => {
    console.log(res)
    return res
  },
  (error) => {
    console.log(error)
    if (error.response.status === 401) {
      message.error(error.response.data.error)
    }
    if(!error.response.data.success) {
      message.error(error.response.data.error)
    }
    return Promise.reject(new Error(error))
  }
)
export default instancs