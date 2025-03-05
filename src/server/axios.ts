import axios from 'axios'
import qs from 'qs'
import type { newAxiosRequestConfig } from './typed'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
axios.defaults.timeout = 30000
const baseRequestConfig: AxiosRequestConfig = {
  baseURL: '/',
}
const instancs = axios.create(baseRequestConfig)
instancs.interceptors.request.use(
  (config: newAxiosRequestConfig) => {
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
    return Promise.reject(new Error(error))
  }
)
export default instancs